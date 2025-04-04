namespace Api.Data;

public class Permission
{
    public int PermissionId { get; set; }
    public string? PermissionName { get; set; }

    // Navigation Property
    public ICollection<UserPermission>? UserPermissions { get; set; }
}
