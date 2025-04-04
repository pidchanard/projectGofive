import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  currentUser: any = {};  // ตัวแปรสำหรับเก็บข้อมูลผู้ใช้ปัจจุบัน

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // สมมติว่า user ข้อมูลถูกดึงมาจาก API หรือ LocalStorage
    this.currentUser = { username: 'Lekan Okeowo', role: 'Admin' };
  }

  // ฟังก์ชัน logout
  // logout() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will be logged out.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, log out',
  //     cancelButtonText: 'Cancel'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // เรียก API หรือฟังก์ชันสำหรับการออกจากระบบ
  //       // เช่น ทำลาย JWT หรือ session ใน LocalStorage
  //       this.userService.logout().subscribe(() => {
  //         Swal.fire('Logged out', 'You have been logged out successfully!', 'success');
  //         // หลังจาก logout สำเร็จ ก็สามารถนำไปหน้า login หรือหน้าอื่นๆ
  //       });
  //     }
  //   });
  // }
}
