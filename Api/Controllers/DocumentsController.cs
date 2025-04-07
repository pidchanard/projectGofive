using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Services;
using Api.Data;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentsController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpGet("alldoc")]
        public async Task<IActionResult> GetAll()
        {
            var docs = await _documentService.GetAllDocumentsAsync();
            return Ok(docs);
        }

        [HttpGet("{DocId}")]
        public async Task<IActionResult> GetById(int DocId)
        {
            var doc = await _documentService.GetDocumentByIdAsync(DocId);
            if (doc == null) return NotFound();
            return Ok(doc);
        }

        // POST api/documents
       [HttpPost]
        public async Task<IActionResult> Create([FromBody] Document doc)
        {
            if (doc == null || string.IsNullOrEmpty(doc.Doc_name))
                return BadRequest("Invalid document data");

            var created = await _documentService.AddDocumentAsync(doc);
            return Ok(created);
        }

        /// PUT: api/doc/{id}
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Document doc)
        {
            if (id != doc.DocId) return BadRequest();

            var success = await _documentService.UpdateDocumentAsync(doc);
            if (!success) return NotFound();

            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _documentService.DeleteDocumentAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }

        [HttpPost("DataTable")]
        public async Task<IActionResult> GetDocuments([FromBody] DocumentRequest request)
        {
            var documents = await _documentService.GetDocumentsAsync(
                request.OrderBy,
                request.OrderDirection,
                request.PageNumber,
                request.PageSize,
                request.Search
            );

            return Ok(documents);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchDocuments([FromQuery] string? keyword)
        {
            var documents = await _documentService.SearchDocumentsAsync(keyword);
            return Ok(documents);
        }
        
       [HttpGet]
        public async Task<IActionResult> GetAllDocuments([FromQuery] string order = "desc")
        {
            var documents = await _documentService.GetAllDocumentsAsync(order);
            return Ok(documents);
        }

    }
}
