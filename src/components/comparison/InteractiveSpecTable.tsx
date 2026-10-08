'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface SpecRow {
  label: string
  fullLabel: string
  valueA: string | null
  valueB: string | null
  numericA?: number
  numericB?: number
  maxValue?: number
  winner?: 'a' | 'b' | 'tie' | null
  explanation: string
}

interface InteractiveSpecTableProps {
  specs: SpecRow[]
  watchAName: string
  watchBName: string
}

interface WatchPill {
  name: string
  href: string
}

function SpecModal({
  spec,
  watchAName,
  watchBName,
  onClose,
}: {
  spec: SpecRow
  watchAName: string
  watchBName: string
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

  const pctA = spec.numericA !== undefined && spec.maxValue
    ? Math.min(100, (spec.numericA / spec.maxValue) * 100)
    : null
  const pctB = spec.numericB !== undefined && spec.maxValue
    ? Math.min(100, (spec.numericB / spec.maxValue) * 100)
    : null

  const similarWatches = getSimilarWatchPills(spec.fullLabel)
  const brandA = watchAName.split(' ')[0]
  const modelA = watchAName.split(' ').slice(1).join(' ')
  const brandB = watchBName.split(' ')[0]
  const modelB = watchBName.split(' ').slice(1).join(' ')

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4 animate-[fadeIn_150ms_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${spec.fullLabel} details`}
    >
      <div className="fixed inset-0 bg-black/80" />

      <div
        className="relative w-full max-w-[600px] my-auto rounded-2xl border border-patina-border bg-[#0d0d0d] p-6 md:p-8 animate-[scaleIn_200ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-patina-text3 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        {/* Title */}
        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-patina-gold mb-1 pr-12">{spec.fullLabel}</h3>
        <p className="text-xs text-patina-text3 mb-6">{watchAName} vs {watchBName}</p>

        {/* Two value boxes side by side */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border border-[#c9a84c]/30 bg-[#c9a84c]/5 p-4">
            <p className="text-[10px] uppercase tracking-widest text-patina-gold/70 mb-0.5">{brandA}</p>
            <p className="text-xs text-patina-gold/50 mb-3 leading-tight truncate">{modelA}</p>
            <p className={`text-2xl font-semibold ${spec.winner === 'a' ? 'text-emerald-400' : 'text-patina-text'}`}>
              {spec.valueA ?? '—'}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-[10px] uppercase tracking-widest text-patina-text3 mb-0.5">{brandB}</p>
            <p className="text-xs text-patina-text3/50 mb-3 leading-tight truncate">{modelB}</p>
            <p className={`text-2xl font-semibold ${spec.winner === 'b' ? 'text-emerald-400' : 'text-patina-text'}`}>
              {spec.valueB ?? '—'}
            </p>
          </div>
        </div>

        {/* Progress bars with value + score */}
        {(pctA !== null || pctB !== null) && (
          <div className="space-y-2.5 mb-6">
            {pctA !== null && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-patina-gold font-medium">{brandA}</span>
                  <span className="text-xs text-patina-text3">
                    {spec.valueA}
                    <span className="mx-1.5 text-patina-text3/40">&bull;</span>
                    <span className="text-patina-gold">{Math.round(pctA / 10)}/10</span>
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-[#c9a84c] transition-all duration-700" style={{ width: `${pctA}%` }} />
                </div>
              </div>
            )}
            {pctB !== null && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-patina-text2 font-medium">{brandB}</span>
                  <span className="text-xs text-patina-text3">
                    {spec.valueB}
                    <span className="mx-1.5 text-patina-text3/40">&bull;</span>
                    <span className="text-patina-text2">{Math.round(pctB / 10)}/10</span>
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-white/30 transition-all duration-700" style={{ width: `${pctB}%` }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Explanation */}
        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-patina-text3 mb-2">What This Means for Buyers</p>
          <p className="text-sm text-patina-text2 leading-relaxed">{spec.explanation}</p>
        </div>

        {/* Similar watches — clickable links */}
        {similarWatches.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-patina-text3 mb-2">
              Watches Known for {spec.fullLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {similarWatches.map((watch) => (
                <Link
                  key={watch.name}
                  href={watch.href}
                  onClick={onClose}
                  className="rounded-full bg-white/5 border border-white/8 px-3 py-1.5 text-xs text-patina-text2 hover:bg-patina-gold/10 hover:border-patina-gold/20 hover:text-patina-gold transition-colors"
                >
                  {watch.name}
                </Link>
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

function getSimilarWatchPills(specLabel: string): WatchPill[] {
  const map: Record<string, WatchPill[]> = {
    'Water Resistance': [
      { name: 'Rolex Sea-Dweller', href: '/watch/rolex/sea-dweller' },
      { name: 'Omega Planet Ocean', href: '/watch/omega/planet-ocean' },
      { name: 'Blancpain Fifty Fathoms', href: '/watch/blancpain/fifty-fathoms' },
    ],
    'Power Reserve': [
      { name: 'Panerai Luminor', href: '/watch/panerai/luminor' },
      { name: 'IWC Portugieser', href: '/watch/iwc/portugieser' },
      { name: 'A. Lange & Sohne Lange 1', href: '/watch/a-lange-sohne/lange-1' },
    ],
    'Case Diameter': [
      { name: 'Panerai Luminor 44mm', href: '/watch/panerai/luminor' },
      { name: 'Cartier Santos 35mm', href: '/watch/cartier/santos' },
      { name: 'AP Royal Oak 41mm', href: '/watch/audemars-piguet/royal-oak-15500st' },
    ],
    'Case Thickness': [
      { name: 'Piaget Altiplano', href: '/watch/piaget/altiplano' },
      { name: 'Bulgari Octo Finissimo', href: '/watch/bulgari/octo-finissimo' },
      { name: 'JLC Master Ultra Thin', href: '/watch/jaeger-lecoultre/master-ultra-thin' },
    ],
    'Jewel Count': [
      { name: 'Zenith El Primero', href: '/watch/zenith/el-primero' },
      { name: 'Vacheron Overseas', href: '/watch/vacheron-constantin/overseas' },
      { name: 'Breguet Tradition', href: '/watch/breguet/tradition' },
    ],
    'Beat Frequency': [
      { name: 'Zenith El Primero', href: '/watch/zenith/el-primero' },
      { name: 'TAG Heuer Monaco', href: '/watch/tag-heuer/monaco' },
      { name: 'Chopard L.U.C', href: '/watch/chopard/luc' },
    ],
    'COSC Certified': [
      { name: 'Rolex Datejust', href: '/watch/rolex/datejust' },
      { name: 'Breitling Navitimer', href: '/watch/breitling/navitimer' },
      { name: 'Omega Constellation', href: '/watch/omega/constellation' },
    ],
    'Case Material': [
      { name: 'AP Royal Oak Steel', href: '/watch/audemars-piguet/royal-oak-15500st' },
      { name: 'Hublot Big Bang', href: '/watch/hublot/big-bang' },
      { name: 'Tudor Black Bay Bronze', href: '/watch/tudor/black-bay-bronze' },
    ],
    'Caliber': [
      { name: 'Rolex Submariner', href: '/watch/rolex/submariner-date' },
      { name: 'Omega Seamaster', href: '/watch/omega/seamaster-diver-300m' },
      { name: 'Patek Nautilus', href: '/watch/patek-philippe/nautilus-5711-1a' },
    ],
  }
  return map[specLabel] || []
}

export function InteractiveSpecTable({ specs, watchAName, watchBName }: InteractiveSpecTableProps) {
  const [selectedSpec, setSelectedSpec] = useState<SpecRow | null>(null)

  return (
    <>
      <section className="py-8">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
          Full Specifications
        </h2>
        <div className="rounded-2xl border border-patina-border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-0">
            <thead>
              <tr className="border-b border-patina-border bg-patina-bg2">
                <th className="px-2 sm:px-4 py-3 text-left text-patina-text3 font-medium text-[10px] sm:text-xs uppercase tracking-wider w-24 sm:w-36">
                  Spec
                </th>
                <th className="px-2 sm:px-4 py-3 text-center text-patina-gold font-medium text-[10px] sm:text-xs uppercase tracking-wider">
                  {watchAName}
                </th>
                <th className="px-2 sm:px-4 py-3 text-center text-patina-text2 font-medium text-[10px] sm:text-xs uppercase tracking-wider">
                  {watchBName}
                </th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, i) => (
                <tr
                  key={spec.label}
                  className={`border-b border-patina-border cursor-pointer transition-colors hover:bg-patina-gold/5 ${
                    i % 2 === 0 ? 'bg-patina-bg' : 'bg-patina-bg2/50'
                  }`}
                  onClick={() => setSelectedSpec(spec)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedSpec(spec) }}
                >
                  <td className="px-2 sm:px-4 py-3 text-patina-text2 font-medium whitespace-nowrap text-xs sm:text-sm">
                    <span className="flex items-center gap-1 sm:gap-2">
                      {spec.label}
                      <svg width="14" height="14" viewBox="0 0 16 16" className="text-patina-text3 opacity-50 shrink-0 hidden sm:block">
                        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <text x="8" y="12" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="600">i</text>
                      </svg>
                    </span>
                  </td>
                  <td className={`px-2 sm:px-4 py-3 text-center text-xs sm:text-sm ${
                    spec.winner === 'a' ? 'text-emerald-400 font-medium' : 'text-patina-text'
                  }`}>
                    {spec.valueA ?? '—'}
                  </td>
                  <td className={`px-2 sm:px-4 py-3 text-center text-xs sm:text-sm ${
                    spec.winner === 'b' ? 'text-emerald-400 font-medium' : 'text-patina-text'
                  }`}>
                    {spec.valueB ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-patina-text3 text-center">Click any row for details</p>
      </section>

      {selectedSpec && (
        <SpecModal
          spec={selectedSpec}
          watchAName={watchAName}
          watchBName={watchBName}
          onClose={() => setSelectedSpec(null)}
        />
      )}
    </>
  )
}
