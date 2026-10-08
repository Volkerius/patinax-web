interface WatchFeatures {
  priceRange: number      // 1-5
  caseDiameter: number    // mm
  caseThickness?: number  // mm
  waterResistance: number // m
  powerReserve: number    // hours
  movementType: string    // automatic/manual/quartz
  caseMaterial: string
  style: string           // diver/dress/sport/pilot/field/chrono
  brandTier: number       // 1-5 (entry to ultra-luxury)
  cosc?: boolean
  jewels?: number
}

function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0.5
  return Math.max(0, Math.min(1, (value - min) / (max - min)))
}

// Treat steel variants as equivalent
function normalizeMaterial(m: string): string {
  const lower = m.toLowerCase()
  if (lower.includes('steel') || lower.includes('oystersteel')) return 'steel'
  if (lower.includes('titanium')) return 'titanium'
  if (lower.includes('gold') || lower.includes('or rose')) return 'gold'
  if (lower.includes('ceramic')) return 'ceramic'
  if (lower.includes('platinum')) return 'platinum'
  return lower
}

export function calculateSimilarity(watchA: WatchFeatures, watchB: WatchFeatures): number {
  const numericScore = (
    (1 - Math.abs(normalize(watchA.priceRange, 1, 5) - normalize(watchB.priceRange, 1, 5))) * 0.20 +
    (1 - Math.abs(normalize(watchA.brandTier, 1, 5) - normalize(watchB.brandTier, 1, 5))) * 0.15 +
    (1 - Math.abs(normalize(watchA.caseDiameter, 28, 50) - normalize(watchB.caseDiameter, 28, 50))) * 0.10 +
    (1 - Math.abs(normalize(watchA.waterResistance, 30, 1000) - normalize(watchB.waterResistance, 30, 1000))) * 0.10 +
    (1 - Math.abs(normalize(watchA.powerReserve, 24, 120) - normalize(watchB.powerReserve, 24, 120))) * 0.10
  )

  const movementMatch = watchA.movementType.toLowerCase() === watchB.movementType.toLowerCase() ? 1 : 0
  const styleMatch = watchA.style === watchB.style ? 1 : 0
  const materialMatch = normalizeMaterial(watchA.caseMaterial) === normalizeMaterial(watchB.caseMaterial) ? 1 : 0

  const categoricalScore = (
    movementMatch * 0.10 +
    styleMatch * 0.15 +
    materialMatch * 0.10
  )

  return Math.round((numericScore + categoricalScore) * 100)
}

export function generateAdvantages(
  watchA: WatchFeatures & { name: string },
  watchB: WatchFeatures & { name: string }
) {
  const advantagesA: { text: string; detail: string }[] = []
  const advantagesB: { text: string; detail: string }[] = []

  // Power reserve
  if (watchA.powerReserve > watchB.powerReserve) {
    const pct = Math.round(((watchA.powerReserve - watchB.powerReserve) / watchB.powerReserve) * 100)
    advantagesA.push({ text: `${pct}% longer power reserve`, detail: `${watchA.powerReserve}h vs ${watchB.powerReserve}h` })
  } else if (watchB.powerReserve > watchA.powerReserve) {
    const pct = Math.round(((watchB.powerReserve - watchA.powerReserve) / watchA.powerReserve) * 100)
    advantagesB.push({ text: `${pct}% longer power reserve`, detail: `${watchB.powerReserve}h vs ${watchA.powerReserve}h` })
  }

  // Water resistance
  if (watchA.waterResistance > watchB.waterResistance) {
    advantagesA.push({ text: 'Greater water resistance', detail: `${watchA.waterResistance}m vs ${watchB.waterResistance}m` })
  } else if (watchB.waterResistance > watchA.waterResistance) {
    advantagesB.push({ text: 'Greater water resistance', detail: `${watchB.waterResistance}m vs ${watchA.waterResistance}m` })
  }

  // Case size (smaller = more wearable)
  if (watchA.caseDiameter < watchB.caseDiameter) {
    advantagesA.push({ text: 'More compact case', detail: `${watchA.caseDiameter}mm vs ${watchB.caseDiameter}mm` })
  } else if (watchB.caseDiameter < watchA.caseDiameter) {
    advantagesB.push({ text: 'More compact case', detail: `${watchB.caseDiameter}mm vs ${watchA.caseDiameter}mm` })
  }

  // Thickness (thinner = more elegant)
  if (watchA.caseThickness && watchB.caseThickness) {
    if (watchA.caseThickness < watchB.caseThickness - 0.5) {
      advantagesA.push({ text: 'Thinner profile', detail: `${watchA.caseThickness}mm vs ${watchB.caseThickness}mm` })
    } else if (watchB.caseThickness < watchA.caseThickness - 0.5) {
      advantagesB.push({ text: 'Thinner profile', detail: `${watchB.caseThickness}mm vs ${watchA.caseThickness}mm` })
    }
  }

  // COSC certification
  if (watchA.cosc && !watchB.cosc) {
    advantagesA.push({ text: 'COSC-certified chronometer', detail: 'Higher precision standard' })
  } else if (watchB.cosc && !watchA.cosc) {
    advantagesB.push({ text: 'COSC-certified chronometer', detail: 'Higher precision standard' })
  }

  // Jewels (more jewels = lower friction, better movement)
  if (watchA.jewels && watchB.jewels && Math.abs(watchA.jewels - watchB.jewels) >= 5) {
    if (watchA.jewels > watchB.jewels) {
      advantagesA.push({ text: 'More jewels in movement', detail: `${watchA.jewels} vs ${watchB.jewels}` })
    } else {
      advantagesB.push({ text: 'More jewels in movement', detail: `${watchB.jewels} vs ${watchA.jewels}` })
    }
  }

  return { advantagesA, advantagesB }
}
