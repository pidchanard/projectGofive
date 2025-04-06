import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../flowbite.service';
import { DocumentService } from './../../services/document.service';
import { MyDocuments, MyDocumentsy } from '../../models/document.model'; // นำเข้า Document model
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']  // แก้ไข styleUrl เป็น styleUrls
})
export class DocumentsComponent implements OnInit {
  selectedDocument: MyDocuments | null = null;
  isEditModalOpen = false;
  isModalOpen = false;
  documents: MyDocumentsy[] = [];
  // กำหนดให้ document ใช้ interface Documents
  document: MyDocuments = {
    Doc_name: '',
    DocDate: '',    // กำหนดให้เป็น string
    DocDescription: '' // แก้ไขให้ใช้ชื่อฟิลด์ตามที่กำหนดใน Documents interface (ตัว D ตัวใหญ่)
  };

  constructor(
    private flowbiteService: FlowbiteService,
    private documentService: DocumentService
  ) {}
  
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
    this.loadDocuments();
  }
  loadDocuments() {
    this.documentService.getAllDocuments().subscribe(
      (res: any) => {
        console.log('📦 API raw response:', res);
    
        if (Array.isArray(res)) {
          // ✅ เป็น Array ตรงๆ
          this.documents = res;
        } else if (res?.$values) {
          // ✅ เป็น object ที่มี $values
          this.documents = res.$values;
        } else {
          console.error('Invalid response format');  // ⚠️ ไม่เข้า format ที่คาดไว้
        }
      },
      (err) => {
        console.error('API error:', err);
      }
    );
  }
  // ฟังก์ชันเปิด modal
  openModal() {
    this.isModalOpen = true;
  }

  // ฟังก์ชันปิด modal
  closeModal() {
    this.isModalOpen = false;
  }

  // การส่งฟอร์ม
  onSubmit() {
    console.log('SUBMIT DATA:', this.document); // ✅ Debug
  
    if (this.document.Doc_name && this.document.DocDate && this.document.DocDescription) {
      this.documentService.addDocument(this.document).subscribe(
        (response) => {
          console.log('Document added successfully', response);
          
          this.loadDocuments();

          // ✅ SweetAlert แจ้งเตือนเมื่อเพิ่มสำเร็จ
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Document added successfully!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
  
          this.closeModal();
        },
        (error) => {
          console.error('Error adding document', error);
  
          // ❌ SweetAlert แจ้งเตือนกรณี error จาก server
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again later.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // ❗ SweetAlert กรอกข้อมูลไม่ครบ
      Swal.fire('Error', 'Please fill all fields.', 'error');
    }
  }
  
}