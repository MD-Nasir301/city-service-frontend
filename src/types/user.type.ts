export type UserRole = "CITIZEN" | "STAFF" | "ADMIN" | "SUPER_ADMIN";

export interface UserContext {
  user?: {
    name: string;
    email: string;
    role: UserRole;
    imageUrl?: string;
  } | null;
}
