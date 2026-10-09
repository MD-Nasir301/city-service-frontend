"use client";

import Link from "next/link";
import { useGetStaffDashboardStats } from "@/hooks/staff.hook";
import { useGetStaffAssignedRequests } from "@/hooks/service-request.hook";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import AuthLoading from "@/components/auth/auth-loading";
import StaffAssignedRequestsTable from "@/components/modules/staff/staff-assigned-requests-table";

export default function StaffOverviewPage() {
  const { data: statsResponse, isLoading: isStatsLoading } =
    useGetStaffDashboardStats();
  const {
    data: requestsResponse,
    isLoading: isRequestsLoading,
    refetch: refetchRequests,
  } = useGetStaffAssignedRequests();

  if (isStatsLoading || isRequestsLoading) {
    return <AuthLoading label="Loading Staff Overview..." />;
  }

  const stats = statsResponse?.data || {
    totalAssignedRequests: 0,
    inProgressRequests: 0,
    resolvedRequests: 0,
    cancelledRequests: 0,
    rejectedRequests: 0,
  };

  const recentRequests = (requestsResponse?.data || []).slice(0, 5); // সাম্প্রতিক ৫টি রিকোয়েস্ট

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Staff Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500">
          Welcome back! Here is a summary of your assigned service requests and
          progress.
        </p>
      </div>

      {/* Stats Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Assigned */}
        <Card className="border-indigo-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total Assigned
              </p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {stats.totalAssignedRequests}
              </h3>
            </div>
            <div className="size-11 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <ClipboardList className="size-6" />
            </div>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="border-purple-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                In Progress
              </p>
              <h3 className="text-2xl font-bold text-purple-700 mt-1">
                {stats.inProgressRequests}
              </h3>
            </div>
            <div className="size-11 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <Clock className="size-6" />
            </div>
          </CardContent>
        </Card>

        {/* Resolved / Completed */}
        <Card className="border-emerald-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Resolved Tasks
              </p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-1">
                {stats.resolvedRequests}
              </h3>
            </div>
            <div className="size-11 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="size-6" />
            </div>
          </CardContent>
        </Card>

        {/* Rejected / Cancelled */}
        <Card className="border-rose-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Closed / Rejected
              </p>
              <h3 className="text-2xl font-bold text-rose-600 mt-1">
                {stats.cancelledRequests + stats.rejectedRequests}
              </h3>
            </div>
            <div className="size-11 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
              <XCircle className="size-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview Page Table Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">
            Recent Assigned Requests
          </h2>
          <Link href="/staff-dashboard/assigned-requests">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-indigo-600 hover:text-indigo-700"
            >
              View All <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <StaffAssignedRequestsTable
          requests={recentRequests}
          onSuccessUpdate={refetchRequests}
        />
      </div>
    </div>
  );
}