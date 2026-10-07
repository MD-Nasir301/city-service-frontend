import apiClient from "@/lib/apiClient";
import {
  ICreateServiceRequestPayload,
  ServiceRequestQueryParams,
} from "@/types/services-request.type";

export const getAllServiceRequests = async (
  params?: ServiceRequestQueryParams,
) => {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        queryParams.append(key, value);
      }
    });
  }

  return await apiClient(`/service-request?${queryParams.toString()}`, {
    method: "GET",
  });
};

// Create Service Request API Function
export const createServiceRequest = async (
  payload: ICreateServiceRequestPayload,
) => {
  return await apiClient("/service-request", {
    method: "POST",
    body: payload,
  });
};
