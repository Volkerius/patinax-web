// Server component: generates a unique 100-160 word editorial intro for each
// comparison page from REAL attribute deltas between the two watches.
//
// Why: 2,300+ /compare/ pages sharing an identical template read as
// "low-value combinatorial content" to Google (this deindexed ~3.5k pages on
// a sister site). Interpolating real data through delta-selected sentence
// templates gives every page genuinely distinct prose.
//
// Determinism: variant choice hashes the two slugs — stable across rebuilds
// (no Math.random), but different pairs land on different phrasings.

interface IntroWatch {
  brand: string
  model: string
  slug: string
  year?: number | null
  caseDiameter?: number | null
  caseThickness?: number | null
  caseMaterial?: string | null
  movement?: string | null
  waterResistance?: number | null
  powerReserve?: number | null
  cosc?: boolean
  priceRange: number
  brandTier: number
  style: string
}

interface Props {
  watchA: IntroWatch
  watchB: IntroWatch
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0
  }
  return h
}

const STYLE_NOUN: Record<string, string> = {
  diver: 'dive watch',
  dress: 'dress watch',
  sport: 'luxury sport watch',
  chrono: 'chronograph',
  pilot: 'pilot\'s watch',
  field: 'field watch',
}

const PRICE_LABEL: Record<number, string> = {
  1: 'entry-luxury',
  2: 'accessible-luxury',
  3: 'mid-luxury',
  4: 'high-luxury',
  5: 'ultra-luxury',
}

export function ComparisonIntro({ watchA, watchB }: Props) {
  const h = hashStr(`${watchA.slug}|${watchB.slug}`)
  const pick = <T,>(arr: T[], salt: number): T => arr[(h + salt) % arr.length]

  const nameA = `${watchA.brand} ${watchA.model}`
  const nameB = `${watchB.brand} ${watchB.model}`
  const sameBrand = watchA.brand === watchB.brand
  const sameStyle = watchA.style === watchB.style
  const styleNoun = STYLE_NOUN[watchA.style] || 'luxury watch'
  const yearA = watchA.year ?? null
  const yearB = watchB.year ?? null
  const yearGap = yearA && yearB ? Math.abs(yearA - yearB) : 0
  const older = yearA && yearB ? (yearA < yearB ? watchA : watchB) : null
  const newer = yearA && yearB ? (yearA < yearB ? watchB : watchA) : null

  // ── Opener: relationship between the two references ─────────────────────
  let opener: string
  if (sameBrand && yearGap >= 10 && older && newer) {
    opener = pick([
      `Two generations of ${watchA.brand}: the ${older.model} (${older.year}) and the ${newer.model} (${newer.year}) bracket ${yearGap} years of the same house's evolution.`,
      `${watchA.brand} against itself — the ${older.model} from ${older.year} versus the ${newer.model} from ${newer.year}, ${yearGap} years apart in the same catalog.`,
    ], 1)
  } else if (sameBrand) {
    opener = pick([
      `Both of these come from ${watchA.brand}, which makes this less a brand debate and more a question of which execution suits you.`,
      `Same maison, two answers: ${watchA.brand} positions the ${watchA.model} and the ${watchB.model} differently enough that they rarely cross-shop by accident.`,
    ], 2)
  } else if (yearGap >= 20 && older && newer) {
    opener = pick([
      `The ${older.brand} ${older.model} (${older.year}) carries heritage the ${newer.brand} ${newer.model} (${newer.year}) is still accruing — ${yearGap} years separate them, and it shows in how each is built.`,
      `This is a cross-era matchup: ${older.year}'s ${older.brand} ${older.model} against ${newer.year}'s ${newer.brand} ${newer.model}. ${yearGap} years of watchmaking progress sit between them.`,
    ], 3)
  } else if (yearA && yearB && yearGap <= 3) {
    opener = pick([
      `Released within ${yearGap === 0 ? 'the same year' : `${yearGap} year${yearGap > 1 ? 's' : ''}`} of each other, the ${nameA} and ${nameB} entered the same market moment and still get shortlisted together.`,
      `The ${nameA} (${yearA}) and ${nameB} (${yearB}) are near-contemporaries — direct rivals for the same buyer at launch, and still today.`,
    ], 4)
  } else {
    opener = pick([
      `The ${nameA} and the ${nameB} — two houses, two philosophies, one shortlist.`,
      `${nameA} versus ${nameB}: different pedigrees, but they keep ending up in the same buying decision.`,
    ], 5)
  }

  // ── Middle: the sharpest concrete spec contrast ──────────────────────────
  const middles: string[] = []

  const diaA = watchA.caseDiameter, diaB = watchB.caseDiameter
  if (diaA && diaB && Math.abs(diaA - diaB) >= 2) {
    const bigger = diaA > diaB ? watchA : watchB
    const smaller = diaA > diaB ? watchB : watchA
    middles.push(
      `On the wrist the difference is immediate: the ${bigger.model} spans ${bigger.caseDiameter}mm against the ${smaller.model}'s ${smaller.caseDiameter}mm, which changes both presence and cuff clearance.`,
    )
  }

  if (watchA.movement && watchB.movement && watchA.movement !== watchB.movement) {
    middles.push(
      `Mechanically they diverge at the core — the ${watchA.model} runs a ${watchA.movement.toLowerCase()} movement while the ${watchB.model} is ${watchB.movement.toLowerCase()}, which shapes the daily ownership ritual as much as the spec sheet.`,
    )
  }

  const wrA = watchA.waterResistance ?? 0, wrB = watchB.waterResistance ?? 0
  if (wrA && wrB && Math.max(wrA, wrB) >= 2 * Math.min(wrA, wrB)) {
    const tougher = wrA > wrB ? watchA : watchB
    const other = wrA > wrB ? watchB : watchA
    middles.push(
      `The ${tougher.model}'s ${tougher.waterResistance}m water resistance more than doubles the ${other.model}'s ${other.waterResistance}m — relevant if the watch will actually see water rather than boardrooms.`,
    )
  }

  const prA = watchA.powerReserve ?? 0, prB = watchB.powerReserve ?? 0
  if (prA && prB && Math.abs(prA - prB) >= 20) {
    const longer = prA > prB ? watchA : watchB
    const shorter = prA > prB ? watchB : watchA
    middles.push(
      `Power reserve tilts clearly: ${longer.powerReserve} hours on the ${longer.model} against ${shorter.powerReserve} on the ${shorter.model} — the difference between surviving a weekend off the wrist and stopping by Sunday.`,
    )
  }

  if (watchA.caseMaterial && watchB.caseMaterial && watchA.caseMaterial !== watchB.caseMaterial) {
    middles.push(
      `Case material splits them too — ${watchA.caseMaterial.toLowerCase()} on the ${watchA.model}, ${watchB.caseMaterial.toLowerCase()} on the ${watchB.model} — which affects weight, aging, and how each wears in over the years.`,
    )
  }

  if (watchA.cosc !== watchB.cosc) {
    const certified = watchA.cosc ? watchA : watchB
    middles.push(
      `Only the ${certified.model} carries COSC chronometer certification, a tested accuracy guarantee the other skips.`,
    )
  }

  const middle = middles.length > 0
    ? pick(middles, 6)
    : sameStyle
      ? `Both play in the same ${styleNoun} territory, so the choice comes down to execution details rather than category.`
      : `They approach the brief from different categories entirely, which makes the spec table below more revealing than usual.`

  // ── Closer: price/tier positioning ───────────────────────────────────────
  const tierGap = Math.abs(watchA.priceRange - watchB.priceRange)
  let closer: string
  if (tierGap >= 2) {
    const pricier = watchA.priceRange > watchB.priceRange ? watchA : watchB
    const cheaper = watchA.priceRange > watchB.priceRange ? watchB : watchA
    closer = pick([
      `Budget separates them sharply — the ${pricier.model} sits in the ${PRICE_LABEL[pricier.priceRange]} bracket while the ${cheaper.model} is ${PRICE_LABEL[cheaper.priceRange]}, so this is as much a value question as a taste one. The full breakdown follows.`,
      `Price tiers apart (${PRICE_LABEL[cheaper.priceRange]} vs ${PRICE_LABEL[pricier.priceRange]}), the real question is whether the ${pricier.model}'s premium buys anything you'll notice. The data below answers that.`,
    ], 7)
  } else if (tierGap === 0) {
    closer = pick([
      `Priced in the same ${PRICE_LABEL[watchA.priceRange]} bracket, neither wins on cost — the verdict rides entirely on the specs and character laid out below.`,
      `With both in ${PRICE_LABEL[watchA.priceRange]} territory, money won't decide this one. The side-by-side breakdown below will.`,
    ], 8)
  } else {
    closer = `A single price tier separates them, close enough that the spec-by-spec comparison below carries the decision.`
  }

  return (
    <section className="mt-6 mb-2 max-w-3xl">
      <p className="text-sm md:text-base text-patina-text2 leading-relaxed">
        {opener} {middle} {closer}
      </p>
    </section>
  )
}
