import { Metadata } from 'next'
import Link from 'next/link'
import { WatchCard } from '@/components/ui/WatchCard'
import { SearchBar } from '@/components/ui/SearchBar'
import { BASE_URL } from '@/lib/seo'

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams
  const query = q?.trim()

  if (query) {
    return {
      title: `"${query}" — Watch Search Results | Patinax`,
      description: `Search results for "${query}". Compare luxury watches matching your search with detailed specs, radar analysis, and expert verdicts.`,
      robots: { index: false, follow: true },
    }
  }

  return {
    title: 'Browse & Compare Luxury Watches — Patinax',
    description: 'Browse and compare luxury watches from Rolex, Omega, Patek Philippe, Audemars Piguet, and 150+ premium brands. Find your perfect timepiece with detailed specs and side-by-side comparisons.',
    keywords: [
      'browse luxury watches', 'compare watches', 'watch search',
      'find luxury watch', 'watch finder', 'watch comparison tool',
      'rolex watches', 'omega watches', 'patek philippe watches',
    ],
    alternates: { canonical: `${BASE_URL}/search` },
    openGraph: {
      title: 'Browse & Compare Luxury Watches — Patinax',
      description: 'Browse and compare luxury watches from 150+ premium brands with detailed specs and side-by-side comparisons.',
      type: 'website',
      url: `${BASE_URL}/search`,
      siteName: 'Patinax',
    },
  }
}

const ALL_BRANDS = [
  { slug: 'rolex', name: 'Rolex' },
  { slug: 'omega', name: 'Omega' },
  { slug: 'patek-philippe', name: 'Patek Philippe' },
  { slug: 'audemars-piguet', name: 'Audemars Piguet' },
  { slug: 'tudor', name: 'Tudor' },
  { slug: 'cartier', name: 'Cartier' },
  { slug: 'iwc', name: 'IWC' },
  { slug: 'jaeger-lecoultre', name: 'Jaeger-LeCoultre' },
  { slug: 'breitling', name: 'Breitling' },
  { slug: 'tag-heuer', name: 'TAG Heuer' },
  { slug: 'zenith', name: 'Zenith' },
  { slug: 'grand-seiko', name: 'Grand Seiko' },
]

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const query = q?.trim()

  const { prisma } = await import('@/lib/prisma')
  const watches = query
    ? await prisma.watch.findMany({
        where: {
          OR: [
            { brand: { contains: query, mode: 'insensitive' } },
            { model: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 40,
        orderBy: { brand: 'asc' },
      })
    : await prisma.watch.findMany({
        take: 40,
        orderBy: { updatedAt: 'desc' },
      })

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="font-playfair text-xl sm:text-3xl font-bold text-patina-text mb-6">
        {query ? `Results for "${query}"` : 'Browse Watches'}
      </h1>

      <div className="max-w-xl mb-8">
        <SearchBar />
      </div>

      {/* Brand Grid — shown when not searching */}
      {!query && (
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-4">
            Browse by Brand
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {ALL_BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brand/${brand.slug}`}
                className="flex flex-col items-center justify-center rounded-xl border border-patina-border bg-patina-bg2 px-3 py-4 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-patina-bg3 border border-patina-border mb-2">
                  <span className="font-playfair text-sm font-bold text-patina-gold">{brand.name.charAt(0)}</span>
                </div>
                <span className="text-xs text-patina-text font-medium text-center">{brand.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Watches / Search Results */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-4">
          {query ? 'Results' : 'All Watches'}
        </h2>
        {watches.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {watches.map((watch) => (
              <WatchCard
                key={watch.id}
                watch={{
                  brand: watch.brand,
                  model: watch.model,
                  slug: watch.slug,
                  imageUrl: watch.imageUrl,
                  priceRange: watch.priceRange,
                  caseDiameter: watch.caseDiameter,
                  movement: watch.movement,
                  style: watch.style,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-patina-border bg-patina-bg2 p-12 text-center">
            <p className="text-patina-text2">
              {query ? `No watches found for "${query}".` : 'No watches available yet.'}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
