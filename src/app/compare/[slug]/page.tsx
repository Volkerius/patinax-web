import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
// prisma imported lazily inside functions to avoid build-time initialization
import { generateComparisonMetadata, BASE_URL } from '@/lib/seo'
import { toSlug } from '@/lib/slug'
import { calculateSimilarity, generateAdvantages } from '@/lib/comparison'
import { ComparisonJsonLd } from '@/components/seo/JsonLd'
import { VisibleFAQ } from '@/components/seo/VisibleFAQ'
import { STYLE_MAP } from '@/lib/style-content'
import { TIER_BY_PRICE_RANGE } from '@/lib/tier-content'
import { ComparisonHeader } from '@/components/comparison/ComparisonHeader'
import { ComparisonIntro } from '@/components/comparison/ComparisonIntro'
import { AdvantageList } from '@/components/comparison/AdvantageList'
import { RadarChartWrapper } from '@/components/comparison/RadarChartWrapper'
import { InteractiveSpecTable } from '@/components/comparison/InteractiveSpecTable'
import { CategoryGrid } from '@/components/comparison/CategoryGrid'
import { Verdict } from '@/components/comparison/Verdict'
import { PopularComparisons } from '@/components/comparison/PopularComparisons'
import { RelatedComparisons } from '@/components/comparison/RelatedComparisons'
import type { RadarCategory } from '@/types/comparison'
import type { Watch } from '@/types/watch'

export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const comparison = await resolveComparison(slug)

    if (!comparison) return { title: 'Comparison Not Found' }

    return generateComparisonMetadata(
      comparison.watchA.model,
      comparison.watchB.model,
      comparison.watchA.brand,
      comparison.watchB.brand,
      slug
    )
  } catch {
    return { title: 'Comparison Not Found' }
  }
}

export async function generateStaticParams() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const comparisons = await prisma.comparison.findMany({
      orderBy: { viewCount: 'desc' },
      select: { slug: true },
    })
    return comparisons.map((c) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

function buildRadarCategories(watchA: Record<string, unknown>, watchB: Record<string, unknown>): RadarCategory[] {
  const score = (val: unknown, max: number) => Math.min(10, Math.round(((val as number) || 0) / max * 10))

  return [
    { label: 'Water Resistance', watchAScore: score(watchA.waterResistance, 300), watchBScore: score(watchB.waterResistance, 300) },
    { label: 'Power Reserve', watchAScore: score(watchA.powerReserve, 80), watchBScore: score(watchB.powerReserve, 80) },
    { label: 'Case Size', watchAScore: score(watchA.caseDiameter, 45), watchBScore: score(watchB.caseDiameter, 45) },
    { label: 'Price Range', watchAScore: ((watchA.priceRange as number) || 3) * 2, watchBScore: ((watchB.priceRange as number) || 3) * 2 },
    { label: 'Precision', watchAScore: watchA.cosc ? 9 : 7, watchBScore: watchB.cosc ? 9 : 7 },
    { label: 'Heritage', watchAScore: 8, watchBScore: 8 },
  ]
}

const SPEC_EXPLANATIONS: Record<string, string> = {
  'Brand': 'The manufacturer behind the timepiece. Brand heritage, reputation, and after-sales service network all influence long-term ownership satisfaction and resale value.',
  'Model': 'The specific model within the brand\'s collection. Each model line has its own design DNA, target audience, and position within the brand hierarchy.',
  'Reference Number': 'The manufacturer\'s unique identifier for this exact configuration. Essential for authentication, parts sourcing, and establishing provenance when buying or selling.',
  'Year Introduced': 'When this model or reference was first released. Newer references may feature updated movements or materials, while vintage references can command collector premiums.',
  'Case Diameter': 'The width of the watch case in millimeters. Modern men\'s watches typically range from 38-42mm. Larger cases make bolder statements while smaller ones offer classic proportions.',
  'Case Thickness': 'How tall the watch sits on your wrist. Thinner watches (under 11mm) slide easily under shirt cuffs, while thicker cases often house more complex movements.',
  'Water Resistance': 'The depth rating for water exposure. 30m handles splashes, 100m is safe for swimming, 200m+ is suitable for recreational diving, and 300m+ meets professional standards.',
  'Movement Type': 'The engine that powers the watch. Automatic movements wind from wrist motion, manual movements require hand-winding, and quartz uses a battery for superior accuracy.',
  'Caliber': 'The specific movement reference. In-house calibers are developed by the brand itself, often commanding premiums. Third-party movements like ETA are reliable industry workhorses.',
  'Power Reserve': 'How long the watch runs without winding or wearing. A 70+ hour reserve means you can leave it off for the entire weekend and find it still running Monday morning.',
  'Case Material': 'What the watch case is made from. Stainless steel offers durability and value, titanium is lighter, gold adds luxury, and ceramic resists scratches exceptionally well.',
  'Bezel Material': 'The ring surrounding the crystal. Ceramic bezels resist fading and scratching, aluminum develops character over time, and precious metal bezels add visual warmth.',
  'Crystal': 'The transparent cover protecting the dial. Sapphire crystal is nearly scratch-proof and the standard for luxury watches. Some brands apply anti-reflective coatings for better legibility.',
  'Beat Frequency': 'How fast the balance wheel oscillates, measured in vibrations per hour. Higher frequencies (28,800+ vph) generally produce smoother second-hand sweeps and better timekeeping stability.',
  'Jewel Count': 'Synthetic rubies used as bearings in the movement. More jewels reduce friction at critical pivot points. Most modern automatics have 25-31 jewels for optimal performance.',
  'COSC Certified': 'Whether the movement passed Controle Officiel Suisse des Chronometres testing. COSC certification guarantees accuracy within -4/+6 seconds per day — a meaningful precision benchmark.',
}

function buildSpecRows(watchA: Watch, watchB: Watch) {
  const fmt = (val: string | number | null | undefined, unit?: string): string | null => {
    if (val === null || val === undefined || val === '') return null
    if (unit) return `${val} ${unit}`
    return String(val)
  }

  const fmtFrequency = (hz: number | null | undefined): string | null => {
    if (!hz) return null
    const vph = hz * 3600
    return `${vph.toLocaleString('en-US')} vph`
  }

  return [
    {
      label: 'Brand', fullLabel: 'Brand',
      valueA: fmt(watchA.brand), valueB: fmt(watchB.brand),
      explanation: SPEC_EXPLANATIONS['Brand'],
    },
    {
      label: 'Model', fullLabel: 'Model',
      valueA: fmt(watchA.model), valueB: fmt(watchB.model),
      explanation: SPEC_EXPLANATIONS['Model'],
    },
    {
      label: 'Reference', fullLabel: 'Reference Number',
      valueA: watchA.reference ?? null, valueB: watchB.reference ?? null,
      explanation: SPEC_EXPLANATIONS['Reference Number'],
    },
    {
      label: 'Year', fullLabel: 'Year Introduced',
      valueA: watchA.year ? String(watchA.year) : null,
      valueB: watchB.year ? String(watchB.year) : null,
      explanation: SPEC_EXPLANATIONS['Year Introduced'],
    },
    {
      label: 'Diameter', fullLabel: 'Case Diameter',
      valueA: watchA.caseDiameter ? `${watchA.caseDiameter} mm` : null,
      valueB: watchB.caseDiameter ? `${watchB.caseDiameter} mm` : null,
      numericA: watchA.caseDiameter ?? undefined,
      numericB: watchB.caseDiameter ?? undefined,
      maxValue: 50,
      winner: (watchA.caseDiameter ?? 0) === (watchB.caseDiameter ?? 0) ? 'tie' as const : null,
      explanation: SPEC_EXPLANATIONS['Case Diameter'],
    },
    {
      label: 'Thickness', fullLabel: 'Case Thickness',
      valueA: watchA.caseThickness ? `${watchA.caseThickness} mm` : null,
      valueB: watchB.caseThickness ? `${watchB.caseThickness} mm` : null,
      numericA: watchA.caseThickness ?? undefined,
      numericB: watchB.caseThickness ?? undefined,
      maxValue: 18,
      explanation: SPEC_EXPLANATIONS['Case Thickness'],
    },
    {
      label: 'Water Resist.', fullLabel: 'Water Resistance',
      valueA: watchA.waterResistance ? `${watchA.waterResistance} meters` : null,
      valueB: watchB.waterResistance ? `${watchB.waterResistance} meters` : null,
      numericA: watchA.waterResistance ?? undefined,
      numericB: watchB.waterResistance ?? undefined,
      maxValue: 600,
      winner: (watchA.waterResistance ?? 0) > (watchB.waterResistance ?? 0) ? 'a' as const
            : (watchB.waterResistance ?? 0) > (watchA.waterResistance ?? 0) ? 'b' as const : 'tie' as const,
      explanation: SPEC_EXPLANATIONS['Water Resistance'],
    },
    {
      label: 'Movement', fullLabel: 'Movement Type',
      valueA: fmt(watchA.movement), valueB: fmt(watchB.movement),
      explanation: SPEC_EXPLANATIONS['Movement Type'],
    },
    {
      label: 'Caliber', fullLabel: 'Caliber',
      valueA: fmt(watchA.caliber), valueB: fmt(watchB.caliber),
      explanation: SPEC_EXPLANATIONS['Caliber'],
    },
    {
      label: 'Power Reserve', fullLabel: 'Power Reserve',
      valueA: watchA.powerReserve ? `${watchA.powerReserve} hours` : null,
      valueB: watchB.powerReserve ? `${watchB.powerReserve} hours` : null,
      numericA: watchA.powerReserve ?? undefined,
      numericB: watchB.powerReserve ?? undefined,
      maxValue: 120,
      winner: (watchA.powerReserve ?? 0) > (watchB.powerReserve ?? 0) ? 'a' as const
            : (watchB.powerReserve ?? 0) > (watchA.powerReserve ?? 0) ? 'b' as const : 'tie' as const,
      explanation: SPEC_EXPLANATIONS['Power Reserve'],
    },
    {
      label: 'Case Material', fullLabel: 'Case Material',
      valueA: fmt(watchA.caseMaterial), valueB: fmt(watchB.caseMaterial),
      explanation: SPEC_EXPLANATIONS['Case Material'],
    },
    {
      label: 'Bezel', fullLabel: 'Bezel Material',
      valueA: fmt(watchA.bezelMaterial), valueB: fmt(watchB.bezelMaterial),
      explanation: SPEC_EXPLANATIONS['Bezel Material'],
    },
    {
      label: 'Crystal', fullLabel: 'Crystal',
      valueA: fmt(watchA.crystal), valueB: fmt(watchB.crystal),
      explanation: SPEC_EXPLANATIONS['Crystal'],
    },
    {
      label: 'Frequency', fullLabel: 'Beat Frequency',
      valueA: fmtFrequency(watchA.frequency), valueB: fmtFrequency(watchB.frequency),
      explanation: SPEC_EXPLANATIONS['Beat Frequency'],
    },
    {
      label: 'Jewels', fullLabel: 'Jewel Count',
      valueA: watchA.jewels ? String(watchA.jewels) : null,
      valueB: watchB.jewels ? String(watchB.jewels) : null,
      numericA: watchA.jewels ?? undefined,
      numericB: watchB.jewels ?? undefined,
      maxValue: 50,
      winner: (watchA.jewels ?? 0) > (watchB.jewels ?? 0) ? 'a' as const
            : (watchB.jewels ?? 0) > (watchA.jewels ?? 0) ? 'b' as const : 'tie' as const,
      explanation: SPEC_EXPLANATIONS['Jewel Count'],
    },
    {
      label: 'COSC', fullLabel: 'COSC Certified',
      valueA: watchA.cosc ? 'Yes' : 'No', valueB: watchB.cosc ? 'Yes' : 'No',
      explanation: SPEC_EXPLANATIONS['COSC Certified'],
    },
  ]
}

async function resolveComparison(rawSlug: string) {
  const { prisma } = await import('@/lib/prisma')
  // Decode URI-encoded characters (e.g., %C3%B6 → ö)
  const slug = decodeURIComponent(rawSlug)

  // 1. Try exact slug match from DB
  const existing = await prisma.comparison.findUnique({
    where: { slug },
    include: { watchA: true, watchB: true },
  })
  if (existing) return existing

  // Also try the raw (encoded) slug
  if (rawSlug !== slug) {
    const existingRaw = await prisma.comparison.findUnique({
      where: { slug: rawSlug },
      include: { watchA: true, watchB: true },
    })
    if (existingRaw) return existingRaw
  }

  // 2. Parse "brand-model-vs-brand-model" pattern
  // The slug may contain multiple "-vs-" so we try every possible split point
  const allWatches = await prisma.watch.findMany({
    select: { id: true, brand: true, model: true, slug: true,
      apiId: true, reference: true, year: true, caseDiameter: true,
      caseThickness: true, waterResistance: true, movement: true,
      caliber: true, powerReserve: true, caseMaterial: true,
      bezelMaterial: true, crystal: true, frequency: true,
      jewels: true, cosc: true, priceRange: true, brandTier: true,
      style: true, imageUrl: true, createdAt: true, updatedAt: true },
  })

  // Build a lookup: generated slug → watch
  const slugMap = new Map<string, typeof allWatches[0]>()
  for (const w of allWatches) {
    // DB slug
    slugMap.set(w.slug, w)
    // Generated brand-model slug
    const generated = `${toSlug(w.brand)}-${toSlug(w.model)}`
    if (!slugMap.has(generated)) slugMap.set(generated, w)
  }

  const findWatch = (part: string) => {
    // 1. Exact match in slugMap
    if (slugMap.has(part)) return slugMap.get(part)!
    // 2. Find watch whose generated slug matches
    for (const w of allWatches) {
      const gen = `${toSlug(w.brand)}-${toSlug(w.model)}`
      if (gen === part || part === w.slug) return w
    }
    // 3. Fuzzy: longest prefix match
    let bestMatch: typeof allWatches[0] | null = null
    let bestLen = 0
    for (const w of allWatches) {
      const gen = `${toSlug(w.brand)}-${toSlug(w.model)}`
      if (part.startsWith(gen) && gen.length > bestLen) {
        bestMatch = w
        bestLen = gen.length
      }
      if (part.startsWith(w.slug) && w.slug.length > bestLen) {
        bestMatch = w
        bestLen = w.slug.length
      }
    }
    return bestMatch
  }

  // Try every "-vs-" split position in the slug
  const vsToken = '-vs-'
  let idx = slug.indexOf(vsToken)
  while (idx !== -1) {
    const partA = slug.slice(0, idx)
    const partB = slug.slice(idx + vsToken.length)
    const watchA = findWatch(partA)
    const watchB = findWatch(partB)
    if (watchA && watchB && watchA.id !== watchB.id) {
      const comp = await prisma.comparison.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          watchAId: watchA.id,
          watchBId: watchB.id,
          viewCount: 0,
        },
        include: { watchA: true, watchB: true },
      })
      return comp
    }
    idx = slug.indexOf(vsToken, idx + 1)
  }

  return null
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params
  const comparison = await resolveComparison(slug)

  if (!comparison) notFound()

  const { watchA, watchB } = comparison

  const featuresA = {
    priceRange: watchA.priceRange,
    caseDiameter: watchA.caseDiameter ?? 40,
    caseThickness: watchA.caseThickness ?? undefined,
    waterResistance: watchA.waterResistance ?? 100,
    powerReserve: watchA.powerReserve ?? 48,
    movementType: watchA.movement ?? 'automatic',
    caseMaterial: watchA.caseMaterial ?? 'steel',
    style: watchA.style ?? 'sport',
    brandTier: watchA.brandTier ?? watchA.priceRange,
    cosc: watchA.cosc,
    jewels: watchA.jewels ?? undefined,
  }
  const featuresB = {
    priceRange: watchB.priceRange,
    caseDiameter: watchB.caseDiameter ?? 40,
    caseThickness: watchB.caseThickness ?? undefined,
    waterResistance: watchB.waterResistance ?? 100,
    powerReserve: watchB.powerReserve ?? 48,
    movementType: watchB.movement ?? 'automatic',
    caseMaterial: watchB.caseMaterial ?? 'steel',
    style: watchB.style ?? 'sport',
    brandTier: watchB.brandTier ?? watchB.priceRange,
    cosc: watchB.cosc,
    jewels: watchB.jewels ?? undefined,
  }

  const similarity = calculateSimilarity(featuresA, featuresB)

  const { advantagesA, advantagesB } = generateAdvantages(
    { name: `${watchA.brand} ${watchA.model}`, ...featuresA },
    { name: `${watchB.brand} ${watchB.model}`, ...featuresB },
  )

  const radarCategories = buildRadarCategories(
    watchA as unknown as Record<string, unknown>,
    watchB as unknown as Record<string, unknown>
  )

  // Compute scores from radar categories
  const scoreA = Math.round(radarCategories.reduce((sum, c) => sum + c.watchAScore, 0) / (radarCategories.length * 10) * 100)
  const scoreB = Math.round(radarCategories.reduce((sum, c) => sum + c.watchBScore, 0) / (radarCategories.length * 10) * 100)

  const specRows = buildSpecRows(watchA as Watch, watchB as Watch)

  // Fetch related comparisons
  const { prisma } = await import('@/lib/prisma')
  const relatedComparisons = await prisma.comparison.findMany({
    where: {
      id: { not: comparison.id },
      OR: [
        { watchAId: watchA.id },
        { watchBId: watchA.id },
        { watchAId: watchB.id },
        { watchBId: watchB.id },
      ],
    },
    include: { watchA: true, watchB: true },
    take: 6,
  })

  // Increment view count (fire-and-forget)
  prisma.comparison.update({
    where: { id: comparison.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {})

  const faq = [
    {
      question: `Which is better, ${watchA.brand} ${watchA.model} or ${watchB.brand} ${watchB.model}?`,
      answer: advantagesA.length > advantagesB.length
        ? `The ${watchA.brand} ${watchA.model} has more advantages including ${advantagesA.map(a => a.text.toLowerCase()).join(', ')}. However, both are exceptional timepieces suited to different preferences.`
        : advantagesB.length > advantagesA.length
        ? `The ${watchB.brand} ${watchB.model} has more advantages including ${advantagesB.map(a => a.text.toLowerCase()).join(', ')}. However, both are exceptional timepieces suited to different preferences.`
        : `Both watches are closely matched at ${similarity}% similarity. Your choice depends on personal preference for brand, design, and specific features.`,
    },
    {
      question: `What is the difference between ${watchA.brand} ${watchA.model} and ${watchB.brand} ${watchB.model}?`,
      answer: `Key differences: case size (${watchA.caseDiameter ?? 40}mm vs ${watchB.caseDiameter ?? 40}mm), power reserve (${watchA.powerReserve ?? 48}h vs ${watchB.powerReserve ?? 48}h), water resistance (${watchA.waterResistance ?? 100}m vs ${watchB.waterResistance ?? 100}m), and movement (${watchA.caliber ?? 'automatic'} vs ${watchB.caliber ?? 'automatic'}).`,
    },
    {
      question: `How similar are the ${watchA.brand} ${watchA.model} and ${watchB.brand} ${watchB.model}?`,
      answer: `These watches are ${similarity}% similar based on specs, price range, and category. Both are ${watchA.movement?.toLowerCase() ?? 'automatic'} watches in the ${watchA.caseMaterial?.toLowerCase() ?? 'steel'} category.`,
    },
  ]

  // Build cross-link data
  const styleA = watchA.style ? STYLE_MAP[watchA.style] : null
  const styleB = watchB.style ? STYLE_MAP[watchB.style] : null
  const tierA = TIER_BY_PRICE_RANGE[watchA.priceRange]
  const tierB = TIER_BY_PRICE_RANGE[watchB.priceRange]

  return (
    <>
      <ComparisonJsonLd
        watchA={{
          name: watchA.model,
          brand: watchA.brand,
          image: watchA.imageUrl,
          priceRange: watchA.priceRange,
        }}
        watchB={{
          name: watchB.model,
          brand: watchB.brand,
          image: watchB.imageUrl,
          priceRange: watchB.priceRange,
        }}
        url={`${BASE_URL}/compare/${slug}`}
        faq={faq}
      />

      <div className="mx-auto max-w-5xl px-4">
        {/* Breadcrumb */}
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/search" className="hover:text-patina-gold transition-colors">Compare</Link></li>
            <li>/</li>
            <li className="text-patina-text2">{watchA.brand} {watchA.model} vs {watchB.brand} {watchB.model}</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-lg sm:text-2xl md:text-3xl font-bold text-patina-text">
          {watchA.brand} {watchA.model} vs {watchB.brand} {watchB.model}
        </h1>
        <p className="mt-2 text-sm text-patina-text2">
          Detailed comparison, specs, and expert verdict
        </p>

        <ComparisonIntro watchA={watchA as Watch} watchB={watchB as Watch} />

        <ComparisonHeader
          watchA={watchA as Watch}
          watchB={watchB as Watch}
          similarity={similarity}
          scoreA={scoreA}
          scoreB={scoreB}
        />

        <AdvantageList
          watchAName={`${watchA.brand} ${watchA.model}`}
          watchBName={`${watchB.brand} ${watchB.model}`}
          advantagesA={advantagesA}
          advantagesB={advantagesB}
        />

        <section className="py-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">Radar Analysis</h2>
          <div className="rounded-2xl border border-patina-border bg-patina-bg2 p-6">
            <RadarChartWrapper
              categories={radarCategories}
              watchAName={`${watchA.brand} ${watchA.model}`}
              watchBName={`${watchB.brand} ${watchB.model}`}
            />
          </div>
        </section>

        <InteractiveSpecTable
          specs={specRows}
          watchAName={`${watchA.brand} ${watchA.model}`}
          watchBName={`${watchB.brand} ${watchB.model}`}
        />

        <CategoryGrid
          categories={radarCategories}
          watchAName={`${watchA.brand} ${watchA.model}`}
          watchBName={`${watchB.brand} ${watchB.model}`}
          watchABrand={watchA.brand}
          watchBBrand={watchB.brand}
        />

        <Verdict
          watchA={watchA as Watch}
          watchB={watchB as Watch}
          similarity={similarity}
          advantagesACount={advantagesA.length}
          advantagesBCount={advantagesB.length}
        />

        <VisibleFAQ items={faq} />

        {/* Cross-Links */}
        <section className="py-8">
          <h2 className="font-playfair text-xl font-semibold text-patina-text mb-6">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {styleA && (
              <Link
                href={`/style/${styleA.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                Browse all {styleA.label}
              </Link>
            )}
            {styleB && styleB.slug !== styleA?.slug && (
              <Link
                href={`/style/${styleB.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                Browse all {styleB.label}
              </Link>
            )}
            <Link
              href={`/brand/${toSlug(watchA.brand)}`}
              className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
            >
              All {watchA.brand} Watches
            </Link>
            {watchA.brand !== watchB.brand && (
              <Link
                href={`/brand/${toSlug(watchB.brand)}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                All {watchB.brand} Watches
              </Link>
            )}
            {tierA && (
              <Link
                href={`/tier/${tierA.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                {tierA.label} Watches ({tierA.priceLabel})
              </Link>
            )}
            {tierB && tierB.slug !== tierA?.slug && (
              <Link
                href={`/tier/${tierB.slug}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-3 text-sm text-patina-text2 hover:border-patina-gold/30 hover:text-patina-text transition-all"
              >
                {tierB.label} Watches ({tierB.priceLabel})
              </Link>
            )}
          </div>
        </section>

        <RelatedComparisons
          comparisons={relatedComparisons.map((c) => ({
            slug: c.slug,
            watchABrand: c.watchA.brand,
            watchAModel: c.watchA.model,
            watchBBrand: c.watchB.brand,
            watchBModel: c.watchB.model,
          }))}
        />

        <PopularComparisons />
      </div>
    </>
  )
}
