import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CLIENT_ID = process.env.EBAY_CLIENT_ID
const CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET
const WRISTWATCH_CATEGORY = '31387'

let accessToken = null

async function getToken() {
  const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
  })
  const data = await res.json()
  accessToken = data.access_token
  console.log('Got OAuth token')
}

async function searchWatch(brand, model, reference) {
  // Strategy: search with reference number first (most specific), then brand+model
  const queries = []

  if (reference) {
    queries.push(`${brand} ${reference}`)
  }
  queries.push(`${brand} ${model} watch`)

  for (const q of queries) {
    const params = new URLSearchParams({
      q,
      category_ids: WRISTWATCH_CATEGORY,
      limit: '5',
      filter: 'conditionIds:{1000|1500|2000|2500|3000}', // New, Open Box, Certified, Like New, Very Good
    })

    const res = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
        },
      }
    )

    const data = await res.json()

    if (data.itemSummaries && data.itemSummaries.length > 0) {
      // Find best match: prefer items with high-res images
      for (const item of data.itemSummaries) {
        const imageUrl = item.image?.imageUrl
        if (!imageUrl) continue

        // Get higher resolution version (replace s-l225 with s-l500 or s-l1600)
        const hiRes = imageUrl.replace(/s-l\d+/, 's-l500')

        // Validate: title should contain brand name
        const titleLower = item.title.toLowerCase()
        const brandLower = brand.toLowerCase()

        if (titleLower.includes(brandLower) || titleLower.includes(brandLower.split(' ')[0])) {
          return hiRes
        }
      }

      // Fallback: just use first result's image
      const firstImage = data.itemSummaries[0]?.image?.imageUrl
      if (firstImage) {
        return firstImage.replace(/s-l\d+/, 's-l500')
      }
    }
  }

  return null
}

async function main() {
  await getToken()

  // Get all watches without images
  const watches = await prisma.watch.findMany({
    where: {
      OR: [
        { imageUrl: null },
        { imageUrl: '' },
      ],
    },
    orderBy: [
      { brand: 'asc' },
      { model: 'asc' },
    ],
  })

  console.log(`Found ${watches.length} watches without images`)

  let updated = 0
  let failed = 0
  let apiCalls = 0

  for (let i = 0; i < watches.length; i++) {
    const w = watches[i]

    // Rate limit: ~5 per second to be safe
    if (i > 0 && i % 5 === 0) {
      await new Promise(r => setTimeout(r, 1200))
    }

    // Refresh token every 500 calls (token lasts 2 hours but be safe)
    if (apiCalls > 0 && apiCalls % 500 === 0) {
      await getToken()
    }

    try {
      const imageUrl = await searchWatch(w.brand, w.model, w.reference)
      apiCalls++

      if (imageUrl) {
        await prisma.watch.update({
          where: { id: w.id },
          data: { imageUrl },
        })
        updated++
        console.log(`[${i + 1}/${watches.length}] ✓ ${w.brand} ${w.model}`)
      } else {
        failed++
        console.log(`[${i + 1}/${watches.length}] ✗ ${w.brand} ${w.model} — no image found`)
      }
    } catch (e) {
      failed++
      console.log(`[${i + 1}/${watches.length}] ✗ ${w.brand} ${w.model} — ${e.message?.slice(0, 60)}`)
    }
  }

  console.log(`\nDone: ${updated} updated, ${failed} failed, ${apiCalls} API calls`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
