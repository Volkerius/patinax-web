'use client'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import type { RadarCategory } from '@/types/comparison'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface RadarChartProps {
  categories: RadarCategory[]
  watchAName: string
  watchBName: string
}

export default function RadarChartComponent({ categories, watchAName, watchBName }: RadarChartProps) {
  const data = {
    labels: categories.map(c => c.label),
    datasets: [
      {
        label: watchAName,
        data: categories.map(c => c.watchAScore),
        backgroundColor: 'rgba(201, 168, 76, 0.18)',
        borderColor: 'rgba(201, 168, 76, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(201, 168, 76, 1)',
        pointBorderColor: '#0a0a0a',
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: watchBName,
        data: categories.map(c => c.watchBScore),
        backgroundColor: 'rgba(220, 220, 220, 0.08)',
        borderColor: 'rgba(220, 220, 220, 0.7)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(220, 220, 220, 0.9)',
        pointBorderColor: '#0a0a0a',
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: { display: false, stepSize: 2 },
        grid: { color: 'rgba(255,255,255,0.06)' },
        angleLines: { color: 'rgba(255,255,255,0.06)' },
        pointLabels: {
          color: '#8a8578',
          font: { size: 11, family: 'var(--font-dm-sans)' },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#8a8578',
          font: { size: 11 },
          usePointStyle: true,
          pointStyleWidth: 10,
          padding: 20,
          boxHeight: 8,
        },
      },
      tooltip: {
        backgroundColor: '#161616',
        borderColor: 'rgba(255,255,255,0.10)',
        borderWidth: 1,
        titleColor: '#f0ece4',
        bodyColor: '#8a8578',
        padding: 10,
      },
    },
  }

  return (
    <div className="mx-auto max-w-lg">
      <Radar data={data} options={options} />
    </div>
  )
}
