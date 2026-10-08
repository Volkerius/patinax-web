'use client'
import dynamic from 'next/dynamic'
import type { RadarCategory } from '@/types/comparison'

const RadarChart = dynamic(() => import('@/components/comparison/RadarChart'), {
  ssr: false,
  loading: () => <div className="h-64 bg-patina-bg3 animate-pulse rounded-xl" />,
})

export function RadarChartWrapper({ categories, watchAName, watchBName }: { categories: RadarCategory[]; watchAName: string; watchBName: string }) {
  return <RadarChart categories={categories} watchAName={watchAName} watchBName={watchBName} />
}
