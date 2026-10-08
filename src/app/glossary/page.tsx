import { Metadata } from 'next'
import Link from 'next/link'
import { GLOSSARY_MAP, ALL_GLOSSARY } from '@/lib/glossary-content'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 604800

export const metadata: Metadata = {
  title: 'Watch Terminology Glossary — Every Term Explained',
  description: 'Plain-English explanations of watch terminology: COSC, tourbillon, Spring Drive, GMT, power reserve, sapphire crystal, in-house movements and more.',
  alternates: { canonical: `${BASE_URL}/glossary` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${BASE_URL}/glossary` },
  ],
}

export default function GlossaryIndexPage() {
  const entries = ALL_GLOSSARY
    .map((slug) => GLOSSARY_MAP[slug])
    .sort((a, b) => a.term.localeCompare(b.term))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-patina-text2">Glossary</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-patina-text mb-3">
          Watch Terminology Glossary
        </h1>
        <p className="text-patina-text2 max-w-2xl mb-10">
          The vocabulary of mechanical watchmaking, explained without jargon — from COSC
          certification to Zaratsu polishing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {entries.map((e) => (
            <Link
              key={e.slug}
              href={`/glossary/${e.slug}`}
              className="group rounded-xl border border-patina-border bg-patina-bg2 p-5 hover:border-patina-gold/40 hover:bg-patina-bg3 transition-all"
            >
              <h2 className="font-playfair text-base font-semibold text-patina-text group-hover:text-patina-gold transition-colors">
                {e.term}
              </h2>
              <p className="mt-1.5 text-xs text-patina-text2 line-clamp-2">{e.short}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
