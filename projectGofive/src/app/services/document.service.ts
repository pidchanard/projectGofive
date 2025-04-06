import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// ✅ แก้ตรงนี้: import type ที่คุณสร้างเอง
import { MyDocuments } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:5229/api/documents'; // ตรวจสอบว่า URL นี้ถูกต้อง

  constructor(private http: HttpClient) {}

  // ✅ แก้ return type ทั้งหมดจาก Document → MyDocuments
  getAllDocuments(): Observable<MyDocuments[]> {
    return this.http.get<MyDocuments[]>(`${this.apiUrl}/alldoc`);
  }

  getDocumentById(DocId: number): Observable<MyDocuments> {
    return this.http.get<MyDocuments>(`${this.apiUrl}/${DocId}`);
  }

  addDocument(document: MyDocuments): Observable<MyDocuments> {
    return this.http.post<MyDocuments>(this.apiUrl, document);
  }

  updateDocument(DocId: number, document: MyDocuments): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${DocId}`, document);
  }

  deleteDocument(DocId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${DocId}`);
  }

  searchDocuments(keyword: string): Observable<MyDocuments[]> {
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get<MyDocuments[]>(`${this.apiUrl}/search`, { params });
  }
}
