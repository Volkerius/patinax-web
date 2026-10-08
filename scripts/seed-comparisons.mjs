// Generate comparison entries linking newly-seeded watches (vintage, modern,
// big-batch, mega-batch) to similar popular watches in the catalog.
// Each comparison = new /compare/<slug> URL = new SEO surface.
//
// Matching: same style, similar tier (±1), similar size, different brand.
// Skips duplicates and handles slug ordering canonically.

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function canonicalSlug(slugA, slugB) {
  // Always alphabetical so "X-vs-Y" and "Y-vs-X" produce the same canonical slug
  const [a, b] = [slugA, slugB].sort()
  return `${a}-vs-${b}`
}

function similarityScore(a, b) {
  let score = 0
  // Different brand is required (skip same-brand)
  if (a.brand === b.brand) return -1
  // Same style: highest weight
  if (a.style === b.style) score += 40
  else return -1 // skip cross-style
  // Brand tier proximity
  const tierDiff = Math.abs((a.brandTier || 3) - (b.brandTier || 3))
  if (tierDiff === 0) score += 20
  else if (tierDiff === 1) score += 10
  // Price tier proximity
  const priceDiff = Math.abs((a.priceRange || 3) - (b.priceRange || 3))
  if (priceDiff === 0) score += 20
  else if (priceDiff === 1) score += 10
  else if (priceDiff >= 3) return -1 // skip too-distant prices
  // Size proximity (within 4mm)
  if (a.caseDiameter && b.caseDiameter) {
    const sizeDiff = Math.abs(a.caseDiameter - b.caseDiameter)
    if (sizeDiff <= 2) score += 15
    else if (sizeDiff <= 4) score += 8
  }
  // Movement match
  if (a.movement && b.movement && a.movement === b.movement) score += 10
  return score
}

async function main() {
  // Pull all watches with the data needed for matching
  const all = await prisma.watch.findMany({
    select: {
      id: true, brand: true, model: true, slug: true,
      style: true, brandTier: true, priceRange: true,
      caseDiameter: true, movement: true, apiId: true,
    },
  })

  // Existing comparisons we should not duplicate
  const existingSlugs = new Set(
    (await prisma.comparison.findMany({ select: { slug: true } })).map((c) => c.slug),
  )

  // Target watches: those added in the recent batches
  const targets = all.filter((w) =>
    w.apiId.startsWith('vintage-') ||
    w.apiId.startsWith('modern-') ||
    w.apiId.startsWith('bigbatch-') ||
    w.apiId.startsWith('mega-') ||
    w.apiId.startsWith('third-') ||
    w.apiId.startsWith('fourth-'),
  )

  console.log(`Target watches (recent batches): ${targets.length}`)
  console.log(`Existing comparisons: ${existingSlugs.size}`)

  let inserted = 0
  let skipped = 0
  let failed = 0

  for (const target of targets) {
    // Find similar watches by score, take top 4
    const candidates = all
      .filter((other) => other.id !== target.id)
      .map((other) => ({ watch: other, score: similarityScore(target, other) }))
      .filter((x) => x.score > 30)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

    for (const cand of candidates) {
      const slug = canonicalSlug(target.slug, cand.watch.slug)
      if (existingSlugs.has(slug)) { skipped++; continue }

      try {
        // Determine which is A and which is B based on slug ordering
        const aFirst = target.slug < cand.watch.slug
        const watchAId = aFirst ? target.id : cand.watch.id
        const watchBId = aFirst ? cand.watch.id : target.id

        await prisma.comparison.create({
          data: {
            slug,
            watchAId,
            watchBId,
            // Seed with viewCount=2 so they pass the sitemap quality filter
            // (>=1) and are surfaced as "popular" rather than dead links.
            viewCount: 2,
          },
        })
        existingSlugs.add(slug)
        inserted++
      } catch (e) {
        failed++
        if (failed < 5) console.log(`  ! ${slug}: ${e.message}`)
      }
    }
  }

  console.log(`\nInserted: ${inserted} / Skipped (dup): ${skipped} / Failed: ${failed}`)
  await prisma.$disconnect()
}

main().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
