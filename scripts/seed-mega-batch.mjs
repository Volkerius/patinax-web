import { PrismaClient } from '@prisma/client'
import { MEGA_BATCH } from './data/mega-batch-references.mjs'

const prisma = new PrismaClient()

function toSlug(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

const TIER_MAP = {
  'A. Lange & Söhne': 5, 'Audemars Piguet': 5, 'Patek Philippe': 5, 'Vacheron Constantin': 5,
  'F.P. Journe': 5, 'Richard Mille': 5, 'Breguet': 5,
  'Rolex': 4, 'Omega': 4, 'IWC': 4, 'Jaeger-LeCoultre': 4, 'Cartier': 4, 'Panerai': 4,
  'Hublot': 4, 'Zenith': 4, 'Grand Seiko': 4, 'Glashütte Original': 4,
  'Tudor': 3, 'Breitling': 3, 'TAG Heuer': 3, 'Bell & Ross': 3, 'Bremont': 3,
  'Tutima': 3, 'Norqain': 3, 'Sinn': 3, 'Stowa': 3, 'Junghans': 3, 'Nomos': 3,
  'Frederique Constant': 3, 'Maurice Lacroix': 3,
  'Christopher Ward': 2, 'Baltic': 2, 'Farer': 2, 'Ming': 3,
  'Hamilton': 2, 'Tissot': 2, 'Longines': 3, 'Oris': 3, 'Mido': 2, 'Certina': 2,
  'Seiko': 2, 'Citizen': 2, 'Laco': 2, 'Doxa': 2, 'Squale': 2, 'Alpina': 2, 'Glycine': 2, 'Rado': 2,
}

function priceRange(tier) {
  if (tier >= 5) return 5
  if (tier === 4) return 4
  if (tier === 3) return 3
  return 2
}

async function main() {
  const existing = await prisma.watch.findMany({ select: { slug: true, apiId: true } })
  const existingSlugs = new Set(existing.map(w => w.slug))
  const existingApiIds = new Set(existing.map(w => w.apiId))

  let inserted = 0, skipped = 0, failed = 0
  for (const ref of MEGA_BATCH) {
    try {
      const fullModel = `${ref.parentModel} ${ref.reference}`
      const slug = `${toSlug(ref.brand)}-${toSlug(fullModel)}`
      const apiId = `mega-${toSlug(ref.brand)}-${toSlug(ref.reference)}`
      if (existingSlugs.has(slug) || existingApiIds.has(apiId)) { skipped++; continue }

      const tier = TIER_MAP[ref.brand] || 3
      await prisma.watch.create({
        data: {
          apiId, brand: ref.brand, model: fullModel, slug,
          reference: ref.reference,
          year: ref.year,
          caseDiameter: ref.caseDiameter,
          caseMaterial: ref.caseMaterial,
          bezelMaterial: ref.bezelMaterial || ref.caseMaterial,
          crystal: (ref.year || 2000) >= 1980 ? 'Sapphire' : 'Acrylic',
          movement: ref.movement,
          caliber: ref.caliber,
          waterResistance: ref.waterResistance,
          cosc: false,
          style: ref.style,
          brandTier: tier,
          priceRange: priceRange(tier),
          description: ref.description,
        },
      })
      existingSlugs.add(slug); existingApiIds.add(apiId)
      inserted++
    } catch (e) {
      failed++
      console.log(`  ! ${ref.brand} ${ref.reference}: ${e.message}`)
    }
  }
  console.log(`\nInserted: ${inserted} / Skipped: ${skipped} / Failed: ${failed}`)
  await prisma.$disconnect()
}

main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
