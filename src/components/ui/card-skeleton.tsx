// components/ui/public-requests-skeleton.tsx

export function CardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse p-4 md:p-6 lg:p-8">


      {/* 2. Main Grid: Left Filters + Right Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Filters Skeleton (1 Column) */}
        <div className="p-5 border border-slate-100 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-sm space-y-5 h-fit">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800/80 rounded" />
          </div>

          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />

          {/* Search Input */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800/80 rounded" />
            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>

          {/* Dropdown 1 */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800/80 rounded" />
            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>

          {/* Dropdown 2 */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800/80 rounded" />
            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>

          {/* Dropdown 3 */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800/80 rounded" />
            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>

        {/* Right Section: Request Cards Grid Skeleton (3 Columns) */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-5 border border-slate-100 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between"
            >
              {/* Top Badges (Category, Priority, Service Type, Status) */}
              <div className="space-y-3">
                <div className="flex justify-between items-center gap-2">
                  <div className="h-7 w-36 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  <div className="h-6 w-16 bg-slate-100 dark:bg-slate-800/80 rounded-md" />
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-7 w-24 bg-slate-100 dark:bg-slate-800/80 rounded-full" />
                </div>

                {/* Title & Description */}
                <div className="space-y-2 pt-1">
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/80 rounded" />
                </div>

                {/* Image Placeholder Box */}
                <div className="h-40 w-full bg-slate-100 dark:bg-slate-800/60 rounded-2xl flex items-center justify-center my-2">
                  <div className="size-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                </div>
              </div>

              {/* Bottom Info Footer */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="size-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800/80 rounded" />
                  </div>
                  <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <div className="h-4 w-28 bg-slate-100 dark:bg-slate-800/80 rounded" />
                  <div className="h-4 w-16 bg-slate-100 dark:bg-slate-800/80 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}