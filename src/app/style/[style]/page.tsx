import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { STYLE_MAP, ALL_STYLES } from '@/lib/style-content'
import { BASE_URL } from '@/lib/seo'
import { WatchCard } from '@/components/ui/WatchCard'
import { toSlug } from '@/lib/slug'

export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  params: Promise<{ style: string }>
}

export async function generateStaticParams() {
  return ALL_STYLES.map((style) => ({ style }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { style } = await params
  const content = STYLE_MAP[style]
  if (!content) return { title: 'Category Not Found' }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/style/${content.slug}`,
    },
    keywords: [
      `${content.label.toLowerCase()}`,
      `best ${content.label.toLowerCase()}`,
      `${content.label.toLowerCase()} comparison`,
      `luxury ${content.label.toLowerCase()}`,
      `${content.label.toLowerCase()} 2026`,
      'watch comparison',
      'luxury watches',
    ],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${BASE_URL}/style/${content.slug}`,
      type: 'website',
    },
  }
}

export default async function StylePage({ params }: PageProps) {
  const { style } = await params
  const content = STYLE_MAP[style]
  if (!content) notFound()

  const { prisma } = await import('@/lib/prisma')

  const watches = await prisma.watch.findMany({
    where: { style: { equals: style, mode: 'insensitive' } },
    orderBy: { brand: 'asc' },
  })

  const brandCount = new Set(watches.map((w) => w.brand)).size
  const diameters = watches.map((w) => w.caseDiameter).filter(Boolean) as number[]
  const minDiameter = diameters.length > 0 ? Math.min(...diameters) : null
  const maxDiameter = diameters.length > 0 ? Math.max(...diameters) : null
  const priceRanges = watches.map((w) => w.priceRange)
  const minPrice = priceRanges.length > 0 ? Math.min(...priceRanges) : 1
  const maxPrice = priceRanges.length > 0 ? Math.max(...priceRanges) : 5

  const popularComparisons = await prisma.comparison.findMany({
    where: {
      watchA: { style: { equals: style, mode: 'insensitive' } },
      watchB: { style: { equals: style, mode: 'insensitive' } },
    },
    include: { watchA: true, watchB: true },
    orderBy: { viewCount: 'desc' },
    take: 6,
  })

  const otherStyles = ALL_STYLES.filter((s) => s !== style)

  const priceStars = (range: number) => '\u2605'.repeat(range) + '\u2606'.repeat(5 - range)

  const pageUrl = `${BASE_URL}/style/${content.slug}`

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.title,
    description: content.metaDescription,
    url: pageUrl,
    numberOfItems: watches.length,
  }

  const faqJsonLd = content.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Watch Categories', item: `${BASE_URL}/style` },
      { '@type': 'ListItem', position: 3, name: content.label, item: pageUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li><span className="text-patina-text3">Watch Categories</span></li>
            <li>/</li>
            <li className="text-patina-text2">{content.label}</li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="font-playfair text-xl sm:text-3xl font-bold text-patina-text mb-2">
          {content.title}
          <span className="ml-2 text-patina-gold">Collection</span>
        </h1>

        {/* Intro */}
        <div className="text-sm text-patina-text2 leading-relaxed mb-8 max-w-3xl space-y-3">
          {content.intro.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl border border-patina-border bg-patina-bg2 p-4 text-center">
            <p className="text-2xl font-bold text-patina-gold">{watches.length}</p>
            <p className="text-xs text-patina-text3 mt-1">Watches</p>
          </div>
          <div className="rounded-xl border border-patina-border bg-patina-bg2 p-4 text-center">
            <p className="text-2xl font-bold text-patina-gold">{brandCount}</p>
            <p className="text-xs text-patina-text3 mt-1">Brands</p>
          </div>
          <div className="rounded-xl border border-patina-border bg-patina-bg2 p-4 text-center">
            <p className="text-2xl font-bold text-patina-gold">
              {minDiameter && maxDiameter
                ? `${minDiameter}-${maxDiameter}mm`
                : `${priceStars(minPrice)} - ${priceStars(maxPrice)}`
              }
            </p>
            <p className="text-xs text-patina-text3 mt-1">
              {minDiameter && maxDiameter ? 'Size Range' : 'Price Spread'}
            </p>
          </div>
        </div>

        {/* Highlights */}
        {content.highlights.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-4">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {content.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-patina-text2">
                  <span className="mt-0.5 text-patina-gold">&#x2022;</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Watch Grid */}
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
            All {content.label} ({watches.length})
          </h2>
          {watches.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
              <p className="text-patina-text2">No {content.label.toLowerCase()} found yet.</p>
              <Link href="/search" className="mt-4 inline-block text-sm text-patina-gold hover:text-patina-gold2 transition-colors">
                Search all watches
              </Link>
            </div>
          )}
        </section>

        {/* Popular Comparisons */}
        {popularComparisons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
              Popular {content.label} Comparisons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularComparisons.map((comp) => (
                <Link
                  key={comp.id}
                  href={`/compare/${comp.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-patina-border bg-patina-bg2 p-4 transition-all hover:border-patina-gold/30 hover:bg-patina-bg3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-patina-text truncate">
                      {comp.watchA.brand} {comp.watchA.model}
                    </p>
                    <p className="text-xs text-patina-gold mt-0.5">vs</p>
                    <p className="text-sm font-medium text-patina-text truncate">
                      {comp.watchB.brand} {comp.watchB.model}
                    </p>
                  </div>
                  <span className="text-xs text-patina-text3 whitespace-nowrap">{comp.viewCount} views</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {content.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {content.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-patina-border bg-patina-bg2 overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-medium text-patina-text hover:bg-patina-bg3 transition-colors">
                    {item.question}
                    <span className="ml-2 text-patina-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-patina-text2 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Explore Other Categories */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherStyles.map((s) => {
              const other = STYLE_MAP[s]
              return (
                <Link
                  key={s}
                  href={`/style/${other.slug}`}
                  className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-2 text-sm text-patina-text hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
                >
                  {other.label}
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}
