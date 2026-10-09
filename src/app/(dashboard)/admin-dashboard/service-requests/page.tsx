"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetAllServiceRequests,
  useUpdateServiceRequestStatus,
} from "@/hooks/service-request.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Lock } from "lucide-react";
import AuthLoading from "@/components/auth/auth-loading";
import { toast } from "sonner";
import { useGetAvailableStaffs, useAssignStaff } from "@/hooks/staff.hook";
import { RequestStatus } from "@/types/services-request.type";

// Status Badge Color Helper
const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-600 border-amber-200"
        >
          Pending
        </Badge>
      );
    case "ASSIGNED":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-600 border-blue-200"
        >
          Assigned
        </Badge>
      );
    case "ACCEPTED":
      return (
        <Badge
          variant="outline"
          className="bg-indigo-50 text-indigo-600 border-indigo-200"
        >
          Accepted
        </Badge>
      );
    case "IN_PROGRESS":
      return (
        <Badge
          variant="outline"
          className="bg-purple-50 text-purple-600 border-purple-200"
        >
          In Progress
        </Badge>
      );
    case "RESOLVED":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-600 border-emerald-200"
        >
          Resolved
        </Badge>
      );
    case "CANCELLED":
      return (
        <Badge
          variant="outline"
          className="bg-slate-100 text-slate-600 border-slate-200"
        >
          Cancelled
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="outline"
          className="bg-rose-50 text-rose-600 border-rose-200"
        >
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function AdminServiceRequestsPage() {
  const router = useRouter();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<
    RequestStatus | "ALL"
  >("ALL");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const {
    data: requestsData,
    isLoading,
    refetch,
  } = useGetAllServiceRequests({
    status:
      selectedStatusFilter === "ALL"
        ? undefined
        : (selectedStatusFilter as RequestStatus),
  });

  const { data: staffData } = useGetAvailableStaffs();

  // Mutations
  const { mutate: assignStaff, isPending: isAssigning } = useAssignStaff();
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateServiceRequestStatus();

  if (isLoading) {
    return <AuthLoading label="Loading Service Requests..." />;
  }

  const rawRequests = requestsData?.data || [];
  const staffList = staffData?.data || [];

  // Client-side backup filtering
  const requests =
    selectedStatusFilter === "ALL"
      ? rawRequests
      : rawRequests.filter((req: any) => req.status === selectedStatusFilter);

  // Department string handle
  const groupedStaff = staffList.reduce((acc: any, staff: any) => {
    const deptName =
      typeof staff.department === "string"
        ? staff.department
        : staff.department?.name || "GENERAL";
    if (!acc[deptName]) acc[deptName] = [];
    acc[deptName].push(staff);
    return acc;
  }, {});

  // Handle assignStaff
  const handleAssignStaff = (requestId: string, selectedUserId: string) => {
    assignStaff(
      { id: requestId, assignedStaffId: selectedUserId },
      {
        onSuccess: () => {
          toast.success("Staff assigned successfully!");
          refetch();
          if (selectedRequest) setIsDetailOpen(false);
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to assign staff.");
        },
      },
    );
  };

  // Handle updateStatus
  const handleStatusChange = (requestId: string, newStatus: string) => {
    updateStatus(
      { id: requestId, status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Status updated to ${newStatus}`);
          refetch();
          if (selectedRequest) setIsDetailOpen(false);
        },
        onError: (err: any) => {
          toast.error(err?.message || "Failed to update status.");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Service Requests Management
          </h1>
          <p className="text-sm text-slate-500">
            Monitor, assign staff, and update request statuses.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 font-medium">
            Filter Status:
          </span>
          <Select
            value={selectedStatusFilter}
            onValueChange={(val) =>
              setSelectedStatusFilter(val as RequestStatus | "ALL")
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Status" />
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

      {/* Main Data Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title & Category</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Staff</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-slate-500"
                  >
                    No service requests found.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((req: any) => {
                  const isCategoryPaid =
                    req.category?.isPaid ??
                    (req.category?.type === "PAID" ||
                      (req.totalAmount && req.totalAmount > 0));

                  const isClosedStatus = [
                    "RESOLVED",
                    "REJECTED",
                    "CANCELLED",
                  ].includes(req.status);

                  return (
                    <TableRow key={req.id}>
                      {/* Title & Category Column (Clickable) */}
                      <TableCell
                        className="cursor-pointer hover:bg-slate-100/80 transition-colors group"
                        onClick={() => router.push(`/requests/${req.id}`)}
                      >
                        <div className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {req.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {req.category?.name || "General Service"}
                        </div>
                      </TableCell>

                      {/* Requester Info */}
                      <TableCell>
                        <div className="text-sm font-medium">
                          {req.citizen?.name || req.user?.name || "Citizen"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {req.citizen?.email || req.user?.email || "N/A"}
                        </div>
                      </TableCell>

                      {/* Service Type (Paid / Free) */}
                      <TableCell>
                        <Badge
                          variant={isCategoryPaid ? "default" : "secondary"}
                        >
                          {isCategoryPaid
                            ? `Paid (৳${req.totalAmount || req.amount || 0})`
                            : "Free Service"}
                        </Badge>
                      </TableCell>

                      {/* Payment Status (PAID / UNPAID) */}
                      <TableCell>
                        {isCategoryPaid ? (
                          req.isPaid ? (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                              Paid
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
                          <span className="text-xs text-slate-400">N/A</span>
                        )}
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell>{getStatusBadge(req.status)}</TableCell>

                      {/* Assign Staff Dropdown */}
                      <TableCell>
                        {isClosedStatus ? (
                          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium bg-slate-100 px-2 py-1 rounded w-fit">
                            <Lock className="size-3 text-slate-400" />
                            {req.status === "RESOLVED" ? "Completed" : "Closed"}
                          </span>
                        ) : (
                          <Select
                            value={req.assignedStaffId || ""}
                            onValueChange={(staffId) =>
                              handleAssignStaff(req.id, staffId)
                            }
                            disabled={isAssigning}
                          >
                            <SelectTrigger className="w-[180px] h-9 text-xs">
                              <SelectValue placeholder="Assign Staff..." />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(groupedStaff).length === 0 ? (
                                <SelectItem value="none" disabled>
                                  No available staff
                                </SelectItem>
                              ) : (
                                Object.entries(groupedStaff).map(
                                  ([dept, staffs]: [string, any]) => (
                                    <SelectGroup key={dept}>
                                      <SelectLabel className="text-xs font-bold text-indigo-600 bg-slate-50 px-2 py-1">
                                        {dept}
                                      </SelectLabel>
                                      {staffs.map((s: any) => (
                                        <SelectItem
                                          key={s.id}
                                          value={s.userId}
                                          className="text-xs"
                                        >
                                          {s.user?.name} (Available)
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  ),
                                )
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>

                      {/* View Details Action */}
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedRequest(req);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="size-4 mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Modal / Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        {selectedRequest &&
          (() => {
            const isCategoryPaid =
              selectedRequest.category?.isPaid ??
              (selectedRequest.category?.type === "PAID" ||
                (selectedRequest.totalAmount &&
                  selectedRequest.totalAmount > 0));

            return (
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex justify-between items-center pr-6">
                    <span>Request Details</span>
                    {getStatusBadge(selectedRequest.status)}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 text-sm py-2">
                  {/* Service Info */}
                  <div className="bg-slate-50 p-4 rounded-lg border space-y-2">
                    <h3 className="font-bold text-base text-slate-800">
                      {selectedRequest.title}
                    </h3>
                    <p className="text-slate-600">
                      {selectedRequest.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 border-t">
                      <span>
                        Priority:{" "}
                        <strong>{selectedRequest.priority || "NORMAL"}</strong>
                      </span>
                      <span>
                        Service Type:{" "}
                        <strong>
                          {isCategoryPaid ? "Paid Service" : "Free Service"}
                        </strong>
                      </span>
                      {isCategoryPaid && (
                        <>
                          <span>
                            Total Amount:{" "}
                            <strong>৳{selectedRequest.totalAmount || 0}</strong>
                          </span>
                          <span>
                            Payment Status:{" "}
                            <strong
                              className={
                                selectedRequest.isPaid
                                  ? "text-emerald-600"
                                  : "text-amber-600"
                              }
                            >
                              {selectedRequest.isPaid ? "PAID" : "UNPAID"}
                            </strong>
                          </span>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      Address:{" "}
                      <strong>{selectedRequest.address || "N/A"}</strong>
                    </div>
                  </div>

                  {/* Citizen Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <span className="text-xs text-slate-500 block">
                        Requested By
                      </span>
                      <span className="font-semibold">
                        {selectedRequest.citizen?.name ||
                          selectedRequest.user?.name ||
                          "N/A"}
                      </span>
                      <span className="text-xs block text-slate-500">
                        {selectedRequest.citizen?.email ||
                          selectedRequest.user?.email ||
                          "N/A"}
                      </span>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <span className="text-xs text-slate-500 block">
                        Assigned Staff ID
                      </span>
                      <span className="font-semibold text-indigo-600">
                        {selectedRequest.assignedStaffId || "Unassigned"}
                      </span>
                    </div>
                  </div>

                  {/* Change Status Dropdown (Admin Override) */}
                  <div className="border-t pt-4">
                    <label className="text-xs font-semibold text-slate-700 block mb-2">
                      Admin Status Override:
                    </label>
                    <div className="flex items-center gap-3">
                      <Select
                        value={selectedRequest.status}
                        onValueChange={(val) =>
                          handleStatusChange(selectedRequest.id, val)
                        }
                        disabled={isUpdatingStatus}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="ASSIGNED">ASSIGNED</SelectItem>
                          <SelectItem value="ACCEPTED">ACCEPTED</SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            IN_PROGRESS
                          </SelectItem>
                          <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                          <SelectItem value="REJECTED">REJECTED</SelectItem>
                          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-xs text-slate-500">
                        (Admin has full power to force status change)
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            );
          })()}
      </Dialog>
    </div>
  );
}