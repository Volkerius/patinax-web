// Clean up Wikidata seed entries: delete museum pieces / one-off auction
// pieces / sub-luxury Casios; fix style + movement on kept entries.

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// API IDs of entries to DELETE (museum pieces, one-off historical pieces,
// cheap-tier Casios that don't fit the Patinax luxury scope)
const TO_DELETE_PATTERNS = [
  // Bovet/Breguet museum + auction pieces
  'pocket watch inlaid',
  'breguet classique 9067',
  'complex watch - cnam',
  'breguet reine de naples n',
  // Sub-$200 Casios (not luxury scope)
  'edifice',           // generic line, $200-500 mostly
  'dw-6100',           // discontinued $80 G-Shock
  'q602536',           // obscure 1989 ref
  'wave ceptor',       // $50-150 line
  'dw-5600e',          // $50 G-Shock
  'databank',          // $30 calculator watch
  'ca-53w',            // $25 calculator watch
  'ae-1000w',          // $35 G-Shock-adjacent
  // Historical novelties not modern collectible models
  'fabergé nobel',     // historical jewelry piece
  'theodore roosevelt watch', // historical piece, no model line
]

// Manual fixes for KEPT entries — style + movement + description tone
const FIXES = {
  'a. lange & söhne grande complication nr. 42500': {
    style: 'dress', movement: 'Manual', priceRange: 5,
    description: `The A. Lange & Söhne Grande Complication is a high-complication wristwatch produced in extremely limited numbers since its 2013 introduction. The reference combines a perpetual calendar, minute repeater, monopusher chronograph with rattrapante, and grande and petite sonnerie striking mechanisms — over 800 components in a single hand-finished movement. The Grande Complication sits at the absolute top of Lange's catalog and represents one of the most ambitious wristwatches ever produced in Glashütte tradition.`,
  },
  'casio oceanus': {
    style: 'sport', movement: 'Quartz', priceRange: 2, brandTier: 2,
    description: `The Casio Oceanus is a Japan-domestic-market line of quartz watches positioned above standard Casio at the brand's titanium-and-sapphire premium tier. Atomic radio sync, solar charging, and titanium cases in 40mm diameters. The line targets buyers who want quartz precision and durability with finishing standards approaching Grand Seiko quartz at a fraction of the price.`,
  },
  'casio g-shock frogman': {
    style: 'diver', movement: 'Quartz', priceRange: 2, brandTier: 2, waterResistance: 200,
    description: `The Casio G-Shock Frogman is the saturation-diving variant of the G-Shock line, ISO 6425-certified for professional diving with 200m water resistance. Distinguished by its asymmetric case shape and dive-specific complications. The Frogman is the most technical sub-line in the G-Shock catalog and a serious tool watch despite the brand's accessible-tier pricing.`,
  },
  'casio g-shock mr-g mrg-b5000': {
    style: 'sport', movement: 'Quartz', priceRange: 4, brandTier: 3, waterResistance: 200,
    description: `The Casio MR-G MRG-B5000 is the flagship of the G-Shock Premium line, a fully titanium reconstruction of the original square 5000-series G-Shock with hand-finished case-back, sapphire crystal, and Bluetooth atomic time sync. Hand-assembled at Casio's Premium Production Line in Yamagata, Japan. Pricing approaches $4,000 at retail — placing it in genuine luxury territory despite its G-Shock heritage.`,
  },
  'grand seiko hi-beat': {
    style: 'sport', movement: 'Automatic', priceRange: 4, brandTier: 4, waterResistance: 100,
    description: `Grand Seiko's Hi-Beat references use the 9S85 caliber operating at 36,000 vibrations per hour (5 Hz), one of the highest beat-rate movements in series production. The smoother-sweeping seconds hand and tighter rate stability are the Hi-Beat hallmarks. Available across multiple SBGH and SBGJ references in 36-44mm cases. The Hi-Beat program represents Grand Seiko's commitment to mechanical precision rivaling the best in the industry.`,
  },
  'patek philippe henry graves supercomplication': {
    style: 'dress', movement: 'Manual', priceRange: 5, brandTier: 5,
    description: `The Patek Philippe Henry Graves Supercomplication is a unique pocket watch completed in 1933 for American banker Henry Graves Jr. Twenty-four complications including minute repeater, perpetual calendar, moon phases, sunrise/sunset times for New York, and a celestial chart of the Manhattan night sky. Held the title of most complicated watch in the world for 56 years. Sold at Sotheby's in 2014 for $24 million, the highest auction price ever paid for a watch.`,
  },
  'rolex oysterquartz': {
    style: 'dress', movement: 'Quartz', priceRange: 4, brandTier: 4, waterResistance: 100,
    description: `The Rolex Oysterquartz line was Rolex's response to the quartz crisis, produced from 1977 to 2001 in Datejust and Day-Date variants. The angular, integrated-bracelet case design departed sharply from Rolex's typical aesthetic. Movement was the in-house Caliber 5035/5055 — one of the most accurate quartz movements ever produced commercially. Now a cult-collected reference among enthusiasts who appreciate Rolex's brief mechanical-aesthetic departure.`,
  },
  'rolex land‑dweller': {
    style: 'sport', movement: 'Automatic', priceRange: 4, brandTier: 4, waterResistance: 100, year: 2025, caseDiameter: 40,
    description: `The Rolex Land-Dweller is a new 2025 reference introducing Rolex's Caliber 7135 with the new Dynapulse escapement — the brand's first major escapement innovation in decades. Available in 36mm and 40mm cases across Oystersteel, white gold, and platinum variants. The integrated bracelet design and honeycomb dial pattern give the Land-Dweller a distinct visual identity within the Professional sports collection.`,
  },
  'seiko skx007': {
    style: 'diver', movement: 'Automatic', priceRange: 1, brandTier: 2, waterResistance: 200, caseDiameter: 42,
    description: `The Seiko SKX007 is the most-recommended entry-level mechanical dive watch ever produced. ISO 6425-certified to 200m, automatic 7S26 caliber, Pepsi or black bezel variants, and the iconic case design that defined Seiko diver aesthetics for decades. Officially discontinued in 2019 but secondary-market demand keeps it the default first dive watch recommendation for new collectors. Successor SRP and SRPD lines continue the legacy.`,
  },
  'vostok amfibia': {
    style: 'diver', movement: 'Automatic', priceRange: 1, brandTier: 2, waterResistance: 200, caseDiameter: 40,
    description: `The Vostok Amphibia is a Russian dive watch in continuous production since 1967, originally designed for Soviet Navy frogmen. The case-back compresses against the case under water pressure to maintain the seal — a unique sealing mechanism that has kept the watch waterproof for nearly six decades. Vostok produces the Amphibia in dozens of dial variants from $80 to $200, making it the most affordable serious dive watch in production.`,
  },
}

function normalizeKey(brand, model) {
  return `${brand} ${model}`.toLowerCase()
}

async function main() {
  const wiki = await prisma.watch.findMany({ where: { apiId: { startsWith: 'wikidata-' } } })

  let deleted = 0
  let fixed = 0
  let unchanged = 0

  for (const w of wiki) {
    const key = normalizeKey(w.brand, w.model)
    const shouldDelete = TO_DELETE_PATTERNS.some((pat) => key.includes(pat))

    if (shouldDelete) {
      await prisma.watch.delete({ where: { id: w.id } })
      deleted++
      console.log(`  - deleted: ${w.brand} ${w.model}`)
      continue
    }

    const fix = FIXES[key]
    if (fix) {
      await prisma.watch.update({ where: { id: w.id }, data: fix })
      fixed++
      console.log(`  ~ fixed: ${w.brand} ${w.model}`)
    } else {
      unchanged++
      console.log(`  = unchanged: ${w.brand} ${w.model}`)
    }
  }

  console.log(`\n=== DONE ===`)
  console.log(`Deleted: ${deleted}`)
  console.log(`Fixed: ${fixed}`)
  console.log(`Unchanged: ${unchanged}`)

  await prisma.$disconnect()
}

main().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
