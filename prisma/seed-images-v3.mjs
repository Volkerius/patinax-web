/**
 * Image Fetcher v3: Individual image search for EVERY watch model.
 *
 * Key differences from v2:
 *  - NO brand-level fallback. Every watch is searched individually.
 *  - Watches that share an imageUrl (brand fallbacks from v2) are identified,
 *    their imageUrl is cleared, and they are prioritized for fresh searches.
 *  - More creative query variations and deeper Wikimedia Commons search.
 *  - Rate limited at 150ms between API calls.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const HEADERS = { 'User-Agent': 'PatinaxBot/1.0 (luxury watch comparison site; contact@patinax.com)' }

// ---------------------------------------------------------------------------
// HTTP helper
// ---------------------------------------------------------------------------
async function fetchJSON(url) {
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Strategy 1: Wikipedia page image search
// ---------------------------------------------------------------------------
async function getWikiPageImage(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&format=json`
  const data = await fetchJSON(url)
  if (!data?.query?.search?.length) return null

  for (const result of data.query.search) {
    const title = result.title
    if (title.includes('disambiguation') || title.startsWith('List of')) continue

    const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&piprop=original|thumbnail&pithumbsize=600&format=json`
    await sleep(150)
    const imgData = await fetchJSON(imgUrl)
    if (!imgData?.query?.pages) continue

    for (const page of Object.values(imgData.query.pages)) {
      const src = page.original?.source || page.thumbnail?.source
      if (
        src &&
        !src.endsWith('.svg') &&
        !src.includes('Flag_of') &&
        !src.includes('Coat_of') &&
        !src.includes('Logo') &&
        !src.includes('Map_of') &&
        !src.includes('logo')
      ) {
        return src
      }
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// Strategy 2: Wikimedia Commons search
// ---------------------------------------------------------------------------
async function getCommonsImage(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=5&format=json`
  const data = await fetchJSON(url)
  if (!data?.query?.search?.length) return null

  for (const result of data.query.search) {
    const title = result.title
    if (!title.match(/\.(jpg|jpeg|png)$/i) || title.toLowerCase().includes('logo')) continue

    const fileUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json`
    await sleep(150)
    const fileData = await fetchJSON(fileUrl)
    if (!fileData?.query?.pages) continue

    for (const page of Object.values(fileData.query.pages)) {
      if (page.imageinfo?.[0]?.thumburl) return page.imageinfo[0].thumburl
      if (page.imageinfo?.[0]?.url) return page.imageinfo[0].url
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// Build search queries for a watch
// ---------------------------------------------------------------------------
function buildQueries(brand, model, reference) {
  const firstWord = model.split(' ')[0]
  const queries = [
    `${brand} ${model} watch`,
    `${brand} ${model}`,
    `${model} ${brand} watch`,
    `${brand} ${firstWord} wristwatch`,
    `${brand} ${model} wristwatch`,
  ]
  if (reference) {
    queries.push(`${brand} ${reference}`)
    queries.push(`${reference} watch`)
  }
  // Deduplicate while preserving order
  return [...new Set(queries)]
}

// ---------------------------------------------------------------------------
// Try ALL strategies for a single watch
// ---------------------------------------------------------------------------
async function findImageForWatch(brand, model, reference) {
  const queries = buildQueries(brand, model, reference)

  // Wikipedia searches with all query variations
  for (const q of queries) {
    const img = await getWikiPageImage(q)
    if (img) return img
    await sleep(150)
  }

  // Wikimedia Commons searches with all query variations
  for (const q of queries) {
    const img = await getCommonsImage(q)
    if (img) return img
    await sleep(150)
  }

  return null
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('=== Image Fetcher v3 — Individual search for EVERY watch ===\n')

  // -----------------------------------------------------------------------
  // Step 1: Identify watches sharing an imageUrl (brand-fallback leftovers)
  // -----------------------------------------------------------------------
  const allWatches = await prisma.watch.findMany({
    orderBy: [{ brandTier: 'desc' }, { brand: 'asc' }, { model: 'asc' }],
  })
  console.log(`Total watches in database: ${allWatches.length}`)

  // Count how many watches share each imageUrl
  const urlCounts = new Map()
  for (const w of allWatches) {
    if (w.imageUrl) {
      urlCounts.set(w.imageUrl, (urlCounts.get(w.imageUrl) || 0) + 1)
    }
  }

  // Any imageUrl used by more than one watch is a brand-fallback — clear it
  const sharedUrls = new Set()
  for (const [url, count] of urlCounts) {
    if (count > 1) sharedUrls.add(url)
  }

  const watchesWithSharedImage = allWatches.filter((w) => w.imageUrl && sharedUrls.has(w.imageUrl))
  if (watchesWithSharedImage.length > 0) {
    console.log(`Found ${watchesWithSharedImage.length} watches sharing a brand-fallback image. Clearing those now...`)
    const sharedIds = watchesWithSharedImage.map((w) => w.id)
    await prisma.watch.updateMany({
      where: { id: { in: sharedIds } },
      data: { imageUrl: null },
    })
    // Update local objects to reflect the cleared state
    for (const w of watchesWithSharedImage) {
      w.imageUrl = null
    }
    console.log(`Cleared ${sharedIds.length} shared imageUrls.\n`)
  } else {
    console.log('No shared brand-fallback images detected.\n')
  }

  // -----------------------------------------------------------------------
  // Step 2: Build the work queue — prioritize watches without unique images
  // -----------------------------------------------------------------------
  // Re-sort: watches without an image first (prioritized), then the rest
  const needsImage = allWatches.filter((w) => !w.imageUrl)
  console.log(`Watches needing an image: ${needsImage.length}\n`)

  if (needsImage.length === 0) {
    console.log('All watches already have unique images. Nothing to do.')
    return
  }

  // -----------------------------------------------------------------------
  // Step 3: Search for each watch individually
  // -----------------------------------------------------------------------
  let found = 0
  let failed = 0
  const startTime = Date.now()

  for (let i = 0; i < needsImage.length; i++) {
    const w = needsImage[i]

    try {
      const img = await findImageForWatch(w.brand, w.model, w.reference)
      if (img) {
        await prisma.watch.update({ where: { id: w.id }, data: { imageUrl: img } })
        found++
      } else {
        failed++
      }
    } catch (err) {
      console.error(`  Error searching for ${w.brand} ${w.model}: ${err.message}`)
      failed++
    }

    // Log progress every 10 watches
    if ((i + 1) % 10 === 0 || i + 1 === needsImage.length) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
      console.log(
        `  [${i + 1}/${needsImage.length}] found=${found}  failed=${failed}  elapsed=${elapsed}s`
      )
    }
  }

  // -----------------------------------------------------------------------
  // Step 4: Final report
  // -----------------------------------------------------------------------
  const totalWithImage = await prisma.watch.count({ where: { imageUrl: { not: null } } })
  const totalWithout = await prisma.watch.count({ where: { imageUrl: null } })
  const uniqueUrls = await prisma.watch.groupBy({
    by: ['imageUrl'],
    where: { imageUrl: { not: null } },
  })

  console.log('\n=== RESULTS ===')
  console.log(`Images found this run:     ${found}`)
  console.log(`Searches with no result:   ${failed}`)
  console.log(`Total watches with image:  ${totalWithImage}`)
  console.log(`Total watches without:     ${totalWithout}`)
  console.log(`Unique image URLs:         ${uniqueUrls.length}`)
  console.log(`Total elapsed:             ${((Date.now() - startTime) / 1000).toFixed(1)}s`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
