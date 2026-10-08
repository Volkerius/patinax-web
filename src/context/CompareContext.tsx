'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface CompareWatch {
  brand: string
  model: string
  slug: string
}

interface CompareContextValue {
  watches: CompareWatch[]
  addWatch: (watch: CompareWatch) => void
  removeWatch: (slug: string) => void
  clearAll: () => void
  isSelected: (slug: string) => boolean
}

const CompareContext = createContext<CompareContextValue | null>(null)

const STORAGE_KEY = 'patinax-compare-basket'

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [watches, setWatches] = useState<CompareWatch[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setWatches(parsed.slice(0, 2))
        }
      }
    } catch {
      // Ignore parse errors
    }
    setHydrated(true)
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watches))
    }
  }, [watches, hydrated])

  const addWatch = useCallback((watch: CompareWatch) => {
    setWatches((prev) => {
      if (prev.length >= 2) return prev
      if (prev.some((w) => w.slug === watch.slug)) return prev
      return [...prev, watch]
    })
  }, [])

  const removeWatch = useCallback((slug: string) => {
    setWatches((prev) => prev.filter((w) => w.slug !== slug))
  }, [])

  const clearAll = useCallback(() => {
    setWatches([])
  }, [])

  const isSelected = useCallback(
    (slug: string) => watches.some((w) => w.slug === slug),
    [watches]
  )

  return (
    <CompareContext.Provider value={{ watches, addWatch, removeWatch, clearAll, isSelected }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return context
}
