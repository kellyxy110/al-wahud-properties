export default function PropertiesLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="py-16 px-4 lg:px-16 text-center" style={{ background: 'linear-gradient(135deg,var(--dark) 0%,var(--teal) 100%)' }}>
        <div className="h-3 w-24 bg-white/20 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="h-10 w-64 bg-white/20 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="h-4 w-80 bg-white/20 rounded-full mx-auto animate-pulse" />
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 lg:px-16" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto flex gap-3 flex-wrap">
          <div className="h-9 flex-1 min-w-[160px] bg-gray-200 rounded-full animate-pulse" />
          <div className="h-9 w-28 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-9 w-28 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-9 w-28 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-10">
        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[20px] overflow-hidden animate-pulse" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div className="w-full h-[210px] bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
                <div className="flex gap-1.5 mt-2">
                  <div className="h-5 w-16 bg-gray-200 rounded-full" />
                  <div className="h-5 w-16 bg-gray-200 rounded-full" />
                  <div className="h-5 w-16 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
