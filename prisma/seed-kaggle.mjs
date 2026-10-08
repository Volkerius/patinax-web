/**
 * Kaggle Dataset Importer: Parse 284K luxury watch listings into unique models.
 * Deduplicates by brand+model, extracts best specs, imports into Supabase.
 */
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'

const prisma = new PrismaClient()
const CSV_PATH = '/tmp/kaggle-watches/Watches.csv'

// Brand metadata
const BRAND_META = {
  'Rolex':               { tier: 4, price: 4, cosc: true },
  'Omega':               { tier: 3, price: 3, cosc: true },
  'Patek Philippe':      { tier: 5, price: 5, cosc: false },
  'Audemars Piguet':     { tier: 5, price: 5, cosc: false },
  'IWC':                 { tier: 3, price: 3, cosc: false },
  'Breitling':           { tier: 3, price: 3, cosc: true },
  'TAG Heuer':           { tier: 2, price: 2, cosc: false },
  'Tudor':               { tier: 3, price: 2, cosc: true },
  'Cartier':             { tier: 4, price: 4, cosc: false },
  'Seiko':               { tier: 2, price: 1, cosc: false },
  'Longines':            { tier: 2, price: 2, cosc: false },
  'Hublot':              { tier: 3, price: 4, cosc: false },
  'Panerai':             { tier: 3, price: 3, cosc: false },
  'Zenith':              { tier: 3, price: 3, cosc: true },
  'Jaeger-LeCoultre':    { tier: 4, price: 4, cosc: false },
  'Vacheron Constantin': { tier: 5, price: 5, cosc: false },
  'A. Lange & Söhne':    { tier: 5, price: 5, cosc: false },
  'Richard Mille':       { tier: 5, price: 5, cosc: false },
  'Oris':                { tier: 2, price: 2, cosc: false },
  'Sinn':                { tier: 2, price: 2, cosc: false },
  'NOMOS':               { tier: 2, price: 2, cosc: false },
  'Grand Seiko':         { tier: 4, price: 3, cosc: false },
}

function guessStyle(model, brand) {
  const m = (model || '').toLowerCase()
  if (m.includes('submariner') || m.includes('seamaster') || m.includes('aqua') || m.includes('diver') || m.includes('fifty fathom') || m.includes('pelagos') || m.includes('black bay') || m.includes('marine') || m.includes('superocean') || m.includes('sea-dweller') || m.includes('hydroconquest')) return 'diver'
  if (m.includes('daytona') || m.includes('speedmaster') || m.includes('chrono') || m.includes('navitimer') || m.includes('el primero') || m.includes('monaco') || m.includes('carrera') || m.includes('premier') || m.includes('defy')) return 'chrono'
  if (m.includes('pilot') || m.includes('mark') || m.includes('portugieser') || m.includes('avenger') || m.includes('big pilot') || m.includes('flieger') || m.includes('cockpit')) return 'pilot'
  if (m.includes('calatrava') || m.includes('reverso') || m.includes('tank') || m.includes('santos') || m.includes('master') || m.includes('altiplano') || m.includes('patrimony') || m.includes('ballon') || m.includes('classique') || m.includes('saxonia') || m.includes('lange 1') || m.includes('dolce') || m.includes('elegance') || m.includes('de ville') || m.includes('constellation')) return 'dress'
  if (m.includes('nautilus') || m.includes('royal oak') || m.includes('overseas') || m.includes('ingenieur') || m.includes('aquanaut') || m.includes('big bang') || m.includes('spirit')) return 'sport'
  if (m.includes('datejust') || m.includes('day-date') || m.includes('cellini')) return 'dress'
  if (m.includes('gmt') || m.includes('explorer') || m.includes('air-king') || m.includes('oyster perpetual')) return 'sport'
  if (m.includes('luminor') || m.includes('radiomir') || m.includes('submersible')) return 'diver'
  return 'sport'
}

function parsePrice(val) {
  if (!val) return null
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? null : n
}

function parseMM(val) {
  if (!val) return null
  const match = String(val).match(/([\d.]+)\s*mm/i)
  if (match) return parseFloat(match[1])
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''))
  return isNaN(n) ? null : n
}

function priceToRange(price) {
  if (!price) return null
  if (price < 3000) return 1
  if (price < 8000) return 2
  if (price < 20000) return 3
  if (price < 50000) return 4
  return 5
}

function toSlug(brand, model) {
  return `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function guessMovement(mvmt, brand, model) {
  const m = (mvmt || '').toLowerCase()
  if (m.includes('automatic') || m.includes('self-wind')) return 'Automatic'
  if (m.includes('manual') || m.includes('hand-wound') || m.includes('hand wind')) return 'Manual'
  if (m.includes('quartz')) return 'Quartz'
  if (m.includes('spring drive')) return 'Spring Drive'
  // Guess from model name
  const mod = (model || '').toLowerCase()
  if (mod.includes('quartz')) return 'Quartz'
  // Most luxury watches are automatic
  return 'Automatic'
}

function parseCSV(text) {
  const rows = []
  const lines = text.split('\n')
  if (lines.length === 0) return rows

  // Simple CSV parser handling quoted fields
  function parseLine(line) {
    const fields = []
    let field = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (ch === ',' && !inQuotes) {
        fields.push(field)
        field = ''
      } else {
        field += ch
      }
    }
    fields.push(field)
    return fields
  }

  const headers = parseLine(lines[0])
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    const vals = parseLine(lines[i])
    const obj = {}
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = (vals[j] || '').trim()
    }
    rows.push(obj)
  }
  return rows
}

async function main() {
  console.log('=== Kaggle Watch Importer ===\n')

  console.log('Reading CSV...')
  const text = readFileSync(CSV_PATH, 'utf-8')
  const rows = parseCSV(text)
  console.log(`  Parsed ${rows.length} listings\n`)

  // Group by brand+model
  const models = new Map()
  for (const row of rows) {
    const brand = (row.brand || '').trim()
    const model = (row.model || '').trim()
    if (!brand || !model) continue
    const key = `${brand}|||${model}`
    if (!models.has(key)) models.set(key, [])
    models.get(key).push(row)
  }
  console.log(`  ${models.size} unique brand+model combinations\n`)

  // Process each unique model — pick best data from all listings
  let added = 0
  let updated = 0
  let skipped = 0

  for (const [key, listings] of models) {
    const [brand, model] = key.split('|||')
    const meta = BRAND_META[brand] || { tier: 2, price: 2, cosc: false }

    // Aggregate best data from all listings
    let bestRef = null
    let bestYear = null
    let bestSize = null
    let bestCaseMaterial = null
    let bestMovement = null
    let prices = []

    for (const l of listings) {
      if (l.ref && !bestRef) bestRef = l.ref
      const yr = parseInt(l.yop)
      if (!isNaN(yr) && yr > 1900 && yr <= 2026) {
        if (!bestYear || yr > bestYear) bestYear = yr
      }
      const sz = parseMM(l.size)
      if (sz && sz > 15 && sz < 80 && !bestSize) bestSize = sz
      if (l.casem && !bestCaseMaterial) bestCaseMaterial = l.casem
      if (l.mvmt && !bestMovement) bestMovement = l.mvmt
      const p = parsePrice(l.price)
      if (p && p > 0) prices.push(p)
    }

    // Median price
    let medianPrice = null
    if (prices.length > 0) {
      prices.sort((a, b) => a - b)
      medianPrice = prices[Math.floor(prices.length / 2)]
    }

    const slug = toSlug(brand, model)
    const apiId = `kaggle-${slug}`
    const computedPriceRange = priceToRange(medianPrice) || meta.price
    const style = guessStyle(model, brand)
    const movement = guessMovement(bestMovement, brand, model)

    try {
      const existing = await prisma.watch.findUnique({ where: { slug } })
      if (existing) {
        // Only update fields that are null in existing
        const updates = {}
        if (!existing.reference && bestRef) updates.reference = bestRef
        if (!existing.year && bestYear) updates.year = bestYear
        if (!existing.caseDiameter && bestSize) updates.caseDiameter = bestSize
        if (!existing.caseMaterial && bestCaseMaterial) updates.caseMaterial = bestCaseMaterial
        if (!existing.movement && movement) updates.movement = movement

        if (Object.keys(updates).length > 0) {
          await prisma.watch.update({ where: { slug }, data: updates })
          updated++
        } else {
          skipped++
        }
      } else {
        await prisma.watch.create({
          data: {
            apiId,
            brand,
            model,
            reference: bestRef || null,
            year: bestYear || null,
            caseDiameter: bestSize || null,
            caseThickness: null,
            waterResistance: null,
            movement,
            caliber: null,
            powerReserve: null,
            caseMaterial: bestCaseMaterial || null,
            bezelMaterial: null,
            crystal: 'Sapphire',
            frequency: null,
            jewels: null,
            cosc: meta.cosc,
            priceRange: computedPriceRange,
            brandTier: meta.tier,
            style,
            imageUrl: null,
            slug,
          },
        })
        added++
      }

      if ((added + updated) % 50 === 0) {
        process.stdout.write(`  Progress: ${added} added, ${updated} updated, ${skipped} skipped\r`)
      }
    } catch (err) {
      // Unique constraint or other — skip
      skipped++
    }
  }

  console.log(`\n\n  Watches: ${added} added, ${updated} updated, ${skipped} skipped`)

  // Generate comparisons
  console.log('\nGenerating comparisons...')
  const allWatches = await prisma.watch.findMany({ orderBy: [{ brand: 'asc' }, { model: 'asc' }] })

  const byStyle = {}
  for (const w of allWatches) {
    const s = w.style || 'sport'
    if (!byStyle[s]) byStyle[s] = []
    byStyle[s].push(w)
  }

  let compCount = 0
  for (const [, watches] of Object.entries(byStyle)) {
    // Cross-brand comparisons — limit to first 15 per style to keep it manageable
    for (let i = 0; i < watches.length && i < 15; i++) {
      for (let j = i + 1; j < watches.length && j < 15; j++) {
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

  const totalWatches = await prisma.watch.count()
  const totalComps = await prisma.comparison.count()

  console.log(`\n=== RESULTS ===`)
  console.log(`Kaggle watches added: ${added}`)
  console.log(`Existing watches updated: ${updated}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`New comparisons: ${compCount}`)
  console.log(`Total watches in DB: ${totalWatches}`)
  console.log(`Total comparisons in DB: ${totalComps}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
