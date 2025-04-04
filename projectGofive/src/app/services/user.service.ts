import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usery } from '../models/getallusermodel';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5229/api/User';  // กำหนด URL ของ API ตรง ๆ ที่นี่

  constructor(private http: HttpClient) {}

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ทั้งหมด
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/alluser`);
  }

  // ฟังก์ชันสำหรับเพิ่มผู้ใช้ใหม่
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);  // ส่งคำขอ POST ไปที่ API
  }

  // ฟังก์ชันสำหรับลบผู้ใช้
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${userId}`);  // ส่งคำขอ DELETE ไปที่ API
  }

  // ฟังก์ชันสำหรับแก้ไขผู้ใช้
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, user);  // ส่งคำขอ PUT ไปที่ API
  }

  updateUserRole(userId: number, data: { roleId: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/updaterole/${userId}`, data);
  }

  getPaginatedUsers(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/DataTable`, request);
  }

  searchUsers(keyword: string) {
    return this.http.get<Usery[]>(`http://localhost:5229/api/User/search?keyword=${keyword}`);
  }
  
  saveSearch(request: { keyword: string; savedBy: number }) {
    return this.http.post(`${this.apiUrl}/user/savesearch`, request);
  }
  
  filterUsers(request: { roleId: number | null }): Observable<Usery[]> {
    return this.http.post<Usery[]>(`http://localhost:5229/api/user/filter`, request);
  }
  
}
