'use client'

import { useMemo, useState, useCallback } from 'react'
import Link from 'next/link'

interface Brand {
  name: string
  slug: string
  count: number
}

interface BrandsGridProps {
  brands: Brand[]
}

export function BrandsGrid({ brands }: BrandsGridProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return brands
    return brands.filter((b) => b.name.toLowerCase().includes(q))
  }, [brands, search])

  const grouped = useMemo(() => {
    const map = new Map<string, Brand[]>()
    for (const brand of filtered) {
      const letter = brand.name[0].toUpperCase()
      const list = map.get(letter) ?? []
      list.push(brand)
      map.set(letter, list)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const letters = useMemo(() => grouped.map(([letter]) => letter), [grouped])

  const scrollToLetter = useCallback((letter: string) => {
    const el = document.getElementById(`letter-${letter}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-8 max-w-md">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-patina-text2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-patina-border bg-patina-bg2 py-2.5 pl-10 pr-4 text-sm text-patina-text placeholder:text-patina-text2/60 outline-none focus:border-patina-gold/50 focus:ring-1 focus:ring-patina-gold/30 transition-colors"
        />
      </div>

      {/* Mobile letter index — horizontal scrollable row */}
      <div className="mb-6 flex gap-1 overflow-x-auto pb-2 md:hidden">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => scrollToLetter(letter)}
            className="flex-shrink-0 rounded-md border border-patina-border px-2.5 py-1 text-xs font-medium text-patina-gold hover:bg-patina-gold/10 transition-colors"
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Desktop letter index sidebar */}
        <aside className="hidden md:block sticky top-24 h-fit">
          <div className="flex flex-col gap-1">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                className="rounded-md px-2 py-1 text-sm font-medium text-patina-gold hover:bg-patina-gold/10 transition-colors text-left"
              >
                {letter}
              </button>
            ))}
          </div>
        </aside>

        {/* Main grid */}
        <div className="flex-1 min-w-0">
          {grouped.length === 0 && (
            <p className="text-patina-text2 py-12 text-center">
              No brands found matching &ldquo;{search}&rdquo;
            </p>
          )}

          {grouped.map(([letter, items]) => (
            <section key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-24">
              {/* Letter header */}
              <h2 className="mb-4 text-3xl font-bold text-patina-gold font-playfair">
                {letter}
              </h2>

              {/* Brand cards grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/brand/${brand.slug}`}
                    className="group rounded-xl border border-patina-border bg-patina-bg2 p-4 transition-all hover:border-patina-gold/30 hover:bg-patina-bg2/80"
                  >
                    <span className="block font-playfair text-base font-semibold text-patina-text group-hover:text-patina-gold transition-colors">
                      {brand.name}
                    </span>
                    <span className="mt-1 block text-xs text-patina-text2">
                      {brand.count} {brand.count === 1 ? 'watch' : 'watches'}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
