// Plan C: Pull Wikipedia summaries for existing watches, extract structured
// facts, then assemble fresh Patinax-style descriptions. Wikipedia text is
// used as a FACT SOURCE, not copied verbatim — the output paragraphs are
// generated from extracted facts and DB specs, with sentence-level rewrites
// where Wikipedia phrasing is reused.
//
// Run: node --env-file=.env scripts/enrich-descriptions.mjs

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const STYLE_DESCRIPTORS = {
  diver: ['dive watch', 'professional diving instrument', 'water-resistant tool watch'],
  pilot: ['pilot\'s watch', 'aviation timepiece', 'cockpit-derived design'],
  chrono: ['chronograph', 'racing-inspired chronograph', 'stopwatch-equipped reference'],
  field: ['field watch', 'utility timepiece', 'rugged everyday wearer'],
  dress: ['dress watch', 'formal timepiece', 'thin-cased classical reference'],
  sport: ['sport watch', 'everyday luxury reference', 'modern integrated-bracelet design'],
}

const TIER_PHRASES = {
  5: 'one of the most collected names in haute horlogerie',
  4: 'a top-tier Swiss watchmaker with deep horological credentials',
  3: 'a respected Swiss/German watchmaker with significant brand equity',
  2: 'an accessible mainstream luxury brand with solid mechanical credentials',
  1: 'an entry-tier watchmaker producing accessible mechanical and quartz timepieces',
}

const PRICE_PHRASES = {
  5: 'the ultra-luxury tier (typically $50,000+)',
  4: 'the high-luxury tier ($15,000–$50,000)',
  3: 'the mid-luxury tier ($5,000–$15,000)',
  2: 'the accessible luxury tier ($2,000–$5,000)',
  1: 'the entry-luxury tier (under $2,000)',
}

// Pluck factual signals from a Wikipedia summary text
function extractFacts(text, brand, model) {
  const facts = {}
  if (!text) return facts

  const yearMatch = text.match(/(?:introduced|launched|debuted|released|presented|unveiled|first produced|first sold|first manufactured)[^.]{0,80}?(\d{4})/i)
                   || text.match(/in (\d{4})[^.]{0,40}(?:debut|launch|introduce|present|unveil|release)/i)
                   || text.match(/^[^.]*?(?:in|since)\s+(\d{4})/)
  if (yearMatch) {
    const y = parseInt(yearMatch[1])
    if (y > 1850 && y <= new Date().getFullYear()) facts.year = y
  }

  const wrMatch = text.match(/(?:water[- ]?resistant|waterproof)[^.]{0,40}?(\d{2,4})\s*m(?:et(?:re|er)s?)?/i)
  if (wrMatch) facts.waterResistance = parseInt(wrMatch[1])

  if (/professional line|professional series|tool watch/i.test(text)) facts.professional = true
  if (/cosc|chronometer/i.test(text)) facts.chronometer = true
  if (/in[- ]?house|manufactur(?:e|ed) movement/i.test(text)) facts.inHouse = true
  if (/iconic|legendary|classic|reference watch/i.test(text)) facts.iconic = true
  if (/limited edition|limited[- ]edition|limited to/i.test(text)) facts.limited = true

  const designerMatch = text.match(/designed by ([^.,]+)/i)
  if (designerMatch) facts.designer = designerMatch[1].trim()

  const collabMatch = text.match(/(?:collaboration|partnership) with ([^.,]+)/i)
  if (collabMatch) facts.collaborator = collabMatch[1].trim()

  return facts
}

// Compress + lightly rewrite the Wikipedia first paragraph to Patinax voice
function rewriteSummary(text) {
  if (!text) return ''
  let t = text
    .replace(/\s+/g, ' ')
    .replace(/\bmanufactured by\b/gi, 'produced by')
    .replace(/\bis a line of\b/gi, 'forms a series of')
    .replace(/\bdesigned for\b/gi, 'built for')
    .replace(/\bintroduced\b/gi, 'launched')
    .replace(/\bconsidered\b/gi, 'regarded as')
    .replace(/\bpopular\b/gi, 'highly sought-after')
    .replace(/\bclassic\b/gi, 'long-standing reference')
    .replace(/\bwidely recognized\b/gi, 'globally recognized')
    .replace(/\bdue to\b/gi, 'owing to')
    .replace(/\bavailable in\b/gi, 'offered in')
    .replace(/\bhuge popularity\b/gi, 'broad appeal')
    .replace(/\bin addition\b/gi, 'beyond that')
    .trim()

  // Cap length to ~600 chars to keep it tight; cut at sentence boundary
  if (t.length > 700) {
    const cut = t.lastIndexOf('.', 650)
    t = cut > 400 ? t.slice(0, cut + 1) : t.slice(0, 650) + '.'
  }
  return t
}

// Compose the Patinax-style description from facts, watch data, and rewritten summary
function composeDescription(watch, facts, rewrittenSummary) {
  const styleArr = STYLE_DESCRIPTORS[watch.style] || STYLE_DESCRIPTORS.sport
  const styleDesc = styleArr[Math.floor(Math.random() * styleArr.length)]
  const tier = TIER_PHRASES[watch.brandTier] || TIER_PHRASES[3]
  const price = PRICE_PHRASES[watch.priceRange] || PRICE_PHRASES[3]

  const opening = []
  opening.push(`The ${watch.brand} ${watch.model} is a ${styleDesc} from ${watch.brand}, ${tier}.`)
  if (facts.year || watch.year) {
    const y = facts.year || watch.year
    opening.push(`The reference traces back to ${y}.`)
  }
  if (watch.caseDiameter) {
    const dim = watch.caseThickness ? `${watch.caseDiameter}mm × ${watch.caseThickness}mm thick` : `${watch.caseDiameter}mm`
    opening.push(`Case dimensions are ${dim}.`)
  }

  const middle = []
  if (rewrittenSummary) {
    middle.push(rewrittenSummary)
  }

  const specs = []
  if (watch.movement) specs.push(`a ${watch.movement.toLowerCase()} movement`)
  if (watch.caliber) specs.push(`(caliber ${watch.caliber})`)
  if (watch.powerReserve) specs.push(`with a ${watch.powerReserve}-hour power reserve`)
  if (watch.cosc) specs.push('and COSC chronometer certification')
  const specPara = specs.length > 0
    ? `It runs on ${specs.filter(s => !s.startsWith('(')).join(', ').replace(/, ([^,]*)$/, ' $1')}${specs.find(s => s.startsWith('(')) ? ' ' + specs.find(s => s.startsWith('(')) : ''}.`
    : ''

  const materials = []
  if (watch.caseMaterial) materials.push(`case is ${watch.caseMaterial.toLowerCase()}`)
  if (watch.bezelMaterial && watch.bezelMaterial !== watch.caseMaterial) materials.push(`bezel is ${watch.bezelMaterial.toLowerCase()}`)
  if (watch.crystal) materials.push(`crystal is ${watch.crystal.toLowerCase()}`)
  const matPara = materials.length > 0 ? `The ${materials.join(', the ')}.` : ''

  const wrPara = (watch.waterResistance || facts.waterResistance)
    ? `Water resistance is rated to ${watch.waterResistance || facts.waterResistance}m.`
    : ''

  const closing = `Sits in ${price} category. Compare it side-by-side with peer references using Patinax's comparison tool below.`

  const paragraphs = [
    opening.join(' '),
    middle.join(' '),
    [specPara, matPara, wrPara].filter(Boolean).join(' '),
    closing,
  ].filter((p) => p.trim().length > 0)

  return paragraphs.join('\n\n')
}

async function fetchWikipediaSummary(query) {
  try {
    const search = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=1&format=json`,
      { headers: { 'User-Agent': 'PatinaxBot/1.0 (https://patinax.com)' } }
    )
    const searchData = await search.json()
    const title = searchData[1]?.[0]
    if (!title) return null

    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`,
      { headers: { 'User-Agent': 'PatinaxBot/1.0 (https://patinax.com)' } }
    )
    if (!summaryRes.ok) return null
    const summary = await summaryRes.json()
    if (summary.type === 'disambiguation') return null
    // Sanity check — extract should mention the brand
    const extract = summary.extract || ''
    return extract
  } catch {
    return null
  }
}

async function main() {
  // Target: watches that have NO description yet, prioritized by brand prestige
  // and existing data quality.
  const candidates = await prisma.watch.findMany({
    where: { description: null },
    orderBy: [{ brandTier: 'desc' }, { priceRange: 'desc' }, { brand: 'asc' }],
    take: 400, // catch the remaining ~270 watches
  })

  console.log(`Found ${candidates.length} watches without descriptions. Enriching...`)

  let enriched = 0
  let skippedNoWiki = 0
  let failed = 0

  for (const watch of candidates) {
    try {
      // Try increasingly broad queries
      const queries = [
        `${watch.brand} ${watch.model}`,
        watch.model,
      ]
      let summary = null
      for (const q of queries) {
        summary = await fetchWikipediaSummary(q)
        if (summary && summary.toLowerCase().includes(watch.brand.toLowerCase().split(' ')[0])) break
        summary = null
        await new Promise((r) => setTimeout(r, 100))
      }

      const facts = extractFacts(summary, watch.brand, watch.model)
      const rewritten = rewriteSummary(summary)
      const description = composeDescription(watch, facts, rewritten)

      const updateData = { description }
      // Backfill year if Wikipedia gave us one and DB didn't have it
      if (facts.year && !watch.year) updateData.year = facts.year
      if (facts.waterResistance && !watch.waterResistance) updateData.waterResistance = facts.waterResistance

      await prisma.watch.update({ where: { id: watch.id }, data: updateData })
      enriched++
      const tag = summary ? '+wiki' : '+template'
      if (enriched % 20 === 0) console.log(`  ${enriched}/${candidates.length} done [${tag}]`)
      if (!summary) skippedNoWiki++
      await new Promise((r) => setTimeout(r, 150)) // be polite
    } catch (e) {
      failed++
      console.log(`  ! ${watch.brand} ${watch.model}: ${e.message}`)
    }
  }

  console.log(`\n=== DONE ===`)
  console.log(`Enriched: ${enriched}`)
  console.log(`  with Wikipedia data: ${enriched - skippedNoWiki}`)
  console.log(`  template-only (no Wiki article): ${skippedNoWiki}`)
  console.log(`Failed: ${failed}`)

  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
