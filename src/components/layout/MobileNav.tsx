'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SearchBar } from '../ui/SearchBar'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-patina-text2 hover:text-patina-text transition-colors"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-patina-border bg-patina-bg/95 backdrop-blur-xl px-4 py-4 space-y-4">
          <SearchBar />
          <div className="flex flex-col gap-3">
            <Link
              href="/watches"
              onClick={() => setOpen(false)}
              className="text-sm text-patina-text2 hover:text-patina-text transition-colors py-1"
            >
              Watches
            </Link>
            <Link
              href="/brands"
              onClick={() => setOpen(false)}
              className="text-sm text-patina-text2 hover:text-patina-text transition-colors py-1"
            >
              Brands
            </Link>
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="text-sm text-patina-text2 hover:text-patina-text transition-colors py-1"
            >
              Browse
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
