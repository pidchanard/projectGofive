export interface Document {
    documentId: string;
    title: string;
    content: string;
    createdByUserId: string;
    createdDate: Date;
    lastModifiedDate?: Date;
  }