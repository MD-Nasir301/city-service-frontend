
import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "@/api/admin.api";

export const useGetAdminDashboardStats = () => {
  return useQuery({
    queryKey: ["ADMIN_DASHBOARD_STATS"],
    queryFn: getAdminDashboardStats,
  });
};