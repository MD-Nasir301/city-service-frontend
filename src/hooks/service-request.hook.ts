import { useQuery } from "@tanstack/react-query";
import { getAllServiceRequests } from "@/api/service-request.api";
import { ServiceRequestQueryParams } from "@/types/services-request.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServiceRequest } from "@/api/service-request.api";
import { ICreateServiceRequestPayload } from "@/types/services-request.type";

export const useGetAllServiceRequests = (
  params?: ServiceRequestQueryParams,
) => {
  return useQuery({
    queryKey: ["service-requests", params],
    queryFn: () => getAllServiceRequests(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateServiceRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateServiceRequestPayload) =>
      createServiceRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
    },
  });
};
