/**
 * Day 5 seed: expand underrepresented SEO-target brands.
 *
 * Budget: 20 API calls/day.
 *
 * Strategy:
 *   - Retry yesterday's failures (Bulgari, Ulysse Nardin) with different search terms
 *   - Add richer sub-model searches for Glashütte Original to work around 3-result cap
 *   - Target other popular but underrepresented brands: Richard Mille, Chopard,
 *     Montblanc, H. Moser, Parmigiani Fleurier, F.P. Journe
 *   - Strips duplicated "Brand Brand Model" prefix that the API sometimes returns
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

// Distribute calls so total ≤ 20. Each entry = 1 API call.
// Priority order: fill brand gaps that hurt SEO most (curated-content brands first).
const TARGETS = [
  // Bulgari — yesterday's empty result: try different caps + narrower queries
  { brand: 'Bvlgari',          tier: 4, price: 4, defaultStyle: 'sport', searches: ['Octo', 'Serpenti'] },
  { brand: 'Bulgari',          tier: 4, price: 4, defaultStyle: 'sport', searches: ['Lvcea', 'Aluminium'] },

  // Ulysse Nardin — try specific product lines instead of just collection names
  { brand: 'Ulysse Nardin',    tier: 4, price: 4, defaultStyle: 'dress', searches: ['Freak X', 'Blast', 'Marine Chronograph'] },

  // Glashütte Original — narrow the sub-model search to dodge "too_many_results"
  { brand: 'Glashütte Original', tier: 4, price: 4, defaultStyle: 'dress', searches: ['PanoMaticLunar', 'SeaQ Panorama'] },

  // Richard Mille — ultra-luxury sport watches (SEO high-value)
  { brand: 'Richard Mille',    tier: 5, price: 5, defaultStyle: 'sport', searches: ['RM 011', 'RM 27', 'RM 67'] },

  // Chopard — mid-to-high luxury, two distinct brand identities (LUC + Mille Miglia)
  { brand: 'Chopard',          tier: 4, price: 4, defaultStyle: 'chrono', searches: ['L.U.C XPS', 'Mille Miglia GTS'] },

  // Montblanc — in-house via Minerva, mostly underrepresented
  { brand: 'Montblanc',        tier: 3, price: 3, defaultStyle: 'dress', searches: ['1858 Geosphere', 'Heritage Monopusher'] },

  // H. Moser — independent cult brand, strong SEO for "haute horlogerie"
  { brand: 'H. Moser & Cie',   tier: 5, price: 5, defaultStyle: 'dress', searches: ['Endeavour', 'Streamliner'] },

  // Parmigiani Fleurier — currently 0 in DB
  { brand: 'Parmigiani Fleurier', tier: 5, price: 5, defaultStyle: 'dress', searches: ['Tonda PF'] },
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
    const short = body.replace(/\n/g, ' ').slice(0, 140)
    console.error(`    ✗ ${res.status}: ${short}`)
    return null
  }
  return res.json()
}

function guessStyle(modelName, fallback) {
  const m = (modelName || '').toLowerCase()
  if (m.includes('diver') || m.includes('submarin') || m.includes('aqua') || m.includes('scuba') || m.includes('seaq')) return 'diver'
  if (m.includes('chrono')) return 'chrono'
  if (m.includes('pilot') || m.includes('aviator') || m.includes('geosphere')) return 'pilot'
  if (m.includes('octo') || m.includes('polo') || m.includes('alpine eagle') || m.includes('streamliner')) return 'sport'
  if (m.includes('altiplano') || m.includes('patrimony') || m.includes('calatrava') || m.includes('senator') || m.includes('pano') || m.includes('heritage') || m.includes('1858') || m.includes('endeavour') || m.includes('lvcea') || m.includes('tonda')) return 'dress'
  if (m.includes('freak') || m.includes('marine') || m.includes('blast')) return 'sport'
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
    if (requestCount >= DAILY_BUDGET) {
      console.log('  Budget exhausted, stopping')
      break
    }
    const res = await apiFetch('/model/search', { search: query, brand: target.brand })
    const models = res?.data || []
    if (models.length > 0) {
      console.log(`    "${query}" → ${models.length} model(s)`)
      allModels.push(...models)
    }
  }

  if (allModels.length === 0) {
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
    // Strip duplicated brand prefix if the API returned "Brand Brand Model"
    if (modelName.toLowerCase().startsWith(brandName.toLowerCase() + ' ')) {
      modelName = modelName.slice(brandName.length + 1)
    }
    // Also strip any alternate-brand-capitalization prefix (e.g. "BVLGARI " with request "Bulgari")
    const apiBrand = (m.brand || '').trim()
    if (apiBrand && modelName.toLowerCase().startsWith(apiBrand.toLowerCase() + ' ')) {
      modelName = modelName.slice(apiBrand.length + 1)
    }

    // Normalize brand name: use the more common capitalization even if API returned "BVLGARI"
    const normalizedBrand = brandName === 'Bvlgari' ? 'Bulgari' : brandName

    const slug = buildSlug(normalizedBrand, modelName)

    const existing = await prisma.watch.findUnique({ where: { slug }, select: { id: true } })
    if (existing) {
      console.log(`  ~ ${normalizedBrand} ${modelName} (already in DB)`)
      skipped++
      continue
    }

    const apiId = `watchapi5-${slug}`
    const year = parseNum(m.year_of_production)
    const watchData = {
      apiId,
      brand: normalizedBrand,
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
      console.log(`  ✓ ${normalizedBrand} ${modelName}`)
    } catch (err) {
      skipped++
      console.log(`  ✗ ${normalizedBrand} ${modelName}: ${err.message.slice(0, 80)}`)
    }
  }

  return { added, skipped }
}

async function main() {
  console.log('=== Day 5 WatchAPI Seed ===')
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
