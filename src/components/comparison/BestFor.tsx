import type { Watch } from '@/types/watch'

function getBestForTags(watch: Watch): string[] {
  const tags: string[] = []

  if ((watch.waterResistance ?? 0) >= 200) tags.push('Diving')
  if ((watch.waterResistance ?? 0) < 100) tags.push('Dress')
  if ((watch.caseDiameter ?? 40) >= 43) tags.push('Bold Wrist Presence')
  if ((watch.caseDiameter ?? 40) <= 38) tags.push('Understated Elegance')
  if (watch.cosc) tags.push('Precision Timekeeping')
  if ((watch.powerReserve ?? 0) >= 72) tags.push('Weekend Wear')
  if (watch.movement?.toLowerCase().includes('automatic')) tags.push('Daily Wear')
  if (watch.caseMaterial?.toLowerCase().includes('gold')) tags.push('Luxury Investment')
  if (watch.caseMaterial?.toLowerCase().includes('titanium')) tags.push('Active Lifestyle')

  return tags.length > 0 ? tags : ['Everyday Luxury']
}

export function BestFor({ watchA, watchB }: { watchA: Watch; watchB: Watch }) {
  const tagsA = getBestForTags(watchA)
  const tagsB = getBestForTags(watchB)

  return (
    <section className="py-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">Best For</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-patina-border bg-patina-bg2 p-6">
          <div className="mb-3">
            <p className="text-xs font-medium uppercase tracking-widest text-patina-gold/70">{watchA.brand}</p>
            <p className="font-playfair text-base text-patina-text">{watchA.model}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tagsA.map((tag) => (
              <span key={tag} className="rounded-full bg-patina-gold/10 border border-patina-gold/20 px-3 py-1 text-xs text-patina-gold">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-patina-border bg-patina-bg2 p-6">
          <div className="mb-3">
            <p className="text-xs font-medium uppercase tracking-widest text-patina-text3">{watchB.brand}</p>
            <p className="font-playfair text-base text-patina-text">{watchB.model}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tagsB.map((tag) => (
              <span key={tag} className="rounded-full bg-patina-text3/10 border border-patina-text3/20 px-3 py-1 text-xs text-patina-text2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
