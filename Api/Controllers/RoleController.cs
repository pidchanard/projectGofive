using Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RoleController(RoleService roleService)
        {
            _roleService = roleService;
        }

        /// GET: api/role
        /// ดึงข้อมูล Role ทั้งหมด
        [HttpGet("rosy")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleService.GetAllRolesAsync();

            // ถ้าไม่มีข้อมูลในตาราง Role
            if (roles == null || !roles.Any())
            {
                return NotFound(new { message = "ไม่พบข้อมูล Role" });
            }

            // ส่งข้อมูลกลับแบบ JSON
            return Ok(roles);
        }
    }
}
