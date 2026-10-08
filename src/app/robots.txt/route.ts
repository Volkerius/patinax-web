import { BASE_URL } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'

  // AI training scrapers + aggressive SEO tools that we hard-block at the edge
  // via middleware. Listing them here in robots.txt is the polite second layer
  // for crawlers that still respect robots directives.
  const BLOCKED_BOTS = [
    // AI training / scraping
    'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
    'ClaudeBot', 'Claude-Web', 'anthropic-ai',
    'CCBot', 'PerplexityBot', 'Perplexity-User',
    'cohere-ai', 'Cohere-training-data',
    'Google-Extended', 'Bytespider', 'Amazonbot',
    'Applebot-Extended', 'Meta-ExternalAgent', 'Meta-ExternalFetcher',
    'FacebookBot', 'Diffbot', 'PetalBot',
    // Aggressive SEO tools
    'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot',
    'BLEXBot', 'DataForSeoBot', 'SeekportBot',
    'rogerbot', 'serpstatbot', 'MauiBot',
    // Regional crawlers we don't target
    'YandexBot', 'Baiduspider', 'Sogou spider',
  ]

  const blocks = BLOCKED_BOTS.map((b) => `User-agent: ${b}\nDisallow: /`).join('\n\n')

  const robots = isProduction
    ? `${blocks}

User-agent: *
Allow: /

Disallow: /api/
Disallow: /search?q=

Sitemap: ${BASE_URL}/sitemap.xml`
    : `User-agent: *
Disallow: /`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
}
