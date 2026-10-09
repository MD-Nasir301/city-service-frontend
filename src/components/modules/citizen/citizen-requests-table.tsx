"use client";

import { useRouter } from "next/navigation";
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
import { CreditCard, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useCreateCheckoutSession } from "@/hooks/payment.hook";

interface CitizenRequestsTableProps {
  requests: any[];
}

export default function CitizenRequestsTable({ requests }: CitizenRequestsTableProps) {
  const router = useRouter();
  const { mutate: initiateStripePayment, isPending: isPaying } =
    useCreateCheckoutSession();

  const handleStripePayment = (requestId: string) => {
    initiateStripePayment(requestId, {
      onSuccess: (res: any) => {
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
                  No service requests found.
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
                    <TableCell
                      onClick={() => router.push(`/requests?id=${item.id}`)}
                      className="font-semibold text-slate-800 hover:text-blue-500 cursor-pointer"
                    >
                      {item.title}
                    </TableCell>

                    <TableCell className="text-xs text-slate-600">
                      {item.category?.name || "General"}
                    </TableCell>

                    {/* Service Type */}
                    <TableCell>
                      <Badge variant={isCategoryPaid ? "default" : "secondary"}>
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
  );
}