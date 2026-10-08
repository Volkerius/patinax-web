import { BASE_URL } from '@/lib/seo'
import { toSlug } from '@/lib/slug'
import { TOP_CATEGORIES } from '@/lib/top-content'
import { ALL_STYLES } from '@/lib/style-content'
import { ALL_TIERS } from '@/lib/tier-content'
import { ALL_MATERIALS } from '@/lib/material-content'
import { ALL_SIZES } from '@/lib/size-content'
import { ALL_MOVEMENTS } from '@/lib/movement-content'
import { ALL_GUIDES } from '@/lib/guide-content'
import { ALL_GLOSSARY } from '@/lib/glossary-content'

// Cache sitemap for 24h — the underlying query aggregates ALL watches +
// comparisons + brand pairs, which is expensive to recompute per request.
export const revalidate = 86400

function comparisonPriority(viewCount: number): string {
  if (viewCount > 100) return '0.95'
  if (viewCount > 10) return '0.90'
  if (viewCount > 0) return '0.80'
  return '0.70'
}

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')

    // Quality filter for combinatorial /compare/ URLs:
    // include only comparisons with at least 1 view OR that we've curated
    // (priority pairs). This keeps Google focused on pages users actually
    // visit, reducing "Discovered - not indexed" noise from thin pages.
    const comparisons = await prisma.comparison.findMany({
      where: { viewCount: { gte: 1 } },
      select: { slug: true, updatedAt: true, viewCount: true }
    })
    const watches = await prisma.watch.findMany({
      select: { brand: true, model: true, updatedAt: true }
    })
    const brands = [...new Set(watches.map(w => toSlug(w.brand)))]

    // Query top brand pairs from comparisons for versus pages
    const topBrandPairs = await prisma.comparison.findMany({
      select: {
        watchA: { select: { brand: true } },
        watchB: { select: { brand: true } },
        viewCount: true,
      },
      orderBy: { viewCount: 'desc' },
      take: 200,
    })

    // Deduplicate brand pairs
    const brandPairSet = new Set<string>()
    const brandPairPages: { url: string; priority: string; changefreq: string }[] = []
    for (const pair of topBrandPairs) {
      const brandA = pair.watchA.brand
      const brandB = pair.watchB.brand
      if (brandA === brandB) continue
      const key = [brandA, brandB].sort().join('|')
      if (brandPairSet.has(key)) continue
      brandPairSet.add(key)
      const slugA = toSlug(brandA)
      const slugB = toSlug(brandB)
      const [first, second] = [slugA, slugB].sort()
      brandPairPages.push({
        url: `${BASE_URL}/versus/${first}-vs-${second}`,
        priority: '0.80',
        changefreq: 'weekly',
      })
    }

    const staticPages = [
      { url: BASE_URL, priority: '1.0', changefreq: 'daily' },
      { url: `${BASE_URL}/watches`, priority: '0.90', changefreq: 'daily' },
      { url: `${BASE_URL}/find-your-watch`, priority: '0.90', changefreq: 'monthly' },
      { url: `${BASE_URL}/search`, priority: '0.8', changefreq: 'weekly' },
      { url: `${BASE_URL}/brands`, priority: '0.80', changefreq: 'weekly' },
      // Trust / legal pages — required for AdSense policy & user trust
      { url: `${BASE_URL}/about`, priority: '0.4', changefreq: 'monthly' },
      { url: `${BASE_URL}/contact`, priority: '0.3', changefreq: 'yearly' },
      { url: `${BASE_URL}/privacy-policy`, priority: '0.3', changefreq: 'yearly' },
      { url: `${BASE_URL}/terms`, priority: '0.3', changefreq: 'yearly' },
    ]

    // Style pages
    const stylePages = ALL_STYLES.map(style => ({
      url: `${BASE_URL}/style/${style}`,
      priority: '0.85',
      changefreq: 'weekly',
    }))

    // Tier pages
    const tierPages = ALL_TIERS.map(tier => ({
      url: `${BASE_URL}/tier/${tier}`,
      priority: '0.85',
      changefreq: 'weekly',
    }))

    // Top list pages
    const topPages = TOP_CATEGORIES.map(cat => ({
      url: `${BASE_URL}/top/${cat.slug}`,
      priority: '0.85',
      changefreq: 'weekly',
    }))

    // Editorial guides — high priority: long-form content targeting "best X" queries
    const guidePages = [
      { url: `${BASE_URL}/guides`, priority: '0.85', changefreq: 'weekly' },
      ...ALL_GUIDES.map(g => ({
        url: `${BASE_URL}/guides/${g}`,
        priority: '0.90',
        changefreq: 'monthly',
      })),
    ]

    // Glossary — informational terms
    const glossaryPages = [
      { url: `${BASE_URL}/glossary`, priority: '0.7', changefreq: 'monthly' },
      ...ALL_GLOSSARY.map(g => ({
        url: `${BASE_URL}/glossary/${g}`,
        priority: '0.65',
        changefreq: 'monthly',
      })),
    ]

    // Material hub pages
    const materialPages = ALL_MATERIALS.map(m => ({
      url: `${BASE_URL}/material/${m}`,
      priority: '0.85',
      changefreq: 'weekly',
    }))

    // Size hub pages
    const sizePages = ALL_SIZES.map(s => ({
      url: `${BASE_URL}/size/${s}`,
      priority: '0.85',
      changefreq: 'weekly',
    }))

    // Movement hub pages
    const movementPages = ALL_MOVEMENTS.map(m => ({
      url: `${BASE_URL}/movement/${m}`,
      priority: '0.85',
      changefreq: 'weekly',
    }))

    const comparisonPages = comparisons.map(c => ({
      url: `${BASE_URL}/compare/${c.slug}`,
      priority: comparisonPriority(c.viewCount),
      changefreq: 'weekly',
      lastmod: c.updatedAt.toISOString()
    }))

    const watchPages = watches.map(w => ({
      url: `${BASE_URL}/watch/${toSlug(w.brand)}/${toSlug(w.model)}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: w.updatedAt.toISOString()
    }))

    // Group watches by brand to get latest updatedAt per brand
    const brandLastmod = new Map<string, Date>()
    for (const w of watches) {
      const slug = toSlug(w.brand)
      const existing = brandLastmod.get(slug)
      if (!existing || w.updatedAt > existing) {
        brandLastmod.set(slug, w.updatedAt)
      }
    }

    const brandPages = brands.map(b => ({
      url: `${BASE_URL}/brand/${b}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: brandLastmod.get(b)?.toISOString()
    }))

    const allPages = [
      ...staticPages,
      ...stylePages,
      ...tierPages,
      ...topPages,
      ...guidePages,
      ...glossaryPages,
      ...materialPages,
      ...sizePages,
      ...movementPages,
      ...brandPairPages,
      ...comparisonPages,
      ...watchPages,
      ...brandPages,
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
    ${(page as { lastmod?: string }).lastmod ? `<lastmod>${(page as { lastmod?: string }).lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml' }
    })
  } catch {
    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}</loc></url>
</urlset>`, { headers: { 'Content-Type': 'application/xml' } })
  }
}
