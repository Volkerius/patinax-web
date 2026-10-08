import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { TOP_CATEGORIES, getCategoryBySlug } from '@/lib/top-content'
import { BASE_URL } from '@/lib/seo'
import { toSlug } from '@/lib/slug'
import { WatchIllustration } from '@/components/ui/WatchPlaceholder'
import { StarRating } from '@/components/ui/StarRating'

export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) return { title: 'Category Not Found' }

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    keywords: [
      cat.label.toLowerCase(),
      `${cat.label.toLowerCase()} 2026`,
      'best luxury watches',
      'top watches ranked',
      'watch buying guide',
    ],
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      type: 'article',
      url: `${BASE_URL}/top/${cat.slug}`,
      siteName: 'Patinax',
      images: [{ url: `${BASE_URL}/og-default.jpg`, width: 1200, height: 630, alt: cat.label }],
    },
    twitter: { card: 'summary_large_image', title: cat.metaTitle, description: cat.metaDescription },
    alternates: { canonical: `${BASE_URL}/top/${cat.slug}` },
  }
}

export async function generateStaticParams() {
  return TOP_CATEGORIES.map((c) => ({ category: c.slug }))
}

const PRICE_LABELS: Record<number, string> = {
  1: 'Under $1,000',
  2: '$1,000 - $5,000',
  3: '$5,000 - $15,000',
  4: '$15,000 - $50,000',
  5: '$50,000+',
}

function specHighlights(watch: {
  caseDiameter?: number | null
  waterResistance?: number | null
  powerReserve?: number | null
  movement?: string | null
  cosc: boolean
  priceRange: number
}): string[] {
  const highlights: string[] = []
  if (watch.caseDiameter) highlights.push(`${watch.caseDiameter} mm case`)
  if (watch.waterResistance) highlights.push(`${watch.waterResistance}m WR`)
  if (watch.powerReserve) highlights.push(`${watch.powerReserve}h power reserve`)
  if (watch.movement) highlights.push(watch.movement)
  if (watch.cosc) highlights.push('COSC certified')
  highlights.push(PRICE_LABELS[watch.priceRange] ?? '')
  return highlights.filter(Boolean)
}

export default async function TopCategoryPage({ params }: PageProps) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()

  const { prisma } = await import('@/lib/prisma')
  const watches = await prisma.watch.findMany({
    where: cat.prismaWhere,
    orderBy: cat.orderBy,
    take: 15,
  })

  const otherCategories = TOP_CATEGORIES.filter((c) => c.slug !== cat.slug)

  // Find the top-ranked watch for "Compare with #1" links
  const topWatch = watches[0] ?? null

  // JSON-LD: ItemList
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cat.label,
    description: cat.metaDescription,
    url: `${BASE_URL}/top/${cat.slug}`,
    numberOfItems: watches.length,
    itemListElement: watches.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${w.brand} ${w.model}`,
        brand: { '@type': 'Brand', name: w.brand },
        url: `${BASE_URL}/watch/${toSlug(w.brand)}/${toSlug(w.model)}`,
        ...(w.imageUrl ? { image: w.imageUrl } : {}),
      },
    })),
  }

  // JSON-LD: FAQPage
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cat.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  // JSON-LD: BreadcrumbList
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Best Watches', item: `${BASE_URL}/top` },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `${BASE_URL}/top/${cat.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="pb-6 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/top" className="hover:text-patina-gold transition-colors">Best Watches</Link></li>
            <li>/</li>
            <li className="text-patina-text2">{cat.label}</li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-patina-text">
          {cat.metaTitle.split(' — ')[0]}
          <span className="block mt-1 text-base sm:text-lg font-normal text-patina-gold">
            Ranked and Compared for 2026
          </span>
        </h1>

        {/* Intro */}
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-patina-text2 max-w-3xl">
          {cat.intro}
        </p>

        {/* Watch list */}
        {watches.length > 0 ? (
          <ol className="mt-10 space-y-4">
            {watches.map((watch, index) => {
              const rank = index + 1
              const watchHref = `/watch/${toSlug(watch.brand)}/${toSlug(watch.model)}`
              const highlights = specHighlights(watch)
              const compareSlug = topWatch && rank > 1
                ? `${toSlug(topWatch.brand)}-${toSlug(topWatch.model)}-vs-${toSlug(watch.brand)}-${toSlug(watch.model)}`
                : null

              return (
                <li key={watch.id} className="group rounded-xl border border-patina-border bg-patina-bg2 p-4 sm:p-5 transition-all hover:border-patina-gold/30 hover:bg-patina-bg3">
                  <div className="flex gap-4 sm:gap-6 items-start">
                    {/* Rank number */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-patina-bg3 border border-patina-border flex items-center justify-center">
                      <span className="font-playfair text-lg sm:text-xl font-bold text-patina-gold">
                        {rank}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-patina-bg3 overflow-hidden flex items-center justify-center">
                      {watch.imageUrl ? (
                        <Image
                          src={watch.imageUrl}
                          alt={`${watch.brand} ${watch.model}`}
                          width={96}
                          height={96}
                          className="object-contain p-2"
                        />
                      ) : (
                        <WatchIllustration
                          brand={watch.brand}
                          model={watch.model}
                          className="h-3/4 w-3/4 opacity-80"
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-patina-gold font-medium uppercase tracking-wider">{watch.brand}</p>
                      <h2 className="mt-0.5 font-playfair text-base sm:text-lg font-semibold text-patina-text group-hover:text-patina-gold2 transition-colors">
                        <Link href={watchHref}>{watch.model}</Link>
                      </h2>
                      <div className="mt-1.5 flex items-center gap-2">
                        <StarRating rating={watch.priceRange} max={5} />
                      </div>

                      {/* Spec highlights */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {highlights.map((h) => (
                          <span key={h} className="inline-block rounded-full bg-patina-bg px-2.5 py-0.5 text-xs text-patina-text3 border border-patina-border">
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="mt-3 flex items-center gap-4 text-xs">
                        <Link href={watchHref} className="text-patina-gold hover:text-patina-gold2 transition-colors font-medium">
                          View Details
                        </Link>
                        {compareSlug && (
                          <Link href={`/compare/${compareSlug}`} className="text-patina-text3 hover:text-patina-gold transition-colors">
                            Compare with #{1}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        ) : (
          <div className="mt-10 rounded-xl border border-patina-border bg-patina-bg2 p-12 text-center">
            <p className="text-patina-text2">No watches found in this category yet.</p>
            <Link href="/search" className="mt-4 inline-block text-sm text-patina-gold hover:text-patina-gold2 transition-colors">
              Search all watches
            </Link>
          </div>
        )}

        {/* FAQ */}
        {cat.faq.length > 0 && (
          <section className="mt-16">
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-patina-text mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {cat.faq.map((f) => (
                <details
                  key={f.question}
                  className="group/faq rounded-xl border border-patina-border bg-patina-bg2 overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-4 sm:p-5 text-sm sm:text-base font-medium text-patina-text hover:text-patina-gold transition-colors">
                    {f.question}
                    <span className="ml-4 flex-shrink-0 text-patina-text3 group-open/faq:rotate-180 transition-transform">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm leading-relaxed text-patina-text2">
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Categories */}
        <section className="mt-16">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-patina-text mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherCategories.map((other) => (
              <Link
                key={other.slug}
                href={`/top/${other.slug}`}
                className="rounded-xl border border-patina-border bg-patina-bg2 p-4 text-center transition-all hover:border-patina-gold/30 hover:bg-patina-bg3"
              >
                <p className="text-sm font-medium text-patina-text hover:text-patina-gold2 transition-colors">
                  {other.label}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
