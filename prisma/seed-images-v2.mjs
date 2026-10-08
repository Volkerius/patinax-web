/**
 * Image Fetcher v2: More aggressive Wikipedia image search with multiple strategies.
 * Also uses brand-level fallback images so NO watch is left without a photo.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const HEADERS = { 'User-Agent': 'PatinaxBot/1.0 (luxury watch comparison site; contact@patinax.com)' }

async function fetchJSON(url) {
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return null
    return res.json()
  } catch { return null }
}

// Strategy 1: Wikipedia page image
async function getWikiPageImage(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&format=json`
  const data = await fetchJSON(url)
  if (!data?.query?.search?.length) return null

  for (const result of data.query.search) {
    const title = result.title
    if (title.includes('disambiguation') || title.startsWith('List of')) continue

    const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&piprop=original|thumbnail&pithumbsize=600&format=json`
    const imgData = await fetchJSON(imgUrl)
    if (!imgData?.query?.pages) continue

    for (const page of Object.values(imgData.query.pages)) {
      const src = page.original?.source || page.thumbnail?.source
      if (src && !src.endsWith('.svg') && !src.includes('Flag_of') && !src.includes('Coat_of') && !src.includes('Logo') && !src.includes('Map_of')) {
        return src
      }
    }
  }
  return null
}

// Strategy 2: Wikimedia Commons search
async function getCommonsImage(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=5&format=json`
  const data = await fetchJSON(url)
  if (!data?.query?.search?.length) return null

  for (const result of data.query.search) {
    const title = result.title
    if (!title.match(/\.(jpg|jpeg|png)$/i) || title.toLowerCase().includes('logo')) continue

    const fileUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json`
    const fileData = await fetchJSON(fileUrl)
    if (!fileData?.query?.pages) continue

    for (const page of Object.values(fileData.query.pages)) {
      if (page.imageinfo?.[0]?.thumburl) return page.imageinfo[0].thumburl
      if (page.imageinfo?.[0]?.url) return page.imageinfo[0].url
    }
  }
  return null
}

// Try multiple search queries for a watch
async function findImage(brand, model) {
  const queries = [
    `${brand} ${model} watch`,
    `${brand} ${model}`,
    `${model} watch ${brand}`,
    `${brand} ${model.split(' ')[0]} wristwatch`,
  ]

  for (const q of queries) {
    const img = await getWikiPageImage(q)
    if (img) return img
    await sleep(100)
  }

  // Try Commons
  for (const q of queries.slice(0, 2)) {
    const img = await getCommonsImage(q)
    if (img) return img
    await sleep(100)
  }

  return null
}

// Brand-level fallback: find ONE good image per brand
async function findBrandImage(brand) {
  const queries = [
    `${brand} watch`,
    `${brand} wristwatch`,
    `${brand} timepiece`,
  ]
  for (const q of queries) {
    const img = await getWikiPageImage(q)
    if (img) return img
    await sleep(100)
    const commonsImg = await getCommonsImage(q)
    if (commonsImg) return commonsImg
    await sleep(100)
  }
  return null
}

async function main() {
  console.log('=== Image Fetcher v2 ===\n')

  // Get all watches without images, grouped by brand
  const watches = await prisma.watch.findMany({
    where: { imageUrl: null },
    orderBy: [{ brandTier: 'desc' }, { brand: 'asc' }, { model: 'asc' }],
  })
  console.log(`${watches.length} watches without images\n`)

  // Phase 1: Try individual watch images for top watches
  const brandCounts = {}
  for (const w of watches) {
    brandCounts[w.brand] = (brandCounts[w.brand] || 0) + 1
  }

  let found = 0
  const brandFallbacks = new Map()

  // Phase 1: Try specific model images (limit to first 5 per brand to save API calls)
  console.log('Phase 1: Searching for specific model images...')
  const brandModelCount = {}

  for (let i = 0; i < watches.length; i++) {
    const w = watches[i]
    brandModelCount[w.brand] = (brandModelCount[w.brand] || 0) + 1

    // Only try first 5 models per brand individually
    if (brandModelCount[w.brand] <= 5) {
      const img = await findImage(w.brand, w.model)
      if (img) {
        await prisma.watch.update({ where: { id: w.id }, data: { imageUrl: img } })
        found++
        // Also save as brand fallback
        if (!brandFallbacks.has(w.brand)) {
          brandFallbacks.set(w.brand, img)
        }
      }
      await sleep(150)
    }

    if ((i + 1) % 25 === 0) {
      console.log(`  [${i+1}/${watches.length}] Found ${found} specific images`)
    }
  }
  console.log(`Phase 1 complete: ${found} specific images\n`)

  // Phase 2: Find brand-level fallback images
  console.log('Phase 2: Finding brand fallback images...')
  const brandsWithoutFallback = Object.keys(brandCounts).filter(b => !brandFallbacks.has(b))

  for (const brand of brandsWithoutFallback) {
    const img = await findBrandImage(brand)
    if (img) {
      brandFallbacks.set(brand, img)
      console.log(`  Found fallback for ${brand}`)
    }
    await sleep(200)
  }
  console.log(`Phase 2 complete: ${brandFallbacks.size} brand fallbacks\n`)

  // Phase 3: Apply brand fallback to all remaining watches without images
  console.log('Phase 3: Applying brand fallbacks...')
  const remaining = await prisma.watch.findMany({ where: { imageUrl: null } })
  let fallbackApplied = 0

  for (const w of remaining) {
    const fallback = brandFallbacks.get(w.brand)
    if (fallback) {
      await prisma.watch.update({ where: { id: w.id }, data: { imageUrl: fallback } })
      fallbackApplied++
    }
  }
  console.log(`Phase 3 complete: ${fallbackApplied} fallback images applied\n`)

  // Final stats
  const totalWithImage = await prisma.watch.count({ where: { imageUrl: { not: null } } })
  const totalWithout = await prisma.watch.count({ where: { imageUrl: null } })

  console.log('=== RESULTS ===')
  console.log(`Specific images found: ${found}`)
  console.log(`Brand fallbacks applied: ${fallbackApplied}`)
  console.log(`Total with images: ${totalWithImage}`)
  console.log(`Total without images: ${totalWithout}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
