export default function SearchLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="h-10 w-64 bg-patina-bg2 rounded-lg animate-pulse mb-6" />
      <div className="h-10 w-full max-w-xl bg-patina-bg2 rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-patina-border bg-patina-bg2 p-4">
            <div className="aspect-square rounded-lg bg-patina-bg3 animate-pulse mb-3" />
            <div className="h-3 w-16 bg-patina-bg3 rounded animate-pulse mb-2" />
            <div className="h-4 w-full bg-patina-bg3 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
