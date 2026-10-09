import apiClient from "@/lib/apiClient";
import { ApiResponse, AvailableStaff } from "@/types/staff.type";

export const availableStaff = async () => {
  return await apiClient<ApiResponse<AvailableStaff[]>>(
    `/staff/available-staff`,
  );
};

export const assignStaff = async ({
  id,
  assignedStaffId,
}: {
  id: string;
  assignedStaffId: string;
}) => {
  return await apiClient<{ success: boolean; message: string }>(
    `/service-request/${id}/assign`,
    {
      method: "PATCH",
      body: { assignedStaffId, status: "ASSIGNED" },
    },
  );
};

