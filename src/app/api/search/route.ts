import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

const getSuggestions = unstable_cache(
  async (q: string) => {
    const { prisma } = await import('@/lib/prisma')

    const [brandMatches, otherMatches] = await Promise.all([
      prisma.watch.findMany({
        where: { brand: { startsWith: q, mode: 'insensitive' } },
        select: { brand: true, model: true, slug: true, caseDiameter: true, movement: true },
        take: 10,
        orderBy: { model: 'asc' },
      }),
      prisma.watch.findMany({
        where: {
          OR: [
            { brand: { contains: q, mode: 'insensitive' } },
            { model: { contains: q, mode: 'insensitive' } },
          ],
          NOT: { brand: { startsWith: q, mode: 'insensitive' } },
        },
        select: { brand: true, model: true, slug: true, caseDiameter: true, movement: true },
        take: 10,
        orderBy: { brand: 'asc' },
      }),
    ])
    const watches = [...brandMatches, ...otherMatches]

    const qLower = q.toLowerCase()
    const scored = watches.map((w) => {
      const brandLower = w.brand.toLowerCase()
      const modelLower = w.model.toLowerCase()
      const fullLower = `${brandLower} ${modelLower}`
      let score = 0
      if (fullLower.startsWith(qLower)) score = 100
      else if (brandLower.startsWith(qLower)) score = 90
      else if (modelLower.startsWith(qLower)) score = 80
      else if (brandLower.includes(qLower)) score = 50
      else if (modelLower.includes(qLower)) score = 40
      return { ...w, score }
    })
    scored.sort((a, b) => b.score - a.score)

    const seen = new Set<string>()
    const unique = scored.filter((w) => {
      const key = `${w.brand}|${w.model}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    return unique.slice(0, 6).map((w) => ({
      label: `${w.brand} ${w.model}`,
      brand: w.brand,
      model: w.model,
      slug: w.slug,
      detail: [w.caseDiameter ? `${w.caseDiameter}mm` : null, w.movement].filter(Boolean).join(' · '),
    }))
  },
  ['search-suggestions'],
  { revalidate: 3600, tags: ['search'] },
)

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim().toLowerCase()
  if (!q || q.length < 2) {
    return NextResponse.json([], {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
    })
  }

  const results = await getSuggestions(q)

  return NextResponse.json(results, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
