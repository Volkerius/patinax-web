'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { WatchIllustration } from '../ui/WatchPlaceholder'

const POPULAR = [
  { slug: 'rolex-submariner-vs-tudor-black-bay', title: 'Rolex Sub vs Tudor BB', a: { brand: 'Rolex', model: 'Submariner' }, b: { brand: 'Tudor', model: 'Black Bay' } },
  { slug: 'omega-seamaster-vs-rolex-datejust', title: 'Omega Seamaster vs Rolex Datejust', a: { brand: 'Omega', model: 'Seamaster' }, b: { brand: 'Rolex', model: 'Datejust' } },
  { slug: 'patek-philippe-nautilus-vs-audemars-piguet-royal-oak', title: 'Patek Nautilus vs AP Royal Oak', a: { brand: 'Patek Philippe', model: 'Nautilus' }, b: { brand: 'Audemars Piguet', model: 'Royal Oak' } },
  { slug: 'rolex-daytona-vs-omega-speedmaster', title: 'Rolex Daytona vs Omega Speedmaster', a: { brand: 'Rolex', model: 'Daytona' }, b: { brand: 'Omega', model: 'Speedmaster' } },
  { slug: 'iwc-portugieser-vs-jaeger-lecoultre-master', title: 'IWC Portugieser vs JLC Master', a: { brand: 'IWC', model: 'Portugieser' }, b: { brand: 'Jaeger-LeCoultre', model: 'Master' } },
]

export function PopularComparisons() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 280
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2">Popular Comparisons</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-patina-border bg-patina-bg2 text-patina-text3 hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
            aria-label="Scroll left"
          >
            &#8592;
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-patina-border bg-patina-bg2 text-patina-text3 hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {POPULAR.map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="group flex-none w-44 sm:w-56 snap-start rounded-2xl border border-patina-border bg-patina-bg2 p-3 sm:p-4 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <WatchIllustration
                brand={comp.a.brand}
                model={comp.a.model}
                className="h-14 w-14 opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[10px] font-bold text-patina-gold/50">VS</span>
              <WatchIllustration
                brand={comp.b.brand}
                model={comp.b.model}
                className="h-14 w-14 opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-patina-text text-center leading-tight">
              {comp.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
