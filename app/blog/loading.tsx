export default function BlogLoading() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-36 bg-slate-200 rounded animate-pulse mb-8" />

        {/* Header Skeleton */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto mb-3 animate-pulse" />
          <div className="h-10 w-72 bg-slate-200 rounded-xl mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-96 bg-slate-200 rounded mx-auto animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-card border border-border-subtle rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="aspect-[16/9] w-full bg-slate-200" />
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                </div>
                <div className="h-5 w-full bg-slate-200 rounded mb-2" />
                <div className="h-5 w-3/4 bg-slate-200 rounded mb-4" />
                <div className="h-3 w-full bg-slate-200 rounded mb-2" />
                <div className="h-3 w-5/6 bg-slate-200 rounded mb-6 flex-1" />
                <div className="pt-3 border-t border-border-subtle flex justify-between">
                  <div className="h-4 w-20 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
