import Link from 'next/link'

export default function TierNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-playfair text-3xl font-bold text-patina-text mb-4">Tier Not Found</h1>
      <p className="text-patina-text2 mb-8">
        We couldn&apos;t find the watch tier you&apos;re looking for.
      </p>
      <Link
        href="/search"
        className="inline-flex rounded-lg bg-patina-gold/10 border border-patina-gold/30 px-6 py-3 text-sm text-patina-gold hover:bg-patina-gold/20 transition-colors"
      >
        Search Watches
      </Link>
    </div>
  )
}
