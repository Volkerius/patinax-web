import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found — Patinax',
  description: 'The page you were looking for does not exist. Browse luxury watches and comparisons on Patinax.',
  robots: { index: false, follow: true },
}

const QUICK_LINKS = [
  { href: '/watches', label: 'Browse All Watches' },
  { href: '/brands', label: 'All Brands' },
  { href: '/style/diver', label: 'Diving Watches' },
  { href: '/style/dress', label: 'Dress Watches' },
  { href: '/style/chrono', label: 'Chronographs' },
  { href: '/tier/mid-luxury', label: '$5K–$15K Tier' },
]

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:py-28 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-patina-gold/70">
        Error 404
      </p>
      <h1 className="mt-4 font-playfair text-4xl sm:text-5xl font-bold text-patina-text">
        This page <span className="text-patina-gold">doesn&apos;t exist</span>
      </h1>
      <p className="mt-5 text-base text-patina-text2 leading-relaxed max-w-lg mx-auto">
        The page you&apos;re looking for may have been moved, removed, or never existed.
        Try one of the links below, or search for the watch you had in mind.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-patina-gold px-6 py-3 text-sm font-semibold text-patina-bg hover:bg-patina-gold2 transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center justify-center rounded-lg border border-patina-border bg-patina-bg2 px-6 py-3 text-sm text-patina-text hover:border-patina-gold/30 hover:bg-patina-bg3 transition-colors"
        >
          Search Watches
        </Link>
      </div>

      <div className="mt-14 border-t border-patina-border pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-patina-text3 mb-4">
          Or explore
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-patina-border bg-patina-bg2 px-4 py-2 text-xs text-patina-text2 hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
