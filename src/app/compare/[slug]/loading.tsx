export default function ComparisonLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="h-6 w-48 bg-patina-bg3 animate-pulse rounded mb-4" />
      <div className="h-10 w-96 bg-patina-bg3 animate-pulse rounded mb-8" />
      <div className="grid grid-cols-[1fr_auto_1fr] gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-64 w-64 bg-patina-bg3 animate-pulse rounded-xl" />
          <div className="h-5 w-32 bg-patina-bg3 animate-pulse rounded" />
          <div className="h-4 w-24 bg-patina-bg3 animate-pulse rounded" />
        </div>
        <div className="flex items-center">
          <div className="h-10 w-16 bg-patina-bg3 animate-pulse rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="h-64 w-64 bg-patina-bg3 animate-pulse rounded-xl" />
          <div className="h-5 w-32 bg-patina-bg3 animate-pulse rounded" />
          <div className="h-4 w-24 bg-patina-bg3 animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}
