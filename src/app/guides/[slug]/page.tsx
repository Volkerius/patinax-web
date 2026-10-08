import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GUIDE_MAP, ALL_GUIDES } from '@/lib/guide-content'
import { BASE_URL } from '@/lib/seo'
import { WatchCard } from '@/components/ui/WatchCard'

export const revalidate = 86400

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ALL_GUIDES.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDE_MAP[slug]
  if (!guide) return { title: 'Guide Not Found' }
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `${BASE_URL}/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${BASE_URL}/guides/${guide.slug}`,
      type: 'article',
    },
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = GUIDE_MAP[slug]
  if (!guide) notFound()

  const { prisma } = await import('@/lib/prisma')

  // Collect every referenced watch slug across sections and fetch in one query
  const allSlugs = guide.sections.flatMap((s) => s.watchSlugs ?? [])
  const watches = allSlugs.length > 0
    ? await prisma.watch.findMany({
        where: { slug: { in: allSlugs } },
        select: {
          slug: true, brand: true, model: true, imageUrl: true,
          priceRange: true, caseDiameter: true, movement: true, style: true,
        },
      })
    : []
  const bySlug = new Map(watches.map((w) => [w.slug, w]))

  const pageUrl = `${BASE_URL}/guides/${guide.slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    dateModified: guide.updated,
    url: pageUrl,
    author: { '@type': 'Organization', name: 'Patinax' },
    publisher: { '@type': 'Organization', name: 'Patinax', url: BASE_URL },
  }

  const faqJsonLd = guide.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((f) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-8">
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/guides" className="hover:text-patina-gold transition-colors">Guides</Link></li>
            <li>/</li>
            <li className="text-patina-text2 truncate max-w-[200px]">{guide.title}</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-patina-text mb-2">
          {guide.title}
        </h1>
        <p className="text-xs text-patina-text3 mb-8">
          Updated {guide.updated} · By the Patinax editorial team
        </p>

        <div className="text-sm md:text-base text-patina-text2 leading-relaxed space-y-4 max-w-3xl mb-10">
          {guide.intro.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))}
        </div>

        {guide.sections.map((section, i) => {
          const sectionWatches = (section.watchSlugs ?? [])
            .map((s) => bySlug.get(s))
            .filter((w): w is NonNullable<typeof w> => Boolean(w))
          return (
            <section key={i} className="mb-12">
              <h2 className="font-playfair text-xl md:text-2xl font-semibold text-patina-text mb-4">
                {section.heading}
              </h2>
              <div className="text-sm md:text-base text-patina-text2 leading-relaxed space-y-4 max-w-3xl">
                {section.body.split('\n\n').map((para, j) => (<p key={j}>{para}</p>))}
              </div>
              {sectionWatches.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {sectionWatches.map((w) => (
                    <WatchCard
                      key={w.slug}
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
              )}
            </section>
          )
        })}

        {guide.faq.length > 0 && (
          <section className="mb-12">
            <h2 className="font-playfair text-xl md:text-2xl font-semibold text-patina-text mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {guide.faq.map((item, i) => (
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

        {guide.related.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-4">
              More Guides
            </h2>
            <div className="flex flex-wrap gap-2">
              {guide.related.map((rSlug) => {
                const r = GUIDE_MAP[rSlug]
                if (!r) return null
                return (
                  <Link
                    key={rSlug}
                    href={`/guides/${rSlug}`}
                    className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-2 text-sm text-patina-text hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
                  >
                    {r.title}
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
