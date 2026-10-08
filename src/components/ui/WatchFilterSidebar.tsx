'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface FilterOption {
  value: string
  label: string
}

const styleOptions: FilterOption[] = [
  { value: 'diver', label: 'Diver' },
  { value: 'dress', label: 'Dress' },
  { value: 'sport', label: 'Sport' },
  { value: 'pilot', label: 'Pilot' },
  { value: 'field', label: 'Field' },
  { value: 'chrono', label: 'Chronograph' },
]

const priceOptions: FilterOption[] = [
  { value: '1', label: '$' },
  { value: '2', label: '$$' },
  { value: '3', label: '$$$' },
  { value: '4', label: '$$$$' },
  { value: '5', label: '$$$$$' },
]

const movementOptions: FilterOption[] = [
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Manual', label: 'Manual' },
  { value: 'Quartz', label: 'Quartz' },
]

const sortOptions: FilterOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export function WatchFilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeStyle = searchParams.get('style')
  const activePrice = searchParams.get('price')
  const activeMovement = searchParams.get('movement')
  const activeSort = searchParams.get('sort') || 'newest'

  function setFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`?${params.toString()}`)
  }

  function clearAll() {
    router.push('?')
  }

  const hasFilters = activeStyle || activePrice || activeMovement

  return (
    <aside className="space-y-6">
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-xs text-patina-gold hover:text-patina-gold2 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Clear filters
        </button>
      )}

      <FilterGroup
        title="Sort By"
        options={sortOptions}
        active={activeSort}
        onSelect={(v) => setFilter('sort', v)}
      />

      <FilterGroup
        title="Style"
        options={styleOptions}
        active={activeStyle}
        onSelect={(v) => setFilter('style', v === activeStyle ? null : v)}
      />

      <FilterGroup
        title="Price Range"
        options={priceOptions}
        active={activePrice}
        onSelect={(v) => setFilter('price', v === activePrice ? null : v)}
      />

      <FilterGroup
        title="Movement"
        options={movementOptions}
        active={activeMovement}
        onSelect={(v) => setFilter('movement', v === activeMovement ? null : v)}
      />
    </aside>
  )
}

function FilterGroup({
  title,
  options,
  active,
  onSelect,
}: {
  title: string
  options: FilterOption[]
  active: string | null
  onSelect: (value: string) => void
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-patina-text uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
              active === opt.value
                ? 'border-patina-gold bg-patina-gold/10 text-patina-gold'
                : 'border-patina-border text-patina-text2 hover:border-patina-text3'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
