/**
 * Day 4 seed: pull underrepresented high-SEO-value brands from TheWatchAPI.
 *
 * Budget: 20 req/day. This script uses 4 API calls (1 per target brand).
 *
 * Targets (each brand has ≤6 watches in DB and is one of our curated-intro brands,
 * so adding more models directly improves the brand page depth):
 *   - Piaget       (5)
 *   - Bulgari      (6)
 *   - Ulysse Nardin (5)
 *   - Glashütte Original (6)
 *
 * Watches come without imageUrl — the WatchImage client component falls back
 * to the SVG WatchIllustration automatically, so the card still looks right.
 */
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()
const API_BASE = 'https://api.thewatchapi.com/v1'
const API_TOKEN = process.env.WATCH_API_KEY

if (!API_TOKEN) {
  console.error('❌ WATCH_API_KEY missing. Check .env / .env.local')
  process.exit(1)
}

const DAILY_BUDGET = 20
let requestCount = 0

// The API plan caps results at 3 per call; searches returning more are rejected.
// So we search specific model-family keywords for each brand instead of "".
const TARGETS = [
  { brand: 'Piaget',            tier: 5, price: 4, defaultStyle: 'dress', searches: ['Altiplano', 'Polo', 'Limelight', 'Possession'] },
  { brand: 'Bulgari',           tier: 4, price: 4, defaultStyle: 'sport', searches: ['Octo Finissimo', 'Serpenti', 'Aluminium', 'Diagono'] },
  { brand: 'Ulysse Nardin',     tier: 4, price: 4, defaultStyle: 'dress', searches: ['Freak', 'Marine', 'Executive', 'Diver'] },
  { brand: 'Glashütte Original', tier: 4, price: 4, defaultStyle: 'dress', searches: ['PanoMatic', 'Senator', 'SeaQ', 'Sixties'] },
]

async function apiFetch(path, params = {}) {
  if (requestCount >= DAILY_BUDGET) {
    throw new Error(`Daily API budget exhausted (${DAILY_BUDGET})`)
  }
  requestCount++
  const qs = new URLSearchParams({ ...params, api_token: API_TOKEN })
  const url = `${API_BASE}${path}?${qs}`
  console.log(`  [API ${requestCount}/${DAILY_BUDGET}] ${path} ${JSON.stringify(params)}`)
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.text()
    console.error(`  ✗ API ${res.status}: ${body.slice(0, 200)}`)
    return null
  }
  return res.json()
}

function guessStyle(modelName, fallback) {
  const m = (modelName || '').toLowerCase()
  if (m.includes('diver') || m.includes('submarin') || m.includes('aqua') || m.includes('scuba')) return 'diver'
  if (m.includes('chrono')) return 'chrono'
  if (m.includes('pilot') || m.includes('aviator')) return 'pilot'
  if (m.includes('octo finissimo') || m.includes('polo') || m.includes('nautilus') || m.includes('royal oak') || m.includes('overseas')) return 'sport'
  if (m.includes('altiplano') || m.includes('traditio') || m.includes('patrimony') || m.includes('dress') || m.includes('calatrava') || m.includes('senator') || m.includes('pano')) return 'dress'
  if (m.includes('freak') || m.includes('executive') || m.includes('marine')) return 'sport'
  return fallback
}

function parseNum(val) {
  if (val === null || val === undefined || val === '') return null
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? null : n
}

function toSlug(str) {
  return str.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')
}

function buildSlug(brand, model) {
  return `${toSlug(brand)}-${toSlug(model)}`
}

async function seedBrand(target) {
  console.log(`\n─── ${target.brand} ───`)
  const allModels = []
  for (const query of target.searches) {
    if (requestCount >= DAILY_BUDGET) break
    const res = await apiFetch('/model/search', { search: query, brand: target.brand })
    const models = res?.data || []
    if (models.length > 0) {
      console.log(`    "${query}" → ${models.length} model(s)`)
      allModels.push(...models)
    }
  }

  if (allModels.length === 0) {
    console.log(`  No models recovered for ${target.brand}`)
    return { added: 0, skipped: 0 }
  }

  // Dedup-by-model inside the API response
  const seenModelNames = new Set()
  const uniqueModels = []
  for (const m of allModels) {
    const name = (m.model || '').trim()
    if (!name || seenModelNames.has(name.toLowerCase())) continue
    seenModelNames.add(name.toLowerCase())
    uniqueModels.push(m)
  }
  console.log(`  ${uniqueModels.length} unique models total`)

  let added = 0
  let skipped = 0

  for (const m of uniqueModels) {
    let modelName = (m.model || '').trim()
    if (!modelName) continue

    const brandName = target.brand
    // Strip duplicate brand prefix if the API included it in the model field.
    if (modelName.toLowerCase().startsWith(brandName.toLowerCase() + ' ')) {
      modelName = modelName.slice(brandName.length + 1)
    }

    const slug = buildSlug(brandName, modelName)

    // Skip if we already have this watch
    const existing = await prisma.watch.findUnique({ where: { slug }, select: { id: true } })
    if (existing) {
      console.log(`  ~ ${brandName} ${modelName} (already in DB)`)
      skipped++
      continue
    }

    const apiId = `watchapi4-${slug}`
    const year = parseNum(m.year_of_production)
    const watchData = {
      apiId,
      brand: brandName,
      model: modelName,
      reference: m.reference_number || null,
      year: year ? Math.round(year) : null,
      caseDiameter: parseNum(m.case_diameter),
      caseThickness: null,
      waterResistance: null,
      movement: m.movement || 'Automatic',
      caliber: null,
      powerReserve: null,
      caseMaterial: m.case_material || null,
      bezelMaterial: null,
      crystal: 'Sapphire',
      frequency: null,
      jewels: null,
      cosc: false,
      priceRange: target.price,
      brandTier: target.tier,
      style: guessStyle(modelName, target.defaultStyle),
      imageUrl: null,
      slug,
    }

    try {
      await prisma.watch.create({ data: watchData })
      added++
      console.log(`  ✓ ${brandName} ${modelName}`)
    } catch (err) {
      skipped++
      console.log(`  ✗ ${brandName} ${modelName}: ${err.message.slice(0, 80)}`)
    }
  }

  return { added, skipped }
}

async function main() {
  console.log('=== Day 4 WatchAPI Seed ===')
  console.log(`Budget: ${DAILY_BUDGET} API calls/day\n`)

  const totals = { added: 0, skipped: 0 }
  for (const target of TARGETS) {
    try {
      const r = await seedBrand(target)
      totals.added += r.added
      totals.skipped += r.skipped
    } catch (err) {
      console.error(`Stopping: ${err.message}`)
      break
    }
  }

  const total = await prisma.watch.count()
  console.log('\n=== DONE ===')
  console.log(`API requests used: ${requestCount}/${DAILY_BUDGET}`)
  console.log(`Added:   ${totals.added}`)
  console.log(`Skipped: ${totals.skipped}`)
  console.log(`Total watches in DB: ${total}`)
  await prisma.$disconnect()
}

main().catch(e => {
  console.error(e)
  prisma.$disconnect()
  process.exit(1)
})
