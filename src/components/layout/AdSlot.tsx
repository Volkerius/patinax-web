'use client'
import { useEffect, useRef } from 'react'

interface AdSlotProps {
  slot: 'leaderboard' | 'rectangle' | 'footer'
  className?: string
}

const AD_SIZES = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  footer: { width: 728, height: 90 },
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const size = AD_SIZES[slot]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).ezstandalone) {
              const ez = (window as unknown as Record<string, { cmd: { push: (fn: () => void) => void }; refresh: () => void }>).ezstandalone
              ez.cmd.push(() => {
                ez.refresh()
              })
            }
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px' }
    )
    if (adRef.current) observer.observe(adRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={adRef}
      className={`ad-slot ad-${slot} flex items-center justify-center bg-transparent ${className}`}
      style={{ minHeight: size.height, width: '100%', maxWidth: size.width }}
      aria-label="Advertisement"
    >
      <div id={`ezoic-pub-ad-placeholder-${slot === 'leaderboard' ? '101' : slot === 'rectangle' ? '102' : '103'}`} />
    </div>
  )
}
