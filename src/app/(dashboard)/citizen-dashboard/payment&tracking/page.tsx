"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, CheckCircle, Clock, Filter } from "lucide-react";
import AuthLoading from "@/components/auth/auth-loading";
import { toast } from "sonner";
import { useGetMyRequests } from "@/hooks/service-request.hook";
import { useCreateCheckoutSession } from "@/hooks/payment.hook";

export default function CitizenMyRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const { data: requestsData, isLoading } = useGetMyRequests();
  const { mutate: initiateStripePayment, isPending: isPaying } =
    useCreateCheckoutSession();

  if (isLoading) {
    return <AuthLoading label="Loading Your Requests..." />;
  }

  const rawRequests = requestsData?.data || [];

  // Client-side Status Filter Logic
  const requests =
    statusFilter === "ALL"
      ? rawRequests
      : rawRequests.filter((item: any) => item.status === statusFilter);

  const handleStripePayment = (requestId: string) => {
    initiateStripePayment(requestId, {
      onSuccess: (res: any) => {
        // Stripe Checkout URL redirection
        const stripeUrl =
          res?.data?.url ||
          res?.data?.paymentUrl ||
          res?.data?.checkoutUrl ||
          res?.data?.gatewayUrl;

        if (stripeUrl) {
          toast.loading("Redirecting to Stripe Checkout...");
          window.location.href = stripeUrl;
        } else {
          toast.error("Stripe payment URL not found.");
        }
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to start Stripe payment.");
      },
    });
  };

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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Request Status</TableHead>
                <TableHead className="text-right">Action / Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-slate-500"
                  >
                    No service requests found for this filter.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((item: any) => {
                  const isCategoryPaid =
                    item.category?.isPaid ??
                    (item.category?.type === "PAID" ||
                      (item.totalAmount && item.totalAmount > 0));

                  const canPayWithStripe =
                    isCategoryPaid &&
                    !item.isPaid &&
                    item.status === "ACCEPTED";

                  const isAwaitingStaffWork =
                    item.isPaid &&
                    item.status !== "IN_PROGRESS" &&
                    item.status !== "RESOLVED";

                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-semibold text-slate-800">
                        {item.title}
                      </TableCell>

                      <TableCell className="text-xs text-slate-600">
                        {item.category?.name || "General"}
                      </TableCell>

                      {/* Service Type (Paid vs Free) */}
                      <TableCell>
                        <Badge
                          variant={isCategoryPaid ? "default" : "secondary"}
                        >
                          {isCategoryPaid
                            ? `Paid (৳${item.totalAmount || item.amount || 0})`
                            : "Free Service"}
                        </Badge>
                      </TableCell>

                      {/* Request Status */}
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {item.status}
                        </Badge>
                      </TableCell>

                      {/* Action / Payment Column */}
                      <TableCell className="text-right">
                        {isCategoryPaid ? (
                          item.isPaid ? (
                            <div className="flex flex-col items-end gap-1">
                              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                                <CheckCircle className="size-3 mr-1" /> Paid
                              </Badge>
                              {isAwaitingStaffWork && (
                                <span className="text-[11px] text-amber-600 flex items-center gap-1 font-medium">
                                  <Clock className="size-3" /> Waiting for staff to start work
                                </span>
                              )}
                            </div>
                          ) : canPayWithStripe ? (
                            <Button
                              size="sm"
                              className="bg-indigo-600 hover:bg-indigo-700 text-white h-8 text-xs"
                              onClick={() => handleStripePayment(item.id)}
                              disabled={isPaying}
                            >
                              <CreditCard className="size-3.5 mr-1" />
                              Pay with Stripe
                            </Button>
                          ) : item.status === "ASSIGNED" ? (
                            <span className="text-xs text-amber-600 flex items-center justify-end gap-1 font-medium">
                              <Clock className="size-3" /> Waiting for Staff Acceptance
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">N/A</span>
                          )
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">
                            No Payment Required
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