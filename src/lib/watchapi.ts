const API_BASE = 'https://api.thewatchapi.com/v1'
const API_KEY = process.env.WATCH_API_KEY!

// Guard: never hit the live API outside of production.
// The plan allows only 25 requests/day — all dev work uses Prisma seed data.
function fetchAPI<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(
      `[watchapi] Blocked live API call in development: ${path}\n` +
      `Use Prisma seed data locally. API calls only run in production.`
    )
  }
  const qs = new URLSearchParams({ ...params, api_token: API_KEY })
  const reqUrl = `${API_BASE}${path}?${qs}`
  return fetch(reqUrl, { next: { revalidate: 86400 } })
    .then((res) => {
      if (!res.ok) throw new Error(`TheWatchAPI error ${res.status}: ${path}`)
      return res.json() as Promise<T>
    })
}

// GET /v1/brand/list
export async function getBrandList(): Promise<BrandListResponse> {
  return fetchAPI('/brand/list')
}

// GET /v1/model/list?brand=rolex
export async function getModelList(brand: string): Promise<ModelListResponse> {
  return fetchAPI('/model/list', { brand: brand.toLowerCase() })
}

// GET /v1/model/search?search=submariner&brand=Rolex
export async function searchModels(search: string, brand?: string): Promise<ModelSearchResponse> {
  const params: Record<string, string> = { search }
  if (brand) params.brand = brand
  return fetchAPI('/model/search', params)
}

// GET /v1/reference/list?brand=rolex
export async function getReferenceList(brand: string): Promise<ReferenceListResponse> {
  return fetchAPI('/reference/list', { brand: brand.toLowerCase() })
}

// ── Response types ────────────────────────────────────────────────────────────

export interface WatchModel {
  brand: string
  reference_number: string
  model: string
  movement: string
  year_of_production: string | number
  case_material: string
  case_diameter: string | number
  description: string
  last_updated: string
}

export interface BrandListResponse {
  data?: string[]
  [key: string]: unknown
}

export interface ModelListResponse {
  data?: WatchModel[]
  [key: string]: unknown
}

export interface ModelSearchResponse {
  data?: WatchModel[]
  [key: string]: unknown
}

export interface ReferenceListResponse {
  data?: WatchModel[]
  [key: string]: unknown
}
