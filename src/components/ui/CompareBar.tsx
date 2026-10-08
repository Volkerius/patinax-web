'use client'

import { useRouter } from 'next/navigation'
import { useCompare } from '@/context/CompareContext'
import { toSlug } from '@/lib/slug'

export function CompareBar() {
  const { watches, clearAll } = useCompare()
  const router = useRouter()
  const visible = watches.length > 0

  function handleCompare() {
    if (watches.length !== 2) return
    const slug = `${toSlug(watches[0].brand)}-${toSlug(watches[0].model)}-vs-${toSlug(watches[1].brand)}-${toSlug(watches[1].model)}`
    clearAll()
    router.push(`/compare/${slug}`)
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t-2 border-[#c9a84c]/60 bg-[#1a1a1a] shadow-[0_-4px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-bold text-[#c9a84c]">VS</span>
          <span className="text-patina-text">
            {watches.length === 1 && (
              <>
                <span className="font-medium text-patina-text2">
                  {watches[0].brand} {watches[0].model}
                </span>
                {' '}&mdash; select one more to compare
              </>
            )}
            {watches.length === 2 && (
              <>
                <span className="font-medium text-patina-text2">
                  {watches[0].brand} {watches[0].model}
                </span>
                {' '}vs{' '}
                <span className="font-medium text-patina-text2">
                  {watches[1].brand} {watches[1].model}
                </span>
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {watches.length === 2 && (
            <button
              type="button"
              onClick={handleCompare}
              className="rounded-lg bg-[#c9a84c] px-4 py-1.5 text-sm font-semibold text-[#0a0a0a] transition-colors hover:bg-[#d4b85d]"
            >
              Compare Now
            </button>
          )}
          <button
            type="button"
            onClick={clearAll}
            aria-label="Clear comparison"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-patina-text3 transition-colors hover:bg-white/10 hover:text-patina-text"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
