import {
  createCheckoutSession,
  getPaymentById,
  getMyPayments,
} from "@/api/payment.api";
import { useMutation, useQuery } from "@tanstack/react-query";

// 1. Create Checkout Session Mutation Hook
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (serviceRequestId: string) =>
      createCheckoutSession(serviceRequestId),
  });
};

// 2. Get Payment By ID Hook
export const useGetPaymentById = (paymentId: string) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => getPaymentById(paymentId),
    enabled: !!paymentId,
  });
};

// 3. Get My Payments Hook
export const useGetMyPayments = () => {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
};