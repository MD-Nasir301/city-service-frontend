"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import AuthLoading from "@/components/auth/auth-loading";
import { useGetMyRequests } from "@/hooks/service-request.hook";
import CitizenRequestsTable from "@/components/modules/citizen/citizen-requests-table";

export default function PaymentAndTrakingPage() {
  const [statusFilter, setStatusFilter] = useState<string | null>("ALL");
  const { data: requestsData, isLoading } = useGetMyRequests();

  if (isLoading) {
    return <AuthLoading label="Loading Your Requests..." />;
  }

  const rawRequests = requestsData?.data || [];

  const requests =
    statusFilter === "ALL"
      ? rawRequests
      : rawRequests.filter((item: any) => item.status === statusFilter);

  return (
    <div className="space-y-6">
      {/* Header & Status Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            My Service Requests
          </h1>
          <p className="text-sm text-slate-500">
            Track request status and complete Stripe payment for accepted requests.
          </p>
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-slate-500" />
          <span className="text-sm text-slate-600 font-medium">Filter:</span>
          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val)}
          >
            <SelectTrigger className="w-[160px] h-9 text-xs">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Requests</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="ASSIGNED">Assigned</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <CitizenRequestsTable requests={requests} />
    </div>
  );
}