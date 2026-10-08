'use client'

import Link from 'next/link'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-playfair text-3xl font-bold text-patina-text mb-4">Something Went Wrong</h1>
      <p className="text-patina-text2 mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex rounded-lg bg-patina-gold/10 border border-patina-gold/30 px-6 py-3 text-sm text-patina-gold hover:bg-patina-gold/20 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex rounded-lg bg-patina-gold/10 border border-patina-gold/30 px-6 py-3 text-sm text-patina-gold hover:bg-patina-gold/20 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
