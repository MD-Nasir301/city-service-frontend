"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 text-center">
          <div className="max-w-md space-y-6 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
            {/* Icon */}
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600">
              <AlertTriangle className="size-8" />
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                Something went wrong!
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {error?.message ||
                  "An unexpected error occurred while processing your request."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                onClick={() => reset()}
                variant="default"
                className="gap-2 text-xs h-10"
              >
                <RefreshCcw className="size-3.5" /> Try again
              </Button>

              <Link href="/">
                <Button
                  variant="outline"
                  className="gap-2 text-xs h-10 w-full sm:w-auto"
                >
                  <Home className="size-3.5" /> Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
