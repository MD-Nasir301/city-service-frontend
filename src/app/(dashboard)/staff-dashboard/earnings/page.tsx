"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { DollarSign, CheckCircle2, Briefcase, TrendingUp } from "lucide-react";
import { useGetStaffAssignedRequests } from "@/hooks/service-request.hook";

export default function StaffEarningsPage() {
  const { data: response, isLoading } = useGetStaffAssignedRequests();

  if (isLoading) {
    return <TableSkeleton />;
  }

  const requests = response?.data || [];
  console.log(requests)

  const paidTasks = requests.filter(
    (req: any) =>
      req.paymentStatus === "PAID" ||
      req.status === "RESOLVED" ||
      req.status === "COMPLETED"
  );

  const totalEarnings = paidTasks.reduce((acc: number, curr: any) => {
    const amount =
      typeof curr.amount === "number"
        ? curr.amount
        : typeof curr.service?.price === "number"
        ? curr.service.price
        : 0;
    return acc + amount;
  }, 0);

  const totalCompletedTasks = paidTasks.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Earnings & Analytics
        </h1>
        <p className="text-sm text-slate-500">
          Track your total service earnings, completed paid tasks, and financial history.
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Earnings Card */}
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Earnings
            </CardTitle>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              ৳{totalEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="size-3 text-emerald-500" /> From completed paid services
            </p>
          </CardContent>
        </Card>

        {/* Completed Paid Tasks Card */}
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Paid Tasks Completed
            </CardTitle>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <CheckCircle2 className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {totalCompletedTasks}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Successfully resolved & paid
            </p>
          </CardContent>
        </Card>

        {/* Total Assigned Tasks Card */}
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Assigned Tasks
            </CardTitle>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Briefcase className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">
              {requests.length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Overall assigned workload
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Breakdown Table */}
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b bg-slate-50/50 pb-4">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Paid Service History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Task Status</TableHead>
                <TableHead className="text-right">Amount Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paidTasks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-slate-500"
                  >
                    No paid earnings history found yet.
                  </TableCell>
                </TableRow>
              ) : (
                paidTasks.map((task: any) => (
                  <TableRow key={task.id}>
                    {/* Title */}
                    <TableCell className="font-semibold text-slate-800">
                      {task.title}
                    </TableCell>

                    {/* Safe Category Extraction */}
                    <TableCell className="text-xs text-slate-600">
                      {typeof task.category === "object"
                        ? task.category?.name || task.category?.title || "General Service"
                        : task.category || "General Service"}
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        Paid
                      </Badge>
                    </TableCell>

                    {/* Task Status */}
                    <TableCell>
                      <Badge variant="outline" className="text-slate-600">
                        {task.status}
                      </Badge>
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="text-right font-semibold text-emerald-600">
                      ৳
                      {typeof task.amount === "number"
                        ? task.amount
                        : typeof task.service?.price === "number"
                        ? task.service.price
                        : 500}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}