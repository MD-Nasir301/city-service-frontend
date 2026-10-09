"use client";

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-lg border-rose-100">
        <CardHeader className="flex flex-col items-center pt-8 pb-4">
          <div className="size-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4">
            <XCircle className="size-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Payment Cancelled
          </CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            You have cancelled the Stripe checkout process.
          </p>
        </CardHeader>

        <CardFooter className="flex flex-col gap-2 pb-8">
          <Link href="/citizen-dashboard/my-requests" className="w-full">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="size-4 mr-1" /> Back to My Requests
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}