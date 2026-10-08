// Plan A: Seed curated vintage references as new watch entries.
// Each entry creates a watch page with reference-specific URL, distinct from
// the parent model page. Targets long-tail collector queries.

import { PrismaClient } from '@prisma/client'
import { VINTAGE_REFERENCES } from './data/vintage-references.mjs'

const prisma = new PrismaClient()

function toSlug(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function inferBrandTier(brand) {
  const t5 = ['Patek Philippe', 'Audemars Piguet', 'Vacheron Constantin', 'A. Lange & Söhne']
  const t4 = ['Rolex', 'Omega', 'IWC', 'Jaeger-LeCoultre', 'Cartier', 'Panerai']
  if (t5.includes(brand)) return 5
  if (t4.includes(brand)) return 4
  return 3
}

async function main() {
  const existing = await prisma.watch.findMany({ select: { slug: true, apiId: true } })
  const existingSlugs = new Set(existing.map((w) => w.slug))
  const existingApiIds = new Set(existing.map((w) => w.apiId))

  let inserted = 0
  let skipped = 0
  let failed = 0

  for (const ref of VINTAGE_REFERENCES) {
    try {
      const fullModel = `${ref.parentModel} ${ref.reference}`
      const slug = `${toSlug(ref.brand)}-${toSlug(fullModel)}`
      const apiId = `vintage-${toSlug(ref.brand)}-${toSlug(ref.reference)}`

      if (existingSlugs.has(slug) || existingApiIds.has(apiId)) {
        skipped++
        continue
      }

      const brandTier = inferBrandTier(ref.brand)
      const data = {
        apiId,
        brand: ref.brand,
        model: fullModel,
        slug,
        reference: ref.reference,
        year: ref.year,
        caseDiameter: ref.caseDiameter,
        caseMaterial: ref.caseMaterial,
        bezelMaterial: ref.bezelMaterial,
        crystal: ref.year >= 1980 ? 'Sapphire' : 'Acrylic',
        movement: ref.movement,
        caliber: ref.caliber,
        waterResistance: ref.waterResistance,
        cosc: false,
        style: ref.style,
        brandTier,
        priceRange: brandTier >= 5 ? 5 : 4,
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
  console.log(`Inserted: ${inserted}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Failed: ${failed}`)

  await prisma.$disconnect()
}

main().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
