import { WatchCard } from '../ui/WatchCard'
import type { WatchCardData } from '@/types/watch'

export function SimilarWatches({ watches, title = 'Similar Watches' }: { watches: WatchCardData[]; title?: string }) {
  if (watches.length === 0) return null

  return (
    <section className="py-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {watches.map((watch) => (
          <WatchCard key={watch.slug} watch={watch} />
        ))}
      </div>
    </section>
  )
}
