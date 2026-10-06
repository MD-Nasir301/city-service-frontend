"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComplaintCard } from "@/components/card/complaint-card";
import { useGetAllServiceRequests } from "@/hooks/service-request.hook";
import { IServiceRequestUI } from "@/types/services-request.type";
import { error } from "console";
import { da } from "zod/locales";

export function RecentComplaints() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllServiceRequests({
    limit: "15",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const complaints = data?.data || data?.result || [];

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="container px-4 md:px-8 mx-auto space-y-8">
        {/* Section Header */}
        <div className="sm:flex-row sm:items-end ">
          <div className="space-y-1 shadow-lg shadow-blue-200 rounded-2xl p-3">
            <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider">
              <FileText className="size-4" />
              <span>Community Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold border-l-8 border-orange-400 pl-3 text-green-500 my-2">
              Recent Public Complaints
            </h2>
            <p className="text-sm text-muted-foreground">
              Check real-time updates on reported issues around the city.
            </p>
          </div>
        </div>

        {/* Complaints Grid */}
        {isLoading && (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="animate-spin m-2" />
            <p className="text-muted-foreground ">Loading complaints...</p>
          </div>
        )}
        {isError && (
          <div className="flex items-center justify-center h-32">
            <p className="font-bold text-2xl text-red-600 ">
              Failed to load complaints. ! ! !
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((item: IServiceRequestUI) => (
            <ComplaintCard
              key={item.id}
              complaint={item}
              onClick={() => router.push(`/public-requests/${item.id}`)}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => router.push("/public-requests")}
            className="rounded-xl ml-auto bg-green-500 text-white font-semibold shrink-0"
          >
            See All Complaints
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
