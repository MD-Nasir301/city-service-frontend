"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ServiceRequestFilters } from "@/components/shared/service-request-filters";
import { ComplaintCard } from "@/components/card/complaint-card";
import { useGetAllServiceRequests } from "@/hooks/service-request.hook";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileX,
  SlidersHorizontal,
} from "lucide-react";
import {
  CategoryType,
  IServiceRequestUI,
  Priority,
  RequestStatus,
} from "@/types/services-request.type";
import { useState } from "react";
import { CardSkeleton } from "@/components/ui/card-skeleton";

export function ServiceRequestsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const params = {
    search: searchParams.get("search") || undefined,
    status: (searchParams.get("status") as RequestStatus) || undefined,
    priority: (searchParams.get("priority") as Priority) || undefined,
    type: (searchParams.get("type") as CategoryType) || undefined,
    categoryId: searchParams.get("categoryId") || undefined,
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "9",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  };

  const { data, isLoading, isError } = useGetAllServiceRequests(params);

  const requests = data?.data || data?.result || [];
  const meta = data?.meta || {};
  const currentPage = Number(params.page);
  const totalPages =
    meta.totalPage ||
    Math.ceil((meta.total || requests.length) / Number(params.limit)) ||
    1;

  const handlePageChange = (newPage: number) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("page", newPage.toString());
    router.push(`/public-requests?${updatedParams.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle Button */}
      <div className="flex lg:hidden justify-between items-center bg-card p-4 rounded-xl border">
        <p className="text-sm font-medium text-muted-foreground">
          Showing {requests.length} results
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="gap-2 rounded-lg"
        >
          <SlidersHorizontal className="size-4" />
          {showMobileFilter ? "Hide Filters" : "Filter Requests"}
        </Button>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Sidebar: Filter Component */}
        <aside
          className={`lg:col-span-1  bg-card border p-3 rounded-2xl sticky top-20 shadow-sm transition-all duration-200 ${
            showMobileFilter ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <h2 className="font-bold text-lg tracking-tight">Filters</h2>
            <span className="text-xs text-muted-foreground">Refine search</span>
          </div>
          <ServiceRequestFilters />
        </aside>

        {/* Right Main Content: Cards Grid & States */}
        <section className="lg:col-span-3 space-y-6">
          {/* Loading State */}
          {isLoading && <CardSkeleton />}

          {/* Error State */}
          {isError && (
            <div className="text-center py-16 bg-destructive/10 rounded-2xl border border-destructive/20 p-6">
              <p className="text-destructive font-semibold text-base">
                Failed to load service requests.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Please check your network connection or try refreshing the page.
              </p>
            </div>
          )}

          {/* Service Requests Grid */}
          {!isLoading && !isError && (
            <>
              {requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {requests.map((item: IServiceRequestUI) => (
                    <ComplaintCard
                      key={item.id}
                      complaint={item}
                      onClick={() => router.push(`/requests?id=${item.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-dashed text-center p-8 space-y-3">
                  <FileX className="size-14 text-muted-foreground/60 stroke-1" />
                  <h3 className="font-bold text-xl">No Requests Found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    We couldn't find any public service requests matching your
                    current filters. Try resetting the filters.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between bg-card p-4 rounded-xl border mt-8">
                  <p className="text-xs font-medium text-muted-foreground">
                    Page{" "}
                    <span className="font-bold text-foreground">
                      {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-foreground">
                      {totalPages}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="gap-1 rounded-lg"
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="gap-1 rounded-lg"
                    >
                      Next <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
