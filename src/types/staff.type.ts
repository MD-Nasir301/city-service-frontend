export interface StaffUser {
  name: string;
  email: string;
  imageUrl: string | null;
}

export interface AvailableStaff {
  id: string;
  userId: string;
  department: string;
  designation: string;
  qualification: string;
  isAvailable: boolean;
  joiningDate: string;
  createdAt: string;
  updatedAt: string;
  user: StaffUser;
}


export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}