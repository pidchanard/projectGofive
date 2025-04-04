import { Usery } from "./getallusermodel";

  export interface Role {
    roleId: string;
    roleName?: string;
  }
  
  export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    roleId: number
    username: string
    password: string
    permissions: Permission[]
  }
  
  export interface Permission {
    permissionId: number
    isReadable: boolean
    isWritable: boolean
    isDeletable: boolean
  }
  
  interface PaginatedUserResponse {
    items: Usery[];
    totalItems: number;
  }
  