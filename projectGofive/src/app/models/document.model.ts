export interface MyDocuments {
  DocId?: number;          
  Doc_name: string;       
  DocDate: string;        
  DocDescription: string; 
  }
  export interface MyDocumentsy {
    docId?: number;          
    doc_name: string;       
    docDate: string;        
    docDescription: string; 
    }
  export interface DocumentRequest {
    OrderBy: string;
    OrderDirection: string;
    PageNumber: number;
    PageSize: number;
    Search: string;
  }