import { Metadata } from 'next'
import Link from 'next/link'
import { generateBrandMetadata } from '@/lib/seo'
import { toSlug } from '@/lib/slug'
import { WatchCard } from '@/components/ui/WatchCard'
import { BrandJsonLd } from '@/components/seo/JsonLd'
import { STYLE_MAP } from '@/lib/style-content'
import { TIER_BY_PRICE_RANGE } from '@/lib/tier-content'
import { BRAND_CONTENT } from '@/lib/brand-content'

export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getBrandNameFromSlug(slug: string): Promise<string> {
  const { prisma } = await import('@/lib/prisma')
  const decodedSlug = decodeURIComponent(slug)
  const watches = await prisma.watch.findMany({
    select: { brand: true },
    distinct: ['brand'],
  })
  const match = watches.find(
    (w) => toSlug(w.brand) === decodedSlug
  )
  if (match) return match.brand
  return decodedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const brandName = await getBrandNameFromSlug(slug)
    return generateBrandMetadata(brandName)
  } catch {
    return { title: 'Brand Not Found' }
  }
}

export async function generateStaticParams() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const watches = await prisma.watch.findMany({
      select: { brand: true },
      distinct: ['brand'],
    })
    return watches.map((w) => ({
      slug: toSlug(w.brand),
    }))
  } catch {
    return []
  }
}

export default async function BrandPage({ params }: PageProps) {
  const { prisma } = await import('@/lib/prisma')
  const { slug } = await params
  const brandName = await getBrandNameFromSlug(slug)

  const watches = await prisma.watch.findMany({
    where: { brand: { equals: brandName, mode: 'insensitive' } },
    orderBy: { model: 'asc' },
  })

  // Compute stats
  const styles = [...new Set(watches.map(w => w.style).filter(Boolean))] as string[]
  const priceRanges = [...new Set(watches.map(w => w.priceRange))]
  const minTier = TIER_BY_PRICE_RANGE[Math.min(...priceRanges)]
  const maxTier = TIER_BY_PRICE_RANGE[Math.max(...priceRanges)]
  const styleLabels = styles.map(s => STYLE_MAP[s]?.label ?? s).filter(Boolean)

  // Popular comparisons for this brand
  const watchIds = watches.map(w => w.id)
  const popularComparisons = watchIds.length > 0
    ? await prisma.comparison.findMany({
        where: {
          OR: [
            { watchAId: { in: watchIds } },
            { watchBId: { in: watchIds } },
          ],
        },
        include: { watchA: true, watchB: true },
        orderBy: { viewCount: 'desc' },
        take: 6,
      })
    : []

  return (
    <>
    <BrandJsonLd brand={brandName} watchCount={watches.length} />
    <div className="mx-auto max-w-5xl px-4 py-8">
      <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-patina-text2">{brandName}</li>
        </ol>
      </nav>

      <h1 className="font-playfair text-xl sm:text-3xl font-bold text-patina-text mb-2">{brandName} Watches</h1>
      {(() => {
        const curated = BRAND_CONTENT[toSlug(brandName)]
        const tagline = curated
          ? curated.tagline
          : `Explore ${watches.length} ${brandName} model${watches.length !== 1 ? 's' : ''} on Patinax.${styleLabels.length > 0 ? ` From ${styleLabels.join(', ')}, compare` : ' Compare'} ${brandName} watches side by side with detailed specs, radar analysis, and expert verdicts.`
        return (
          <p className="text-sm text-patina-text2 mb-4 max-w-3xl">{tagline}</p>
        )
      })()}

      {/* Stats Bar */}
      {watches.length > 0 && (
        <div className="mb-8 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-patina-border bg-patina-bg2 p-4 text-center">
            <p className="text-2xl font-bold text-patina-gold">{watches.length}</p>
            <p className="text-xs text-patina-text2 mt-1">Models</p>
          </div>
          <div className="rounded-lg border border-patina-border bg-patina-bg2 p-4 text-center">
            <p className="text-2xl font-bold text-patina-gold">{styles.length}</p>
            <p className="text-xs text-patina-text2 mt-1">Styles</p>
          </div>
          <div className="rounded-lg border border-patina-border bg-patina-bg2 p-4 text-center">
            <p className="text-sm font-bold text-patina-gold leading-tight">
              {minTier && maxTier && minTier.slug !== maxTier.slug
                ? `${minTier.priceLabel} - ${maxTier.priceLabel}`
                : minTier?.priceLabel ?? 'Various'}
            </p>
            <p className="text-xs text-patina-text2 mt-1">Price Range</p>
          </div>
        </div>
      )}

      {/* Brand Intro (curated for top brands, data-driven fallback for others) */}
      {(() => {
        const curated = BRAND_CONTENT[toSlug(brandName)]
        if (curated) {
          return (
            <section className="mb-10 max-w-3xl">
              <h2 className="font-playfair text-xl font-semibold text-patina-text mb-4">
                About {brandName}
              </h2>
              <div className="text-sm text-patina-text2 leading-relaxed space-y-3">
                {curated.intro.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3">
                  <dt className="text-patina-text3 uppercase tracking-wider mb-1">Founded</dt>
                  <dd className="text-patina-text font-mono">{curated.founded}</dd>
                </div>
                <div className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3">
                  <dt className="text-patina-text3 uppercase tracking-wider mb-1">Headquarters</dt>
                  <dd className="text-patina-text">{curated.headquarters}</dd>
                </div>
                {curated.flagshipCollections.length > 0 && (
                  <div className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 sm:col-span-2">
                    <dt className="text-patina-text3 uppercase tracking-wider mb-1">Flagship Collections</dt>
                    <dd className="text-patina-text">{curated.flagshipCollections.join(' · ')}</dd>
                  </div>
                )}
              </dl>
            </section>
          )
        }
        // Data-driven fallback: build a richer intro from the watch collection itself
        if (watches.length > 0) {
          const yearRange = (() => {
            const years = watches.map(w => w.year).filter((y): y is number => y != null)
            if (years.length === 0) return null
            const min = Math.min(...years)
            const max = Math.max(...years)
            return min === max ? `${min}` : `${min}–${max}`
          })()
          const movements = [...new Set(watches.map(w => w.movement).filter(Boolean))] as string[]
          const caseSizes = (() => {
            const sizes = watches.map(w => w.caseDiameter).filter((d): d is number => d != null)
            if (sizes.length === 0) return null
            const min = Math.min(...sizes)
            const max = Math.max(...sizes)
            return min === max ? `${min}mm` : `${min}–${max}mm`
          })()
          const sampleModels = watches.slice(0, 3).map(w => w.model).join(', ')
          const priceLabel = minTier && maxTier && minTier.slug !== maxTier.slug
            ? `${minTier.priceLabel} to ${maxTier.priceLabel}`
            : minTier?.priceLabel ?? 'various price points'
          return (
            <section className="mb-10 max-w-3xl">
              <h2 className="font-playfair text-xl font-semibold text-patina-text mb-4">
                The {brandName} Collection on Patinax
              </h2>
              <div className="text-sm text-patina-text2 leading-relaxed space-y-3">
                <p>
                  Patinax tracks {watches.length} {brandName} reference{watches.length !== 1 ? 's' : ''}
                  {styleLabels.length > 0 ? ` across ${styleLabels.length} style${styleLabels.length !== 1 ? 's' : ''} (${styleLabels.join(', ').toLowerCase()})` : ''}
                  {yearRange ? `, spanning model years ${yearRange}` : ''}.
                  {sampleModels ? ` Notable models in the catalog include the ${sampleModels}.` : ''}
                </p>
                <p>
                  {caseSizes ? `Case diameters in this collection run ${caseSizes}, ` : ''}
                  {movements.length > 0 ? `with ${movements.join(' and ').toLowerCase()} movement options. ` : ''}
                  Pricing covers {priceLabel}, making the lineup useful to compare against direct competitors at the same tier.
                </p>
                <p>
                  Browse the full {brandName} model list below, or use the comparison tool to see how individual {brandName} references stack up against alternatives from other manufacturers in specs, movement architecture, and price.
                </p>
              </div>
            </section>
          )
        }
        return null
      })()}

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
          <p className="text-patina-text2">No watches found for {brandName} yet.</p>
          <Link href="/search" className="mt-4 inline-block text-sm text-patina-gold hover:text-patina-gold2 transition-colors">
            Search all watches
          </Link>
        </div>
      )}

      {/* Popular Comparisons */}
      {popularComparisons.length > 0 && (
        <section className="mt-12">
          <h2 className="font-playfair text-xl font-semibold text-patina-text mb-6">Popular {brandName} Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {popularComparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="flex items-center justify-between rounded-lg border border-patina-border bg-patina-bg2 px-3 sm:px-4 py-3 text-xs sm:text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all gap-1"
              >
                <span className="truncate">{comp.watchA.brand} {comp.watchA.model}</span>
                <span className="text-patina-gold text-xs mx-1 sm:mx-2 shrink-0">vs</span>
                <span className="truncate text-right">{comp.watchB.brand} {comp.watchB.model}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
    </>
  )
}
