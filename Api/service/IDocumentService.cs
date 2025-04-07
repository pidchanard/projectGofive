using Api.Models;
namespace Api.Data
{
    public interface IDocumentService
    {
        Task<List<Document>> GetAllDocumentsAsync();
        Task<Document?> GetDocumentByIdAsync(int id);
        Task<Document> AddDocumentAsync(Document doc);
        Task<bool> UpdateDocumentAsync(Document doc);
        Task<bool> DeleteDocumentAsync(int id);

        Task<List<Document>> GetDocumentsAsync(string? orderBy, string? direction, int page, int pageSize, string? search);
        Task<List<Document>> SearchDocumentsAsync(string? keyword);
        Task<List<Document>> GetAllDocumentsAsync(string order);

    }
}
