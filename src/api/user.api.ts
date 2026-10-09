import apiClient from "@/lib/apiClient";
import { IUserQueryParams, IUser, UserRole, UserStatus } from "@/types/user.type";

//  Fatch all users
export const getAllUsers = async (params?: IUserQueryParams) => {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }

  return await apiClient<{ success: boolean; data: IUser[] }>(
    `/admin/users?${queryParams.toString()}`,
    { method: "GET" }
  );
};

// Update users role 
export const updateUserRole = async ({
  userId,
  role,
}: {
  userId: string;
  role: UserRole;
}) => {
  return await apiClient<{ success: boolean; message: string }>(
    `/admin/users/${userId}/role`,
    {
      method: "PATCH",
      body: { role },
    }
  );
};

// Update users status
export const updateUserStatus = async ({
  userId,
  status,
}: {
  userId: string;
  status: UserStatus;
}) => {
  return await apiClient<{ success: boolean; message: string }>(
    `/admin/users/${userId}/status`,
    {
      method: "PATCH",
      body: { status },
    }
  );
};