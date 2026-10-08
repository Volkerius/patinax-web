import { Watch } from './watch'

export interface Comparison {
  id: string
  watchAId: string
  watchBId: string
  slug: string
  viewCount: number
  createdAt: string
  updatedAt: string
  watchA: Watch
  watchB: Watch
}

export interface ComparisonAdvantage {
  text: string
  detail: string
}

export interface RadarCategory {
  label: string
  watchAScore: number
  watchBScore: number
}
