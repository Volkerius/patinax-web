import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MATERIAL_MAP, ALL_MATERIALS, materialDbValues } from '@/lib/material-content'
import { BASE_URL } from '@/lib/seo'
import { WatchCard } from '@/components/ui/WatchCard'

export const revalidate = 86400 // ISR: revalidate daily

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ALL_MATERIALS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const content = MATERIAL_MAP[slug]
  if (!content) return { title: 'Material Not Found' }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `${BASE_URL}/material/${content.slug}` },
    keywords: [
      `${content.label.toLowerCase()}`,
      `${content.slug} watches`,
      `luxury ${content.slug} watch`,
      `best ${content.slug} watches`,
      `${content.slug} watch comparison`,
      `${content.slug} watches 2026`,
    ],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${BASE_URL}/material/${content.slug}`,
      type: 'website',
    },
  }
}

export default async function MaterialPage({ params }: PageProps) {
  const { slug } = await params
  const content = MATERIAL_MAP[slug]
  if (!content) notFound()

  const { prisma } = await import('@/lib/prisma')

  const dbValues = materialDbValues(slug)
  const watches = await prisma.watch.findMany({
    where: { caseMaterial: { in: dbValues } },
    orderBy: [{ priceRange: 'desc' }, { brand: 'asc' }],
  })

  const brandCount = new Set(watches.map((w) => w.brand)).size
  const diameters = watches.map((w) => w.caseDiameter).filter(Boolean) as number[]
  const minDiameter = diameters.length > 0 ? Math.min(...diameters) : null
  const maxDiameter = diameters.length > 0 ? Math.max(...diameters) : null

  const popularComparisons = await prisma.comparison.findMany({
    where: {
      OR: [
        { watchA: { caseMaterial: { in: dbValues } } },
        { watchB: { caseMaterial: { in: dbValues } } },
      ],
    },
    include: { watchA: true, watchB: true },
    orderBy: { viewCount: 'desc' },
    take: 6,
  })

  const otherMaterials = ALL_MATERIALS.filter((m) => m !== slug)

  const pageUrl = `${BASE_URL}/material/${content.slug}`

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
      { '@type': 'ListItem', position: 2, name: 'Case Material', item: `${BASE_URL}/material/steel` },
      { '@type': 'ListItem', position: 3, name: content.label, item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li><span className="text-patina-text3">Case Material</span></li>
            <li>/</li>
            <li className="text-patina-text2">{content.label}</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-xl sm:text-3xl font-bold text-patina-text mb-2">
          {content.title}
          <span className="ml-2 text-patina-gold">Collection</span>
        </h1>

        <div className="text-sm text-patina-text2 leading-relaxed mb-8 max-w-3xl space-y-3">
          {content.intro.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))}
        </div>

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
              {minDiameter && maxDiameter ? `${minDiameter}-${maxDiameter}mm` : '—'}
            </p>
            <p className="text-xs text-patina-text3 mt-1">Size Range</p>
          </div>
        </div>

        {content.highlights.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {content.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-patina-text2">
                  <span className="mt-0.5 text-patina-gold">&#x2022;</span>{h}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
            All {content.label} ({watches.length})
          </h2>
          {watches.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
          ) : (
            <div className="rounded-xl border border-patina-border bg-patina-bg2 p-12 text-center">
              <p className="text-patina-text2">No {content.label.toLowerCase()} found yet.</p>
            </div>
          )}
        </section>

        {popularComparisons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
              Popular Comparisons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularComparisons.map((comp) => (
                <Link
                  key={comp.id}
                  href={`/compare/${comp.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-patina-border bg-patina-bg2 p-4 transition-all hover:border-patina-gold/30 hover:bg-patina-bg3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-patina-text truncate">{comp.watchA.brand} {comp.watchA.model}</p>
                    <p className="text-xs text-patina-gold mt-0.5">vs</p>
                    <p className="text-sm font-medium text-patina-text truncate">{comp.watchB.brand} {comp.watchB.model}</p>
                  </div>
                  <span className="text-xs text-patina-text3 whitespace-nowrap">{comp.viewCount} views</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {content.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {content.faq.map((item, i) => (
                <details key={i} className="group rounded-xl border border-patina-border bg-patina-bg2 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-medium text-patina-text hover:bg-patina-bg3 transition-colors">
                    {item.question}
                    <span className="ml-2 text-patina-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-patina-text2 leading-relaxed">{item.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">Explore Other Materials</h2>
          <div className="flex flex-wrap gap-2">
            {otherMaterials.map((m) => (
              <Link
                key={m}
                href={`/material/${m}`}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-2 text-sm text-patina-text hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
              >
                {MATERIAL_MAP[m].label.replace(' Watches', '')}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
