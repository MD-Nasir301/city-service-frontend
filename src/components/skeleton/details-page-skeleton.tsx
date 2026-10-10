import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DetailPageSkeleton() {
  return (
    <Card className="border-slate-200/80 shadow-sm bg-white rounded-2xl overflow-hidden p-6 space-y-6">
      {/* Top Header: Category Tag & Date/ID */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-40 rounded-full" />
        <div className="space-y-1.5 flex flex-col items-end">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-3/4 md:w-1/2" />
      </div>

      {/* Attached Images Section */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />

        {/* Main Image & Thumbnails Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          {/* Main Large Image Preview Skeleton */}
          <div className="lg:col-span-3">
            <Skeleton className="w-full h-[320px] sm:h-[400px] rounded-2xl" />
          </div>

          {/* Right Side Thumbnails Stack Skeleton */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            <Skeleton className="w-28 sm:w-32 lg:w-full h-20 rounded-xl flex-shrink-0" />
            <Skeleton className="w-28 sm:w-32 lg:w-full h-20 rounded-xl flex-shrink-0" />
          </div>
        </div>
      </div>
    </Card>
  );
}
