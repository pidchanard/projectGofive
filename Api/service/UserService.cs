using Api.Models;
using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Http;
using Api.Services;

namespace Api.Data
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        private UserDto MapToUserDto(User user)
        {
            return new UserDto
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Username = user.Username,
                RoleId = user.RoleId,
                Role = user.Role != null ? new RoleDto
                {
                    RoleId = user.Role.RoleId,
                    RoleName = user.Role.RoleName
                } : null,
                Permissions = user.UserPermissions?.Select(up => new PermissionDto
                {
                    PermissionId = up.Permission?.PermissionId ?? 0,
                    PermissionName = up.Permission?.PermissionName ?? "",
                    IsReadable = up.IsReadable,
                    IsWritable = up.IsWritable,
                    IsDeletable = up.IsDeletable
                }).ToList() ?? new List<PermissionDto>()
            };
        }

        // ฟังก์ชันสำหรับเพิ่ม User
        public async Task<User> AddUserAsync(User user, List<UserPermission> permissions)
        {
            //  user.UserId = 0;
            // เพิ่ม User ลงในฐานข้อมูล
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // เพิ่มสิทธิ์ (Permissions) สำหรับ User
            foreach (var permission in permissions)
            {
                permission.UserId = user.UserId;
                _context.UserPermissions.Add(permission);
            }

            await _context.SaveChangesAsync();
            return user;
        }

          public async Task<User?> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Role)  // รวมข้อมูล Role ด้วย
                .Include(u => u.UserPermissions)  // รวมข้อมูล UserPermissions
                .ThenInclude(up => up.Permission)  // รวมข้อมูล Permission (ถ้าต้องการ)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            return user;
        }
   public async Task<IEnumerable<UserDto>> GetAllUsersAsync(string sortOrder = "asc")
{
    var usersQuery = _context.Users
        .Include(u => u.Role)
        .Include(u => u.UserPermissions)
            .ThenInclude(up => up.Permission)
        .AsQueryable();

    // ✅ Apply sorting by UserId
    if (sortOrder.ToLower() == "desc")
    {
        usersQuery = usersQuery.OrderByDescending(u => u.UserId);
    }
    else
    {
        usersQuery = usersQuery.OrderBy(u => u.UserId);
    }

    var users = await usersQuery.ToListAsync();

    var result = users.Select(u => new UserDto
    {
        UserId = u.UserId,
        FirstName = u.FirstName,
        LastName = u.LastName,
        Email = u.Email,
        Phone = u.Phone,
        Username = u.Username,
        RoleId = u.RoleId,
        Role = u.Role == null ? null : new RoleDto
        {
            RoleId = u.Role.RoleId,
            RoleName = u.Role.RoleName
        },
        Permissions = u.UserPermissions.Select(p => new PermissionDto
        {
            PermissionId = p.PermissionId,
            PermissionName = p.Permission?.PermissionName ?? "",
            IsReadable = p.IsReadable,
            IsWritable = p.IsWritable,
            IsDeletable = p.IsDeletable
        }).ToList()
    });

    return result;
}




        

    /// อัปเดตข้อมูลผู้ใช้ และ permission
   
    public async Task<bool> UpdateUserAsync(int userId, EditUserRequest request)
    {
        var user = await _context.Users
            .Include(u => u.UserPermissions)
            .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user == null) return false;

        // อัปเดตข้อมูลทั่วไป
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Email = request.Email;
        user.Phone = request.Phone;
        user.RoleId = request.RoleId;
        user.Username = request.Username;
        user.Password = request.Password;

        // ลบ permission เดิมก่อน
        var existingPermissions = _context.UserPermissions.Where(up => up.UserId == userId);
        _context.UserPermissions.RemoveRange(existingPermissions);

        // เพิ่ม permission ใหม่
        foreach (var p in request.Permission)
        {
            _context.UserPermissions.Add(new UserPermission
            {
                UserId = userId,
                PermissionId = p.PermissionId,
                IsReadable = p.IsReadable,
                IsWritable = p.IsWritable,
                IsDeletable = p.IsDeletable
            });
        }

        await _context.SaveChangesAsync();
        return true;
    }

 
        /// ลบผู้ใช้จากฐานข้อมูล
        
        public async Task<(bool success, string message)> DeleteUserAsync(int userId)
        {
            // ค้นหาผู้ใช้จากฐานข้อมูล
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return (false, "ไม่พบผู้ใช้ที่ต้องการลบ");
            }

            // ลบผู้ใช้
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return (true, "ลบผู้ใช้สำเร็จ");
        }
    
        /// ดึงข้อมูลผู้ใช้ตามเงื่อนไขที่ให้มา
        public async Task<List<User>> GetUsersAsync(string? orderBy, string? orderDirection, int pageNumber, int pageSize, string? search)
        {
            var query = _context.Users.AsQueryable();

            // ค้นหาตามคำค้นหาที่ระบุ
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(u => u.FirstName.Contains(search) || u.LastName.Contains(search) || u.Username.Contains(search));
            }

            // จัดเรียงข้อมูลตาม orderBy และ orderDirection
            if (!string.IsNullOrEmpty(orderBy))
            {
                if (orderDirection == "asc")
                {
                    query = query.OrderBy(e => EF.Property<object>(e, orderBy));
                }
                else if (orderDirection == "desc")
                {
                    query = query.OrderByDescending(e => EF.Property<object>(e, orderBy));
                }
            }

            // การแบ่งหน้า
            var users = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return users;
        }


        public async Task<IEnumerable<UserDto>> SearchUsersAsync(string? keyword)
    {
        var query = _context.Users
            .Include(u => u.Role)
            .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
            .AsQueryable();

        if (!string.IsNullOrEmpty(keyword))
        {
            keyword = keyword.ToLower();
            query = query.Where(u =>
                u.FirstName.ToLower().Contains(keyword) ||
                u.LastName.ToLower().Contains(keyword) ||
                u.Username.ToLower().Contains(keyword) ||
                u.Email.ToLower().Contains(keyword));
        }

        var users = await query.ToListAsync();

        return users.Select(MapToUserDto);
    }

    public async Task SaveSearchAsync(SaveSearchRequest request)
    {
        var entity = new SavedSearch
        {
            UserId = request.UserId,
            SearchKeyword = request.Keyword,
            SavedAt = DateTime.UtcNow
        };

        _context.SavedSearches.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<UserDto>> FilterUsersAsync(FilterRequest request)
    {
        var query = _context.Users
            .Include(u => u.Role)
            .Include(u => u.UserPermissions)
                .ThenInclude(up => up.Permission)
            .AsQueryable();

        if (request.RoleId.HasValue)
            query = query.Where(u => u.RoleId == request.RoleId);

        if (request.PermissionId.HasValue)
            query = query.Where(u =>
                u.UserPermissions.Any(p => p.PermissionId == request.PermissionId));

        var users = await query.ToListAsync();
        return users.Select(MapToUserDto);
    }

    
    }
    
        

    
}
