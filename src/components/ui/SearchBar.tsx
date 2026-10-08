'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toSlug } from '@/lib/slug'

interface Suggestion {
  label: string
  brand: string
  model: string
  slug: string
  detail: string
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  // Fetch suggestions with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 3) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
        if (res.ok) {
          const data: Suggestion[] = await res.json()
          setSuggestions(data)
          setShowDropdown(data.length > 0)
          setActiveIndex(-1)
        }
      } catch {
        setSuggestions([])
      }
    }, 400)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowDropdown(false)
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      const s = suggestions[activeIndex]
      router.push(`/watch/${toSlug(s.brand)}/${toSlug(s.model)}`)
    } else if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search watches or compare (e.g. Rolex Submariner vs Omega Seamaster)"
          className="flex-1 min-w-0 rounded-lg border border-patina-border bg-patina-bg2 px-4 py-2.5 text-sm text-patina-text placeholder:text-patina-text3 focus:border-patina-gold/50 focus:outline-none focus:ring-1 focus:ring-patina-gold/30 transition-all"
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-patina-gold/10 border border-patina-gold/20 px-4 py-2.5 text-sm text-patina-gold hover:bg-patina-gold/20 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-patina-border bg-patina-bg2 shadow-xl shadow-black/40">
          <ul role="listbox" className="divide-y divide-patina-border/50">
            {suggestions.map((s, i) => (
              <li key={s.slug} role="option" aria-selected={i === activeIndex}>
                <Link
                  href={`/watch/${toSlug(s.brand)}/${toSlug(s.model)}`}
                  onClick={() => setShowDropdown(false)}
                  className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                    i === activeIndex
                      ? 'bg-patina-gold/10 text-patina-text'
                      : 'text-patina-text2 hover:bg-patina-bg3 hover:text-patina-text'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-patina-text">
                      <span className="text-patina-gold">{s.brand}</span>{' '}
                      {s.model}
                    </span>
                    {s.detail && (
                      <span className="text-xs text-patina-text3">{s.detail}</span>
                    )}
                  </div>
                  <svg className="h-4 w-4 shrink-0 text-patina-text3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          {/* Show all results link */}
          <Link
            href={`/search?q=${encodeURIComponent(query.trim())}`}
            onClick={() => setShowDropdown(false)}
            className="flex items-center justify-center gap-2 border-t border-patina-border px-4 py-2.5 text-xs text-patina-gold hover:bg-patina-gold/5 transition-colors"
          >
            See all results for &ldquo;{query.trim()}&rdquo;
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
