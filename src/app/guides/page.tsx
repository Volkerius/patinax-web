import { Metadata } from 'next'
import Link from 'next/link'
import { GUIDE_MAP, ALL_GUIDES } from '@/lib/guide-content'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Watch Buying Guides — Expert Picks & Comparisons',
  description: 'In-depth watch buying guides from Patinax: best dive watches, GMTs, chronographs, dress watches, first luxury watch advice, and vintage collecting — with live spec comparisons.',
  alternates: { canonical: `${BASE_URL}/guides` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
  ],
}

export default function GuidesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-patina-text2">Guides</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-patina-text mb-3">
          Watch Buying Guides
        </h1>
        <p className="text-patina-text2 max-w-2xl mb-10">
          Long-form, opinionated guides backed by the Patinax spec database — every recommendation
          links to full specifications and side-by-side comparisons.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_GUIDES.map((slug) => {
            const g = GUIDE_MAP[slug]
            return (
              <Link
                key={slug}
                href={`/guides/${slug}`}
                className="group rounded-xl border border-patina-border bg-patina-bg2 p-6 hover:border-patina-gold/40 hover:bg-patina-bg3 transition-all"
              >
                <h2 className="font-playfair text-lg font-semibold text-patina-text group-hover:text-patina-gold transition-colors">
                  {g.title}
                </h2>
                <p className="mt-2 text-sm text-patina-text2 line-clamp-3">{g.intro.split('\n\n')[0]}</p>
                <p className="mt-3 text-xs text-patina-gold">Read the guide &rarr;</p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
