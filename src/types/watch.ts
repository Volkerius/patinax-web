export interface Watch {
  id: string
  apiId: string
  brand: string
  model: string
  reference?: string | null
  year?: number | null
  caseDiameter?: number | null
  caseThickness?: number | null
  waterResistance?: number | null
  movement?: string | null
  caliber?: string | null
  powerReserve?: number | null
  caseMaterial?: string | null
  bezelMaterial?: string | null
  crystal?: string | null
  frequency?: number | null
  jewels?: number | null
  cosc: boolean
  priceRange: number
  brandTier: number
  style: string
  imageUrl?: string | null
  slug: string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface WatchCardData {
  brand: string
  model: string
  slug: string
  imageUrl?: string | null
  priceRange: number
  caseDiameter?: number | null
  movement?: string | null
  style?: string | null
}
