import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })
dotenv.config({ path: resolve(__dirname, '../.env') })

const prisma = new PrismaClient()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const BUCKET = 'watch-images'
const CONCURRENCY = 10

// eBay OAuth
const CLIENT_ID = process.env.EBAY_CLIENT_ID
const CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET
const WRISTWATCH_CATEGORY = '31387'

let accessToken: string | null = null

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
  console.log('✓ eBay OAuth token alındı')
}

async function searchEbayImage(brand: string, model: string, reference: string | null): Promise<string | null> {
  const queries: string[] = []
  if (reference) queries.push(`${brand} ${reference}`)
  queries.push(`${brand} ${model} watch`)

  for (const q of queries) {
    const params = new URLSearchParams({
      q,
      category_ids: WRISTWATCH_CATEGORY,
      limit: '5',
      filter: 'conditionIds:{1000|1500|2000|2500|3000}',
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

    if (data.itemSummaries?.length) {
      for (const item of data.itemSummaries) {
        const imageUrl = item.image?.imageUrl
        if (!imageUrl) continue

        const hiRes = imageUrl.replace(/s-l\d+/, 's-l500')
        const titleLower = item.title.toLowerCase()
        const brandLower = brand.toLowerCase()

        if (titleLower.includes(brandLower) || titleLower.includes(brandLower.split(' ')[0])) {
          return hiRes
        }
      }
      // fallback: first result
      const first = data.itemSummaries[0]?.image?.imageUrl
      if (first) return first.replace(/s-l\d+/, 's-l500')
    }
  }
  return null
}

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('image')) return null
    const arrayBuffer = await res.arrayBuffer()
    const buf = Buffer.from(arrayBuffer)
    // skip tiny images (likely placeholders)
    if (buf.length < 5000) return null
    return buf
  } catch {
    return null
  }
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some(b => b.name === BUCKET)
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
    })
    if (error) throw new Error(`Bucket oluşturulamadı: ${error.message}`)
    console.log(`✓ "${BUCKET}" bucket oluşturuldu (public)`)
  } else {
    console.log(`✓ "${BUCKET}" bucket zaten var`)
  }
}

async function uploadToSupabase(id: string, imageBuffer: Buffer): Promise<string | null> {
  const path = `${id}.jpg`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, imageBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    })

  if (error) {
    console.error(`  Upload hatası ${id}: ${error.message}`)
    return null
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

async function processWatch(watch: { id: string; brand: string; model: string; reference: string | null }, index: number, total: number) {
  try {
    // 1. eBay'den görsel URL'i bul
    const ebayUrl = await searchEbayImage(watch.brand, watch.model, watch.reference)
    if (!ebayUrl) {
      console.log(`[${index}/${total}] ✗ ${watch.brand} ${watch.model} — eBay'de görsel bulunamadı`)
      return { success: false }
    }

    // 2. Görseli indir
    const imageBuffer = await downloadImage(ebayUrl)
    if (!imageBuffer) {
      console.log(`[${index}/${total}] ✗ ${watch.brand} ${watch.model} — indirilemedi`)
      return { success: false }
    }

    // 3. Supabase Storage'a yükle
    const publicUrl = await uploadToSupabase(watch.id, imageBuffer)
    if (!publicUrl) {
      console.log(`[${index}/${total}] ✗ ${watch.brand} ${watch.model} — upload başarısız`)
      return { success: false }
    }

    // 4. DB'yi güncelle
    await prisma.watch.update({
      where: { id: watch.id },
      data: { imageUrl: publicUrl },
    })

    console.log(`[${index}/${total}] ✓ ${watch.brand} ${watch.model}`)
    return { success: true }
  } catch (e: any) {
    console.log(`[${index}/${total}] ✗ ${watch.brand} ${watch.model} — ${e.message?.slice(0, 80)}`)
    return { success: false }
  }
}

async function runBatch<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = []
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency)
    const batchResults = await Promise.all(batch.map(fn))
    results.push(...batchResults)
    // rate limit: pause between batches
    if (i + concurrency < items.length) {
      await new Promise(r => setTimeout(r, 1500))
    }
  }
  return results
}

async function main() {
  console.log('=== Patinax Image Migration ===\n')

  // 1. Bucket oluştur
  await ensureBucket()

  // 2. eBay token al
  await getToken()

  // 3. Tüm saatleri çek
  const watches = await prisma.watch.findMany({
    select: { id: true, brand: true, model: true, reference: true },
    orderBy: [{ brand: 'asc' }, { model: 'asc' }],
  })

  console.log(`\n${watches.length} saat bulundu. Migration başlıyor (concurrency: ${CONCURRENCY})...\n`)

  let apiCalls = 0
  const total = watches.length

  const results = await runBatch(
    watches.map((w, i) => ({ ...w, index: i + 1 })),
    CONCURRENCY,
    async (w) => {
      apiCalls++
      // Refresh token every 400 calls
      if (apiCalls > 0 && apiCalls % 400 === 0) {
        await getToken()
      }
      return processWatch(w, w.index, total)
    }
  )

  const success = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length

  console.log(`\n=== Sonuç ===`)
  console.log(`✓ Başarılı: ${success}`)
  console.log(`✗ Başarısız: ${failed}`)
  console.log(`Toplam API çağrısı: ${apiCalls}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
