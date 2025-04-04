using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class PermissionService
    {
        private readonly AppDbContext _context;

        public PermissionService(AppDbContext context)
        {
            _context = context;
        }

        /// ดึงข้อมูล Permission ทั้งหมดจากฐานข้อมูล
       
        public async Task<List<Permission>> GetAllPermissionsAsync()
        {
            return await _context.Permissions.ToListAsync();
        }
    }
}
