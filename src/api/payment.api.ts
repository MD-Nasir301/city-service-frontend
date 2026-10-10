import apiClient from "@/lib/apiClient";

export const createCheckoutSession = async (serviceRequestId: string) => {
  return await apiClient<{
    success: boolean;
    message: string;
    data: { checkoutUrl?: string; url?: string; gatewayUrl?: string };
  }>(`/payments/create-checkout-session`, {
    method: "POST",
    body: { serviceRequestId },
  });
};

export const getPaymentById = async (paymentId: string) => {
  return await apiClient<{ success: boolean; data: any }>(
    `/payments/${paymentId}`,
    {
      method: "GET",
    },
  );
};

export const getMyPayments = async () => {
  return await apiClient<{ success: boolean; data: any[] }>(
    `/payments/my-payments`,
    {
      method: "GET",
    },
  );
};
