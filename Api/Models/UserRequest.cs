namespace Api.Models
{
    public class UserRequest
    {
        public string? OrderBy { get; set; }  // ฟิลด์ที่ใช้สำหรับการจัดเรียง
        public string? OrderDirection { get; set; }  // ทิศทางการจัดเรียง: "asc" หรือ "desc"
        public int PageNumber { get; set; }  // หมายเลขหน้าปัจจุบัน
        public int PageSize { get; set; }  // ขนาดข้อมูลที่แสดงในแต่ละหน้า
        public string? Search { get; set; }  // คำค้นหาสำหรับกรองข้อมูล
    }
}
