"use client";

import Link from "next/link";
import { useGetMyRequests } from "@/hooks/service-request.hook";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import AuthLoading from "@/components/auth/auth-loading";
import CitizenRequestsTable from "@/components/modules/citizen/citizen-requests-table";

export default function CitizenOverviewPage() {
  const { data: requestsData, isLoading } = useGetMyRequests();

  if (isLoading) {
    return <AuthLoading label="Loading Citizen Dashboard..." />;
  }

  const requests = requestsData?.data || [];

  // Client-side Stats Calculation
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r: any) =>
    ["PENDING", "ACCEPTED", "ASSIGNED"].includes(r.status)
  ).length;
  const inProgressRequests = requests.filter(
    (r: any) => r.status === "IN_PROGRESS"
  ).length;
  const resolvedRequests = requests.filter(
    (r: any) => r.status === "RESOLVED"
  ).length;

  const recentRequests = requests.slice(0, 5); // সাম্প্রতিক ৫টি

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white p-6 rounded-2xl shadow-md">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to Citizen Portal
          </h1>
          <p className="text-sm text-indigo-100 mt-1">
            Track your submitted requests, complete payments, or report new civic issues.
          </p>
        </div>
        <Link href="/citizen-dashboard/create-request">
          <Button className="bg-white text-indigo-900 hover:bg-indigo-50 font-semibold shadow-sm">
            <PlusCircle className="size-4 mr-2" />
            New Service Request
          </Button>
        </Link>
      </div>

      {/* Stats Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Submitted */}
        <Card className="border-indigo-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Total Requests
              </p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {totalRequests}
              </h3>
            </div>
            <div className="size-11 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <FileText className="size-6" />
            </div>
          </CardContent>
        </Card>

        {/* Pending / Action Required */}
        <Card className="border-amber-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Pending / Action
              </p>
              <h3 className="text-2xl font-bold text-amber-600 mt-1">
                {pendingRequests}
              </h3>
            </div>
            <div className="size-11 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
              <Clock className="size-6" />
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
                {inProgressRequests}
              </h3>
            </div>
            <div className="size-11 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <CreditCard className="size-6" />
            </div>
          </CardContent>
        </Card>

        {/* Resolved Services */}
        <Card className="border-emerald-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Resolved Services
              </p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-1">
                {resolvedRequests}
              </h3>
            </div>
            <div className="size-11 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="size-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests Table Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800">
            Recent Service Requests
          </h2>
          <Link href="/citizen-dashboard/my-requests">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-indigo-600 hover:text-indigo-700"
            >
              View All <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <CitizenRequestsTable requests={recentRequests} />
      </div>
    </div>
  );
}