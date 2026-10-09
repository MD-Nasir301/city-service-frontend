import apiClient from "@/lib/apiClient";

export const getAdminDashboardStats = async () => {
  return await apiClient("/admin/dashboard-stats", {
    method: "GET",
  });
};
