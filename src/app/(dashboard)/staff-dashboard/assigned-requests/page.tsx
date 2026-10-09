"use client";

import {
  useGetStaffAssignedRequests,
  useUpdateStaffRequestStatus,
} from "@/hooks/service-request.hook";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, PlayCircle, CheckCheck } from "lucide-react";
import AuthLoading from "@/components/auth/auth-loading";
import { toast } from "sonner";
import { RequestStatus } from "@/types/services-request.type";
import { useRouter } from "next/navigation";

export default function StaffAssignedRequestsPage() {
  const { data: requestsData, isLoading } = useGetStaffAssignedRequests();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateStaffRequestStatus();
  const router = useRouter();

  if (isLoading) {
    return <AuthLoading label="Loading Assigned Requests..." />;
  }

  const requests = requestsData?.data || [];

  const handleStatusUpdate = (requestId: string, status: RequestStatus) => {
    updateStatus(
      { requestId, status },
      {
        onSuccess: () => {
          toast.success(`Request status updated to ${status}`);
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to update status.");
        },
      },
    );
  };

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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Title</TableHead>
                <TableHead>Citizen</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Request Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-slate-500"
                  >
                    No service requests assigned to you yet.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((item: any) => {
                  const isCategoryPaid =
                    item.category?.isPaid ??
                    (item.category?.type === "PAID" ||
                      (item.totalAmount && item.totalAmount > 0));

                  const isPaymentDone = item.isPaid;

                  return (
                    <TableRow
                      key={item.id}
                      
                    >
                      <TableCell onClick={() => router.push(`/requests/${item.id}`)} className="hover:text-blue-500 cursor-pointer font-semibold text-slate-800">
                        {item.title}
                      </TableCell>

                      <TableCell className="text-xs text-slate-600">
                        {item.citizen?.name || item.user?.name || "N/A"}
                      </TableCell>

                      {/* Service Type */}
                      <TableCell>
                        <Badge
                          variant={isCategoryPaid ? "default" : "secondary"}
                        >
                          {isCategoryPaid
                            ? `Paid (৳${item.totalAmount || item.amount || 0})`
                            : "Free Service"}
                        </Badge>
                      </TableCell>

                      {/* Payment Status Column */}
                      <TableCell>
                        {isCategoryPaid ? (
                          isPaymentDone ? (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                              Paid (${item.totalAmount || item.amount || 0})
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-600 border-amber-200"
                            >
                              Unpaid
                            </Badge>
                          )
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">
                            Not Required
                          </span>
                        )}
                      </TableCell>

                      {/* Request Status */}
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {item.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        {/* 1. ASSIGNED -> Accept / Reject */}
                        {item.status === "ASSIGNED" && (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 h-8 text-xs"
                              onClick={() =>
                                handleStatusUpdate(item.id, "ACCEPTED")
                              }
                              disabled={isUpdating}
                            >
                              <CheckCircle2 className="size-3.5 mr-1" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 text-xs"
                              onClick={() =>
                                handleStatusUpdate(item.id, "REJECTED")
                              }
                              disabled={isUpdating}
                            >
                              <XCircle className="size-3.5 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}

                        {/* 2. ACCEPTED -> Start Work (পেইড সার্ভিস হলে পেমেন্ট ছাড়া বাটন ডিসেবল থাকবে) */}
                        {item.status === "ACCEPTED" && (
                          <div className="flex flex-col items-end gap-1">
                            <Button
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700 h-8 text-xs"
                              onClick={() =>
                                handleStatusUpdate(item.id, "IN_PROGRESS")
                              }
                              disabled={
                                isUpdating || (isCategoryPaid && !isPaymentDone)
                              }
                            >
                              <PlayCircle className="size-3.5 mr-1" />
                              Start Work
                            </Button>
                            {isCategoryPaid && !isPaymentDone && (
                              <span className="text-[10px] text-rose-500 font-medium">
                                Awaiting Payment
                              </span>
                            )}
                          </div>
                        )}

                        {/* 3. IN_PROGRESS -> Mark Resolved */}
                        {item.status === "IN_PROGRESS" && (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 h-8 text-xs ml-auto"
                            onClick={() =>
                              handleStatusUpdate(item.id, "RESOLVED")
                            }
                            disabled={isUpdating}
                          >
                            <CheckCheck className="size-3.5 mr-1" />
                            Mark Resolved
                          </Button>
                        )}

                        {/* Completed / Cancelled / Rejected */}
                        {["RESOLVED", "REJECTED", "CANCELLED"].includes(
                          item.status,
                        ) && (
                          <span className="text-xs text-slate-400 font-medium">
                            No Pending Action
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
