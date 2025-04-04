using Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly PermissionService _permissionService;

        public PermissionController(PermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        /// GET: api/permission
        /// ดึงข้อมูล Permission ทั้งหมด
        [HttpGet]
        public async Task<IActionResult> GetAllPermissions()
        {
            var permissions = await _permissionService.GetAllPermissionsAsync();

            if (permissions == null || !permissions.Any())
            {
                return NotFound(new { message = "ไม่พบข้อมูล Permission" });
            }

            return Ok(permissions);
        }
    }
}
