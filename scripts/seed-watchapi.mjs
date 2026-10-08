// Plan B: Pull reference data from TheWatchAPI for selected brands.
// Each brand call counts as 1 toward the 25/day quota. We pick brands
// with the largest reference catalogs that are under-represented in the
// current DB. After insertion, downstream scripts can enrich descriptions.
//
// Run: node --env-file=.env scripts/seed-watchapi.mjs

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const API_BASE = 'https://api.thewatchapi.com/v1'
const API_KEY = process.env.WATCH_API_KEY

if (!API_KEY) {
  console.error('WATCH_API_KEY missing in env')
  process.exit(1)
}

// Brands to pull this run. Each is 1 API call to /model/list.
// We have 25/day quota; used some testing /reference/list, leaving room for ~12 here.
const TARGET_BRANDS = [
  'Breitling',
  'TAG Heuer',
  'IWC',
  'Hamilton',
  'Oris',
  'Tissot',
  'Longines',
  'Sinn',
  'Bremont',
  'Bell & Ross',
  'Frederique Constant',
  'Maurice Lacroix',
]

function toSlug(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function inferStyle(brand, model) {
  const t = `${brand} ${model}`.toLowerCase()
  if (/sub|sea|aqua|diver|fathom|deepsea|ploprof|nautilus|aquatimer|seamaster|aquaracer|superocean|avenger|hydroconquest/.test(t)) return 'diver'
  if (/pilot|aviator|navitimer|big pilot|spitfire|mark|bigpilot|tornek|khaki aviation/.test(t)) return 'pilot'
  if (/chrono|speed|daytona|monaco|carrera|el primero|portugieser|navitimer|monza/.test(t)) return 'chrono'
  if (/field|khaki|explorer|expedition|prospex/.test(t)) return 'field'
  if (/calatrava|saxonia|patrimony|altiplano|reverso|tank|tonneau|ellipse|master ultra thin|portofino|prestige|conquest classic|presage cocktail/.test(t)) return 'dress'
  return 'sport'
}

const TIER_MAP = {
  'A. Lange & Söhne': 5, 'Audemars Piguet': 5, 'Patek Philippe': 5, 'Vacheron Constantin': 5,
  'F.P. Journe': 5, 'Richard Mille': 5, 'Breguet': 5, 'Roger Dubuis': 5, 'MB&F': 5,
  'H. Moser & Cie': 5, 'Laurent Ferrier': 5, 'Bovet': 5, 'Parmigiani Fleurier': 5,
  'Rolex': 4, 'Omega': 4, 'IWC': 4, 'Jaeger-LeCoultre': 4, 'Cartier': 4, 'Glashütte Original': 4,
  'Blancpain': 4, 'Piaget': 4, 'Panerai': 4, 'Zenith': 4, 'Ulysse Nardin': 4, 'Chopard': 4,
  'Girard-Perregaux': 4, 'Hublot': 4, 'Bulgari': 4, 'Hermès': 4, 'Grand Seiko': 4, 'Harry Winston': 4,
  'Tudor': 3, 'Breitling': 3, 'TAG Heuer': 3, 'Longines': 3, 'Montblanc': 3, 'Bell & Ross': 3,
  'Frederique Constant': 3, 'Maurice Lacroix': 3, 'Oris': 3, 'Nomos': 3, 'Junghans': 3,
  'Sinn': 3, 'Tutima': 3, 'Bremont': 3, 'Norqain': 3, 'Baume & Mercier': 3, 'Arnold & Son': 3,
  'Corum': 3, 'Franck Muller': 3, 'Jaquet Droz': 3, 'Ming': 3,
  'Hamilton': 2, 'Tissot': 2, 'Mido': 2, 'Certina': 2, 'Alpina': 2, 'Rado': 2, 'Seiko': 2,
  'Citizen': 2, 'Christopher Ward': 2, 'Doxa': 2, 'Glycine': 2, 'Squale': 2, 'Stowa': 2,
  'Laco': 2, 'Farer': 2, 'Baltic': 2, 'Fortis': 2,
}

function inferBrandTier(brand) { return TIER_MAP[brand] || 3 }
function inferPriceTier(brandTier) { return brandTier }

function parseDiameter(raw) {
  if (!raw) return null
  const s = String(raw).match(/(\d+(?:\.\d+)?)/)
  if (!s) return null
  const n = parseFloat(s[1])
  return n > 10 && n < 100 ? n : null
}

function parseYear(raw) {
  if (!raw) return null
  const s = String(raw).match(/(\d{4})/)
  if (!s) return null
  const n = parseInt(s[1])
  return n > 1850 && n < 2100 ? n : null
}

function normalizeMaterial(raw) {
  if (!raw) return null
  const m = String(raw).toLowerCase()
  if (/stainless|^steel/.test(m) && !/gold/.test(m)) return 'Stainless steel'
  if (/oystersteel/.test(m)) return 'Oystersteel'
  if (/platinum/.test(m)) return 'Platinum'
  if (/rose gold|red gold|pink gold|everose/.test(m)) return '18k rose gold'
  if (/white gold/.test(m)) return '18k white gold'
  if (/yellow gold/.test(m)) return '18k yellow gold'
  if (/^gold$|18k gold/.test(m)) return '18k yellow gold'
  if (/titanium/.test(m)) return 'Titanium'
  if (/ceramic|cerachrom/.test(m)) return 'Ceramic'
  if (/bronze/.test(m)) return 'Bronze'
  if (/carbon/.test(m)) return 'Carbon'
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

function normalizeMovement(raw) {
  if (!raw) return null
  const m = String(raw).toLowerCase()
  if (/automatic|self[- ]?winding/.test(m)) return 'Automatic'
  if (/manual|hand[- ]?wound/.test(m)) return 'Manual'
  if (/quartz/.test(m)) return 'Quartz'
  if (/spring drive/.test(m)) return 'Spring Drive'
  if (/eco[- ]?drive/.test(m)) return 'Quartz'
  if (/kinetic/.test(m)) return 'Quartz'
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

async function fetchAPI(path, params) {
  const qs = new URLSearchParams({ ...params, api_token: API_KEY })
  const url = `${API_BASE}${path}?${qs}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'PatinaxBot/1.0 (https://patinax.com)' },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`API ${res.status}: ${path} — ${body.slice(0, 200)}`)
  }
  return res.json()
}

async function main() {
  const existing = await prisma.watch.findMany({ select: { slug: true, apiId: true } })
  const existingSlugs = new Set(existing.map((w) => w.slug))
  const existingApiIds = new Set(existing.map((w) => w.apiId))

  let totalInserted = 0
  let totalSkipped = 0
  let totalFailed = 0
  let apiCalls = 0

  for (const brand of TARGET_BRANDS) {
    console.log(`\n=== ${brand} ===`)
    try {
      apiCalls++
      const response = await fetchAPI('/model/list', { brand: brand.toLowerCase() })
      const items = response.data || response || []
      const list = Array.isArray(items) ? items : []
      console.log(`  API returned ${list.length} models (call ${apiCalls})`)

      let brandInserted = 0
      for (const item of list) {
        try {
          const apiBrand = item.brand || brand
          const model = (item.model || '').trim()
          const ref = (item.reference_number || '').trim()
          if (!model && !ref) continue

          const fullName = ref ? `${model} ${ref}`.trim() : model
          const slug = toSlug(`${apiBrand} ${fullName}`)
          const apiId = `watchapi-${ref || toSlug(fullName)}`

          if (existingSlugs.has(slug) || existingApiIds.has(apiId)) {
            totalSkipped++
            continue
          }

          const brandTier = inferBrandTier(apiBrand)
          const data = {
            apiId,
            brand: apiBrand,
            model: fullName,
            slug,
            reference: ref || null,
            year: parseYear(item.year_of_production),
            caseDiameter: parseDiameter(item.case_diameter),
            caseMaterial: normalizeMaterial(item.case_material),
            movement: normalizeMovement(item.movement) || 'Automatic',
            description: item.description || null,
            style: inferStyle(apiBrand, fullName),
            brandTier,
            priceRange: inferPriceTier(brandTier),
            cosc: false,
            crystal: 'Sapphire',
          }

          await prisma.watch.create({ data })
          existingSlugs.add(slug)
          existingApiIds.add(apiId)
          brandInserted++
          totalInserted++
        } catch (e) {
          totalFailed++
          // silent on individual failures (mostly schema/dup)
        }
      }
      console.log(`  Inserted: ${brandInserted}`)
    } catch (e) {
      console.log(`  ! ${brand} failed: ${e.message}`)
      // If we get an API error (quota?), stop
      if (/quota|rate|429|forbidden|unauthorized/i.test(e.message)) {
        console.log('  → Stopping early due to API error')
        break
      }
    }

    // Be polite between API calls
    await new Promise((r) => setTimeout(r, 1000))
  }

  console.log(`\n=== DONE ===`)
  console.log(`API calls used: ${apiCalls}`)
  console.log(`Inserted: ${totalInserted}`)
  console.log(`Skipped (duplicate): ${totalSkipped}`)
  console.log(`Failed: ${totalFailed}`)

  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
