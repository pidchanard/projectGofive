public class SearchRequest
{
    public string? Keyword { get; set; }
}

public class SaveSearchRequest
{
    public int UserId { get; set; }
    public string Keyword { get; set; } = string.Empty;
}

public class FilterRequest
{
    public int? RoleId { get; set; }
    public int? PermissionId { get; set; }
}


