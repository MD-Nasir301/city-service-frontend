import { deleteUserStatus, getAllUsers, updateMyProfile, updateUserRole, updateUserStatus } from "@/api/user.api";
import { IUserQueryParams, UserResponse } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Get All Users Hook
export const useGetAllUsers = (params?: IUserQueryParams) => {
  return useQuery<UserResponse>({
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






export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateMyProfile(formData),
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["USER_PROFILE"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update profile.");
    },
  });
};