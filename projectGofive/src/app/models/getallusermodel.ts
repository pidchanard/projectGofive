export interface Usery {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    roleId: number;
    role: Role;
    userPermissions: UserPermission[];
  }
  
  export interface Role {
    roleId: number;
    roleName: string;
    users?: Usery[]; // ป้องกัน recursive loop, สามารถเลือกไม่ใช้ก็ได้
  }
  
  export interface UserPermission {
    userPermissionId: number;
    userId: number;
    permissionId: number;
    isReadable: boolean;
    isWritable: boolean;
    isDeletable: boolean;
    permission: Permission;
    user?: Usery; // ป้องกัน recursive loop
  }
  
  export interface Permission {
    permissionId: number;
    permissionName: string;
    userPermissions?: UserPermission[]; // ป้องกัน recursive loop
  }
  
  export interface UserRequest {
    orderBy: string;
    orderDirection: string;
    pageNumber: number;
    pageSize: number;
    search: string;
  }
  