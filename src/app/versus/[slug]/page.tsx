import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BASE_URL } from '@/lib/seo'
import { toSlug } from '@/lib/slug'
import { WatchIllustration } from '@/components/ui/WatchPlaceholder'
import { StarRating } from '@/components/ui/StarRating'

export const dynamicParams = true
export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  params: Promise<{ slug: string }>
}

/** Parse "brand-a-vs-brand-b" slug into two brand slugs. */
function parseBrandSlugs(slug: string): { slugA: string; slugB: string } | null {
  const idx = slug.indexOf('-vs-')
  if (idx === -1) return null
  return { slugA: slug.slice(0, idx), slugB: slug.slice(idx + 4) }
}

/** Cache for brand slug → canonical name lookups */
let brandCache: Map<string, string> | null = null

async function getBrandMap(): Promise<Map<string, string>> {
  if (brandCache) return brandCache
  const { prisma } = await import('@/lib/prisma')
  const watches = await prisma.watch.findMany({
    select: { brand: true },
    distinct: ['brand'],
  })
  brandCache = new Map(watches.map((w) => [toSlug(w.brand), w.brand]))
  return brandCache
}

/** Resolve a brand slug back to its canonical name from the database. */
async function resolveBrandName(brandSlug: string): Promise<string | null> {
  const map = await getBrandMap()
  return map.get(brandSlug) ?? null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseBrandSlugs(slug)
  if (!parsed) return { title: 'Brand Comparison Not Found' }

  const [brandA, brandB] = await Promise.all([
    resolveBrandName(parsed.slugA),
    resolveBrandName(parsed.slugB),
  ])
  if (!brandA || !brandB) return { title: 'Brand Comparison Not Found' }

  const title = `${brandA} vs ${brandB} — Brand Comparison`
  const description = `${brandA} vs ${brandB}: head-to-head comparison with stats, model matchups, pricing, and expert analysis.`

  return {
    title,
    description,
    keywords: [
      `${brandA.toLowerCase()} vs ${brandB.toLowerCase()}`,
      `${brandB.toLowerCase()} vs ${brandA.toLowerCase()}`,
      `${brandA.toLowerCase()} or ${brandB.toLowerCase()}`,
      `${brandA.toLowerCase()} watches`,
      `${brandB.toLowerCase()} watches`,
      'luxury watch brand comparison',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${BASE_URL}/versus/${slug}`,
      siteName: 'Patinax',
      images: [{ url: `${BASE_URL}/og-default.jpg`, width: 1200, height: 630, alt: `${brandA} vs ${brandB}` }],
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `${BASE_URL}/versus/${slug}` },
  }
}

export async function generateStaticParams() {
  try {
    const { prisma } = await import('@/lib/prisma')

    // Fetch all comparisons with brand info
    const comparisons = await prisma.comparison.findMany({
      select: {
        watchA: { select: { brand: true } },
        watchB: { select: { brand: true } },
      },
    })

    // Count comparisons between each brand pair
    const pairCounts = new Map<string, number>()
    for (const c of comparisons) {
      const brands = [c.watchA.brand, c.watchB.brand].sort()
      const key = `${toSlug(brands[0])}-vs-${toSlug(brands[1])}`
      pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1)
    }

    // Sort by count descending, take top 40
    const sorted = [...pairCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)

    return sorted.map(([slug]) => ({ slug }))
  } catch {
    return []
  }
}

const PRICE_LABELS: Record<number, string> = {
  1: 'Under $1,000',
  2: '$1,000 - $5,000',
  3: '$5,000 - $15,000',
  4: '$15,000 - $50,000',
  5: '$50,000+',
}

function priceSpread(watches: { priceRange: number }[]): string {
  if (watches.length === 0) return 'N/A'
  const min = Math.min(...watches.map((w) => w.priceRange))
  const max = Math.max(...watches.map((w) => w.priceRange))
  if (min === max) return PRICE_LABELS[min] ?? 'N/A'
  return `${PRICE_LABELS[min] ?? '?'} to ${PRICE_LABELS[max] ?? '?'}`
}

function avg(values: (number | null | undefined)[]): number {
  const nums = values.filter((v): v is number => v != null)
  if (nums.length === 0) return 0
  return Math.round(nums.reduce((s, n) => s + n, 0) / nums.length)
}

function uniqueValues(values: (string | null | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => v != null))]
}

export default async function VersusPage({ params }: PageProps) {
  const { slug } = await params
  const parsed = parseBrandSlugs(slug)
  if (!parsed) notFound()

  const [brandA, brandB] = await Promise.all([
    resolveBrandName(parsed.slugA),
    resolveBrandName(parsed.slugB),
  ])
  if (!brandA || !brandB) notFound()

  const { prisma } = await import('@/lib/prisma')

  // Fetch all watches for both brands
  const [watchesA, watchesB] = await Promise.all([
    prisma.watch.findMany({
      where: { brand: { equals: brandA, mode: 'insensitive' } },
      orderBy: { brandTier: 'desc' },
    }),
    prisma.watch.findMany({
      where: { brand: { equals: brandB, mode: 'insensitive' } },
      orderBy: { brandTier: 'desc' },
    }),
  ])

  // Fetch existing watch-vs-watch comparisons between these two brands
  const crossComparisons = await prisma.comparison.findMany({
    where: {
      OR: [
        {
          watchA: { brand: { equals: brandA, mode: 'insensitive' } },
          watchB: { brand: { equals: brandB, mode: 'insensitive' } },
        },
        {
          watchA: { brand: { equals: brandB, mode: 'insensitive' } },
          watchB: { brand: { equals: brandA, mode: 'insensitive' } },
        },
      ],
    },
    include: { watchA: true, watchB: true },
    orderBy: { viewCount: 'desc' },
    take: 12,
  })

  // Stats
  const statsA = {
    totalModels: watchesA.length,
    avgDiameter: avg(watchesA.map((w) => w.caseDiameter)),
    avgWR: avg(watchesA.map((w) => w.waterResistance)),
    avgPower: avg(watchesA.map((w) => w.powerReserve)),
    priceSpread: priceSpread(watchesA),
    styles: uniqueValues(watchesA.map((w) => w.style)),
    movements: uniqueValues(watchesA.map((w) => w.movement)),
  }
  const statsB = {
    totalModels: watchesB.length,
    avgDiameter: avg(watchesB.map((w) => w.caseDiameter)),
    avgWR: avg(watchesB.map((w) => w.waterResistance)),
    avgPower: avg(watchesB.map((w) => w.powerReserve)),
    priceSpread: priceSpread(watchesB),
    styles: uniqueValues(watchesB.map((w) => w.style)),
    movements: uniqueValues(watchesB.map((w) => w.movement)),
  }

  // FAQ
  const faq = [
    {
      question: `Is ${brandA} better than ${brandB}?`,
      answer: `Both ${brandA} and ${brandB} are respected luxury watch brands with distinct strengths. ${brandA} offers ${statsA.totalModels} models on Patinax across ${statsA.styles.length} style categories, while ${brandB} has ${statsB.totalModels} models across ${statsB.styles.length} categories. The better choice depends on your priorities: design preference, specific complications, price range, and intended use.`,
    },
    {
      question: `Which brand holds value better, ${brandA} or ${brandB}?`,
      answer: `Value retention depends heavily on the specific model rather than the brand alone. Generally, limited production runs, iconic designs, and strong secondary market demand drive resale value. Compare individual models from both ${brandA} and ${brandB} to assess their investment potential.`,
    },
    {
      question: `Which brand is more prestigious, ${brandA} or ${brandB}?`,
      answer: `Prestige is subjective and varies by market and collector community. Both ${brandA} and ${brandB} have established heritage in the luxury watch industry. We recommend comparing specific models side-by-side to evaluate craftsmanship, movement finishing, and overall quality rather than relying on brand name alone.`,
    },
  ]

  // JSON-LD
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brandA} vs ${brandB}`,
    description: `Head-to-head comparison of ${brandA} and ${brandB} luxury watches.`,
    url: `${BASE_URL}/versus/${slug}`,
    numberOfItems: 2,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Brand',
          name: brandA,
          url: `${BASE_URL}/brand/${toSlug(brandA)}`,
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Brand',
          name: brandB,
          url: `${BASE_URL}/brand/${toSlug(brandB)}`,
        },
      },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Brand Comparison', item: `${BASE_URL}/versus` },
      { '@type': 'ListItem', position: 3, name: `${brandA} vs ${brandB}`, item: `${BASE_URL}/versus/${slug}` },
    ],
  }

  // Stat rows for the table
  const statRows: { label: string; valueA: string; valueB: string; highlight?: 'a' | 'b' | null }[] = [
    {
      label: 'Total Models',
      valueA: String(statsA.totalModels),
      valueB: String(statsB.totalModels),
      highlight: statsA.totalModels > statsB.totalModels ? 'a' : statsB.totalModels > statsA.totalModels ? 'b' : null,
    },
    {
      label: 'Avg. Case Diameter',
      valueA: statsA.avgDiameter ? `${statsA.avgDiameter} mm` : 'N/A',
      valueB: statsB.avgDiameter ? `${statsB.avgDiameter} mm` : 'N/A',
      highlight: null,
    },
    {
      label: 'Avg. Water Resistance',
      valueA: statsA.avgWR ? `${statsA.avgWR}m` : 'N/A',
      valueB: statsB.avgWR ? `${statsB.avgWR}m` : 'N/A',
      highlight: statsA.avgWR > statsB.avgWR ? 'a' : statsB.avgWR > statsA.avgWR ? 'b' : null,
    },
    {
      label: 'Avg. Power Reserve',
      valueA: statsA.avgPower ? `${statsA.avgPower}h` : 'N/A',
      valueB: statsB.avgPower ? `${statsB.avgPower}h` : 'N/A',
      highlight: statsA.avgPower > statsB.avgPower ? 'a' : statsB.avgPower > statsA.avgPower ? 'b' : null,
    },
    {
      label: 'Price Range',
      valueA: statsA.priceSpread,
      valueB: statsB.priceSpread,
      highlight: null,
    },
    {
      label: 'Styles Offered',
      valueA: statsA.styles.join(', ') || 'N/A',
      valueB: statsB.styles.join(', ') || 'N/A',
      highlight: null,
    },
    {
      label: 'Movements Used',
      valueA: statsA.movements.slice(0, 3).join(', ') || 'N/A',
      valueB: statsB.movements.slice(0, 3).join(', ') || 'N/A',
      highlight: null,
    },
  ]

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
            <li><Link href="/versus" className="hover:text-patina-gold transition-colors">Brand Comparison</Link></li>
            <li>/</li>
            <li className="text-patina-text2">{brandA} vs {brandB}</li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-patina-text">
          {brandA} vs {brandB}
          <span className="block mt-1 text-base sm:text-lg font-normal text-patina-gold">
            Complete Brand Comparison
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-patina-text2 max-w-3xl">
          A data-driven comparison of {brandA} and {brandB} based on {statsA.totalModels + statsB.totalModels} models
          in our database. Explore head-to-head stats, browse existing watch-vs-watch matchups, and discover
          featured models from each brand.
        </p>

        {/* Head-to-Head Stats Table */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-4">
            Head-to-Head Stats
          </h2>
          <div className="rounded-xl border border-patina-border bg-patina-bg2 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-patina-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-patina-text3">Metric</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-patina-gold">{brandA}</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-patina-gold">{brandB}</th>
                  </tr>
                </thead>
                <tbody>
                  {statRows.map((row) => (
                    <tr key={row.label} className="border-b border-patina-border/50 last:border-b-0">
                      <td className="px-4 py-3 text-patina-text2 font-medium">{row.label}</td>
                      <td className={`px-4 py-3 text-center ${row.highlight === 'a' ? 'text-patina-gold font-semibold' : 'text-patina-text'}`}>
                        {row.valueA}
                      </td>
                      <td className={`px-4 py-3 text-center ${row.highlight === 'b' ? 'text-patina-gold font-semibold' : 'text-patina-text'}`}>
                        {row.valueB}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Model Comparisons */}
        {crossComparisons.length > 0 && (
          <section className="mt-12">
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-patina-text mb-6">
              Model Comparisons
            </h2>
            <p className="text-sm text-patina-text2 mb-4">
              Existing head-to-head watch comparisons between {brandA} and {brandB}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crossComparisons.map((comp) => (
                <Link
                  key={comp.id}
                  href={`/compare/${comp.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-patina-border bg-patina-bg2 p-3 sm:p-4 transition-all hover:border-patina-gold/30 hover:bg-patina-bg3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-patina-bg3 overflow-hidden flex items-center justify-center">
                    {comp.watchA.imageUrl ? (
                      <Image src={comp.watchA.imageUrl} alt={comp.watchA.model} width={40} height={40} className="object-contain p-1" />
                    ) : (
                      <WatchIllustration brand={comp.watchA.brand} model={comp.watchA.model} className="h-3/4 w-3/4 opacity-70" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-patina-text truncate">
                      {comp.watchA.model} <span className="text-patina-text3">vs</span> {comp.watchB.model}
                    </p>
                    <p className="text-xs text-patina-text3">
                      {comp.viewCount.toLocaleString()} views
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-patina-bg3 overflow-hidden flex items-center justify-center">
                    {comp.watchB.imageUrl ? (
                      <Image src={comp.watchB.imageUrl} alt={comp.watchB.model} width={40} height={40} className="object-contain p-1" />
                    ) : (
                      <WatchIllustration brand={comp.watchB.brand} model={comp.watchB.model} className="h-3/4 w-3/4 opacity-70" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Brand A Models */}
        <section className="mt-12">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-patina-text mb-6">
            Featured {brandA} Models
          </h2>
          {watchesA.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {watchesA.slice(0, 8).map((watch) => (
                <Link
                  key={watch.id}
                  href={`/watch/${toSlug(watch.brand)}/${toSlug(watch.model)}`}
                  className="group rounded-xl border border-patina-border bg-patina-bg2 p-4 transition-all hover:border-patina-gold/30 hover:bg-patina-bg3"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-patina-bg3 mb-3 flex items-center justify-center">
                    {watch.imageUrl ? (
                      <Image
                        src={watch.imageUrl}
                        alt={`${watch.brand} ${watch.model}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain p-4 transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <WatchIllustration brand={watch.brand} model={watch.model} className="h-3/4 w-3/4 opacity-80 transition-transform group-hover:scale-105" />
                    )}
                  </div>
                  <p className="text-xs text-patina-gold font-medium uppercase tracking-wider">{watch.brand}</p>
                  <h3 className="mt-1 text-sm font-medium text-patina-text group-hover:text-patina-gold2 transition-colors">{watch.model}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <StarRating rating={watch.priceRange} max={5} />
                    {watch.caseDiameter && (
                      <span className="text-xs text-patina-text3 font-mono">{watch.caseDiameter}mm</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-patina-text2">No {brandA} watches in our database yet.</p>
          )}
          {watchesA.length > 8 && (
            <div className="mt-4 text-center">
              <Link href={`/brand/${toSlug(brandA)}`} className="text-sm text-patina-gold hover:text-patina-gold2 transition-colors font-medium">
                View all {watchesA.length} {brandA} models
              </Link>
            </div>
          )}
        </section>

        {/* Featured Brand B Models */}
        <section className="mt-12">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-patina-text mb-6">
            Featured {brandB} Models
          </h2>
          {watchesB.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {watchesB.slice(0, 8).map((watch) => (
                <Link
                  key={watch.id}
                  href={`/watch/${toSlug(watch.brand)}/${toSlug(watch.model)}`}
                  className="group rounded-xl border border-patina-border bg-patina-bg2 p-4 transition-all hover:border-patina-gold/30 hover:bg-patina-bg3"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-patina-bg3 mb-3 flex items-center justify-center">
                    {watch.imageUrl ? (
                      <Image
                        src={watch.imageUrl}
                        alt={`${watch.brand} ${watch.model}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain p-4 transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <WatchIllustration brand={watch.brand} model={watch.model} className="h-3/4 w-3/4 opacity-80 transition-transform group-hover:scale-105" />
                    )}
                  </div>
                  <p className="text-xs text-patina-gold font-medium uppercase tracking-wider">{watch.brand}</p>
                  <h3 className="mt-1 text-sm font-medium text-patina-text group-hover:text-patina-gold2 transition-colors">{watch.model}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <StarRating rating={watch.priceRange} max={5} />
                    {watch.caseDiameter && (
                      <span className="text-xs text-patina-text3 font-mono">{watch.caseDiameter}mm</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-patina-text2">No {brandB} watches in our database yet.</p>
          )}
          {watchesB.length > 8 && (
            <div className="mt-4 text-center">
              <Link href={`/brand/${toSlug(brandB)}`} className="text-sm text-patina-gold hover:text-patina-gold2 transition-colors font-medium">
                View all {watchesB.length} {brandB} models
              </Link>
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-patina-text mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faq.map((f) => (
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

        {/* Brand Links */}
        <section className="mt-12 mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-4">
            Explore Both Brands
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/brand/${toSlug(brandA)}`}
              className="rounded-xl border border-patina-border bg-patina-bg2 px-5 py-3 text-sm font-medium text-patina-text transition-all hover:border-patina-gold/30 hover:bg-patina-bg3 hover:text-patina-gold"
            >
              All {brandA} Watches
            </Link>
            <Link
              href={`/brand/${toSlug(brandB)}`}
              className="rounded-xl border border-patina-border bg-patina-bg2 px-5 py-3 text-sm font-medium text-patina-text transition-all hover:border-patina-gold/30 hover:bg-patina-bg3 hover:text-patina-gold"
            >
              All {brandB} Watches
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
