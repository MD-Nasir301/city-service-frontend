
"use client";

import { useGetMyPayments } from "@/hooks/payment.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { CreditCard, CheckCircle2, Clock, XCircle } from "lucide-react";

// Payment Status Badge Helper
const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "PAID":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100 flex items-center gap-1 w-fit">
          <CheckCircle2 className="size-3" /> Paid
        </Badge>
      );
    case "PENDING":
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 flex items-center gap-1 w-fit">
          <Clock className="size-3" /> Pending
        </Badge>
      );
    case "FAILED":
    case "CANCELLED":
      return (
        <Badge className="bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100 flex items-center gap-1 w-fit">
          <XCircle className="size-3" /> {status}
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function PaymentHistoryPage() {
  const { data: response, isLoading } = useGetMyPayments();

  if (isLoading) {
    return <TableSkeleton />;
  }

  const payments = response?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Payment History
        </h1>
        <p className="text-sm text-slate-500">
          View all your transaction records, payment statuses, and history in real-time.
        </p>
      </div>

      {/* Payment Data Table Card */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Service Request</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-slate-500"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <CreditCard className="size-8 text-slate-300" />
                      <p>No payment history found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    {/* Transaction ID */}
                    <TableCell className="font-mono text-xs font-semibold text-slate-700">
                      {payment.transactionId}
                    </TableCell>

                    {/* Service Title */}
                    <TableCell className="text-slate-800 font-medium">
                      {payment.serviceRequest?.title || "N/A"}
                    </TableCell>

                    {/* Amount */}
                    <TableCell className="font-semibold text-emerald-600">
                      ৳{payment.amount}
                    </TableCell>

                    {/* Payment Method */}
                    <TableCell className="text-xs uppercase text-slate-600 font-medium">
                      {payment.paymentMethod || "Online Gateway"}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>

                    {/* Date */}
                    <TableCell className="text-right text-xs text-slate-500">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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