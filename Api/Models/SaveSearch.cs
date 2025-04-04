public class SavedSearch
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string SearchKeyword { get; set; } = "";
    public DateTime SavedAt { get; set; }
}
