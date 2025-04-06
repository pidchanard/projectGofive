using System.ComponentModel.DataAnnotations;

public class Document
{
    [Key]
    public int DocId { get; set; }
    public string? Doc_name { get; set; }
    public DateOnly? DocDate { get; set; }

    public string? DocDescription { get; set; }
    
}
