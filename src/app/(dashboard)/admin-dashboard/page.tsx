"use client";

import { useGetAdminDashboardStats } from "@/hooks/admin.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  FolderTree,
  ShieldAlert,
  PieChart as PieIcon,
  BarChart3,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { OverviewSkeleton } from "@/components/dashboard/overview-skeleton";

export default function AdminOverviewPage() {
  const { data, isLoading, isError } = useGetAdminDashboardStats();

  if (isLoading) {
    return  <OverviewSkeleton />;;
  }

  if (isError || !data?.data) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        Failed to load dashboard statistics.
      </div>
    );
  }

  const stats = data.data;

  const requestStatusChartData = [
    { name: "Pending", value: stats.serviceRequests.pendingRequests, color: "#f59e0b" },
    { name: "In Progress", value: stats.serviceRequests.inProgressRequests, color: "#3b82f6" },
    { name: "Resolved", value: stats.serviceRequests.resolvedRequests, color: "#10b981" },
    { name: "Cancelled", value: stats.serviceRequests.cancelledRequests, color: "#6b7280" },
    { name: "Rejected", value: stats.serviceRequests.rejectedRequests, color: "#ef4444" },
  ].filter((item) => item.value > 0); 


  const userRolesChartData = [
    { role: "Citizens", count: stats.users.totalCitizens },
    { role: "Staff", count: stats.users.totalStaff },
    { role: "Admins", count: stats.users.totalAdmins },
    { role: "Super Admins", count: stats.users.totalSupperAdmins },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Admin Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500">
          System summary and real-time statistics.
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Requests
            </CardTitle>
            <FileText className="size-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.serviceRequests.totalRequests}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              All service submissions
            </p>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pending Requests
            </CardTitle>
            <Clock className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {stats.serviceRequests.pendingRequests}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Awaiting staff assignment
            </p>
          </CardContent>
        </Card>

        {/* Resolved Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Resolved Requests
            </CardTitle>
            <CheckCircle2 className="size-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {stats.serviceRequests.resolvedRequests}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        {/* Total Categories */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Categories
            </CardTitle>
            <FolderTree className="size-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.categories.totalCategories}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Available service types
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts Section (1 Donut + 1 Bar Chart) */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Chart 1: Donut Chart for Request Status */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <PieIcon className="size-5 text-slate-600" />
              Request Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requestStatusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {requestStatusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2: Bar Chart for User Roles */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="size-5 text-slate-600" />
              User Demographics by Role
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userRolesChartData}>
                  <XAxis dataKey="role" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" name="Users" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Users & Breakdown Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* User Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="size-5 text-slate-600" />
              User Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-slate-600">Total Users</span>
              <span className="font-semibold">{stats.users.totalUsers}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-slate-600">Citizens</span>
              <span className="font-semibold text-blue-600">
                {stats.users.totalCitizens}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-slate-600">Staff Members</span>
              <span className="font-semibold text-indigo-600">
                {stats.users.totalStaff}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-slate-600">Admins</span>
              <span className="font-semibold text-purple-600">
                {stats.users.totalAdmins}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Super Admins</span>
              <span className="font-semibold text-purple-600">
                {stats.users.totalSupperAdmins}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Request Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldAlert className="size-5 text-slate-600" />
              Request Status Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-slate-600">In Progress</span>
              <span className="font-semibold text-blue-600">
                {stats.serviceRequests.inProgressRequests}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm text-slate-600">Cancelled</span>
              <span className="font-semibold text-slate-500">
                {stats.serviceRequests.cancelledRequests}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Rejected</span>
              <span className="font-semibold text-rose-600">
                {stats.serviceRequests.rejectedRequests}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}