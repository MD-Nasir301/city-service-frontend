import apiClient from "@/lib/apiClient";
import {
  ICreateServiceRequestPayload,
  ServiceRequestQueryParams,
  IGetMyRequestsApiResponse,
  IGetSingleRequestApiResponse,
  RequestStatus,
  IServiceRequestUI,
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

export const getMyRequests = async (params?: ServiceRequestQueryParams) => {
  const queryParams = new URLSearchParams(params as any).toString();
  return await apiClient<IGetMyRequestsApiResponse>(
    `/service-request/my-requests${queryParams ? `?${queryParams}` : ""}`,
    {
      method: "GET",
    },
  );
};

export const getSingleServiceRequest = async (id: string) => {
  return await apiClient<IGetSingleRequestApiResponse>(
    `/service-request/${id}`,
    {
      method: "GET",
    },
  );
};

export const updateServiceRequest = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  return await apiClient<IGetSingleRequestApiResponse>(
    `/service-request/${id}`,
    {
      method: "PATCH",
      body: formData,
    },
  );
};

export const deleteServiceRequest = async (id: string) => {
  return await apiClient<{ success: boolean; message: string }>(
    `/service-request/${id}`,
    {
      method: "DELETE",
    },
  );
};

export const updateServiceRequestStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  return await apiClient<{ success: boolean; message: string }>(
    `/service-request/${id}/status`,
    {
      method: "PATCH",
      body: { status },
    }
  );
};



export const getStaffAssignedRequests = async () => {
  return await apiClient<{ success: boolean; data: IServiceRequestUI[] }>(
    `/service-request/my-assigned`, 
    {
      method: "GET",
    }
  );
};


export const updateRequestStatusByStaff = async ({
  requestId,
  status,
  remarks,
}: {
  requestId: string;
  status: RequestStatus;
  remarks?: string;
}) => {
  return await apiClient<{ success: boolean; message: string; data: any }>(
    `/service-requests/${requestId}/status`,
    {
      method: "PATCH",
      body: { status, remarks },
    }
  );
};

