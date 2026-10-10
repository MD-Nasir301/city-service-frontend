export default function Loading() {
  return (
    <div className="container min-h-[70vh] mx-auto px-4 py-8 space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-4 w-full max-w-md bg-slate-200/70 dark:bg-slate-800/70 rounded animate-pulse" />
      </div>

      {/* Filter / Search Bar Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="h-10 w-full sm:w-80 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
        <div className="flex gap-2">
          <div className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          <div className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Grid / Table Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="p-5 border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/50 space-y-4 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="size-10 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
            </div>
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-10 w-full bg-slate-200/60 dark:bg-slate-800/60 rounded animate-pulse" />
            <div className="h-9 w-full bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}