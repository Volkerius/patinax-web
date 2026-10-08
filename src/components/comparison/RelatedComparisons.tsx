import Link from 'next/link'

interface RelatedComparison {
  slug: string
  watchABrand: string
  watchAModel: string
  watchBBrand: string
  watchBModel: string
}

export function RelatedComparisons({ comparisons }: { comparisons: RelatedComparison[] }) {
  if (comparisons.length === 0) return null

  return (
    <section className="py-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">Related Comparisons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {comparisons.map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="flex items-center justify-between rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
          >
            <span>{comp.watchABrand} {comp.watchAModel}</span>
            <span className="text-patina-gold text-xs font-medium mx-2">vs</span>
            <span>{comp.watchBBrand} {comp.watchBModel}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
