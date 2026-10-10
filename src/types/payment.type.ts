
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export interface IPayment {
  id: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentMethod?: string | null;
  serviceRequestId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  serviceRequest?: {
    title: string;
    category?: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  data: IPayment[];
}