'use client'
import { useState, useEffect, useCallback } from 'react'
import type { RadarCategory } from '@/types/comparison'

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Water Resistance': 'How deep each watch can safely be submerged. Critical for divers and water sports enthusiasts — 200m+ meets professional diving standards. A higher water resistance rating means the watch can handle more demanding aquatic environments, from casual swimming to professional saturation diving.',
  'Power Reserve': 'How long the watch runs without winding. A 70+ hour reserve means you can leave it off for the weekend and pick it up Monday still ticking. Longer power reserves are achieved through larger mainsprings or more efficient escapements, reducing the need for frequent winding.',
  'Case Size': 'The diameter of the watch case measured in millimeters. Larger cases (42mm+) make a bold statement and are easier to read, while smaller cases (38mm and under) offer classic proportions and understated elegance that slides easily under shirt cuffs.',
  'Price Range': 'The relative price tier of each watch in the luxury market. Higher tiers often feature more prestigious in-house movements, finer hand-finishing techniques, precious materials, and stronger resale value. Price also reflects brand heritage and market positioning.',
  'Precision': 'Accuracy of the timekeeping mechanism. COSC-certified chronometers must keep time within -4/+6 seconds per day — a meaningful benchmark. Higher-frequency movements and advanced escapement designs contribute to better precision over extended periods.',
  'Heritage': 'The brand\'s watchmaking history and reputation among collectors. Heritage reflects decades of innovation, iconic designs, competition victories, and the brand\'s standing in the horological world. Stronger heritage often correlates with better resale value and collector interest.',
}

const CATEGORY_TOP_WATCHES: Record<string, string[]> = {
  'Water Resistance': ['Rolex Sea-Dweller (1,220m)', 'Omega Seamaster PO (600m)', 'Blancpain Fifty Fathoms (300m)'],
  'Power Reserve': ['Panerai Luminor (72h)', 'IWC Portugieser (168h)', 'Patek Philippe 5270 (55h)'],
  'Case Size': ['Panerai Luminor 44mm', 'AP Royal Oak 41mm', 'Cartier Santos 35mm'],
  'Price Range': ['Patek Philippe Nautilus', 'AP Royal Oak', 'Vacheron Constantin Overseas'],
  'Precision': ['Rolex Submariner (COSC)', 'Omega Seamaster (METAS)', 'Grand Seiko (VFA)'],
  'Heritage': ['Patek Philippe (est. 1839)', 'Vacheron Constantin (est. 1755)', 'Breguet (est. 1775)'],
}

function CategoryModal({
  category,
  watchAName,
  watchBName,
  watchABrand,
  watchBBrand,
  onClose,
}: {
  category: RadarCategory
  watchAName: string
  watchBName: string
  watchABrand: string
  watchBBrand: string
  onClose: () => void
}) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const pctA = (category.watchAScore / 10) * 100
  const pctB = (category.watchBScore / 10) * 100
  const description = CATEGORY_DESCRIPTIONS[category.label] || ''
  const topWatches = CATEGORY_TOP_WATCHES[category.label] || []
  const modelA = watchAName.replace(watchABrand, '').trim()
  const modelB = watchBName.replace(watchBBrand, '').trim()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeIn_150ms_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${category.label} breakdown`}
    >
      <div className="absolute inset-0 bg-black/80" />

      <div
        className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl border border-patina-border bg-[#0d0d0d] p-6 md:p-8 animate-[scaleIn_200ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-patina-text3 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        <h3 className="font-playfair text-2xl font-bold text-patina-text mb-1 pr-12">{category.label}</h3>
        <p className="text-[10px] uppercase tracking-[0.2em] text-patina-text3 mb-8">Category Comparison</p>

        {/* Two score boxes side by side */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border border-[#c9a84c]/30 bg-[#c9a84c]/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-patina-gold/70 mb-0.5">{watchABrand}</p>
            <p className="text-xs text-patina-gold/50 mb-3 leading-tight truncate">{modelA}</p>
            <p className="text-3xl font-semibold text-patina-text">
              {category.watchAScore}<span className="text-base text-patina-text3 font-normal">/10</span>
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-widest text-patina-text3 mb-0.5">{watchBBrand}</p>
            <p className="text-xs text-patina-text3/50 mb-3 leading-tight truncate">{modelB}</p>
            <p className="text-3xl font-semibold text-patina-text">
              {category.watchBScore}<span className="text-base text-patina-text3 font-normal">/10</span>
            </p>
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-2.5 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-patina-gold w-14 shrink-0 truncate">{watchABrand}</span>
            <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-[#c9a84c] transition-all duration-700" style={{ width: `${pctA}%` }} />
            </div>
            <span className="text-xs text-patina-gold font-medium w-8 text-right">{category.watchAScore}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-patina-text3 w-14 shrink-0 truncate">{watchBBrand}</span>
            <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-white/30 transition-all duration-700" style={{ width: `${pctB}%` }} />
            </div>
            <span className="text-xs text-patina-text3 font-medium w-8 text-right">{category.watchBScore}</span>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-patina-text3 mb-2">What This Means for Buyers</p>
          <p className="text-sm text-patina-text2 leading-relaxed">{description}</p>
        </div>

        {/* Top watches in category */}
        {topWatches.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-patina-text3 mb-2">
              Top Watches for {category.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {topWatches.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-white/5 border border-white/8 px-3 py-1.5 text-xs text-patina-text2"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

export function CategoryGrid({
  categories,
  watchAName,
  watchBName,
  watchABrand,
  watchBBrand,
}: {
  categories: RadarCategory[]
  watchAName: string
  watchBName: string
  watchABrand: string
  watchBBrand: string
}) {
  const [selectedCategory, setSelectedCategory] = useState<RadarCategory | null>(null)

  return (
    <>
      <section className="py-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">Category Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const pctA = (cat.watchAScore / 10) * 100
            const pctB = (cat.watchBScore / 10) * 100
            const description = CATEGORY_DESCRIPTIONS[cat.label] || ''
            const modelA = watchAName.replace(watchABrand, '').trim()
            const modelB = watchBName.replace(watchBBrand, '').trim()

            return (
              <div
                key={cat.label}
                className="rounded-2xl border border-patina-border bg-patina-bg2 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 hover:border-patina-gold/20 cursor-pointer"
                onClick={() => setSelectedCategory(cat)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedCategory(cat) }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-patina-text">{cat.label}</h3>
                  <svg width="14" height="14" viewBox="0 0 16 16" className="text-patina-text3 opacity-40 shrink-0">
                    <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <text x="8" y="12" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="600">i</text>
                  </svg>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-baseline gap-1.5 min-w-0">
                        <span className="text-xs font-medium text-patina-gold shrink-0">{watchABrand}</span>
                        <span className="text-[10px] text-patina-gold/60 truncate">{modelA}</span>
                      </div>
                      <span className="text-xs text-patina-gold font-medium shrink-0 ml-2">{cat.watchAScore}/10</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-[#c9a84c] transition-all duration-700" style={{ width: `${pctA}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-baseline gap-1.5 min-w-0">
                        <span className="text-xs font-medium text-patina-text2 shrink-0">{watchBBrand}</span>
                        <span className="text-[10px] text-patina-text3 truncate">{modelB}</span>
                      </div>
                      <span className="text-xs text-patina-text3 font-medium shrink-0 ml-2">{cat.watchBScore}/10</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-white/30 transition-all duration-700" style={{ width: `${pctB}%` }} />
                    </div>
                  </div>
                </div>

                {description && (
                  <p className="text-xs text-patina-text3 leading-relaxed line-clamp-2">{description}</p>
                )}
              </div>
            )
          })}
        </div>
        <p className="mt-2 text-[11px] text-patina-text3 text-center">Click any category for details</p>
      </section>

      {selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          watchAName={watchAName}
          watchBName={watchBName}
          watchABrand={watchABrand}
          watchBBrand={watchBBrand}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </>
  )
}
