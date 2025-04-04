using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }
    
        // POST api/user
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] AddUserRequest request)
        {
            if (request == null || request.Permissions == null || !request.Permissions.Any())
            {
                return BadRequest("Invalid request data.");
            }

            // สร้าง User object จากข้อมูลที่ได้รับ
            var user = new User
            {
                UserId = request.Id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Phone = request.Phone,
                Username = request.Username,
                Password = request.Password,
                RoleId = request.RoleId
            };

            // สร้าง UserPermission object
            var userPermissions = request.Permissions.Select(p => new UserPermission
            {
                PermissionId = p.PermissionId,
                IsReadable = p.IsReadable,
                IsWritable = p.IsWritable,
                IsDeletable = p.IsDeletable
            }).ToList();

            // เรียก UserService เพื่อเพิ่ม User
            var createdUser = await _userService.AddUserAsync(user, userPermissions);

            return CreatedAtAction(nameof(AddUser), new { id = createdUser.UserId }, createdUser);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound(new { message = $"User with ID {userId} not found" });
            }

            return Ok(user);  // ส่งข้อมูล User กลับไป
        }


    // GET: api/user getalluser

    [HttpGet("alluser")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users); // ✅ JSON format will be exactly as you want
    }


    
     
    /// PUT: api/users/{id}
    /// แก้ไขข้อมูลผู้ใช้ + permissions
  
    [HttpPut("update/{userId}")]
    public async Task<IActionResult> UpdateUser(int userId, [FromBody] EditUserRequest request)
    {
        var updated = await _userService.UpdateUserAsync(userId, request);

        if (!updated)
        {
            return NotFound(new { message = "ไม่พบผู้ใช้ที่ต้องการแก้ไข" });
        }

        return Ok(new { message = "อัปเดตข้อมูลสำเร็จ" });
    }

            
        /// DELETE: api/users/{id}
        /// ลบผู้ใช้จากระบบ
        
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var (success, message) = await _userService.DeleteUserAsync(id);

            if (!success)
            {
                // ถ้าไม่พบผู้ใช้
                return NotFound(new
                {
                    status = new
                    {
                        code = "404",
                        description = "Not Found"
                    },
                    data = new
                    {
                        result = false,
                        message = message
                    }
                });
            }

            // ถ้าลบสำเร็จ
            return Ok(new
            {
                status = new
                {
                    code = "200",
                    description = "OK"
                },
                data = new
                {
                    result = true,
                    message = message
                }
            });
        }
    

    
        /// POST: api/users/DataTable
        /// ดึงข้อมูลผู้ใช้ตามเงื่อนไขที่กำหนด
        
        [HttpPost("DataTable")]
        public async Task<IActionResult> GetUsers([FromBody] UserRequest request)
        {
            var users = await _userService.GetUsersAsync(
                request.OrderBy,
                request.OrderDirection,
                request.PageNumber,
                request.PageSize,
                request.Search
            );

            return Ok(users);
        }
    
         [HttpGet("search")]
            public async Task<IActionResult> SearchUsers([FromQuery] string? keyword)
            {
                var users = await _userService.SearchUsersAsync(keyword);
                return Ok(users);
            }

        [HttpPost("save-search")]
        public async Task<IActionResult> SaveSearch([FromBody] SaveSearchRequest request)
        {
            await _userService.SaveSearchAsync(request);
            return Ok(new { message = "Saved successfully." });
        }

        [HttpPost("filter")]
        public async Task<IActionResult> FilterUsers([FromBody] FilterRequest request)
        {
            var users = await _userService.FilterUsersAsync(request);
            return Ok(users);
        }
        

    }
}
