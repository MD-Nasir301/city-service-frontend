"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-lg border-emerald-100">
        <CardHeader className="flex flex-col items-center pt-8 pb-4">
          <div className="size-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="size-10" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Payment Successful!
          </CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            Thank you. Your service request payment has been confirmed.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {sessionId && (
            <div className="bg-slate-100 p-3 rounded-lg text-xs font-mono text-slate-600 break-all">
              Session ID: {sessionId}
            </div>
          )}
          <p className="text-xs text-slate-500">
            A confirmation email with receipt details will be sent to your registered email address shortly.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pb-8">
          <Link href="/citizen-dashboard/payment&tracking" className="w-full">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              View My Requests <ArrowRight className="size-4 ml-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 