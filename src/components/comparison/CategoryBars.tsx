import type { RadarCategory } from '@/types/comparison'

export function CategoryBars({ categories, watchAName, watchBName }: { categories: RadarCategory[]; watchAName: string; watchBName: string }) {
  return (
    <section className="py-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">Category Breakdown</h2>
      <div className="space-y-4">
        {categories.map((cat) => {
          const total = cat.watchAScore + cat.watchBScore
          const pctA = total > 0 ? (cat.watchAScore / total) * 100 : 50
          return (
            <div key={cat.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-patina-gold font-mono">{cat.watchAScore}/10</span>
                <span className="text-sm text-patina-text2 font-medium">{cat.label}</span>
                <span className="text-xs text-patina-text3 font-mono">{cat.watchBScore}/10</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden bg-patina-bg3">
                <div
                  className="bg-patina-gold/70 transition-all duration-500"
                  style={{ width: `${pctA}%` }}
                  aria-label={`${watchAName}: ${cat.watchAScore}/10`}
                />
                <div
                  className="bg-patina-text3/30 transition-all duration-500"
                  style={{ width: `${100 - pctA}%` }}
                  aria-label={`${watchBName}: ${cat.watchBScore}/10`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
