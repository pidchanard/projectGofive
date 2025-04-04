namespace Api.Data;

public class UserPermission
{
    public int UserPermissionId { get; set; }

    // Foreign Keys
    public int UserId { get; set; }
    public int PermissionId { get; set; }

    // Additional Properties
    public bool IsReadable { get; set; }
    public bool IsWritable { get; set; }
    public bool IsDeletable { get; set; }

    // Navigation Properties
    public User? User { get; set; }
    public Permission? Permission { get; set; }
}
