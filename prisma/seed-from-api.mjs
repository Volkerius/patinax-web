/**
 * One-time seed script: fetch watch data from TheWatchAPI and save to Supabase.
 * Budget: 25 req/day. This script uses ~11 requests (1 brand list + 10 model searches).
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_BASE = 'https://api.thewatchapi.com/v1'
const API_TOKEN = process.env.WATCH_API_KEY

const PRIORITY_BRANDS = [
  'Rolex', 'Omega', 'Patek Philippe', 'Audemars Piguet',
  'IWC', 'Breitling', 'TAG Heuer', 'Tudor', 'Cartier', 'Grand Seiko',
]

// Brand tier & price range mapping
const BRAND_META = {
  'Rolex':            { tier: 4, price: 4, style: 'diver' },
  'Omega':            { tier: 3, price: 3, style: 'diver' },
  'Patek Philippe':   { tier: 5, price: 5, style: 'dress' },
  'Audemars Piguet':  { tier: 5, price: 5, style: 'sport' },
  'IWC':              { tier: 3, price: 3, style: 'pilot' },
  'Breitling':        { tier: 3, price: 3, style: 'chrono' },
  'TAG Heuer':        { tier: 2, price: 2, style: 'sport' },
  'Tudor':            { tier: 3, price: 2, style: 'diver' },
  'Cartier':          { tier: 4, price: 4, style: 'dress' },
  'Grand Seiko':      { tier: 4, price: 3, style: 'dress' },
}

let requestCount = 0

async function apiFetch(path, params = {}) {
  const qs = new URLSearchParams({ ...params, api_token: API_TOKEN })
  const url = `${API_BASE}${path}?${qs}`
  requestCount++
  console.log(`  [API ${requestCount}] ${path} ${JSON.stringify(params)}`)

  const res = await fetch(url)
  if (!res.ok) {
    console.error(`  ✗ API error ${res.status}: ${await res.text()}`)
    return null
  }
  const data = await res.json()
  return data
}

function guessStyle(model, brand) {
  const m = (model || '').toLowerCase()
  if (m.includes('submariner') || m.includes('seamaster') || m.includes('aqua') || m.includes('diver') || m.includes('fifty fathom') || m.includes('pelagos') || m.includes('black bay')) return 'diver'
  if (m.includes('daytona') || m.includes('speedmaster') || m.includes('chrono') || m.includes('navitimer') || m.includes('el primero') || m.includes('monaco')) return 'chrono'
  if (m.includes('pilot') || m.includes('mark') || m.includes('portugieser') || m.includes('avenger') || m.includes('big pilot')) return 'pilot'
  if (m.includes('calatrava') || m.includes('reverso') || m.includes('tank') || m.includes('santos') || m.includes('master') || m.includes('altiplano') || m.includes('patrimony')) return 'dress'
  if (m.includes('nautilus') || m.includes('royal oak') || m.includes('overseas') || m.includes('ingenieur') || m.includes('aquanaut')) return 'sport'
  if (m.includes('datejust') || m.includes('day-date') || m.includes('constellation') || m.includes('de ville')) return 'dress'
  if (m.includes('gmt') || m.includes('explorer')) return 'sport'
  return BRAND_META[brand]?.style || 'sport'
}

function parseNum(val) {
  if (val === null || val === undefined || val === '') return null
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? null : n
}

function toSlug(brand, model) {
  return `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

async function main() {
  console.log('=== TheWatchAPI Seeder ===\n')

  // Step 1: Fetch brand list (1 request)
  console.log('Fetching brand list...')
  const brandRes = await apiFetch('/brand/list')
  const allBrands = brandRes?.data || []
  console.log(`  Found ${allBrands.length} brands in API\n`)

  // Step 2: For each priority brand, fetch models (10 requests)
  let totalAdded = 0
  let totalSkipped = 0

  for (const brand of PRIORITY_BRANDS) {
    console.log(`\nFetching models for ${brand}...`)
    const modelRes = await apiFetch('/model/search', { search: '', brand })

    if (!modelRes?.data || modelRes.data.length === 0) {
      console.log(`  ✗ No models found for ${brand}`)
      continue
    }

    const models = modelRes.data
    console.log(`  Found ${models.length} models`)

    for (const m of models) {
      const modelName = m.model || m.reference_number || 'Unknown'
      const slug = toSlug(m.brand || brand, modelName)
      const apiId = `${slug}-${m.reference_number || 'ref'}`.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      const meta = BRAND_META[brand] || { tier: 3, price: 3, style: 'sport' }

      const watchData = {
        apiId,
        brand: m.brand || brand,
        model: modelName,
        reference: m.reference_number || null,
        year: parseNum(m.year_of_production) ? Math.round(parseNum(m.year_of_production)) : null,
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
        cosc: brand === 'Rolex' || brand === 'Omega' || brand === 'Breitling',
        priceRange: meta.price,
        brandTier: meta.tier,
        style: guessStyle(modelName, brand),
        imageUrl: null,
        slug,
      }

      try {
        await prisma.watch.upsert({
          where: { slug },
          update: {
            reference: watchData.reference,
            year: watchData.year,
            caseDiameter: watchData.caseDiameter,
            movement: watchData.movement,
            caseMaterial: watchData.caseMaterial,
          },
          create: watchData,
        })
        totalAdded++
        process.stdout.write(`  ✓ ${brand} ${modelName}\n`)
      } catch (err) {
        // Duplicate apiId — try with unique suffix
        try {
          watchData.apiId = `${apiId}-${Date.now()}`
          watchData.slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`
          await prisma.watch.create({ data: watchData })
          totalAdded++
          process.stdout.write(`  ✓ ${brand} ${modelName} (alt slug)\n`)
        } catch {
          totalSkipped++
          process.stdout.write(`  ⊘ ${brand} ${modelName} (skipped)\n`)
        }
      }
    }
  }

  // Step 3: Auto-generate comparisons for popular matchups
  console.log('\n\nGenerating comparisons...')
  const allWatches = await prisma.watch.findMany({ orderBy: { brand: 'asc' } })

  // Create comparisons within same style category
  const byStyle = {}
  for (const w of allWatches) {
    const s = w.style || 'sport'
    if (!byStyle[s]) byStyle[s] = []
    byStyle[s].push(w)
  }

  let compCount = 0
  for (const [style, watches] of Object.entries(byStyle)) {
    // Cross-brand comparisons
    for (let i = 0; i < watches.length && i < 8; i++) {
      for (let j = i + 1; j < watches.length && j < 8; j++) {
        if (watches[i].brand === watches[j].brand) continue
        const slug = `${toSlug(watches[i].brand, watches[i].model)}-vs-${toSlug(watches[j].brand, watches[j].model)}`
        try {
          await prisma.comparison.upsert({
            where: { slug },
            update: {},
            create: {
              watchAId: watches[i].id,
              watchBId: watches[j].id,
              slug,
              viewCount: 0,
            },
          })
          compCount++
        } catch {
          // skip duplicates
        }
      }
    }
  }

  console.log(`\n=== DONE ===`)
  console.log(`API requests used: ${requestCount}/25`)
  console.log(`Watches added/updated: ${totalAdded}`)
  console.log(`Watches skipped: ${totalSkipped}`)
  console.log(`Comparisons created: ${compCount}`)
  console.log(`Total watches in DB: ${await prisma.watch.count()}`)
  console.log(`Total comparisons in DB: ${await prisma.comparison.count()}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
