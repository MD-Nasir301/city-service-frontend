import { deleteUserStatus, getAllUsers, updateUserRole, updateUserStatus } from "@/api/user.api";
import { IUserQueryParams } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get All Users Hook
export const useGetAllUsers = (params?: IUserQueryParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
    staleTime: 1000 * 60 * 5,
  });
};

// Update Role Hook
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Update Status Hook
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Soft Delete Hook
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUserStatus(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};