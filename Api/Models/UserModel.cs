using Api.Data;

public class User
{
    public int UserId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public DateTime CreateDate { get; set; }
    public int RoleId { get; set; }

    // เปลี่ยน ICollection เป็น IEnumerable
    public Role? Role { get; set; }
    public IEnumerable<UserPermission>? UserPermissions { get; set; }
}
