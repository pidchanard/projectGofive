public class UserDto
{
    public int UserId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public DateTime CreateDate { get; set; }
    public int RoleId { get; set; }
    public RoleDto? Role { get; set; }
    public List<PermissionDto> Permissions { get; set; } = new();
}


public class RoleDto
{
    public int RoleId { get; set; }
    public string RoleName { get; set; } = "";
}

public class PermissionDto
{
    public int PermissionId { get; set; }
    public string PermissionName { get; set; } = string.Empty;
    public bool IsReadable { get; set; }
    public bool IsWritable { get; set; }
    public bool IsDeletable { get; set; }
}

