import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createServiceRequest,
  deleteServiceRequest,
  getAllServiceRequests,
  getMyRequests,
  getSingleServiceRequest,
  updateServiceRequest,
} from "@/api/service-request.api";
import {
  ICreateServiceRequestPayload,
  ServiceRequestQueryParams,
} from "@/types/services-request.type";

// All Public Service Requests
export const useGetAllServiceRequests = (
  params?: ServiceRequestQueryParams,
) => {
  return useQuery({
    queryKey: ["service-requests", params],
    queryFn: () => getAllServiceRequests(params),
    staleTime: 1000 * 60 * 5,
  });
};

//  Create Service Request
export const useCreateServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateServiceRequestPayload) =>
      createServiceRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
    },
  });
};

//  Get My Requests
export const useGetMyRequests = (params?: ServiceRequestQueryParams) => {
  return useQuery({
    queryKey: ["my-requests", params],
    queryFn: () => getMyRequests(params),
  });
};

// Get Single Request
export const useGetSingleServiceRequest = (id: string) => {
  return useQuery({
    queryKey: ["service-request", id],
    queryFn: () => getSingleServiceRequest(id),
    enabled: !!id,
  });
};

export const useUpdateServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateServiceRequest,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      if (typeof variables === "object" && "id" in variables) {
        queryClient.invalidateQueries({
          queryKey: ["service-request", (variables as any).id],
        });
      }
    },
  });
};

// Delete / Cancel Service Request
export const useDeleteServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "my-requests",
      });

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "service-requests",
      });
    },
  });
};
