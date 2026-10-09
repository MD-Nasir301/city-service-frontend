import {
  CreateServiceRequestInput,
  UpdateServiceRequestInput,
} from "@/validation/service.validation";

export type RequestStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CANCELLED"
  | "REJECTED";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type CategoryType = "FREE" | "PAID";

// Exporting Schema Input Payloads
export type ICreateServiceRequestPayload = CreateServiceRequestInput;
export type IUpdateServiceRequestPayload = UpdateServiceRequestInput;

// Query Params for API Requests
export interface ServiceRequestQueryParams {
  search?: string;
  status?: RequestStatus;
  priority?: Priority;
  type?: CategoryType;
  categoryId?: string;
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IServiceRequestMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IServiceRequestUI {
  id: string;
  title: string;
  description: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  images: string[];
  imagePublicIds?: string[];
  quantity: number;
  totalAmount: number;
  isPaid: boolean;
  isDeleted?: boolean;
  status: RequestStatus;
  priority: Priority;
  preferredStartDate?: string | null;
  preferredEndDate?: string | null;
  citizenId?: string;
  categoryId?: string;
  assignedStaffId?: string | null;
  createdAt: string;
  updatedAt?: string;

  category?: {
    id: string;
    name: string;
    type: CategoryType;
    description?: string | null;
    isPaid?: boolean;
  } | null;

  citizen?: {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string | null;
    imageUrl?: string | null;
  } | null;

  assignedStaff?: {
    id: string;
    name?: string;
    email?: string;
    user?: {
      name: string;
      email: string;
    };
  } | null;

  comments?: Array<{
    id: string;
    text: string;
    createdAt?: string;
  }>;

  payment?: {
    id: string;
    transactionId?: string;
    amount: number;
    status: string;
  } | null;
}

export interface IGetSingleRequestApiResponse {
  success: boolean;
  message: string;
  data: IServiceRequestUI;
}

export interface IGetMyRequestsApiResponse {
  success: boolean;
  message: string;
  data: IServiceRequestUI[];
  meta?: IServiceRequestMeta;
}