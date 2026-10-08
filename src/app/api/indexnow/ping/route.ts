import { NextResponse } from 'next/server'
import { BASE_URL } from '@/lib/seo'
import { toSlug } from '@/lib/slug'
import { submitUrls } from '@/lib/indexnow'
import { ALL_STYLES } from '@/lib/style-content'
import { ALL_TIERS } from '@/lib/tier-content'
import { ALL_MATERIALS } from '@/lib/material-content'
import { ALL_SIZES } from '@/lib/size-content'
import { ALL_MOVEMENTS } from '@/lib/movement-content'
import { TOP_CATEGORIES } from '@/lib/top-content'

export const dynamic = 'force-dynamic'

/**
 * Manually ping IndexNow with every indexable URL on the site.
 *
 * Usage: `GET /api/indexnow/ping?secret=<INDEXNOW_SECRET>`
 *
 * Set `INDEXNOW_SECRET` in the Vercel environment. Call this after large
 * content updates (e.g., new seed data, new comparisons) to notify Bing/Yandex.
 * IndexNow supports up to 10,000 URLs per batch.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')
  const expected = process.env.INDEXNOW_SECRET

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { prisma } = await import('@/lib/prisma')

  const [comparisons, watches] = await Promise.all([
    prisma.comparison.findMany({ select: { slug: true } }),
    prisma.watch.findMany({ select: { brand: true, slug: true } }),
  ])
  const brands = Array.from(new Set(watches.map((w) => toSlug(w.brand))))

  const staticUrls = [
    BASE_URL,
    `${BASE_URL}/watches`,
    `${BASE_URL}/brands`,
    `${BASE_URL}/search`,
  ]

  const hubUrls = [
    ...ALL_STYLES.map((s) => `${BASE_URL}/style/${s}`),
    ...ALL_TIERS.map((t) => `${BASE_URL}/tier/${t}`),
    ...TOP_CATEGORIES.map((c) => `${BASE_URL}/top/${c.slug}`),
    ...ALL_MATERIALS.map((m) => `${BASE_URL}/material/${m}`),
    ...ALL_SIZES.map((s) => `${BASE_URL}/size/${s}`),
    ...ALL_MOVEMENTS.map((m) => `${BASE_URL}/movement/${m}`),
  ]

  const brandUrls = brands.map((b) => `${BASE_URL}/brand/${b}`)
  const comparisonUrls = comparisons.map((c) => `${BASE_URL}/compare/${c.slug}`)
  const watchUrls = watches.map((w) => {
    const brandSlug = toSlug(w.brand)
    const modelPart = w.slug.split('-').slice(w.brand.split(/[\s.&]+/).filter(Boolean).length).join('-')
    return `${BASE_URL}/watch/${brandSlug}/${modelPart}`
  })

  const all = [...staticUrls, ...hubUrls, ...brandUrls, ...comparisonUrls, ...watchUrls]

  // IndexNow caps at 10k per request; chunk if we exceed that.
  const CHUNK_SIZE = 9500
  const chunks: string[][] = []
  for (let i = 0; i < all.length; i += CHUNK_SIZE) {
    chunks.push(all.slice(i, i + CHUNK_SIZE))
  }

  const results = []
  for (const chunk of chunks) {
    const result = await submitUrls(chunk)
    results.push(result)
  }

  const totalSubmitted = results.reduce((a, b) => a + b.submitted, 0)
  const allOk = results.every((r) => r.ok)

  return NextResponse.json({
    ok: allOk,
    totalUrls: all.length,
    submitted: totalSubmitted,
    chunks: results.length,
    results,
  })
}
