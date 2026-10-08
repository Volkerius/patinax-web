import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GLOSSARY_MAP, ALL_GLOSSARY } from '@/lib/glossary-content'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 604800

interface PageProps {
  params: Promise<{ slug: string }>
}

// "What is a Tourbillon?" vs "What is Patina?" — mass nouns, plurals,
// acronyms, and named technologies take no article.
function glossaryArticle(term: string): string {
  const noArticle = /^(COSC|ISO|Spring Drive|Patina|Lume|Oystersteel|Zaratsu|Water Resistance|Hacking)/i
  if (noArticle.test(term)) return ''
  return /^[aeiou]/i.test(term) ? 'an ' : 'a '
}

export async function generateStaticParams() {
  return ALL_GLOSSARY.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = GLOSSARY_MAP[slug]
  if (!entry) return { title: 'Term Not Found' }
  return {
    title: `What is ${entry.term}? — Watch Glossary`,
    description: entry.short,
    alternates: { canonical: `${BASE_URL}/glossary/${entry.slug}` },
  }
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params
  const entry = GLOSSARY_MAP[slug]
  if (!entry) notFound()

  const pageUrl = `${BASE_URL}/glossary/${entry.slug}`

  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.term,
    description: entry.short,
    url: pageUrl,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Patinax Watch Glossary', url: `${BASE_URL}/glossary` },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${BASE_URL}/glossary` },
      { '@type': 'ListItem', position: 3, name: entry.term, item: pageUrl },
    ],
  }

  const related = entry.related
    .map((r) => GLOSSARY_MAP[r])
    .filter(Boolean)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="mx-auto max-w-3xl px-4 py-8">
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/glossary" className="hover:text-patina-gold transition-colors">Glossary</Link></li>
            <li>/</li>
            <li className="text-patina-text2 truncate max-w-[180px]">{entry.term}</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-patina-text mb-4">
          What is {glossaryArticle(entry.term)}{entry.term}?
        </h1>

        <p className="text-base md:text-lg text-patina-text leading-relaxed mb-8 border-l-2 border-patina-gold pl-4">
          {entry.short}
        </p>

        <div className="text-sm md:text-base text-patina-text2 leading-relaxed space-y-4 mb-10">
          {entry.body.split('\n\n').map((para, i) => (<p key={i}>{para}</p>))}
        </div>

        {entry.hubLink && (
          <div className="mb-10">
            <Link
              href={entry.hubLink.href}
              className="inline-block rounded-lg bg-patina-gold px-5 py-2.5 text-sm font-semibold text-patina-bg hover:bg-patina-gold2 transition-colors"
            >
              {entry.hubLink.label} &rarr;
            </Link>
          </div>
        )}

        {related.length > 0 && (
          <section className="border-t border-patina-border pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-4">
              Related Terms
            </h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/glossary/${r.slug}`}
                  className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-2 text-sm text-patina-text hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
                >
                  {r.term}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
