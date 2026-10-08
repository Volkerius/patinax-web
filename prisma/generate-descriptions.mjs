/**
 * Generate unique, SEO-rich descriptions for every Watch row in the DB.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node prisma/generate-descriptions.mjs [--all] [--limit=N]
 *
 * By default, only generates for watches where description IS NULL (incremental).
 * Pass --all to regenerate for every watch.
 */

import { PrismaClient } from '@prisma/client'
import Anthropic from '@anthropic-ai/sdk'
import pLimit from 'p-limit'
import 'dotenv/config'

const prisma = new PrismaClient()
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const MODEL = 'claude-haiku-4-5-20251001'
const CONCURRENCY = 5
const MAX_TOKENS = 600

const argv = process.argv.slice(2)
const regenerateAll = argv.includes('--all')
const limitArg = argv.find(a => a.startsWith('--limit='))
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined

function buildPrompt(w) {
  const facts = [
    `Brand: ${w.brand}`,
    `Model: ${w.model}`,
    w.reference && `Reference: ${w.reference}`,
    w.year && `Year introduced: ${w.year}`,
    w.caseDiameter && `Case diameter: ${w.caseDiameter}mm`,
    w.caseThickness && `Case thickness: ${w.caseThickness}mm`,
    w.waterResistance && `Water resistance: ${w.waterResistance}m`,
    w.movement && `Movement: ${w.movement}`,
    w.caliber && `Caliber: ${w.caliber}`,
    w.powerReserve && `Power reserve: ${w.powerReserve} hours`,
    w.caseMaterial && `Case material: ${w.caseMaterial}`,
    w.bezelMaterial && `Bezel: ${w.bezelMaterial}`,
    w.crystal && `Crystal: ${w.crystal}`,
    w.frequency && `Frequency: ${w.frequency}Hz`,
    w.jewels && `Jewels: ${w.jewels}`,
    w.cosc && `COSC chronometer certified`,
    `Style: ${w.style}`,
    `Price tier: ${w.priceRange}/5`,
  ].filter(Boolean).join('\n')

  return `You are writing an SEO-optimized description for a luxury watch product page on Patinax, a watch comparison site.

Write 3 short paragraphs (total ~180-230 words) about the ${w.brand} ${w.model}:

1. Opening: What this watch IS — its position in the ${w.brand} lineup, its character as a ${w.style} watch, what makes the design distinctive. Reference a specific detail from the specs.
2. Technical highlights: Talk naturally about the movement, dimensions, and build. Don't just list specs — weave them into readable prose explaining what they mean for the wearer.
3. Who it's for: Describe the ideal wearer/occasion — be concrete (formal events, daily wear, desk-diver, weekend tool watch, etc). End with a sentence that positions this watch vs its typical alternatives at this price tier.

Rules:
- Be factual. Use ONLY the provided facts. Do NOT invent history, awards, or stories.
- If a fact is missing from the list, don't mention it.
- Don't use marketing fluff ("exquisite timepiece", "stunning masterpiece"). Write like a knowledgeable watch journalist.
- Don't start with "The ${w.brand} ${w.model}". Vary the opener.
- Separate the 3 paragraphs with blank lines (\\n\\n).
- Return ONLY the description text. No headings, no preamble, no "Here is...".

Facts:
${facts}`
}

async function generateOne(w) {
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: buildPrompt(w) }],
  })
  const text = msg.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('')
    .trim()
  return text
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY is not set. Add it to .env.local or pass it inline.')
    process.exit(1)
  }

  const where = regenerateAll ? {} : { description: null }
  const watches = await prisma.watch.findMany({ where, take: LIMIT })

  console.log(`📝 Generating descriptions for ${watches.length} watches using ${MODEL}`)
  console.log(`   Concurrency: ${CONCURRENCY}`)
  if (LIMIT) console.log(`   Limit: ${LIMIT}`)
  console.log('')

  const limit = pLimit(CONCURRENCY)
  let done = 0
  let failed = 0
  const startedAt = Date.now()

  await Promise.all(
    watches.map(w =>
      limit(async () => {
        try {
          const description = await generateOne(w)
          await prisma.watch.update({
            where: { id: w.id },
            data: { description },
          })
          done++
          if (done % 25 === 0 || done === watches.length) {
            const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0)
            console.log(`   [${done}/${watches.length}] ${w.brand} ${w.model}  (${elapsed}s elapsed)`)
          }
        } catch (err) {
          failed++
          console.error(`   ✗ ${w.brand} ${w.model}: ${err.message}`)
        }
      })
    )
  )

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0)
  console.log('')
  console.log(`✅ Done. ${done} succeeded, ${failed} failed in ${elapsed}s.`)
  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e)
  prisma.$disconnect()
  process.exit(1)
})
