import Link from 'next/link'
import { WatchImage } from './WatchImage'
import { StarRating } from './StarRating'
import { CompareButton } from './CompareButton'
import { toSlug } from '@/lib/slug'
import type { WatchCardData } from '@/types/watch'

// Short labels for the style badge — keep it tight so the card stays tidy.
const STYLE_LABEL: Record<string, string> = {
  diver: 'Diver',
  dress: 'Dress',
  sport: 'Sport',
  pilot: 'Pilot',
  field: 'Field',
  chrono: 'Chrono',
}

// Shorten long movement strings so "Automatic chronograph" doesn't break the layout.
function shortMovement(movement?: string | null): string | null {
  if (!movement) return null
  const m = movement.toLowerCase()
  if (m.includes('spring drive')) return 'Spring Drive'
  if (m.includes('quartz')) return 'Quartz'
  if (m.includes('manual')) return 'Manual'
  if (m.includes('auto')) return 'Auto'
  if (m.includes('mecha')) return 'Mechanical'
  return movement.length > 10 ? movement.slice(0, 10) + '…' : movement
}

export function WatchCard({ watch }: { watch: WatchCardData }) {
  const href = `/watch/${toSlug(watch.brand)}/${toSlug(watch.model)}`
  const styleLabel = watch.style ? STYLE_LABEL[watch.style] ?? null : null
  const movementLabel = shortMovement(watch.movement)

  return (
    <article className="group relative rounded-xl border border-patina-border bg-patina-bg2 p-4 transition-all hover:border-patina-gold/30 hover:bg-patina-bg3 focus-within:border-patina-gold/50">
      <Link
        href={href}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-patina-gold/50 focus-visible:rounded-lg"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-patina-bg3 mb-3 flex items-center justify-center">
          <WatchImage src={watch.imageUrl} brand={watch.brand} model={watch.model} />
          {styleLabel && (
            <span className="absolute top-2 left-2 rounded-md bg-patina-bg/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-patina-text2 border border-patina-border">
              {styleLabel}
            </span>
          )}
        </div>
        <p className="text-xs text-patina-gold font-medium uppercase tracking-wider">{watch.brand}</p>
        <h3 className="mt-1 text-sm font-medium text-patina-text group-hover:text-patina-gold2 transition-colors line-clamp-2 min-h-[2.5rem]">
          {watch.model}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <StarRating rating={watch.priceRange} max={5} />
          <div className="flex items-center gap-1.5 text-xs text-patina-text3 font-mono shrink-0">
            {watch.caseDiameter && <span>{watch.caseDiameter}mm</span>}
            {watch.caseDiameter && movementLabel && <span className="opacity-40">·</span>}
            {movementLabel && <span>{movementLabel}</span>}
          </div>
        </div>
      </Link>
      <CompareButton watch={{ brand: watch.brand, model: watch.model, slug: watch.slug }} />
    </article>
  )
}
