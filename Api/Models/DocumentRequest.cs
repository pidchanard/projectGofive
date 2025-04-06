namespace Api.Models
{
    public class DocumentRequest
    {
        public string? OrderBy { get; set; } = "DocId";
        public string? OrderDirection { get; set; } = "asc"; // "asc" หรือ "desc"
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
    }
}
