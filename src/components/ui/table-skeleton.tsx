// components/ui/table-skeleton.tsx

export function TableSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-4 md:p-6 lg:p-8 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      {/* 1. Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
        <div className="space-y-3">
          {/* Main Title */}
          <div className="h-9 w-72 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          {/* Subtitle */}
          <div className="h-5 w-full max-w-sm bg-slate-100 dark:bg-slate-800/80 rounded" />
        </div>
        {/* Filter Dropdown on right */}
        <div className="flex items-center gap-3">
          <div className="h-5 w-24 bg-slate-100 dark:bg-slate-800/80 rounded" />
          <div className="h-10 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>

      {/* 2. Table Structure Skeleton */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
        {/* Table Header Row */}
        <div className="grid grid-cols-7 gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
          {[
            "Title & Category",
            "Requested By",
            "Service Type",
            "Payment Status",
            "Status",
            "Assigned Staff",
            "Actions",
          ].map((header, i) => (
            <div key={i} className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          ))}
        </div>

        {/* Table Body Rows (Generating 6 Rows) */}
        {[...Array(6)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-7 gap-4 p-5 border-b border-slate-100 dark:border-slate-800 last:border-b-0 items-center"
          >
            {/* Column 1: Title & Category (Two Lines) */}
            <div className="space-y-2.5">
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800/80 rounded" />
            </div>

            {/* Column 2: Requested By (Two Lines) */}
            <div className="space-y-2.5">
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800/80 rounded" />
            </div>

            {/* Column 3: Service Type (Pill shape) */}
            <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-full" />

            {/* Column 4: Payment Status (Pill shape) */}
            <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded-full" />

            {/* Column 5: Status (Pill shape) */}
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />

            {/* Column 6: Assigned Staff (Dropdown Shape) */}
            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />

            {/* Column 7: Actions (Details Button Shape) */}
            <div className="flex justify-end">
              <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg flex gap-2 items-center px-3">
                <div className="size-4 bg-slate-300 dark:bg-slate-700 rounded-full" />
                <div className="h-4 flex-1 bg-slate-300 dark:bg-slate-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}