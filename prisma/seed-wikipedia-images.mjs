/**
 * Wikipedia Image Fetcher: Gets watch images from Wikipedia/Wikimedia Commons.
 * Uses Wikipedia API to search for brand+model pages and extract main images.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Rate limiting: Wikipedia asks for polite access
const DELAY_MS = 200
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'PatinaxBot/1.0 (luxury watch comparison site)' },
  })
  if (!res.ok) return null
  return res.json()
}

// Strategy 1: Search Wikipedia for the watch model page and get its main image
async function getWikipediaImage(brand, model) {
  const queries = [
    `${brand} ${model} watch`,
    `${brand} ${model}`,
    `${model} (watch)`,
  ]

  for (const query of queries) {
    try {
      // Search for the page
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&format=json`
      const searchData = await fetchJSON(searchUrl)
      if (!searchData?.query?.search?.length) continue

      for (const result of searchData.query.search) {
        const title = result.title
        // Skip disambiguation and list pages
        if (title.includes('(disambiguation)') || title.startsWith('List of')) continue

        // Get page images
        const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&piprop=original|thumbnail&pithumbsize=800&format=json`
        const imageData = await fetchJSON(imageUrl)
        if (!imageData?.query?.pages) continue

        const pages = Object.values(imageData.query.pages)
        for (const page of pages) {
          if (page.original?.source) {
            const src = page.original.source
            // Skip SVG logos, maps, flags
            if (src.endsWith('.svg') || src.includes('Flag_of') || src.includes('Coat_of') || src.includes('Logo')) continue
            // Prefer actual watch images
            if (src.includes('watch') || src.includes('Watch') || src.includes(brand.toLowerCase()) || src.includes('horology') || src.includes('.jpg') || src.includes('.png')) {
              return src
            }
            // Accept any non-logo image as fallback
            return src
          }
          // Try thumbnail
          if (page.thumbnail?.source) {
            return page.thumbnail.source
          }
        }
      }
    } catch {
      // Skip errors
    }
  }
  return null
}

// Strategy 2: Search Wikimedia Commons directly
async function getCommonsImage(brand, model) {
  const query = `${brand} ${model}`
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=5&format=json`
    const data = await fetchJSON(url)
    if (!data?.query?.search?.length) return null

    for (const result of data.query.search) {
      const title = result.title
      if (!title.match(/\.(jpg|jpeg|png)$/i)) continue
      // Skip logos
      if (title.toLowerCase().includes('logo')) continue

      // Get the actual file URL
      const fileUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`
      const fileData = await fetchJSON(fileUrl)
      if (!fileData?.query?.pages) continue

      const pages = Object.values(fileData.query.pages)
      for (const page of pages) {
        if (page.imageinfo?.[0]?.thumburl) return page.imageinfo[0].thumburl
        if (page.imageinfo?.[0]?.url) return page.imageinfo[0].url
      }
    }
  } catch {
    // Skip errors
  }
  return null
}

async function main() {
  console.log('=== Wikipedia Image Fetcher ===\n')

  const watches = await prisma.watch.findMany({
    where: { imageUrl: null },
    orderBy: [{ brandTier: 'desc' }, { brand: 'asc' }, { model: 'asc' }],
  })
  console.log(`Found ${watches.length} watches without images\n`)

  let found = 0
  let notFound = 0

  for (let i = 0; i < watches.length; i++) {
    const w = watches[i]

    // Try Wikipedia first, then Commons
    let imageUrl = await getWikipediaImage(w.brand, w.model)
    if (!imageUrl) {
      imageUrl = await getCommonsImage(w.brand, w.model)
    }

    if (imageUrl) {
      await prisma.watch.update({
        where: { id: w.id },
        data: { imageUrl },
      })
      found++
      if (found % 20 === 0) {
        console.log(`  [${i + 1}/${watches.length}] Found ${found} images so far...`)
      }
    } else {
      notFound++
    }

    // Rate limit
    await sleep(DELAY_MS)

    // Progress every 50
    if ((i + 1) % 50 === 0) {
      console.log(`  Progress: ${i + 1}/${watches.length} (${found} found, ${notFound} not found)`)
    }
  }

  console.log(`\n=== RESULTS ===`)
  console.log(`Images found: ${found}`)
  console.log(`Not found: ${notFound}`)
  console.log(`Coverage: ${((found / watches.length) * 100).toFixed(1)}%`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
