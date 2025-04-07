using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.Models;
using Api.Services;


namespace Api.Data
{
    public class DocumentService : IDocumentService
    {
        private readonly AppDbContext _context;

        public DocumentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Document>> GetAllDocumentsAsync()
        {
            return await _context.Documents.ToListAsync();
        }

        public async Task<Document?> GetDocumentByIdAsync(int id)
        {
            return await _context.Documents.FindAsync(id);
        }

         public async Task<Document> AddDocumentAsync(Document doc)
    {
        _context.Documents.Add(doc);
        await _context.SaveChangesAsync();
        return doc;
    }
        public async Task<bool> UpdateDocumentAsync(Document doc)
        {
            var existing = await _context.Documents.FindAsync(doc.DocId);
            if (existing == null) return false;

            existing.Doc_name = doc.Doc_name;
            existing.DocDate = doc.DocDate;
            existing.DocDescription = doc.DocDescription;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteDocumentAsync(int id)
        {
            var doc = await _context.Documents.FindAsync(id);
            if (doc == null) return false;

            _context.Documents.Remove(doc);
            await _context.SaveChangesAsync();
            return true;
        }

    public async Task<List<Document>> GetDocumentsAsync(string? orderBy, string? direction, int page, int pageSize, string? search)
    {
        var query = _context.Documents.AsQueryable();

        // ค้นหา
        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(d =>
                d.Doc_name.Contains(search) ||
                (d.DocDescription != null && d.DocDescription.Contains(search))
            );
        }

        // จัดเรียง
        if (!string.IsNullOrEmpty(orderBy))
        {
            query = direction?.ToLower() == "desc"
                ? query.OrderByDescending(e => EF.Property<object>(e, orderBy))
                : query.OrderBy(e => EF.Property<object>(e, orderBy));
        }

        // แบ่งหน้า
        return await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<List<Document>> SearchDocumentsAsync(string? keyword)
    {
        return await _context.Documents
            .Where(d =>
                d.Doc_name.Contains(keyword ?? "") ||
                (d.DocDescription != null && d.DocDescription.Contains(keyword ?? ""))
            )
            .ToListAsync();
    }

       public async Task<List<Document>> GetAllDocumentsAsync(string order)
        {
            var documents = _context.Documents.AsQueryable();

            if (order == "asc")
                documents = documents.OrderBy(d => d.DocDate);  // หรือ Field ที่ต้องการ
            else
                documents = documents.OrderByDescending(d => d.DocDate);

            return await documents.ToListAsync();
        }

    }
}
