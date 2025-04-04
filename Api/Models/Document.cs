using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

public class Document
{
    [Key]
    public int Doc_id { get; set; }
    public string? Doc_name { get; set; }
    public DateOnly? DocDate { get; set; }

    public string? DocDescription { get; set; }
    
}
