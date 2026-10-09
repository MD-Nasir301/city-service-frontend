import { assignStaff, availableStaff } from "@/api/staff.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAvailableStaffs = () => {
  return useQuery({
    queryKey: ["available-staff"],
    queryFn: () => availableStaff(),
  });
};

export const useAssignStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignStaff,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["my-requests"] });
      queryClient.invalidateQueries({ queryKey: ["service-requests"] });
      queryClient.invalidateQueries({ queryKey: ["available-staff"] });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: ["service-request", variables.id],
        });
      }
    },
  });
};
