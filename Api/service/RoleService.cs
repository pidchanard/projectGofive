using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class RoleService
    {
        private readonly AppDbContext _context;

        public RoleService(AppDbContext context)
        {
            _context = context;
        }


        /// ดึงข้อมูล Role ทั้งหมดจากฐานข้อมูล
        public async Task<List<Role>> GetAllRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }
    }
}
