"use client";

import { useGetStaffAssignedRequests } from "@/hooks/service-request.hook";
import AuthLoading from "@/components/auth/auth-loading";
import StaffAssignedRequestsTable from "@/components/modules/staff/staff-assigned-requests-table";

export default function StaffAssignedRequestsPage() {
  const { data: requestsData, isLoading, refetch } = useGetStaffAssignedRequests();

  if (isLoading) {
    return <AuthLoading label="Loading Assigned Requests..." />;
  }

  const requests = requestsData?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Assigned Requests
        </h1>
        <p className="text-sm text-slate-500">
          Manage and update the progress of service requests assigned to you.
        </p>
      </div>

      <StaffAssignedRequestsTable
        requests={requests}
        onSuccessUpdate={refetch}
      />
    </div>
  );
}