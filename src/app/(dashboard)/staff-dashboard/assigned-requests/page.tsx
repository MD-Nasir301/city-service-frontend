
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
import { CheckCircle2, XCircle } from "lucide-react";
import AuthLoading from "@/components/auth/auth-loading";
import { toast } from "sonner";
import { RequestStatus } from "@/types/services-request.type";

export default function StaffAssignedRequestsPage() {
  const { data: requestsData, isLoading } = useGetStaffAssignedRequests();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateStaffRequestStatus();

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
      }
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
                <TableHead>Type</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                    No service requests assigned to you yet.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold text-slate-800">
                      {item.title}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {item.citizen?.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.isPaid ? "default" : "outline"}>
                        {item.isPaid ? "Paid" : "Free"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.status === "ASSIGNED" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-emerald-600 hover:bg-emerald-700 h-8 text-xs"
                            onClick={() => handleStatusUpdate(item.id, "ACCEPTED" as ServiceRequestStatus)}
                            disabled={isUpdating}
                          >
                            <CheckCircle2 className="size-3.5 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 text-xs"
                            onClick={() => handleStatusUpdate(item.id, "REJECTED" as ServiceRequestStatus)}
                            disabled={isUpdating}
                          >
                            <XCircle className="size-3.5 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">
                          No Pending Action
                        </span>
                      )}
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