import { Metadata } from 'next'
import Link from 'next/link'
import { WatchCard } from '@/components/ui/WatchCard'
import { WatchFilterSidebar } from '@/components/ui/WatchFilterSidebar'
import { BASE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'All Watches — Patinax',
  description:
    'Browse all luxury watches. Filter by style, price range, and movement type. Find your perfect timepiece across 150+ premium brands.',
  alternates: { canonical: `${BASE_URL}/watches` },
  openGraph: {
    title: 'All Watches — Patinax',
    description:
      'Browse and compare luxury watches from 150+ premium brands with detailed specs and side-by-side comparisons.',
    type: 'website',
    url: `${BASE_URL}/watches`,
    siteName: 'Patinax',
    images: [{ url: `${BASE_URL}/og-default.jpg`, width: 1200, height: 630, alt: 'All Watches on Patinax' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Watches — Patinax',
    description: 'Browse 1000+ luxury watches across 150+ premium brands.',
  },
}

export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  searchParams: Promise<{
    style?: string
    price?: string
    movement?: string
    sort?: string
    page?: string
  }>
}

const PAGE_SIZE = 24

export default async function WatchesPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)

  const { prisma } = await import('@/lib/prisma')

  const where: Record<string, unknown> = {}
  if (params.style) where.style = params.style
  if (params.price) where.priceRange = parseInt(params.price, 10)
  if (params.movement) where.movement = { contains: params.movement, mode: 'insensitive' }

  const orderBy: Record<string, string> = {}
  switch (params.sort) {
    case 'popular':
      orderBy.updatedAt = 'desc'
      break
    case 'name':
      orderBy.model = 'asc'
      break
    case 'price-asc':
      orderBy.priceRange = 'asc'
      break
    case 'price-desc':
      orderBy.priceRange = 'desc'
      break
    default:
      orderBy.createdAt = 'desc'
  }

  // Total catalogue stats (unfiltered) for the header — cached with the page.
  const [watches, total, catalogueTotal, distinctBrands] = await Promise.all([
    prisma.watch.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.watch.count({ where }),
    Object.keys(where).length === 0 ? Promise.resolve(null) : prisma.watch.count(),
    prisma.watch.findMany({ select: { brand: true }, distinct: ['brand'] }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const fullCatalogue = catalogueTotal ?? total
  const hasActiveFilter = params.style || params.price || params.movement || params.sort

  const paginationParams = { ...params }
  delete paginationParams.page

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'All Watches', item: `${BASE_URL}/watches` },
    ],
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Watches',
    description: 'Browse all luxury watches on Patinax.',
    url: `${BASE_URL}/watches`,
    numberOfItems: fullCatalogue,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Breadcrumb */}
        <nav className="pb-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-patina-text2">All Watches</li>
          </ol>
        </nav>

        <header className="max-w-3xl mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-patina-text">
            All Watches
          </h1>
          <p className="mt-3 text-sm text-patina-text2 leading-relaxed">
            Browse {fullCatalogue.toLocaleString()} luxury watch model{fullCatalogue !== 1 ? 's' : ''}
            {' '}from {distinctBrands.length} brands. Filter by style, price tier, or movement type
            to narrow the selection, then add any two watches to the comparison bar to see them
            head-to-head.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-56 shrink-0">
            <WatchFilterSidebar />
          </div>

          <div className="flex-1 min-w-0">
            {watches.length === 0 ? (
              <div className="rounded-xl border border-patina-border bg-patina-bg2 p-12 text-center">
                <p className="text-patina-text text-lg">No watches found</p>
                <p className="text-patina-text3 text-sm mt-1">
                  Try removing a filter or <Link href="/watches" className="text-patina-gold hover:text-patina-gold2">clear all</Link>.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-sm text-patina-text2">
                    <span className="text-patina-text font-medium">{total.toLocaleString()}</span>
                    {' '}watch{total !== 1 ? 'es' : ''}
                    {hasActiveFilter && total !== fullCatalogue && (
                      <span className="text-patina-text3"> of {fullCatalogue.toLocaleString()} total</span>
                    )}
                  </p>
                  {totalPages > 1 && (
                    <p className="text-xs text-patina-text3">
                      Page {page} of {totalPages}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watches.map((w) => (
                    <WatchCard
                      key={w.id}
                      watch={{
                        brand: w.brand,
                        model: w.model,
                        slug: w.slug,
                        imageUrl: w.imageUrl,
                        priceRange: w.priceRange,
                        caseDiameter: w.caseDiameter,
                        movement: w.movement,
                        style: w.style,
                      }}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className="flex justify-center gap-2 mt-10" aria-label="Pagination">
                    {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(
                      (p) => (
                        <a
                          key={p}
                          href={`?${new URLSearchParams({
                            ...paginationParams,
                            page: p.toString(),
                          } as Record<string, string>).toString()}`}
                          aria-current={p === page ? 'page' : undefined}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-colors ${
                            p === page
                              ? 'bg-patina-gold text-patina-bg font-semibold'
                              : 'border border-patina-border text-patina-text2 hover:border-patina-gold/50 hover:text-patina-text'
                          }`}
                        >
                          {p}
                        </a>
                      )
                    )}
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
