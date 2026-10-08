import type { Watch } from '@/types/watch'

/**
 * Returns differentiated "Best For" labels for two watches.
 * Uses a ranked trait list and ensures each watch gets a unique label.
 */
function getBestForPair(watchA: Watch, watchB: Watch): [{ label: string; reason: string }, { label: string; reason: string }] {
  type Trait = { label: string; reason: string; test: (w: Watch) => boolean }

  const traits: Trait[] = [
    {
      label: 'Best for Investors',
      reason: 'Superior resale value and brand recognition make it the strongest long-term investment in luxury watches.',
      test: (w) => w.brand === 'Rolex' || w.priceRange >= 4,
    },
    {
      label: 'Best for Enthusiasts',
      reason: 'Advanced movement technology and superior technical specifications offer cutting-edge watchmaking at a compelling price point.',
      test: (w) => (w.cosc === true) || (w.powerReserve ?? 0) >= 50,
    },
    {
      label: 'Best for Active Collectors',
      reason: 'Robust build with serious water resistance and durable materials for everyday adventures.',
      test: (w) => (w.waterResistance ?? 0) >= 200,
    },
    {
      label: 'Best for Precision',
      reason: 'COSC certification and generous power reserve deliver reliable, accurate daily timekeeping.',
      test: (w) => w.cosc === true && (w.powerReserve ?? 0) >= 60,
    },
    {
      label: 'Best for Dress Occasions',
      reason: 'Refined proportions and elegant design complement formal attire perfectly.',
      test: (w) => (w.caseDiameter ?? 40) <= 40 && (w.waterResistance ?? 0) < 200,
    },
    {
      label: 'Best for Everyday Wear',
      reason: 'A versatile timepiece that transitions seamlessly between settings.',
      test: () => true,
    },
  ]

  // Find best matching trait for A
  const traitA = traits.find(t => t.test(watchA)) || traits[traits.length - 1]
  // Find best matching trait for B that differs from A
  const traitB = traits.find(t => t.test(watchB) && t.label !== traitA.label) || traits[traits.length - 1]

  return [
    { label: traitA.label, reason: traitA.reason },
    { label: traitB.label, reason: traitB.reason },
  ]
}

export function Verdict({
  watchA,
  watchB,
  similarity,
  advantagesACount,
  advantagesBCount,
}: {
  watchA: Watch
  watchB: Watch
  similarity: number
  advantagesACount: number
  advantagesBCount: number
}) {
  const nameA = `${watchA.brand} ${watchA.model}`
  const nameB = `${watchB.brand} ${watchB.model}`
  const [bestForA, bestForB] = getBestForPair(watchA, watchB)

  const getVerdict = () => {
    if (similarity >= 85) {
      return {
        headline: 'Nearly Identical Timepieces',
        text: `The ${nameA} and ${nameB} are remarkably similar watches, scoring ${similarity}% on our similarity index. Both deliver comparable specifications across the board, making this a genuine toss-up on paper. The decision ultimately comes down to brand loyalty, design language, and which watch speaks to you on the wrist. Neither choice is wrong — both represent outstanding craftsmanship in their respective collections. Consider trying both on at an authorized dealer before committing.`,
      }
    }
    if (similarity >= 65) {
      return {
        headline: 'Strong Alternatives Worth Cross-Shopping',
        text: `With a ${similarity}% similarity score, the ${nameA} and ${nameB} occupy overlapping territory in the luxury watch market. The ${watchA.brand} offers ${advantagesACount} distinct advantage${advantagesACount !== 1 ? 's' : ''} while the ${watchB.brand} counters with ${advantagesBCount} of its own. Both watches serve a similar purpose but bring distinct character and brand DNA to the table. Buyers should weigh which specific advantages matter most to their lifestyle and collection goals. These are legitimate alternatives that deserve equal consideration.`,
      }
    }
    return {
      headline: 'Different Watches, Different Purposes',
      text: `At ${similarity}% similarity, the ${nameA} and ${nameB} are designed for distinctly different wearers and occasions. Their specifications diverge meaningfully across multiple categories, suggesting these watches target different segments of the market. The ${watchA.brand} excels in areas where the ${watchB.brand} takes a different approach, and vice versa. Rather than direct competitors, think of these as complementary pieces that could coexist in a well-rounded collection. Your ideal choice depends entirely on which use case takes priority.`,
    }
  }

  const verdict = getVerdict()

  return (
    <section className="py-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">Expert Verdict</h2>
      <div className="rounded-2xl border border-patina-gold/20 bg-gradient-to-br from-patina-gold/5 to-transparent p-6 md:p-8">
        <h3 className="font-playfair text-xl md:text-2xl text-patina-gold mb-4">{verdict.headline}</h3>
        <p className="text-sm text-patina-text2 leading-relaxed mb-6">{verdict.text}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl bg-patina-gold/8 border border-patina-gold/15 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-patina-gold mb-1">{bestForA.label}</p>
            <p className="font-playfair text-sm text-patina-text font-medium">{nameA}</p>
            <p className="mt-1 text-xs text-patina-text3 leading-relaxed">{bestForA.reason}</p>
          </div>
          <div className="rounded-xl bg-white/3 border border-patina-border p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-patina-text2 mb-1">{bestForB.label}</p>
            <p className="font-playfair text-sm text-patina-text font-medium">{nameB}</p>
            <p className="mt-1 text-xs text-patina-text3 leading-relaxed">{bestForB.reason}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-patina-text3">Similarity:</span>
          <div className="flex-1 h-1.5 max-w-[200px] rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-patina-gold rounded-full transition-all duration-1000" style={{ width: `${similarity}%` }} />
          </div>
          <span className="text-xs text-patina-gold font-medium">{similarity}%</span>
        </div>
      </div>
    </section>
  )
}
