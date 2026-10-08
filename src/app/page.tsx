import { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/layout/Logo'
import { SearchBar } from '@/components/ui/SearchBar'
import { WatchImage } from '@/components/ui/WatchImage'
import { WatchCard } from '@/components/ui/WatchCard'
import { toSlug } from '@/lib/slug'
import { STYLE_MAP } from '@/lib/style-content'
import { TIER_MAP } from '@/lib/tier-content'
import { MATERIAL_MAP, ALL_MATERIALS } from '@/lib/material-content'
import { SIZE_MAP, ALL_SIZES } from '@/lib/size-content'
import { MOVEMENT_MAP, ALL_MOVEMENTS } from '@/lib/movement-content'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 86400 // ISR: revalidate daily

export const metadata: Metadata = {
  title: 'Patinax — Compare Luxury Watches Side by Side | Specs, Radar Analysis & Verdicts',
  description: 'Compare luxury watches side-by-side with detailed specs, radar analysis, and expert verdicts. Rolex vs Omega, Patek Philippe vs Audemars Piguet, and 150+ premium watch brands compared instantly.',
  alternates: { canonical: BASE_URL },
}

const FEATURED_WATCH_SLUGS = [
  'rolex-submariner-date',
  'omega-seamaster-diver-300m',
  'patek-philippe-nautilus-5711-1a',
  'audemars-piguet-royal-oak-15500st',
  'tudor-black-bay-58',
  'cartier-santos-de-cartier',
  'iwc-portugieser-chronograph',
  'jaeger-lecoultre-reverso-classic',
]

const STYLE_CARDS = Object.values(STYLE_MAP).slice(0, 6)
const TIER_CARDS = Object.values(TIER_MAP)

const POPULAR_BRANDS = [
  { slug: 'rolex', name: 'Rolex' },
  { slug: 'omega', name: 'Omega' },
  { slug: 'patek-philippe', name: 'Patek Philippe' },
  { slug: 'audemars-piguet', name: 'Audemars Piguet' },
  { slug: 'tudor', name: 'Tudor' },
  { slug: 'cartier', name: 'Cartier' },
  { slug: 'iwc', name: 'IWC' },
  { slug: 'jaeger-lecoultre', name: 'Jaeger-LeCoultre' },
]

/**
 * Round-avatar variant for the Popular Comparisons cards — wraps the shared
 * WatchImage so a failed src still falls back to the SVG illustration.
 */
function WatchAvatar({ src, brand, model, className }: { src: string | null; brand: string; model: string; className?: string }) {
  return (
    <div className={`relative ${className || 'h-20 w-20'} overflow-hidden rounded-full bg-patina-bg3 border border-patina-border`}>
      <WatchImage src={src} brand={brand} model={model} sizes="112px" padding="p-2" />
    </div>
  )
}

export default async function HomePage() {
  const { prisma } = await import('@/lib/prisma')
  const [comparisons, featuredWatches] = await Promise.all([
    prisma.comparison.findMany({
      orderBy: { viewCount: 'desc' },
      take: 6,
      include: {
        watchA: { select: { brand: true, model: true, imageUrl: true } },
        watchB: { select: { brand: true, model: true, imageUrl: true } },
      },
    }),
    prisma.watch.findMany({
      where: { slug: { in: FEATURED_WATCH_SLUGS } },
      select: { brand: true, model: true, slug: true, imageUrl: true, priceRange: true, caseDiameter: true, movement: true, style: true },
    }),
  ])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Logo size="lg" />
          <h1 className="mt-6 font-playfair text-2xl sm:text-3xl md:text-5xl font-bold text-patina-text leading-tight">
            Compare Luxury Watches{' '}
            <span className="text-patina-gold">Side by Side</span>
          </h1>
          <p className="mt-4 text-lg text-patina-text2 max-w-2xl mx-auto">
            Detailed specs, radar analysis, and expert verdicts for Rolex, Omega, Patek Philippe, and 150+ premium watch brands.
          </p>
          <div className="mt-8 mx-auto max-w-xl">
            <SearchBar />
          </div>
          {/* Find Your Watch Quiz CTA */}
          <div className="mt-6 mx-auto max-w-xl">
            <Link
              href="/find-your-watch"
              className="group inline-flex items-center gap-3 rounded-full border border-patina-gold/40 bg-patina-bg2/60 backdrop-blur px-5 py-3 text-sm hover:border-patina-gold hover:bg-patina-bg3 transition-all"
            >
              <span className="rounded-full bg-patina-gold/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-widest text-patina-gold">
                New
              </span>
              <span className="text-patina-text">Not sure which watch suits you?</span>
              <span className="text-patina-gold font-medium">Take the 60-sec quiz →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-8 text-center">
            Popular Comparisons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="group rounded-xl border border-patina-border bg-patina-bg2 p-5 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <WatchAvatar
                      src={comp.watchA.imageUrl}
                      brand={comp.watchA.brand}
                      model={comp.watchA.model}
                      className="h-20 w-20 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="mt-2 text-xs text-patina-text2 text-center">{comp.watchA.brand}</span>
                  </div>
                  <span className="font-playfair text-sm font-bold text-patina-gold/60">VS</span>
                  <div className="flex flex-col items-center">
                    <WatchAvatar
                      src={comp.watchB.imageUrl}
                      brand={comp.watchB.brand}
                      model={comp.watchB.model}
                      className="h-20 w-20 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="mt-2 text-xs text-patina-text2 text-center">{comp.watchB.brand}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-patina-text font-medium">
                    {comp.watchA.model} vs {comp.watchB.model}
                  </span>
                  <span className="text-patina-gold text-xs group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Watches */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-8 text-center">
            Featured Watches
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredWatches.map((w) => (
              <WatchCard key={w.slug} watch={w} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-8 text-center">
            Browse by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POPULAR_BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brand/${brand.slug}`}
                className="flex flex-col items-center justify-center rounded-xl border border-patina-border bg-patina-bg2 p-6 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-patina-bg3 border border-patina-border mb-3">
                  <span className="font-playfair text-lg font-bold text-patina-gold">{brand.name.charAt(0)}</span>
                </div>
                <span className="text-sm text-patina-text font-medium">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STYLE_CARDS.map((style) => (
              <Link
                key={style.slug}
                href={`/style/${style.slug}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-patina-border bg-patina-bg2 p-6 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
              >
                <span className="font-playfair text-lg font-semibold text-patina-text group-hover:text-patina-gold transition-colors">{style.label}</span>
                <span className="mt-1 text-xs text-patina-text2 text-center line-clamp-2">{style.highlights?.[0] ?? ''}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Price */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-8 text-center">
            Browse by Price
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {TIER_CARDS.map((tier) => (
              <Link
                key={tier.slug}
                href={`/tier/${tier.slug}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-patina-border bg-patina-bg2 p-5 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
              >
                <span className="font-playfair text-sm font-semibold text-patina-text group-hover:text-patina-gold transition-colors">{tier.label}</span>
                <span className="mt-1 text-xs text-patina-gold/70">{tier.priceLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Case Material */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-8 text-center">
            Browse by Case Material
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {ALL_MATERIALS.map((slug) => {
              const m = MATERIAL_MAP[slug]
              return (
                <Link
                  key={slug}
                  href={`/material/${slug}`}
                  className="group flex items-center justify-center rounded-xl border border-patina-border bg-patina-bg2 px-4 py-3 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
                >
                  <span className="text-sm font-medium text-patina-text group-hover:text-patina-gold transition-colors text-center">
                    {m.label.replace(' Watches', '')}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Browse by Size */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-8 text-center">
            Browse by Case Size
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ALL_SIZES.map((slug) => {
              const s = SIZE_MAP[slug]
              return (
                <Link
                  key={slug}
                  href={`/size/${slug}`}
                  className="group flex flex-col items-center justify-center rounded-xl border border-patina-border bg-patina-bg2 p-5 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
                >
                  <span className="font-playfair text-sm font-semibold text-patina-text group-hover:text-patina-gold transition-colors text-center">
                    {s.label.replace(/ Watches.*/, '')}
                  </span>
                  <span className="mt-1 text-xs text-patina-gold/70">
                    {s.max > 100 ? `${s.min}mm+` : `${s.min}–${s.max}mm`}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Browse by Movement */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-8 text-center">
            Browse by Movement Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ALL_MOVEMENTS.map((slug) => {
              const m = MOVEMENT_MAP[slug]
              return (
                <Link
                  key={slug}
                  href={`/movement/${slug}`}
                  className="group flex flex-col items-center justify-center rounded-xl border border-patina-border bg-patina-bg2 p-5 hover:border-patina-gold/30 hover:bg-patina-bg3 transition-all"
                >
                  <span className="font-playfair text-sm font-semibold text-patina-text group-hover:text-patina-gold transition-colors text-center">
                    {m.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 border-t border-patina-border">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-playfair text-2xl font-semibold text-patina-text mb-6 text-center">
            The Definitive Luxury Watch Comparison Platform
          </h2>
          <div className="space-y-4 text-sm text-patina-text2 leading-relaxed">
            <p>
              Patinax helps you make informed decisions when choosing between luxury timepieces.
              Our detailed comparisons include full specifications, radar analysis charts,
              advantage breakdowns, and expert verdicts for every major watch model from
              brands like Rolex, Omega, Patek Philippe, Audemars Piguet, and many more.
            </p>
            <h3 className="font-playfair text-lg font-semibold text-patina-text pt-2">How Patinax Compares Watches</h3>
            <p>
              Every comparison on Patinax analyzes case diameter, movement type, water resistance,
              power reserve, price tier, and COSC certification. Our radar analysis visualizes
              each watch&apos;s strengths across six key categories, making it easy to see which
              timepiece excels where. Whether you&apos;re choosing between the Rolex Submariner and
              Omega Seamaster or deciding between the Patek Philippe Nautilus and Audemars Piguet
              Royal Oak, Patinax gives you the data you need.
            </p>
            <h3 className="font-playfair text-lg font-semibold text-patina-text pt-2">Explore 150+ Premium Watch Brands</h3>
            <p>
              From entry-luxury brands like Tudor and TAG Heuer to haute horlogerie houses like
              A. Lange &amp; Sohne and Vacheron Constantin, Patinax covers the full spectrum of
              fine watchmaking. Browse individual watch pages for complete specifications, or
              use our comparison tool to evaluate any two watches head-to-head with objective,
              data-driven analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
