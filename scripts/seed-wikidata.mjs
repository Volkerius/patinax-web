// One-off seeder: pulls luxury watches from Wikidata, augments with Wikipedia
// article descriptions, and inserts into the Patinax DB. Skips duplicates.
//
// Run with: node --env-file=.env scripts/seed-wikidata.mjs

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Brands we want to include. Patinax-existing brands first (so they get
// new models added to those brand pages), plus a few high-prestige brands
// we don't yet have. Smartwatch brands explicitly excluded.
const SMARTWATCH_BRANDS = new Set([
  'Garmin', 'Garmin Group', 'Samsung Electronics', 'Samsung Group',
  'Withings', 'Polar Electro', 'Suunto', 'Compal Electronics',
  'Seiko Epson', 'Steineck Camera Werk', 'VIXA', 'Nelsonic Industries',
])

// Brand label normalization: Wikidata's labels vs Patinax canonical names
const BRAND_NORMALIZE = {
  'Patek Philippe & Co.': 'Patek Philippe',
  'Rolex SA': 'Rolex',
  'A. Lange & Söhne': 'A. Lange & Söhne',
  'Vostok watches': 'Vostok',
  'Bovet Fleurier': 'Bovet',
  'House of Fabergé': 'Fabergé',
  'Waltham Watch Company': 'Waltham',
}

function normalizeBrand(label) {
  return BRAND_NORMALIZE[label] || label
}

// Slug helper that mirrors src/lib/slug.ts behavior
function toSlug(s) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Naive style inference from name keywords
function inferStyle(brand, model) {
  const t = `${brand} ${model}`.toLowerCase()
  if (/sub|sea|aqua|diver|fathom|deepsea|ploprof|nautilus|aquatimer|seamaster/.test(t)) return 'diver'
  if (/pilot|aviator|navitimer|big pilot|spitfire|mark|bigpilot/.test(t)) return 'pilot'
  if (/chrono|speed|daytona|monaco|carrera|el primero|portugieser/.test(t)) return 'chrono'
  if (/field|khaki|explorer|expedition|prospex/.test(t)) return 'field'
  if (/calatrava|saxonia|patrimony|altiplano|reverso|tank|tonneau|ellipse|master ultra thin|portofino/.test(t)) return 'dress'
  return 'sport'
}

// Brand tier inference (1-5: 5 = haute horlogerie)
function inferBrandTier(brand) {
  const tier5 = ['Patek Philippe', 'Audemars Piguet', 'Vacheron Constantin', 'A. Lange & Söhne', 'F.P. Journe', 'Richard Mille', 'Breguet', 'Roger Dubuis', 'Greubel Forsey', 'MB&F', 'H. Moser & Cie', 'Laurent Ferrier', 'Bovet', 'Parmigiani Fleurier']
  const tier4 = ['Rolex', 'Omega', 'IWC', 'Jaeger-LeCoultre', 'Cartier', 'Glashütte Original', 'Blancpain', 'Piaget', 'Panerai', 'Zenith', 'Ulysse Nardin', 'Chopard', 'Girard-Perregaux', 'Hublot', 'Bulgari', 'Hermès', 'Grand Seiko', 'Harry Winston']
  const tier3 = ['Tudor', 'Breitling', 'TAG Heuer', 'Longines', 'Montblanc', 'Bell & Ross', 'Frederique Constant', 'Maurice Lacroix', 'Oris', 'Nomos', 'Junghans', 'Sinn', 'Tutima', 'Bremont', 'Norqain', 'Baume & Mercier', 'Arnold & Son', 'Corum', 'Franck Muller', 'Jaquet Droz', 'Ming']
  const tier2 = ['Hamilton', 'Tissot', 'Mido', 'Certina', 'Alpina', 'Rado', 'Seiko', 'Citizen', 'Christopher Ward', 'Doxa', 'Glycine', 'Squale', 'Stowa', 'Laco', 'Farer', 'Baltic', 'Fortis', 'Vostok', 'Waltham', 'Fabergé']
  if (tier5.includes(brand)) return 5
  if (tier4.includes(brand)) return 4
  if (tier3.includes(brand)) return 3
  if (tier2.includes(brand)) return 2
  return 3
}

// Price tier inference: 1-5 (5 = ultra-luxury)
function inferPriceTier(brand, brandTier) {
  if (brandTier >= 5) return 5
  if (brandTier === 4) return 4
  if (brandTier === 3) return 3
  return 2
}

// Material normalization (Wikidata returns wikidata IDs / labels — map to canonical)
function normalizeMaterial(label) {
  if (!label) return null
  const m = label.toLowerCase()
  if (/stainless|steel/.test(m) && !/gold/.test(m)) return 'Stainless steel'
  if (/platinum/.test(m)) return 'Platinum'
  if (/rose gold|red gold|pink gold/.test(m)) return '18k rose gold'
  if (/white gold/.test(m)) return '18k white gold'
  if (/yellow gold/.test(m)) return '18k yellow gold'
  if (/^gold$/.test(m)) return '18k yellow gold'
  if (/titanium/.test(m)) return 'Titanium'
  if (/ceramic/.test(m)) return 'Ceramic'
  if (/bronze/.test(m)) return 'Bronze'
  if (/carbon/.test(m)) return 'Carbon'
  return label.charAt(0).toUpperCase() + label.slice(1)
}

// Generate a description from facts (when no Wikipedia article available)
function generateDescription(brand, model, year, material, diameter, style, brandTier) {
  const styleDescriptions = {
    diver: 'a purpose-built dive watch in the maison\'s sport collection, designed for water resistance and underwater legibility',
    pilot: 'a pilot\'s watch in the brand\'s aviation-inspired lineup, emphasizing legibility and robust case construction',
    chrono: 'a chronograph reference combining timekeeping with elapsed-time measurement via subdial complications',
    field: 'a field watch designed for outdoor and utility wear, with a clean dial and durable construction',
    dress: 'a dress watch in the brand\'s formal collection, prioritizing thinness, finishing, and refined dial design',
    sport: 'a sport watch in the maison\'s contemporary collection, balancing daily-wear durability with luxury finishing',
  }

  const tierDescriptions = {
    5: 'one of the most respected names in haute horlogerie',
    4: 'a top-tier luxury watchmaker with significant horological heritage',
    3: 'a well-established Swiss watchmaker with a strong reputation in the luxury and sport segments',
    2: 'a mainstream luxury brand offering accessible mechanical watchmaking',
  }

  const parts = []
  parts.push(`The ${brand} ${model} is ${styleDescriptions[style] || styleDescriptions.sport}.`)
  parts.push(`${brand} is ${tierDescriptions[brandTier] || tierDescriptions[3]}.`)
  if (year) {
    parts.push(`This reference was introduced in ${year}.`)
  }
  if (diameter) {
    parts.push(`The case measures ${diameter}mm in diameter.`)
  }
  if (material) {
    parts.push(`The case is constructed in ${material.toLowerCase()}.`)
  }
  parts.push(`This page documents the ${brand} ${model} as part of Patinax's luxury watch reference. Compare it side-by-side with similar references using the comparison tool.`)
  return parts.join(' ')
}

// Try to fetch the first paragraph of a Wikipedia article via the REST API
async function fetchWikipediaSummary(articleUrl) {
  try {
    const title = decodeURIComponent(articleUrl.split('/wiki/')[1])
    if (!title) return null
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      { headers: { 'User-Agent': 'PatinaxBot/1.0 (https://patinax.com)' } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.extract || null
  } catch {
    return null
  }
}

async function main() {
  console.log('Querying Wikidata for watch models...')
  const sparql = `SELECT ?watch ?watchLabel ?brand ?brandLabel ?image ?inception ?material ?materialLabel ?diameter ?thickness ?wikipediaArticle WHERE {
  { ?watch wdt:P31 wd:Q178794 . } UNION { ?watch wdt:P31/wdt:P279* wd:Q178794 . }
  ?watch wdt:P176 ?brand .
  OPTIONAL { ?watch wdt:P18 ?image . }
  OPTIONAL { ?watch wdt:P571 ?inception . }
  OPTIONAL { ?watch wdt:P186 ?material . }
  OPTIONAL { ?watch wdt:P2386 ?diameter . }
  OPTIONAL { ?watch wdt:P2610 ?thickness . }
  OPTIONAL { ?wikipediaArticle schema:about ?watch ; schema:isPartOf <https://en.wikipedia.org/> . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`

  const url = 'https://query.wikidata.org/sparql?' + new URLSearchParams({ query: sparql }).toString()
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/sparql-results+json',
      'User-Agent': 'PatinaxBot/1.0 (https://patinax.com)',
    },
  })
  const data = await res.json()
  const rows = data.results.bindings

  // Aggregate by watch URI: collect all materials, all values
  const watchMap = new Map()
  for (const row of rows) {
    const uri = row.watch.value
    if (!watchMap.has(uri)) {
      watchMap.set(uri, {
        uri,
        wdId: uri.split('/').pop(),
        name: row.watchLabel?.value,
        brandLabel: row.brandLabel?.value,
        image: row.image?.value,
        inception: row.inception?.value,
        materials: new Set(),
        diameters: new Set(),
        thicknesses: new Set(),
        wikipediaUrl: row.wikipediaArticle?.value,
      })
    }
    const w = watchMap.get(uri)
    if (row.materialLabel?.value) w.materials.add(row.materialLabel.value)
    if (row.diameter?.value) w.diameters.add(parseFloat(row.diameter.value))
    if (row.thickness?.value) w.thicknesses.add(parseFloat(row.thickness.value))
  }

  console.log(`Wikidata returned ${watchMap.size} unique watches.`)

  // Filter out smartwatches and watches without brand
  const candidates = Array.from(watchMap.values()).filter((w) => {
    if (!w.name || !w.brandLabel) return false
    if (SMARTWATCH_BRANDS.has(w.brandLabel)) return false
    return true
  })

  console.log(`After smartwatch filter: ${candidates.length} luxury candidates.`)

  // Existing slugs (avoid duplicates)
  const existing = await prisma.watch.findMany({ select: { slug: true, apiId: true } })
  const existingSlugs = new Set(existing.map((w) => w.slug))
  const existingApiIds = new Set(existing.map((w) => w.apiId))

  let inserted = 0
  let skipped = 0
  let failed = 0

  for (const w of candidates) {
    try {
      const brand = normalizeBrand(w.brandLabel)
      // Strip brand from name to get model (Wikidata names often include brand)
      let model = w.name
      const brandPrefix = w.brandLabel.replace(/ & Co\.?$/, '')
      if (model.startsWith(brandPrefix)) {
        model = model.slice(brandPrefix.length).trim()
      }
      if (model.startsWith(brand)) {
        model = model.slice(brand.length).trim()
      }
      if (!model) model = w.name

      const slug = `${toSlug(brand)}-${toSlug(model)}`
      const apiId = `wikidata-${w.wdId}`

      if (existingSlugs.has(slug) || existingApiIds.has(apiId)) {
        skipped++
        continue
      }

      const year = w.inception ? parseInt(w.inception.slice(0, 4)) : null
      const diameter = w.diameters.size > 0 ? Math.min(...w.diameters) : null
      const thickness = w.thicknesses.size > 0 ? Math.min(...w.thicknesses) : null
      const material = w.materials.size > 0 ? normalizeMaterial(Array.from(w.materials)[0]) : null
      const style = inferStyle(brand, model)
      const brandTier = inferBrandTier(brand)
      const priceRange = inferPriceTier(brand, brandTier)

      // Try Wikipedia summary first; fall back to generated description
      let description = null
      if (w.wikipediaUrl) {
        description = await fetchWikipediaSummary(w.wikipediaUrl)
        await new Promise((r) => setTimeout(r, 200)) // be polite to Wikipedia
      }
      if (!description) {
        description = generateDescription(brand, model, year, material, diameter, style, brandTier)
      }

      const data = {
        apiId,
        brand,
        model,
        slug,
        year: year && year > 1800 && year < 2100 ? year : null,
        caseDiameter: diameter && diameter > 10 && diameter < 100 ? diameter : null,
        caseThickness: thickness && thickness > 1 && thickness < 30 ? thickness : null,
        caseMaterial: material,
        bezelMaterial: material, // best-effort fallback
        crystal: 'Sapphire', // standard for modern luxury watches
        movement: 'Automatic', // most common; Wikidata doesn't expose this reliably
        style,
        brandTier,
        priceRange,
        cosc: false,
        imageUrl: w.image || null,
        description,
      }

      await prisma.watch.create({ data })
      existingSlugs.add(slug)
      existingApiIds.add(apiId)
      inserted++
      console.log(`  + ${brand} ${model} (${slug})`)
    } catch (e) {
      failed++
      console.log(`  ! Failed: ${w.brandLabel} ${w.name} — ${e.message}`)
    }
  }

  console.log(`\n=== DONE ===`)
  console.log(`Inserted: ${inserted}`)
  console.log(`Skipped (duplicate): ${skipped}`)
  console.log(`Failed: ${failed}`)
  console.log(`Total candidates processed: ${candidates.length}`)

  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
