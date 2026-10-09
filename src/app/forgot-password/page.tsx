"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, KeyRound, HardHat, ShieldAlert } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-slate-50/50 px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Under Construction Notice Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-800 shadow-sm">
          <div className="size-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-700 mt-0.5">
            <HardHat className="size-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-amber-900">Feature Under Development. Coming Soon in Next Release</p>
            <p className="text-amber-700/90 mt-0.5 leading-relaxed">
              Password recovery API & Email OTP integration are currently under construction.
            </p>
          </div>
        </div>

        {/* Form Card UI */}
        <Card className="border shadow-sm bg-white">
          <CardHeader className="text-center space-y-2 pb-4 border-b bg-slate-50/40">
            <div className="size-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-1 border border-indigo-100">
              <KeyRound className="size-6" />
            </div>
            <CardTitle className="text-xl font-bold text-slate-800">
              Forgot Your Password?
            </CardTitle>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Enter your registered email address below to receive password reset instructions.
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">
                  Registered Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="h-10 text-xs"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs h-10"
              >
                Send Reset Link
              </Button>
            </form>

            {/* Helper Alert */}
            <div className="p-3 bg-slate-50 border rounded-lg flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldAlert className="size-4 text-indigo-500 flex-shrink-0" />
              <span>For demo purposes, contact administrator for quick password resets.</span>
            </div>

            {/* Back to Login Link */}
            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="size-3.5 mr-1.5" /> Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}