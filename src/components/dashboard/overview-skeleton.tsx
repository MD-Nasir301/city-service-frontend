


export function OverviewSkeleton() {
  return (
    <div className="space-y-8 animate-pulse p-4 md:p-6 lg:p-8">
      {/* 1. Header Section Skeleton */}
      <div className="space-y-3">
        <div className="h-9 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-5 w-full max-w-sm bg-slate-100 dark:bg-slate-800/80 rounded" />
      </div>

      {/* 2. Stat Cards Grid Skeleton (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-6 border border-slate-200/70 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/50 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-center pb-1">
              <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="size-6 bg-slate-100 dark:bg-slate-800 rounded-md" />
            </div>
            <div className="h-12 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-4 w-48 bg-slate-100 dark:bg-slate-800/80 rounded" />
          </div>
        ))}
      </div>

      {/* 3. Charts Grid Skeleton (Donut & Bar) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut Chart Skeleton */}
        <div className="p-6 border border-slate-200/70 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/50 shadow-sm space-y-6">
          <div className="flex gap-3 items-center">
            <div className="size-5 bg-slate-100 dark:bg-slate-800 rounded-full" />
            <div className="h-6 w-56 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="relative flex justify-center items-center py-6">
            <div className="size-56 rounded-full bg-slate-100 dark:bg-slate-800 border-[28px] border-slate-200/60 dark:border-slate-800/60" />
          </div>
          <div className="flex justify-center gap-4 pt-2">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex gap-2 items-center">
                <div className="size-3 bg-slate-200 dark:bg-slate-800 rounded-full" />
                <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart Skeleton */}
        <div className="p-6 border border-slate-200/70 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/50 shadow-sm space-y-6">
          <div className="flex gap-3 items-center">
            <div className="size-5 bg-slate-100 dark:bg-slate-800 rounded-md" />
            <div className="h-6 w-56 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="relative h-[250px] w-full flex items-end justify-between gap-6 px-4 pt-10 border-b border-l border-slate-200/60 dark:border-slate-800">
            {[80, 50, 20, 15].map((height, barIndex) => (
              <div key={barIndex} className="flex-1 space-y-3 flex flex-col items-center">
                <div 
                  className="w-full max-w-[50px] bg-slate-200 dark:bg-slate-800 rounded-t-lg" 
                  style={{ height: `${height}%` }}
                />
                <div className="h-4 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}