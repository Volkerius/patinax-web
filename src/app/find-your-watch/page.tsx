import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { BASE_URL } from '@/lib/seo'
import { toSlug } from '@/lib/slug'
import { QUIZ_QUESTIONS, rankWatches, isQuizComplete, type QuizAnswers } from '@/lib/quiz'
import { QuizFlow } from '@/components/quiz/QuizFlow'
import { WatchCard } from '@/components/ui/WatchCard'
import { WatchImage } from '@/components/ui/WatchImage'

export const dynamic = 'force-dynamic' // searchParams drive the page

export const metadata: Metadata = {
  title: 'Watch Finder Quiz — Find Your Perfect Luxury Watch',
  description: 'Take the 60-second Patinax Watch Finder quiz: 8 questions, 1,200+ watches scored. Get personalized matches across budget, style, movement, size, and brand tier.',
  alternates: { canonical: `${BASE_URL}/find-your-watch` },
  keywords: [
    'watch finder', 'watch quiz', 'find your watch', 'watch recommendation',
    'which watch should I buy', 'luxury watch finder', 'watch finder tool',
    'watch picker', 'watch matchmaker', 'best watch for me',
  ],
  openGraph: {
    title: 'Watch Finder Quiz — Patinax',
    description: '8 questions. 1,200+ luxury watches. Find your match.',
    url: `${BASE_URL}/find-your-watch`,
    type: 'website',
  },
}

interface PageProps {
  searchParams: Promise<{
    budget?: string
    style?: string
    movement?: string
    material?: string
    size?: string
    tier?: string
    water?: string
    era?: string
    done?: string
  }>
}

const introJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Patinax Watch Finder Quiz',
  description: '8-question quiz that matches you to luxury watches based on budget, style, movement, material, size, brand tier, water resistance, and era preferences.',
  url: `${BASE_URL}/find-your-watch`,
  numberOfQuestions: QUIZ_QUESTIONS.length,
  educationalUse: 'Recommendation',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Watch Finder', item: `${BASE_URL}/find-your-watch` },
  ],
}

export default async function FindYourWatchPage({ searchParams }: PageProps) {
  const params = await searchParams
  const answers: QuizAnswers = {
    budget: params.budget,
    style: params.style,
    movement: params.movement,
    material: params.material,
    size: params.size,
    tier: params.tier,
    water: params.water,
    era: params.era,
  }

  const showResults = params.done === '1' || isQuizComplete(answers)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(introJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-[60vh]">
        {/* Hero */}
        <section className="border-b border-patina-border bg-patina-bg2">
          <div className="mx-auto max-w-4xl px-4 py-10 text-center">
            <nav className="text-xs text-patina-text3 mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center gap-1.5">
                <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-patina-text2">Watch Finder</li>
              </ol>
            </nav>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-patina-text">
              {showResults ? 'Your Watch Matches' : 'Find Your Perfect Watch'}
            </h1>
            <p className="mt-3 text-sm md:text-base text-patina-text2 max-w-2xl mx-auto">
              {showResults
                ? 'Ranked across all 1,200+ watches in the Patinax catalog based on your answers.'
                : '8 questions, 60 seconds. We\'ll rank every watch in our 1,200+ catalog by how well it fits.'}
            </p>
          </div>
        </section>

        {showResults ? (
          <ResultsSection answers={answers} />
        ) : (
          <Suspense fallback={<div className="py-12 text-center text-patina-text2">Loading…</div>}>
            <QuizFlow initialAnswers={answers} />
          </Suspense>
        )}
      </div>
    </>
  )
}

async function ResultsSection({ answers }: { answers: QuizAnswers }) {
  const { prisma } = await import('@/lib/prisma')

  const allWatches = await prisma.watch.findMany({
    select: {
      id: true, brand: true, model: true, slug: true, imageUrl: true,
      caseDiameter: true, caseMaterial: true, movement: true, style: true,
      priceRange: true, brandTier: true, waterResistance: true, year: true,
    },
  })

  const ranked = rankWatches(allWatches, answers)
  const top = ranked[0]
  const next = ranked.slice(1, 13) // 12 alternatives

  // Build "View all" links matching key answer dimensions
  const exploreLinks: { href: string; label: string }[] = []
  if (answers.style && answers.style !== 'any') {
    exploreLinks.push({ href: `/style/${answers.style}`, label: `All ${answers.style} watches` })
  }
  if (answers.material && answers.material !== 'any') {
    exploreLinks.push({ href: `/material/${answers.material}`, label: `All ${answers.material} watches` })
  }
  if (answers.movement && answers.movement !== 'any') {
    const slug = answers.movement.toLowerCase().replace(/\s+/g, '-')
    exploreLinks.push({ href: `/movement/${slug}`, label: `All ${answers.movement} watches` })
  }
  if (answers.size && answers.size !== 'any') {
    exploreLinks.push({ href: `/size/${answers.size}`, label: `All ${answers.size} watches` })
  }

  // Summary of answers (display)
  const summary: string[] = []
  if (answers.budget && answers.budget !== 'any') {
    const labels = ['', 'under $2K', '$2K–$5K', '$5K–$15K', '$15K–$50K', '$50K+']
    summary.push(`Budget: ${labels[parseInt(answers.budget)] || '—'}`)
  }
  if (answers.style && answers.style !== 'any') summary.push(`Style: ${answers.style}`)
  if (answers.movement && answers.movement !== 'any') summary.push(`Movement: ${answers.movement}`)
  if (answers.material && answers.material !== 'any') summary.push(`Material: ${answers.material}`)
  if (answers.size && answers.size !== 'any') summary.push(`Size: ${answers.size}`)
  if (answers.tier && answers.tier !== 'any') {
    const tiers = ['', '', 'accessible', 'mid-tier', 'top-tier', 'haute horlogerie']
    summary.push(`Tier: ${tiers[parseInt(answers.tier)] || '—'}`)
  }
  if (answers.water && answers.water !== 'any') summary.push(`Water: ${answers.water}`)
  if (answers.era && answers.era !== 'any' && answers.era !== 'both') summary.push(`Era: ${answers.era}`)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Your picks summary */}
      {summary.length > 0 && (
        <div className="mb-8 rounded-xl border border-patina-border bg-patina-bg2 p-5">
          <p className="text-xs uppercase tracking-widest text-patina-text3 mb-2">Your picks</p>
          <div className="flex flex-wrap gap-2">
            {summary.map((s) => (
              <span
                key={s}
                className="rounded-full border border-patina-border bg-patina-bg px-3 py-1 text-xs text-patina-text2"
              >
                {s}
              </span>
            ))}
            <Link
              href="/find-your-watch"
              className="rounded-full border border-patina-gold/30 bg-patina-bg px-3 py-1 text-xs text-patina-gold hover:bg-patina-gold/10 transition-colors"
            >
              Retake quiz
            </Link>
          </div>
        </div>
      )}

      {/* Top match — hero card */}
      {top && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="rounded-full bg-patina-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-patina-gold">
              Your top match
            </span>
            <span className="text-xs text-patina-text3">Score: {top.score}/100</span>
          </div>
          <Link
            href={`/watch/${toSlug(top.input.brand)}/${top.input.slug.split('-').slice(top.input.brand.split(/[\s.&]+/).filter(Boolean).length).join('-')}`}
            className="block rounded-2xl border border-patina-gold/30 bg-patina-bg2 p-6 md:p-8 hover:border-patina-gold/60 hover:bg-patina-bg3 transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="relative aspect-square w-full max-w-[280px] mx-auto md:mx-0 md:max-w-none bg-patina-bg3 rounded-xl overflow-hidden">
                <WatchImage
                  src={top.input.imageUrl}
                  brand={top.input.brand}
                  model={top.input.model}
                  sizes="(max-width: 768px) 280px, 280px"
                />
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-widest text-patina-gold mb-1">{top.input.brand}</p>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-patina-text">
                  {top.input.model}
                </h2>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-patina-text2">
                  {top.input.caseDiameter && <span>{top.input.caseDiameter}mm</span>}
                  {top.input.movement && <span>· {top.input.movement}</span>}
                  {top.input.caseMaterial && <span>· {top.input.caseMaterial}</span>}
                  {top.input.year && <span>· {top.input.year}</span>}
                </div>
                {top.reasons.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {top.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-patina-text2">
                        <span className="mt-0.5 text-patina-gold">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 text-xs text-patina-gold">View full specs &rarr;</p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Alternatives grid */}
      {next.length > 0 && (
        <section className="mb-12">
          <h2 className="font-playfair text-xl font-semibold text-patina-text mb-4">
            More watches matching your picks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {next.map((r) => (
              <WatchCard
                key={r.input.id}
                watch={{
                  brand: r.input.brand,
                  model: r.input.model,
                  slug: r.input.slug,
                  imageUrl: r.input.imageUrl,
                  priceRange: r.input.priceRange,
                  caseDiameter: r.input.caseDiameter ?? null,
                  movement: r.input.movement ?? null,
                  style: r.input.style,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Browse links */}
      {exploreLinks.length > 0 && (
        <section className="mb-12">
          <h2 className="font-playfair text-xl font-semibold text-patina-text mb-4">
            Browse the full catalog
          </h2>
          <div className="flex flex-wrap gap-2">
            {exploreLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-2 text-sm text-patina-text hover:border-patina-gold/30 hover:text-patina-gold transition-colors capitalize"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/watches"
              className="rounded-lg border border-patina-border bg-patina-bg2 px-4 py-2 text-sm text-patina-text hover:border-patina-gold/30 hover:text-patina-gold transition-colors"
            >
              All 1,200+ watches
            </Link>
          </div>
        </section>
      )}

      {/* Retake CTA */}
      <section className="rounded-xl border border-patina-border bg-patina-bg2 p-6 text-center">
        <p className="text-sm text-patina-text2 mb-3">
          Not quite right? Adjust your answers and try again.
        </p>
        <Link
          href="/find-your-watch"
          className="inline-block rounded-lg bg-patina-gold px-5 py-2.5 text-sm font-semibold text-patina-bg hover:bg-patina-gold2 transition-colors"
        >
          Retake the quiz
        </Link>
      </section>
    </div>
  )
}
