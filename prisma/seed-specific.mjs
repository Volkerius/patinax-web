/**
 * Seed script v2: Search for specific popular models to stay within API result limits.
 * Each search returns a small set. 14 requests remaining today.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_BASE = 'https://api.thewatchapi.com/v1'
const API_TOKEN = process.env.WATCH_API_KEY

// 14 targeted searches — each returns a handful of results
const SEARCHES = [
  { search: 'Submariner', brand: 'Rolex', tier: 4, price: 4, style: 'diver', cosc: true },
  { search: 'Daytona', brand: 'Rolex', tier: 4, price: 4, style: 'chrono', cosc: true },
  { search: 'GMT-Master', brand: 'Rolex', tier: 4, price: 4, style: 'sport', cosc: true },
  { search: 'Datejust', brand: 'Rolex', tier: 4, price: 4, style: 'dress', cosc: true },
  { search: 'Speedmaster', brand: 'Omega', tier: 3, price: 3, style: 'chrono', cosc: true },
  { search: 'Seamaster', brand: 'Omega', tier: 3, price: 3, style: 'diver', cosc: true },
  { search: 'Nautilus', brand: 'Patek Philippe', tier: 5, price: 5, style: 'sport', cosc: false },
  { search: 'Royal Oak', brand: 'Audemars Piguet', tier: 5, price: 5, style: 'sport', cosc: false },
  { search: 'Portugieser', brand: 'IWC', tier: 3, price: 3, style: 'pilot', cosc: false },
  { search: 'Navitimer', brand: 'Breitling', tier: 3, price: 3, style: 'chrono', cosc: true },
  { search: 'Black Bay', brand: 'Tudor', tier: 3, price: 2, style: 'diver', cosc: true },
  { search: 'Monaco', brand: 'TAG Heuer', tier: 2, price: 2, style: 'chrono', cosc: false },
  { search: 'Santos', brand: 'Cartier', tier: 4, price: 4, style: 'dress', cosc: false },
  { search: 'Snowflake', brand: 'Grand Seiko', tier: 4, price: 3, style: 'dress', cosc: false },
]

let requestCount = 0

async function apiFetch(path, params = {}) {
  const qs = new URLSearchParams({ ...params, api_token: API_TOKEN })
  const url = `${API_BASE}${path}?${qs}`
  requestCount++
  console.log(`  [API ${requestCount}] ${path} search="${params.search}" brand="${params.brand}"`)
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    console.error(`  ✗ Error ${res.status}: ${text.substring(0, 150)}`)
    return null
  }
  return res.json()
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
  console.log('=== TheWatchAPI Targeted Seeder ===\n')

  let totalAdded = 0

  for (const s of SEARCHES) {
    console.log(`\n${s.brand} — "${s.search}"`)
    const res = await apiFetch('/model/search', { search: s.search, brand: s.brand })

    if (!res?.data || res.data.length === 0) {
      console.log('  No results')
      continue
    }

    console.log(`  ${res.data.length} models found`)

    for (const m of res.data) {
      const modelName = m.model || m.reference_number || 'Unknown'
      const slug = toSlug(m.brand || s.brand, modelName)
      const apiId = `api-${slug}-${(m.reference_number || '').toLowerCase().replace(/[^a-z0-9]/g, '-') || Date.now()}`

      try {
        await prisma.watch.upsert({
          where: { slug },
          update: {
            reference: m.reference_number || undefined,
            year: parseNum(m.year_of_production) ? Math.round(parseNum(m.year_of_production)) : undefined,
            caseDiameter: parseNum(m.case_diameter) || undefined,
            movement: m.movement || undefined,
            caseMaterial: m.case_material || undefined,
          },
          create: {
            apiId,
            brand: m.brand || s.brand,
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
            cosc: s.cosc,
            priceRange: s.price,
            brandTier: s.tier,
            style: s.style,
            imageUrl: null,
            slug,
          },
        })
        totalAdded++
      } catch (err) {
        // Skip on unique constraint conflicts
      }
    }
  }

  // Auto-generate cross-brand comparisons
  console.log('\n\nGenerating comparisons...')
  const allWatches = await prisma.watch.findMany({ orderBy: [{ brand: 'asc' }, { model: 'asc' }] })

  // Group by style
  const byStyle = {}
  for (const w of allWatches) {
    if (!byStyle[w.style]) byStyle[w.style] = []
    byStyle[w.style].push(w)
  }

  let compCount = 0
  for (const [, watches] of Object.entries(byStyle)) {
    for (let i = 0; i < watches.length && i < 10; i++) {
      for (let j = i + 1; j < watches.length && j < 10; j++) {
        if (watches[i].brand === watches[j].brand) continue
        const slug = `${toSlug(watches[i].brand, watches[i].model)}-vs-${toSlug(watches[j].brand, watches[j].model)}`
        try {
          await prisma.comparison.upsert({
            where: { slug },
            update: {},
            create: { watchAId: watches[i].id, watchBId: watches[j].id, slug, viewCount: 0 },
          })
          compCount++
        } catch { /* skip */ }
      }
    }
  }

  console.log(`\n=== RESULTS ===`)
  console.log(`API requests used: ${requestCount}`)
  console.log(`Watches added/updated: ${totalAdded}`)
  console.log(`Total watches in DB: ${await prisma.watch.count()}`)
  console.log(`Comparisons generated: ${compCount}`)
  console.log(`Total comparisons in DB: ${await prisma.comparison.count()}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
