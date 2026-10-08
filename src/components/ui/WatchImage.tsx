'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WatchIllustration } from './WatchPlaceholder'

interface WatchImageProps {
  src: string | null | undefined
  brand: string
  model: string
  sizes?: string
  priority?: boolean
  /** Extra classes on the <Image> tag (not the wrapper). */
  className?: string
  /** Padding inside the image area (default "p-4"). */
  padding?: string
}

/**
 * Thin client wrapper around next/image that swaps in the SVG WatchIllustration
 * if the src is missing OR the image fails to load. Prevents broken-image icons
 * from showing on the watch cards and detail pages.
 */
export function WatchImage({
  src,
  brand,
  model,
  sizes = '(max-width: 768px) 50vw, 25vw',
  priority = false,
  className = 'object-contain transition-transform group-hover:scale-105',
  padding = 'p-4',
}: WatchImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <WatchIllustration
          brand={brand}
          model={model}
          className="h-3/4 w-3/4 opacity-80 transition-transform group-hover:scale-105"
        />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={`${brand} ${model}`}
      fill
      sizes={sizes}
      priority={priority}
      className={`${className} ${padding}`}
      onError={() => setFailed(true)}
    />
  )
}
