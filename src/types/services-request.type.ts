
import { CreateServiceRequestInput } from "@/validation/service.validation";
import { UpdateServiceRequestInput } from "@/validation/service.validation";

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
  } | null;

  citizen?: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
  } | null;

  assignedStaff?: {
    id: string;
    name: string;
  } | null;

  comments?: Array<{
    id: string;
    text: string;
  }>;
}

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

export type ICreateServiceRequestPayload = CreateServiceRequestInput;
export type IUpdateServiceRequestPayload = UpdateServiceRequestInput;

export interface IServiceRequestMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IGetMyRequestsApiResponse {
  success: boolean;
  message: string;
  data: IServiceRequestUI[];
  meta?: IServiceRequestMeta;
}

export interface IGetSingleRequestApiResponse {
  success: boolean;
  message: string;
  data: IServiceRequestUI;
}