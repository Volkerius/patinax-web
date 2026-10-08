import type { ComparisonAdvantage } from '@/types/comparison'

interface AdvantageListProps {
  watchAName: string
  watchBName: string
  advantagesA: ComparisonAdvantage[]
  advantagesB: ComparisonAdvantage[]
}

function AdvantageCard({
  title,
  advantages,
  accent,
}: {
  title: string
  advantages: ComparisonAdvantage[]
  accent: 'gold' | 'silver'
}) {
  const borderClass = accent === 'gold' ? 'border-patina-gold/20' : 'border-patina-border'
  const titleClass = accent === 'gold' ? 'text-patina-gold' : 'text-patina-text2'

  return (
    <div className={`rounded-2xl border ${borderClass} bg-patina-bg2 p-5 md:p-6`}>
      <h3 className={`text-xs font-semibold uppercase tracking-widest ${titleClass} mb-5`}>
        {title}
      </h3>
      {advantages.length > 0 ? (
        <ul className="space-y-4">
          {advantages.map((adv, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                &#10003;
              </span>
              <div>
                <p className="text-sm font-medium text-patina-text">{adv.text}</p>
                <p className="mt-0.5 text-xs text-patina-text3">{adv.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-patina-text3 italic">No clear advantages in this comparison</p>
      )}
    </div>
  )
}

export function AdvantageList({ watchAName, watchBName, advantagesA, advantagesB }: AdvantageListProps) {
  return (
    <section className="py-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">Advantages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdvantageCard
          title={`Why ${watchAName} wins`}
          advantages={advantagesA}
          accent="gold"
        />
        <AdvantageCard
          title={`Why ${watchBName} wins`}
          advantages={advantagesB}
          accent="silver"
        />
      </div>
    </section>
  )
}
