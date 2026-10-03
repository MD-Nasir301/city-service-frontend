export type UserRole = "CITIZEN" | "STAFF" | "ADMIN" | "SUPER_ADMIN";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}