import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TIER_MAP, ALL_TIERS } from '@/lib/tier-content'
import { BASE_URL } from '@/lib/seo'
import { WatchCard } from '@/components/ui/WatchCard'

export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  params: Promise<{ tier: string }>
}

export async function generateStaticParams() {
  return ALL_TIERS.map((tier) => ({ tier }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tier } = await params
  const content = TIER_MAP[tier]
  if (!content) return { title: 'Price Range Not Found' }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `${BASE_URL}/tier/${content.slug}`,
    },
    keywords: [
      `${content.label.toLowerCase()} watches`,
      `best watches ${content.priceLabel.toLowerCase()}`,
      `luxury watches ${content.priceLabel.toLowerCase()}`,
      'watch comparison',
      'luxury watch price guide',
    ],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${BASE_URL}/tier/${content.slug}`,
      type: 'website',
    },
  }
}

export default async function TierPage({ params }: PageProps) {
  const { tier } = await params
  const content = TIER_MAP[tier]
  if (!content) notFound()

  const { prisma } = await import('@/lib/prisma')

  const watches = await prisma.watch.findMany({
    where: { priceRange: content.priceRange },
    orderBy: { brand: 'asc' },
  })

  const brandCount = new Set(watches.map((w) => w.brand)).size
  const styleCounts: Record<string, number> = {}
  for (const w of watches) {
    const s = w.style ?? 'unknown'
    styleCounts[s] = (styleCounts[s] || 0) + 1
  }
  const sortedStyles = Object.entries(styleCounts).sort((a, b) => b[1] - a[1])

  const comparisons = await prisma.comparison.findMany({
    where: {
      watchA: { priceRange: content.priceRange },
      watchB: { priceRange: content.priceRange },
    },
    include: { watchA: true, watchB: true },
    orderBy: { viewCount: 'desc' },
    take: 6,
  })

  const tierKeys = ALL_TIERS
  const currentIndex = tierKeys.indexOf(tier)
  const adjacentTiers = tierKeys
    .filter((_, i) => i !== currentIndex)
    .map((t) => TIER_MAP[t])

  const pageUrl = `${BASE_URL}/tier/${content.slug}`

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${content.title} - ${content.priceLabel}`,
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
      { '@type': 'ListItem', position: 2, name: 'Price Range', item: `${BASE_URL}/tier` },
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
            <li><span className="text-patina-text3">Price Range</span></li>
            <li>/</li>
            <li className="text-patina-text2">{content.label}</li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="font-playfair text-xl sm:text-3xl font-bold text-patina-text mb-1">
          {content.title}
        </h1>
        <p className="text-base text-patina-gold font-medium mb-2">{content.priceLabel}</p>

        {/* Intro */}
        <div className="text-sm text-patina-text2 leading-relaxed mb-8 max-w-3xl space-y-3">
          {content.intro.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Highlights + Signature Brands */}
        {(content.highlights.length > 0 || content.signatureBrands.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-3xl">
            {content.highlights.length > 0 && (
              <div className="rounded-xl border border-patina-border bg-patina-bg2 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-3">
                  What to Expect
                </h3>
                <ul className="space-y-1.5">
                  {content.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-patina-text2">
                      <span className="mt-0.5 text-patina-gold">&#x2022;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {content.signatureBrands.length > 0 && (
              <div className="rounded-xl border border-patina-border bg-patina-bg2 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-3">
                  Signature Brands & Models
                </h3>
                <p className="text-xs text-patina-text2 leading-relaxed">
                  {content.signatureBrands.join(' · ')}
                </p>
              </div>
            )}
          </div>
        )}

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
            <div className="flex flex-wrap justify-center gap-1">
              {sortedStyles.slice(0, 3).map(([styleName, count]) => (
                <span key={styleName} className="text-xs text-patina-gold capitalize">
                  {styleName} ({count})
                </span>
              ))}
            </div>
            <p className="text-xs text-patina-text3 mt-1">Top Styles</p>
          </div>
        </div>

        {/* Watch Grid */}
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
            All {content.label} Watches ({watches.length})
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
              <p className="text-patina-text2">No watches found in this price range yet.</p>
              <Link href="/search" className="mt-4 inline-block text-sm text-patina-gold hover:text-patina-gold2 transition-colors">
                Search all watches
              </Link>
            </div>
          )}
        </section>

        {/* Compare in This Range */}
        {comparisons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
              Compare in This Range
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {comparisons.map((comp) => (
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

        {/* Adjacent Tiers */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
            Explore Other Price Ranges
          </h2>
          <div className="flex flex-wrap gap-2">
            {adjacentTiers.map((t) => (
              <Link
                key={t.slug}
                href={`/tier/${t.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-2 text-sm text-patina-text hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
              >
                {t.label} <span className="text-patina-text3">({t.priceLabel})</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
