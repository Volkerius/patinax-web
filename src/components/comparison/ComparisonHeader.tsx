import Image from 'next/image'
import { WatchIllustration } from '../ui/WatchPlaceholder'
import { StarRating } from '../ui/StarRating'
import type { Watch } from '@/types/watch'

function ScoreBadge({ score }: { score: number }) {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="absolute -top-3 -left-3 z-10">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r={radius} fill="#111" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <circle
          cx="30" cy="30" r={radius}
          fill="none"
          stroke="#c9a84c"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
          className="transition-all duration-1000"
        />
        <text x="30" y="26" textAnchor="middle" dominantBaseline="central" fill="#c9a84c" fontSize="16" fontWeight="700">
          {score}
        </text>
        <text x="30" y="40" textAnchor="middle" dominantBaseline="central" fill="rgba(201,168,76,0.6)" fontSize="8" fontWeight="500">
          pts
        </text>
      </svg>
    </div>
  )
}

function WatchHeaderCard({
  watch,
  score,
  isWinner,
  priority = false,
}: {
  watch: Watch
  score: number
  isWinner: boolean
  priority?: boolean
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-full">
        <ScoreBadge score={score} />

        <div className="relative h-36 sm:h-52 md:h-64 w-full rounded-2xl bg-patina-bg2 border border-patina-border overflow-hidden flex items-center justify-center">
          {watch.imageUrl ? (
            <div className="relative h-28 w-28 sm:h-40 sm:w-40 md:h-52 md:w-52">
              <Image
                src={watch.imageUrl}
                alt={`${watch.brand} ${watch.model}`}
                fill
                sizes="208px"
                className="object-contain"
                priority={priority}
              />
            </div>
          ) : (
            <WatchIllustration
              brand={watch.brand}
              model={watch.model}
              className="h-28 w-28 sm:h-40 sm:w-40 md:h-52 md:w-52 opacity-85"
            />
          )}

          {isWinner && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a84c] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l2.5 5.3L16 6.2l-4 3.8 1 5.5L8 12.8l-5 2.7 1-5.5L0 6.2l5.5-.9z"/></svg>
                Winner
              </span>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-widest text-patina-text2">
        {watch.brand}
      </p>
      <h2 className="mt-1 h-14 flex items-center justify-center font-playfair text-sm sm:text-lg md:text-2xl font-bold text-patina-text leading-tight text-center">
        {watch.model}
      </h2>

      <p className="text-[9px] font-medium uppercase tracking-widest text-patina-text3 mt-1">
        Price Tier
      </p>
      <div className="mt-1">
        <StarRating rating={watch.priceRange} />
      </div>
    </div>
  )
}

export function ComparisonHeader({
  watchA,
  watchB,
  similarity,
  scoreA,
  scoreB,
}: {
  watchA: Watch
  watchB: Watch
  similarity: number
  scoreA: number
  scoreB: number
}) {
  const winner = scoreA > scoreB ? 'a' : scoreB > scoreA ? 'b' : null

  return (
    <section className="py-8">
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 sm:gap-3 md:gap-6">
        <WatchHeaderCard watch={watchA} score={scoreA} isWinner={winner === 'a'} priority />

        <div className="flex flex-col items-center gap-2 pt-12 sm:pt-20 md:pt-28">
          <div className="rounded-full bg-patina-gold/10 border border-patina-gold/30 px-4 py-2">
            <span className="font-playfair text-lg font-bold text-patina-gold">VS</span>
          </div>
          <span className="text-xs text-patina-text3 whitespace-nowrap">{similarity}% similar</span>
        </div>

        <WatchHeaderCard watch={watchB} score={scoreB} isWinner={winner === 'b'} />
      </div>
    </section>
  )
}
