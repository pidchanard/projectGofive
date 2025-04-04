namespace Api.Models;

public class EditUserRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public int RoleId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public List<PermissionDto> Permission { get; set; } = new();
}

public class PermissionDto
{
    public int PermissionId { get; set; }
    public bool IsReadable { get; set; }
    public bool IsWritable { get; set; }
    public bool IsDeletable { get; set; }
}
