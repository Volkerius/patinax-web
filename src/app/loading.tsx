/**
 * Global loading UI shown during route transitions.
 * Keep it quiet — a subtle pulsing header placeholder; the user only
 * notices it when the next page takes more than a fraction of a second.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12" aria-label="Loading" role="status">
      <div className="h-7 w-48 rounded bg-patina-bg2 animate-pulse" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-patina-bg2 animate-pulse" />
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-patina-border bg-patina-bg2 p-4"
          >
            <div className="aspect-square w-full rounded-lg bg-patina-bg3 animate-pulse" />
            <div className="mt-3 h-3 w-16 rounded bg-patina-bg3 animate-pulse" />
            <div className="mt-2 h-4 w-32 rounded bg-patina-bg3 animate-pulse" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading content…</span>
    </div>
  )
}
