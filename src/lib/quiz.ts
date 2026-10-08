// Watch Finder Quiz — question library, options, and scoring algorithm.
// Designed so EVERY watch in the DB is rankable: even with strict answers,
// the algorithm produces a score for every watch (some near zero), so the
// long tail still surfaces as "alternatives" in the result list.

export type QuizField =
  | 'budget'
  | 'style'
  | 'movement'
  | 'material'
  | 'size'
  | 'tier'
  | 'water'
  | 'era'

export interface QuizOption {
  value: string
  label: string
  description?: string
}

export interface QuizQuestion {
  field: QuizField
  question: string
  helper: string
  options: QuizOption[]
  /** Allow "any" (no preference) — true for all questions */
  allowAny: true
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    field: 'budget',
    question: 'What\'s your budget?',
    helper: 'Pick the tier you\'re shopping in. We\'ll match watches priced near it.',
    allowAny: true,
    options: [
      { value: '1', label: 'Under $2,000', description: 'Entry luxury — Tudor, Tissot, Hamilton territory' },
      { value: '2', label: '$2,000 – $5,000', description: 'Accessible luxury — Tudor, Longines, Oris, Sinn' },
      { value: '3', label: '$5,000 – $15,000', description: 'Mid luxury — Rolex sport, Omega flagship, IWC' },
      { value: '4', label: '$15,000 – $50,000', description: 'High luxury — JLC, Vacheron, Patek base, Lange' },
      { value: '5', label: '$50,000+', description: 'Ultra luxury — F.P. Journe, Patek complications, Richard Mille' },
      { value: 'any', label: 'No budget preference', description: 'Show me everything based on style' },
    ],
  },
  {
    field: 'style',
    question: 'What kind of watch are you drawn to?',
    helper: 'Pick the design language you most want on your wrist.',
    allowAny: true,
    options: [
      { value: 'diver', label: 'Diving', description: 'Rotating bezel, water-resistant, sport DNA — Submariner, Seamaster' },
      { value: 'dress', label: 'Dress', description: 'Thin, elegant, leather strap — Calatrava, Saxonia, Reverso' },
      { value: 'sport', label: 'Modern Sport', description: 'Integrated bracelet, daily wear — Royal Oak, Nautilus, Overseas' },
      { value: 'chrono', label: 'Chronograph', description: 'Stopwatch, racing or aviation — Daytona, Speedmaster, Carrera' },
      { value: 'pilot', label: 'Pilot / Aviation', description: 'Cockpit-derived, high legibility — Big Pilot, Navitimer, Mark XX' },
      { value: 'field', label: 'Field / Tool', description: 'Rugged, utilitarian, military DNA — Khaki, Explorer, Prospex' },
      { value: 'any', label: 'No style preference', description: 'Show me a range' },
    ],
  },
  {
    field: 'movement',
    question: 'Which movement type?',
    helper: 'How the watch tells time. Most luxury watches are mechanical (auto or manual).',
    allowAny: true,
    options: [
      { value: 'Automatic', label: 'Automatic (self-winding)', description: 'The default — winds itself with wrist motion' },
      { value: 'Manual', label: 'Manual (hand-wound)', description: 'You wind it daily — thinner cases, traditional feel' },
      { value: 'Quartz', label: 'Quartz', description: 'Battery-powered, ultra-precise, no winding ritual' },
      { value: 'Spring Drive', label: 'Spring Drive', description: 'Grand Seiko\'s hybrid — smooth-sweeping seconds' },
      { value: 'any', label: 'No movement preference', description: 'Open to any' },
    ],
  },
  {
    field: 'material',
    question: 'Case material preference?',
    helper: 'The case is what touches your wrist — material affects weight, scratch resistance, and price.',
    allowAny: true,
    options: [
      { value: 'steel', label: 'Stainless Steel', description: 'The default — durable, polishable, value-retaining' },
      { value: 'gold', label: 'Gold (any colour)', description: 'Yellow, white, rose, or proprietary alloys' },
      { value: 'titanium', label: 'Titanium', description: '40% lighter than steel — best for 42mm+ cases' },
      { value: 'ceramic', label: 'Ceramic', description: 'Near-scratch-proof, lightweight, modern' },
      { value: 'bronze', label: 'Bronze', description: 'Develops a unique patina over time' },
      { value: 'platinum', label: 'Platinum', description: 'Heaviest, rarest, ultimate luxury statement' },
      { value: 'any', label: 'No material preference', description: 'Surprise me' },
    ],
  },
  {
    field: 'size',
    question: 'What case size suits you?',
    helper: 'Measure your wrist if unsure — average male is 170mm, female 150mm. 40mm fits most.',
    allowAny: true,
    options: [
      { value: 'compact', label: 'Compact (under 38mm)', description: 'Dressy, unisex, slips under any cuff' },
      { value: 'classic', label: 'Classic (38–40mm)', description: 'The universal sweet spot' },
      { value: 'modern', label: 'Modern (40–42mm)', description: 'Default modern sport size' },
      { value: 'oversized', label: 'Oversized (42mm+)', description: 'Maximum wrist presence — Panerai, Big Pilot' },
      { value: 'any', label: 'No size preference', description: 'Show me a mix' },
    ],
  },
  {
    field: 'tier',
    question: 'What kind of brand?',
    helper: 'Heritage maisons or accessible production?',
    allowAny: true,
    options: [
      { value: '5', label: 'Haute horlogerie', description: 'Patek, Lange, Vacheron, AP, F.P. Journe' },
      { value: '4', label: 'Top-tier Swiss/Japanese', description: 'Rolex, Omega, IWC, JLC, Grand Seiko' },
      { value: '3', label: 'Mid-tier respected', description: 'Tudor, Breitling, Tag Heuer, Oris, Bell & Ross' },
      { value: '2', label: 'Accessible mainstream', description: 'Hamilton, Tissot, Seiko, Christopher Ward' },
      { value: 'any', label: 'No brand-tier preference', description: 'Match purely on style' },
    ],
  },
  {
    field: 'water',
    question: 'Water resistance need?',
    helper: 'How wet might the watch get? Most luxury watches handle hand-washing fine.',
    allowAny: true,
    options: [
      { value: 'daily', label: '30m+ (daily life)', description: 'Splashes, hand-washing — fine for dress watches' },
      { value: 'swim', label: '100m+ (swimming)', description: 'Pool, beach, snorkeling' },
      { value: 'dive', label: '200m+ (diving)', description: 'ISO 6425 dive watches — Submariner, Seamaster' },
      { value: 'extreme', label: '500m+ (saturation)', description: 'Sea-Dweller, Deepsea, Ultra Deep — overengineered' },
      { value: 'any', label: 'No water resistance preference', description: 'Doesn\'t matter to me' },
    ],
  },
  {
    field: 'era',
    question: 'Modern or vintage interest?',
    helper: 'Some watches are current production, others are 1950s-80s collector pieces.',
    allowAny: true,
    options: [
      { value: 'modern', label: 'Modern only (2000+)', description: 'Current production, easier to find new' },
      { value: 'vintage', label: 'Vintage friendly (pre-1990)', description: 'Collector references, secondary market only' },
      { value: 'both', label: 'Both — show me everything', description: 'Old and new' },
      { value: 'any', label: 'No era preference', description: 'Default — both' },
    ],
  },
]

// ── Scoring ──────────────────────────────────────────────────────────────
// Each watch gets a 0-100 score. Higher = better fit. ALL watches are scored
// (no filters), so the long tail still surfaces as alternatives.

export interface QuizAnswers {
  budget?: string
  style?: string
  movement?: string
  material?: string
  size?: string
  tier?: string
  water?: string
  era?: string
}

export interface ScoredWatch {
  id: string
  brand: string
  model: string
  slug: string
  imageUrl?: string | null
  caseDiameter?: number | null
  caseMaterial?: string | null
  movement?: string | null
  style: string
  priceRange: number
  brandTier: number
  waterResistance?: number | null
  year?: number | null
  score: number
  matchReasons: string[]
}

// Material slug → DB caseMaterial value patterns (mirrors src/lib/material-content)
const MATERIAL_PATTERNS: Record<string, RegExp> = {
  steel: /(stainless steel|^steel|oystersteel|lucent steel|o-megasteel|submarine steel|esteel)/i,
  gold: /(\bgold\b|everose|sedna|goldtech)/i,
  titanium: /(titanium)/i,
  ceramic: /(ceramic|cerachrom)/i,
  bronze: /(bronze)/i,
  platinum: /(platinum)/i,
  carbon: /(carbon|carbotech)/i,
}

// Size bucket → diameter range (matches src/lib/size-content)
const SIZE_RANGES: Record<string, [number, number]> = {
  compact: [0, 38],
  classic: [38, 40],
  modern: [40, 42],
  oversized: [42, 999],
}

interface WatchInput {
  caseDiameter?: number | null
  caseMaterial?: string | null
  movement?: string | null
  style: string
  priceRange: number
  brandTier: number
  waterResistance?: number | null
  year?: number | null
}

/**
 * Score a single watch against the user's quiz answers.
 * Returns 0-100 score plus list of matched reasons (for UI).
 */
export function scoreWatch(
  watch: WatchInput,
  answers: QuizAnswers,
): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []

  // ── Budget: ±1 tier proximity, exact = full points ────────────────────────
  if (answers.budget && answers.budget !== 'any') {
    const target = parseInt(answers.budget)
    const diff = Math.abs(watch.priceRange - target)
    if (diff === 0) {
      score += 25
      reasons.push('Matches your budget')
    } else if (diff === 1) {
      score += 12
      reasons.push('Close to your budget')
    } else if (diff === 2) {
      score += 4
    }
  } else {
    score += 8 // neutral baseline so "any" doesn't penalize
  }

  // ── Style: exact match, no partial credit ─────────────────────────────────
  if (answers.style && answers.style !== 'any') {
    if (watch.style === answers.style) {
      score += 25
      reasons.push(`Matches the ${answers.style} style you picked`)
    } else {
      score += 0
    }
  } else {
    score += 8
  }

  // ── Movement: exact, partial for hybrids ──────────────────────────────────
  if (answers.movement && answers.movement !== 'any') {
    if (watch.movement === answers.movement) {
      score += 12
      reasons.push(`${answers.movement} movement as requested`)
    } else if (
      // Treat 'Manual winding' as a Manual match (DB has stray label)
      answers.movement === 'Manual' && watch.movement === 'Manual winding'
    ) {
      score += 12
      reasons.push('Manual-wind movement')
    }
  } else {
    score += 4
  }

  // ── Material: regex-based grouping ────────────────────────────────────────
  if (answers.material && answers.material !== 'any') {
    const pattern = MATERIAL_PATTERNS[answers.material]
    if (pattern && watch.caseMaterial && pattern.test(watch.caseMaterial)) {
      score += 10
      const label = answers.material.charAt(0).toUpperCase() + answers.material.slice(1)
      reasons.push(`${label} case`)
    }
  } else {
    score += 4
  }

  // ── Size: range membership ────────────────────────────────────────────────
  if (answers.size && answers.size !== 'any') {
    const range = SIZE_RANGES[answers.size]
    if (range && watch.caseDiameter && watch.caseDiameter >= range[0] && watch.caseDiameter < range[1]) {
      score += 10
      reasons.push(`${watch.caseDiameter}mm fits your size pick`)
    }
  } else {
    score += 4
  }

  // ── Tier: exact, partial for ±1 ──────────────────────────────────────────
  if (answers.tier && answers.tier !== 'any') {
    const target = parseInt(answers.tier)
    const diff = Math.abs(watch.brandTier - target)
    if (diff === 0) {
      score += 8
      reasons.push('Matches your brand tier')
    } else if (diff === 1) {
      score += 4
    }
  } else {
    score += 3
  }

  // ── Water resistance: meets minimum ──────────────────────────────────────
  if (answers.water && answers.water !== 'any') {
    const minimums: Record<string, number> = {
      daily: 30,
      swim: 100,
      dive: 200,
      extreme: 500,
    }
    const min = minimums[answers.water]
    const wr = watch.waterResistance || 0
    if (min && wr >= min) {
      score += 8
      reasons.push(`${wr}m water resistance${min === wr ? ' meets your need' : ''}`)
    }
  } else {
    score += 3
  }

  // ── Era: pre-1990 = vintage, 2000+ = modern, 1990-1999 = transitional ─────
  if (answers.era && answers.era !== 'any' && answers.era !== 'both') {
    const y = watch.year || 0
    if (answers.era === 'modern' && y >= 2000) {
      score += 5
      reasons.push('Modern era')
    } else if (answers.era === 'vintage' && y > 0 && y < 1990) {
      score += 8
      reasons.push('Vintage reference')
    }
  } else {
    score += 2
  }

  // Floor at 0 (defensive)
  score = Math.max(0, Math.round(score))
  return { score, reasons }
}

export function rankWatches<T extends WatchInput>(
  watches: T[],
  answers: QuizAnswers,
): { input: T; score: number; reasons: string[] }[] {
  return watches
    .map((w) => ({ input: w, ...scoreWatch(w, answers) }))
    .sort((a, b) => b.score - a.score)
}

/**
 * Are at least N answers actually filled (excluding "any")?
 * Quiz is "complete" when 6+ real answers — mostly to allow skipping a question or two.
 */
export function isQuizComplete(answers: QuizAnswers, minAnswers = 6): boolean {
  const realAnswers = Object.values(answers).filter((v) => v && v !== 'any').length
  return realAnswers >= minAnswers
}
