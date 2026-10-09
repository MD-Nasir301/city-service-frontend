export type UserRole = "CITIZEN" | "STAFF" | "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  phoneNumber: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IUserQueryParams {
  role?: string;
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
}
