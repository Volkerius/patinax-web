// IndexNow integration — instant URL submission to Bing, Yandex, Naver, Seznam, Yep.
// Google does NOT consume IndexNow (yet), so this is purely additive coverage for
// non-Google search engines.
//
// Setup:
// 1. Key is served at /<KEY>.txt (public/ad737bf0b77760acef28a56abe615490.txt)
// 2. Call submitUrls() with absolute URLs to notify search engines
// 3. Hit /api/indexnow/ping to push the full sitemap at once

export const INDEXNOW_KEY = 'ad737bf0b77760acef28a56abe615490'
export const INDEXNOW_HOST = 'patinax.com'

export interface IndexNowResult {
  ok: boolean
  status: number
  body?: string
  submitted: number
}

/**
 * Submit one or more URLs to IndexNow. The URLs must all be on the same host as
 * INDEXNOW_HOST. Bing acts as the shared endpoint — it propagates to Yandex,
 * Naver, Seznam, and Yep.
 */
export async function submitUrls(urls: string[]): Promise<IndexNowResult> {
  if (urls.length === 0) return { ok: true, status: 200, submitted: 0 }

  const validUrls = urls.filter((u) => u.includes(INDEXNOW_HOST))
  if (validUrls.length === 0) {
    return { ok: false, status: 400, body: 'no urls matched host', submitted: 0 }
  }

  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: validUrls,
    }),
  })

  return {
    ok: res.ok,
    status: res.status,
    body: res.ok ? undefined : await res.text().catch(() => undefined),
    submitted: validUrls.length,
  }
}
