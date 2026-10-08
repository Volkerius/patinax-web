import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { generateWatchMetadata } from '@/lib/seo'
import { toSlug } from '@/lib/slug'
import { WatchJsonLd } from '@/components/seo/JsonLd'
import { VisibleFAQ } from '@/components/seo/VisibleFAQ'
import { WatchImage } from '@/components/ui/WatchImage'
import { WatchCard } from '@/components/ui/WatchCard'
import { StarRating } from '@/components/ui/StarRating'
import { STYLE_MAP } from '@/lib/style-content'
import { TIER_BY_PRICE_RANGE } from '@/lib/tier-content'
import { MATERIAL_MAP, materialDbValues } from '@/lib/material-content'
import { SIZE_MAP, ALL_SIZES } from '@/lib/size-content'
import { MOVEMENT_MAP, ALL_MOVEMENTS } from '@/lib/movement-content'

export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  params: Promise<{ brand: string; model: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { prisma } = await import('@/lib/prisma')
    const { brand: brandSlug, model: modelSlug } = await params
    let watch = await prisma.watch.findFirst({ where: { slug: `${brandSlug}-${modelSlug}` }, select: { brand: true, model: true, slug: true } })
    if (!watch) {
      const all = await prisma.watch.findMany({ select: { brand: true, model: true, slug: true } })
      watch = all.find(w => toSlug(w.brand) === decodeURIComponent(brandSlug) && toSlug(w.model) === decodeURIComponent(modelSlug)) ?? null
    }
    if (!watch) return { title: 'Watch Not Found' }
    return generateWatchMetadata(watch.brand, watch.model, watch.slug)
  } catch {
    return { title: 'Watch Not Found' }
  }
}

export async function generateStaticParams() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const watches = await prisma.watch.findMany({
      select: { slug: true, brand: true },
    })
    return watches.map((w) => ({
      brand: toSlug(w.brand),
      model: w.slug.split('-').slice(w.brand.split(/[\s.&]+/).filter(Boolean).length).join('-'),
    }))
  } catch {
    return []
  }
}

export default async function WatchPage({ params }: PageProps) {
  const { prisma } = await import('@/lib/prisma')
  const { brand: brandSlug, model: modelSlug } = await params

  // Try direct slug match first, then fall back to brand+model matching
  let watch = await prisma.watch.findFirst({
    where: { slug: `${brandSlug}-${modelSlug}` },
  })

  if (!watch) {
    // Match by comparing slugified brand and model names
    const allWatches = await prisma.watch.findMany()
    watch = allWatches.find(w =>
      toSlug(w.brand) === decodeURIComponent(brandSlug) &&
      toSlug(w.model) === decodeURIComponent(modelSlug)
    ) ?? null
  }

  if (!watch) notFound()

  const comparisons = await prisma.comparison.findMany({
    where: {
      OR: [{ watchAId: watch.id }, { watchBId: watch.id }],
    },
    include: { watchA: true, watchB: true },
    take: 10,
  })

  // Similar watches: same style AND similar price range (+-1)
  const similarWatches = await prisma.watch.findMany({
    where: {
      id: { not: watch.id },
      style: watch.style ?? undefined,
      priceRange: { gte: Math.max(1, watch.priceRange - 1), lte: watch.priceRange + 1 },
    },
    select: { brand: true, model: true, slug: true, imageUrl: true, priceRange: true, caseDiameter: true, movement: true, style: true },
    take: 6,
  })

  const styleContent = watch.style ? STYLE_MAP[watch.style] : null
  const tierContent = TIER_BY_PRICE_RANGE[watch.priceRange]

  // Map this watch into the new hub categories (material / size / movement)
  const materialHub = (() => {
    if (!watch.caseMaterial) return null
    for (const key of Object.keys(MATERIAL_MAP)) {
      if (materialDbValues(key).includes(watch.caseMaterial)) return MATERIAL_MAP[key]
    }
    return null
  })()

  const sizeHub = (() => {
    if (!watch.caseDiameter) return null
    for (const key of ALL_SIZES) {
      const s = SIZE_MAP[key]
      if (watch.caseDiameter >= s.min && watch.caseDiameter < s.max) return s
    }
    return null
  })()

  const movementHub = (() => {
    if (!watch.movement) return null
    for (const key of ALL_MOVEMENTS) {
      if (MOVEMENT_MAP[key].dbValues.includes(watch.movement)) return MOVEMENT_MAP[key]
    }
    return null
  })()

  const watchFaq = [
    {
      question: `What are the key specifications of the ${watch.brand} ${watch.model}?`,
      answer: `The ${watch.brand} ${watch.model} features a ${watch.caseDiameter ?? 40}mm ${watch.caseMaterial?.toLowerCase() ?? 'steel'} case, ${watch.movement?.toLowerCase() ?? 'automatic'} movement${watch.caliber ? ` (caliber ${watch.caliber})` : ''}, ${watch.waterResistance ?? 100}m water resistance, and ${watch.powerReserve ? `${watch.powerReserve}-hour power reserve` : 'reliable power reserve'}.`,
    },
    {
      question: `Is the ${watch.brand} ${watch.model} a good watch?`,
      answer: `The ${watch.brand} ${watch.model} is a well-regarded ${watch.style ?? 'luxury'} timepiece from ${watch.brand}. It offers ${watch.cosc ? 'COSC-certified precision' : 'reliable timekeeping'}, quality ${watch.caseMaterial?.toLowerCase() ?? 'steel'} construction, and ${watch.crystal?.toLowerCase() ?? 'sapphire'} crystal protection. Compare it with similar models to find the best fit for your wrist.`,
    },
    {
      question: `How does the ${watch.brand} ${watch.model} compare to similar watches?`,
      answer: `You can compare the ${watch.brand} ${watch.model} head-to-head with other ${styleContent?.label?.toLowerCase() ?? 'luxury'} watches on Patinax. Our comparison tool covers case dimensions, movement specs, water resistance, and price tier to help you make an informed decision.`,
    },
  ]

  const specs = [
    { label: 'Reference', value: watch.reference },
    { label: 'Year', value: watch.year },
    { label: 'Case Diameter', value: watch.caseDiameter ? `${watch.caseDiameter}mm` : null },
    { label: 'Case Thickness', value: watch.caseThickness ? `${watch.caseThickness}mm` : null },
    { label: 'Water Resistance', value: watch.waterResistance ? `${watch.waterResistance}m` : null },
    { label: 'Movement', value: watch.movement },
    { label: 'Caliber', value: watch.caliber },
    { label: 'Power Reserve', value: watch.powerReserve ? `${watch.powerReserve}h` : null },
    { label: 'Case Material', value: watch.caseMaterial },
    { label: 'Bezel', value: watch.bezelMaterial },
    { label: 'Crystal', value: watch.crystal },
    { label: 'Frequency', value: watch.frequency ? `${watch.frequency} Hz` : null },
    { label: 'Jewels', value: watch.jewels },
    { label: 'COSC', value: watch.cosc ? 'Yes' : 'No' },
  ]

  return (
    <>
      <WatchJsonLd watch={watch} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href={`/brand/${toSlug(watch.brand)}`} className="hover:text-patina-gold transition-colors">{watch.brand}</Link></li>
            <li>/</li>
            <li className="text-patina-text2">{watch.model}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          {/* Image */}
          <div className="relative aspect-square rounded-xl border border-patina-border bg-patina-bg2 overflow-hidden">
            <WatchImage
              src={watch.imageUrl}
              brand={watch.brand}
              model={watch.model}
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              padding="p-6"
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <p className="text-sm text-patina-gold font-medium uppercase tracking-wider">{watch.brand}</p>
              {styleContent && (
                <span className="rounded-full border border-patina-border bg-patina-bg2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-patina-text2">
                  {styleContent.label.replace(/s$/, '')}
                </span>
              )}
              {watch.year && (
                <span className="rounded-full border border-patina-border bg-patina-bg2 px-2 py-0.5 text-[10px] font-mono text-patina-text2">
                  {watch.year}
                </span>
              )}
            </div>
            <h1 className="mt-1 font-playfair text-xl sm:text-3xl font-bold text-patina-text">{watch.brand} {watch.model}</h1>
            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={watch.priceRange} />
              {tierContent && (
                <span className="text-xs text-patina-text3">{tierContent.priceLabel}</span>
              )}
            </div>

            {/* Quick specs — at-a-glance summary above the full table. */}
            <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {watch.caseDiameter && (
                <div className="rounded-lg border border-patina-border bg-patina-bg2 px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wider text-patina-text3">Case</dt>
                  <dd className="mt-0.5 text-patina-text font-mono">{watch.caseDiameter}mm</dd>
                </div>
              )}
              {watch.movement && (
                <div className="rounded-lg border border-patina-border bg-patina-bg2 px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wider text-patina-text3">Movement</dt>
                  <dd className="mt-0.5 text-patina-text truncate">{watch.movement}</dd>
                </div>
              )}
              {watch.waterResistance && (
                <div className="rounded-lg border border-patina-border bg-patina-bg2 px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wider text-patina-text3">Water Res.</dt>
                  <dd className="mt-0.5 text-patina-text font-mono">{watch.waterResistance}m</dd>
                </div>
              )}
              {watch.powerReserve && (
                <div className="rounded-lg border border-patina-border bg-patina-bg2 px-3 py-2">
                  <dt className="text-[10px] uppercase tracking-wider text-patina-text3">Reserve</dt>
                  <dd className="mt-0.5 text-patina-text font-mono">{watch.powerReserve}h</dd>
                </div>
              )}
            </dl>

            <div className="mt-6 rounded-xl border border-patina-border overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="sr-only">Full specifications for the {watch.brand} {watch.model}</caption>
                <tbody>
                  {specs.filter(s => s.value !== null && s.value !== undefined).map((spec, i) => (
                    <tr key={spec.label} className={i % 2 === 0 ? 'bg-patina-bg2' : 'bg-patina-bg'}>
                      <th scope="row" className="px-3 sm:px-4 py-2.5 text-patina-text2 font-medium text-xs sm:text-sm text-left">{spec.label}</th>
                      <td className="px-3 sm:px-4 py-2.5 text-patina-text font-mono text-right text-xs sm:text-sm">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mt-10 max-w-3xl">
          <h2 className="font-playfair text-xl font-semibold text-patina-text mb-4">About the {watch.brand} {watch.model}</h2>
          {watch.description ? (
            <div className="text-sm text-patina-text2 leading-relaxed space-y-3">
              {watch.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-patina-text2 leading-relaxed">
              The {watch.brand} {watch.model} is a {watch.style ?? 'luxury'} watch featuring a {watch.caseDiameter ?? 40}mm {watch.caseMaterial?.toLowerCase() ?? 'steel'} case
              {watch.movement ? ` with a ${watch.movement.toLowerCase()} movement` : ''}
              {watch.caliber ? ` (caliber ${watch.caliber})` : ''}.
              {watch.waterResistance ? ` It offers ${watch.waterResistance}m water resistance` : ''}
              {watch.powerReserve ? ` and a ${watch.powerReserve}-hour power reserve` : ''}.
              {watch.cosc ? ' This timepiece is COSC-certified for chronometric precision.' : ''}
              {watch.crystal ? ` The dial is protected by ${watch.crystal.toLowerCase()} crystal.` : ''}
            </p>
          )}
        </section>

        {/* Similar Watches */}
        {similarWatches.length > 0 && (
          <section className="mt-12">
            <h2 className="font-playfair text-xl font-semibold text-patina-text mb-6">Similar Watches</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {similarWatches.map((sw) => (
                <WatchCard
                  key={sw.slug}
                  watch={{
                    brand: sw.brand,
                    model: sw.model,
                    slug: sw.slug,
                    imageUrl: sw.imageUrl,
                    priceRange: sw.priceRange,
                    caseDiameter: sw.caseDiameter,
                    movement: sw.movement,
                    style: sw.style,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Category & Tier Links */}
        <section className="mt-12">
          <h2 className="font-playfair text-xl font-semibold text-patina-text mb-4">Browse Similar Watches</h2>
          <div className="flex flex-wrap gap-3">
            {styleContent && (
              <Link
                href={`/style/${styleContent.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                {styleContent.label} &rarr;
              </Link>
            )}
            {tierContent && (
              <Link
                href={`/tier/${tierContent.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                {tierContent.label} ({tierContent.priceLabel}) &rarr;
              </Link>
            )}
            {materialHub && (
              <Link
                href={`/material/${materialHub.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                {materialHub.label} &rarr;
              </Link>
            )}
            {sizeHub && (
              <Link
                href={`/size/${sizeHub.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                {sizeHub.label} &rarr;
              </Link>
            )}
            {movementHub && (
              <Link
                href={`/movement/${movementHub.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                {movementHub.label} &rarr;
              </Link>
            )}
          </div>
        </section>

        <VisibleFAQ items={watchFaq} title={`FAQ: ${watch.brand} ${watch.model}`} />

        {/* Comparisons */}
        {comparisons.length > 0 && (
          <section className="mt-12">
            <h2 className="font-playfair text-xl font-semibold text-patina-text mb-6">Comparisons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {comparisons.map((comp) => {
                const otherWatch = comp.watchAId === watch.id ? comp.watchB : comp.watchA
                return (
                  <Link
                    key={comp.slug}
                    href={`/compare/${comp.slug}`}
                    className="flex items-center justify-between rounded-lg border border-patina-border bg-patina-bg2 px-3 sm:px-4 py-3 text-xs sm:text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all gap-1"
                  >
                    <span className="truncate">{watch.brand} {watch.model}</span>
                    <span className="text-patina-gold text-xs mx-1 sm:mx-2 shrink-0">vs</span>
                    <span className="truncate text-right">{otherWatch.brand} {otherWatch.model}</span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
