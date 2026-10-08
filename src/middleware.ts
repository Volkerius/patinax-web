import { NextRequest, NextResponse } from 'next/server'

// ── Bad-bot UA list ──────────────────────────────────────────────────────────
// Hard-blocked at the edge. Includes AI training scrapers and aggressive SEO
// tools that hammer combinatorial URLs and burn Vercel function quota.
const BLOCKED_BOT_PATTERNS = [
  // AI training / scraping bots
  'gptbot', 'chatgpt-user', 'oai-searchbot',
  'claudebot', 'claude-web', 'anthropic-ai',
  'ccbot', 'perplexitybot', 'perplexity-user',
  'cohere-ai', 'cohere-training-data',
  'google-extended', 'bytespider', 'amazonbot',
  'applebot-extended', 'meta-externalagent', 'meta-externalfetcher',
  'facebookbot', 'diffbot', 'petalbot',
  // SEO tool scrapers
  'ahrefsbot', 'ahrefssiteaudit', 'semrushbot',
  'mj12bot', 'dotbot', 'blexbot',
  'seekportbot', 'dataforseobot', 'rogerbot',
  'serpstatbot', 'mauibot',
  // Regional crawlers we don't target
  'yandexbot', 'baiduspider', 'sogou', 'exabot',
]

// ── Search-engine UA whitelist ───────────────────────────────────────────────
// Exempt from rate limit. AdSense policy explicitly forbids blocking
// Mediapartners-Google, so it's whitelisted alongside Googlebot.
const SEARCH_ENGINE_PATTERNS = [
  // Google family
  'googlebot', 'mediapartners-google', 'adsbot-google',
  'google-inspectiontool', 'googleother', 'google favicon',
  // Other major search engines
  'bingbot', 'duckduckbot', 'applebot',
  // Social preview crawlers (link unfurling)
  'facebookexternalhit', 'twitterbot', 'linkedinbot',
  'slackbot', 'telegrambot', 'whatsapp', 'discordbot',
  'skypeuripreview',
]

// ── Per-IP rate limit for combinatorial /compare/ routes ─────────────────────
// In-memory sliding window. The patinax DB has ~900 comparison pages so
// scrapers can fan out fast — 30 req/min per IP is generous for humans.
const COMPARE_RATE_LIMIT = 30
const RATE_WINDOW_MS = 60_000
const compareRequests = new Map<string, number[]>()

function getClientIP(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

function isSearchEngine(ua: string): boolean {
  return SEARCH_ENGINE_PATTERNS.some((p) => ua.includes(p))
}

function isWithinCompareLimit(ip: string): boolean {
  const now = Date.now()
  const records = compareRequests.get(ip) || []
  const recent = records.filter((t) => now - t < RATE_WINDOW_MS)

  if (recent.length >= COMPARE_RATE_LIMIT) {
    compareRequests.set(ip, recent)
    return false
  }

  recent.push(now)
  compareRequests.set(ip, recent)

  // Periodic GC so the map doesn't grow unbounded under attack
  if (compareRequests.size > 5000) {
    Array.from(compareRequests.entries()).forEach(([k, v]) => {
      const stillRecent = v.filter((t: number) => now - t < RATE_WINDOW_MS)
      if (stillRecent.length === 0) compareRequests.delete(k)
      else compareRequests.set(k, stillRecent)
    })
  }
  return true
}

export function middleware(request: NextRequest) {
  const ua = (request.headers.get('user-agent') || '').toLowerCase()

  // 1. Hard-block bad bots at the edge
  if (ua && BLOCKED_BOT_PATTERNS.some((p) => ua.includes(p))) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'Cache-Control': 'public, max-age=86400' },
    })
  }

  // 2. Rate-limit combinatorial /compare/ and /versus/ routes for non-search-engine UAs.
  // These are the routes scrapers love because their URL space is O(N²).
  const path = request.nextUrl.pathname
  const isCombinatorial = path.startsWith('/compare/') || path.startsWith('/versus/')
  if (isCombinatorial && !isSearchEngine(ua)) {
    const ip = getClientIP(request)
    if (!isWithinCompareLimit(ip)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude static assets, API routes, and public files
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|txt|xml|js|css|woff|woff2|ttf)$).*)',
  ],
}
