// Seed curated current-production references (Plan A part 2)
// Mirror of seed-vintage.mjs but for modern references.

import { PrismaClient } from '@prisma/client'
import { MODERN_REFERENCES } from './data/modern-references.mjs'

const prisma = new PrismaClient()

function toSlug(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

const TIER_MAP = {
  'A. Lange & Söhne': 5, 'Audemars Piguet': 5, 'Patek Philippe': 5, 'Vacheron Constantin': 5,
  'Rolex': 4, 'Omega': 4, 'IWC': 4, 'Jaeger-LeCoultre': 4, 'Cartier': 4, 'Panerai': 4,
  'Hublot': 4, 'Zenith': 4, 'Grand Seiko': 4, 'Breitling': 3, 'Tudor': 3,
}

async function main() {
  const existing = await prisma.watch.findMany({ select: { slug: true, apiId: true } })
  const existingSlugs = new Set(existing.map((w) => w.slug))
  const existingApiIds = new Set(existing.map((w) => w.apiId))

  let inserted = 0, skipped = 0, failed = 0

  for (const ref of MODERN_REFERENCES) {
    try {
      const fullModel = `${ref.parentModel} ${ref.reference}`
      const slug = `${toSlug(ref.brand)}-${toSlug(fullModel)}`
      const apiId = `modern-${toSlug(ref.brand)}-${toSlug(ref.reference)}`

      if (existingSlugs.has(slug) || existingApiIds.has(apiId)) { skipped++; continue }

      const brandTier = TIER_MAP[ref.brand] || 3
      const data = {
        apiId, brand: ref.brand, model: fullModel, slug,
        reference: ref.reference,
        year: ref.year,
        caseDiameter: ref.caseDiameter,
        caseMaterial: ref.caseMaterial,
        bezelMaterial: ref.bezelMaterial || ref.caseMaterial,
        crystal: 'Sapphire',
        movement: ref.movement,
        caliber: ref.caliber,
        waterResistance: ref.waterResistance,
        cosc: false,
        style: ref.style,
        brandTier,
        priceRange: brandTier >= 5 ? 5 : brandTier === 4 ? 4 : 3,
        description: ref.description,
      }

      await prisma.watch.create({ data })
      existingSlugs.add(slug)
      existingApiIds.add(apiId)
      inserted++
      console.log(`  + ${ref.brand} ${fullModel}`)
    } catch (e) {
      failed++
      console.log(`  ! ${ref.brand} ${ref.parentModel} ${ref.reference}: ${e.message}`)
    }
  }

  console.log(`\n=== DONE ===`)
  console.log(`Inserted: ${inserted} / Skipped: ${skipped} / Failed: ${failed}`)
  await prisma.$disconnect()
}

main().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
