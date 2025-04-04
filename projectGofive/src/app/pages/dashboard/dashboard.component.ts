import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Usery } from '../../models/getallusermodel';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: Usery[] = [];
  newUser: any = {};
  isModalOpen = false;
  editMode = false;
  editRoleOnly = false; // ✅ <--- เพิ่ม flag นี้
  Math = Math;
  itemsPerPage = 6;
  currentPage = 1;
  totalItems = 0;
  paginatedUsers: Usery[] = [];
  searchKeyword: string = '';
  filteredUsers: Usery[] = [];
  

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.loadUsers();
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }
  
  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.totalItems) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }
  
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editMode = false;
    this.editRoleOnly = false; // ✅ reset ด้วย
    this.newUser = {};
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data.$values ?? data ?? [];
        this.filteredUsers = [...this.users]; // 🔥 กำหนดให้ตรงตอนโหลด
        this.totalItems = this.filteredUsers.length;
        this.updatePaginatedUsers();
      },
      error: (err) => {
        console.error('❌ Error loading users:', err);
      }
    });
  }
  

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }
  
  

  cycleRole(user: any) {
    const roles = ["Super Admin", "Admin", "HR Admin", "Employee"];
    const roleMap: { [key: string]: number } = {
      "Super Admin": 1,
      "HR Admin": 2,
      "Admin": 3,
      "Employee": 4
    };
  
    const currentIndex = roles.indexOf(user.role?.roleName);
    const nextRole = roles[(currentIndex + 1) % roles.length];
    const newRoleId = roleMap[nextRole];
  
    // เตรียมข้อมูลเดิมของ user แต่เปลี่ยน roleId ใหม่
    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      roleId: newRoleId,
      permissions: user.userPermissions?.$values?.map((p: any) => ({
        permissionId: p.permission.permissionId,
        isReadable: p.isReadable,
        isWritable: p.isWritable,
        isDeletable: p.isDeletable
      })) ?? []
    };
  
    this.userService.updateUser(user.userId, updatedUser).subscribe({
      next: () => {
        // อัปเดต roleName บน UI ให้ตรงด้วย
        user.role.roleName = nextRole;
        user.role.roleId = newRoleId;
        Swal.fire('Updated!', `Role changed to ${nextRole}`, 'success');
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to update role', 'error');
      }
    });
  }

  addUser() {
    if (!this.newUser.roleId) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a role.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    // ✅ ถ้าเป็นการแก้ Role เท่านั้น
    if (this.editMode && this.editRoleOnly) {
      this.userService.updateUserRole(this.newUser.userId, {
        roleId: this.newUser.roleId
      }).subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
          Swal.fire('Updated!', 'User role updated successfully.', 'success');
        },
        error: () => {
          Swal.fire('Error!', 'Failed to update role.', 'error');
        }
      });
      return;
    }

    // ✅ ตรวจรหัสผ่านถ้าเพิ่มใหม่หรืออัปเดตเต็ม
    if (!this.editMode && this.newUser.password !== this.newUser.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Password and Confirm Password do not match.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
      return;
    }

    const permissions = this.getPermissionsFromModal();

    const userData = {
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      email: this.newUser.email,
      phone: this.newUser.phone,
      username: this.newUser.username,
      password: this.newUser.password,
      roleId: this.newUser.roleId,
      permissions: permissions
    };

    if (this.editMode) {
      // ✅ UPDATE USER (เต็ม)
      this.userService.updateUser(this.newUser.userId, userData).subscribe({
        next: (res) => {
          this.loadUsers();
          this.closeModal();
          Swal.fire('Updated!', 'User updated successfully.', 'success');
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error!', 'Failed to update user.', 'error');
        }
      });
    } else {
      // ✅ ADD USER
      this.userService.addUser(userData).subscribe({
        next: (res) => {
          this.loadUsers();
          this.closeModal();
          Swal.fire('Success!', 'User has been added successfully.', 'success');
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error!', 'There was an error while adding the user.', 'error');
        }
      });
    }
  }

  editUser(userId: number): void {
    const selectedUser = this.users.find(u => u.userId === userId);
    if (selectedUser) {
      this.newUser = {
        ...selectedUser,
        confirmPassword: selectedUser.password
      };
      this.editMode = true;
      this.editRoleOnly = false;
      this.openModal();
    }
  }

  editUserRole(userId: number): void {
    const selectedUser = this.users.find(u => u.userId === userId);
    if (selectedUser) {
      this.newUser = {
        userId: selectedUser.userId,
        roleId: selectedUser.role?.roleId
      };
      this.editMode = true;
      this.editRoleOnly = true; // ✅ ตั้งค่าตรงนี้เพื่อบอกว่าอัปเดต Role อย่างเดียว
      this.openModal();
    }
  }

  deleteUser(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.users = this.users.filter(usery => usery.userId !== userId);
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'Failed to delete user.', 'error');
          }
        });
      }
    });
  }

  getPermissionsFromModal(): any[] {
    const permissions: any[] = [];
    const modules = ['Super Admin', 'Admin', 'Employee', 'HR Admin'];

    modules.forEach((_, index) => {
      const isReadable = document.getElementById(`read-${index}`) as HTMLInputElement;
      const isWritable = document.getElementById(`write-${index}`) as HTMLInputElement;
      const isDeletable = document.getElementById(`delete-${index}`) as HTMLInputElement;

      permissions.push({
        permissionId: index + 1,
        isReadable: isReadable?.checked || false,
        isWritable: isWritable?.checked || false,
        isDeletable: isDeletable?.checked || false
      });
    });

    return permissions;
  }

  onSearchChange(): void {
    this.userService.searchUsers(this.searchKeyword).subscribe({
      next: (users) => {
        this.users = users;
        this.totalItems = users.length;
        this.updatePaginatedUsers();
      },
      error: (err) => {
        console.error('❌ Search failed:', err);
      }
    });
  }
  
  saveCurrentSearch(): void {
    const request = {
      keyword: this.searchKeyword,
      savedBy: 1 // 🔧 mock user ID ที่นี่
    };
  
    this.userService.saveSearch(request).subscribe({
      next: () => {
        Swal.fire('✅ Saved!', 'Your search has been saved.', 'success');
      },
      error: () => {
        Swal.fire('❌ Error', 'Failed to save search.', 'error');
      }
    });
  }
  
  applyFilter(roleId: string): void {
    const parsedRoleId = parseInt(roleId, 10);
    
    // ถ้าเป็น NaN (เช่น "All Roles") ให้ส่ง null ไปเลย
    const request = {
      roleId: isNaN(parsedRoleId) ? null : parsedRoleId
    };
  
    this.userService.filterUsers(request).subscribe({
      next: (users: Usery[]) => {
        this.users = users;
        this.totalItems = users.length;
        this.updatePaginatedUsers();
      },
      error: (err) => {
        console.error('❌ Filter failed:', err);
      }
    });
  }
  
}