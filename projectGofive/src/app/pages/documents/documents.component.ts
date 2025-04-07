import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../flowbite.service';
import { DocumentService } from './../../services/document.service';
import { DocumentRequest, MyDocuments, MyDocumentsy } from '../../models/document.model'; // นำเข้า Document model
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
  paginatedDoc: MyDocumentsy[] = [];
  documents: MyDocumentsy[] = [];
  Math = Math;
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  searchKeyword: string = '';
  searchResults: MyDocumentsy[] = [];
  isSearchResultsArray: boolean = false;
  allDoc: MyDocumentsy[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  noSearchResults: boolean = false;

  document: MyDocuments = {
    Doc_name: '',
    DocDate: '',    
    DocDescription: '' 
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
  onSearchChange() {
    const keyword = this.searchKeyword.trim();
  
    if (!keyword) {
      this.noSearchResults = false;
      this.loadDocuments(); // ถ้าไม่กรอก keyword แสดงทั้งหมด
      return;
    }
  
    this.documentService.searchDocuments(keyword).subscribe(
      (response: any) => {
        this.documents = response.$values ?? response ?? [];
        this.noSearchResults = this.documents.length === 0;
        this.totalItems = this.documents.length;
        this.currentPage = 1;
        this.updatePaginatedDocuments(); // ✅ แสดงผลแบบแบ่งหน้า
      },
      (error) => {
        console.error('Error fetching document:', error);
      }
    );
  }
      onSortChange(order: 'asc' | 'desc') {
        this.sortOrder = order;
        this.loadDocuments(order);
      }

  searchDocuments(keyword: string) {
    console.log('Searching for:', keyword);  // ตรวจสอบคำค้นหาที่ส่งไป
    this.documentService.searchDocuments(keyword).subscribe(
      (response: any) => {
        console.log('API response:', response);  // ตรวจสอบข้อมูลที่ได้รับจาก API
        this.searchResults = response.$values?.map((doc: any) => ({
          docId: doc.docId,
          doc_name: doc.doc_name,
          docDate: doc.docDate,
          docDescription: doc.docDescription,
        })) || [];  
  
        this.isSearchResultsArray = Array.isArray(this.searchResults);  
      },
      (error) => {
        console.error('Error fetching document:', error);
      }
    );
  }
  
  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePaginatedDocuments();
  }

  // Go to previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedDocuments();
    }
  }

  // Go to next page
  nextPage(): void {
  if (this.currentPage * this.itemsPerPage < this.totalItems) {
    this.currentPage++;
    this.updatePaginatedDocuments();
  }
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
  loadDocuments(order: 'asc' | 'desc' = 'desc'): void {
    this.documentService.getAllDocuments(order).subscribe({
      next: (data: any) => {
        this.documents = data.$values ?? data ?? [];
        this.totalItems = this.documents.length;
        this.updatePaginatedDocuments();
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }
  filterByMonth(month: string): void {
    this.documentService.getAllDocuments().subscribe({
      next: (data: any) => {
        const documents = data.$values ?? data ?? [];
  
        // Filter เฉพาะเดือนที่เลือกจาก DocDate
        this.documents = documents.filter((doc: any) => {
          const docMonth = new Date(doc.docDate).getMonth() + 1;
          const formattedMonth = docMonth < 10 ? '0' + docMonth : '' + docMonth;
          return formattedMonth === month;
        });
  
        this.totalItems = this.documents.length;
        this.currentPage = 1;
        this.updatePaginatedDocuments();
      },
      error: (err) => {
        console.error('Filter by month error:', err);
      }
    });
  }
  
    updatePaginatedDocuments(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedDoc = this.documents.slice(startIndex, endIndex); // ✅ ใช้จาก documents
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