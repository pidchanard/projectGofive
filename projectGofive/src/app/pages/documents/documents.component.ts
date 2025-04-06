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
  documentss: MyDocuments[] = [];
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
  openEditModal(doc: any) {
    this.selectedDocument = {
      DocId: doc.docId, // ✅ แปลงชื่อให้ตรงกับ Interface
      Doc_name: doc.doc_name,
      DocDate: doc.docDate,
      DocDescription: doc.docDescription
    };
    this.isEditModalOpen = true;
  }
  closeEditModal() {
    this.selectedDocument = null;
    this.isEditModalOpen = false;
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
  onUpdate() {
    if (
      this.selectedDocument &&
      this.selectedDocument.DocId && // ✅ ต้องมี ID ด้วย
      this.selectedDocument.Doc_name &&
      this.selectedDocument.DocDate &&
      this.selectedDocument.DocDescription
    ) {
      this.documentService.updateDocument(this.selectedDocument!.DocId, this.selectedDocument!).subscribe( 
        (res) => {
          Swal.fire('Updated!', 'Document updated successfully', 'success');
          this.closeEditModal();
          this.loadDocuments(); // รีโหลดข้อมูลหลังแก้ไข
        },
        (err) => {
          console.error(err);
          Swal.fire('Error', 'Failed to update document', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please fill all fields.', 'error');
    }
  }
  confirmDelete(DocId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this document!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDocument(DocId);
      }
    });
  }
  
  
  deleteDocument(docId: number) {
    this.documentService.deleteDocument(docId).subscribe(
      () => {
        Swal.fire('Deleted!', 'Document has been deleted.', 'success');
        this.loadDocuments();
      },
      (error) => {
        console.error('Delete error:', error);
        Swal.fire('Error', 'Failed to delete document.', 'error');
      }
    );
  }
}