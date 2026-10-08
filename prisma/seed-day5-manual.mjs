/**
 * Day 5 manual seed: hand-authored watches for underrepresented SEO-target
 * brands where the WatchAPI returned nothing usable.
 *
 * No imageUrl — the WatchImage client component renders the SVG illustration
 * fallback automatically. No Supabase storage touched.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function toSlug(str) {
  return str.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')
}

const NEW_WATCHES = [
  // ─── Bulgari (currently 6 models) ───
  { brand: 'Bulgari', model: 'Octo Finissimo Automatic', reference: '102912', year: 2017, caseDiameter: 40, caseThickness: 5.15, waterResistance: 30, movement: 'Automatic', caliber: 'BVL 138', powerReserve: 60, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 3, jewels: 36, cosc: false, priceRange: 4, brandTier: 4, style: 'sport' },
  { brand: 'Bulgari', model: 'Octo Finissimo Chronograph GMT', reference: '103467', year: 2019, caseDiameter: 42, caseThickness: 6.9, waterResistance: 30, movement: 'Automatic', caliber: 'BVL 318', powerReserve: 55, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 37, cosc: false, priceRange: 4, brandTier: 4, style: 'chrono' },
  { brand: 'Bulgari', model: 'Octo Roma', reference: '102779', year: 2017, caseDiameter: 41, caseThickness: 10.85, waterResistance: 100, movement: 'Automatic', caliber: 'BVL 191', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25, cosc: false, priceRange: 3, brandTier: 4, style: 'sport' },
  { brand: 'Bulgari', model: 'Serpenti Tubogas', reference: '101910', year: 2019, caseDiameter: 35, caseThickness: null, waterResistance: 30, movement: 'Quartz', caliber: 'B033', powerReserve: null, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null, cosc: false, priceRange: 4, brandTier: 4, style: 'dress' },
  { brand: 'Bulgari', model: 'Lvcea', reference: '102568', year: 2014, caseDiameter: 33, caseThickness: null, waterResistance: 30, movement: 'Automatic', caliber: 'BVL 191', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25, cosc: false, priceRange: 3, brandTier: 4, style: 'dress' },
  { brand: 'Bulgari', model: 'Aluminium Chronograph', reference: '103868', year: 2020, caseDiameter: 40, caseThickness: 12.4, waterResistance: 100, movement: 'Automatic', caliber: 'B130', powerReserve: 42, caseMaterial: 'Aluminum', bezelMaterial: 'Rubber', crystal: 'Sapphire', frequency: 4, jewels: null, cosc: false, priceRange: 3, brandTier: 4, style: 'chrono' },

  // ─── Ulysse Nardin (currently 5 models) ───
  { brand: 'Ulysse Nardin', model: 'Freak X', reference: '2303-270', year: 2019, caseDiameter: 43, caseThickness: 13.4, waterResistance: 50, movement: 'Automatic', caliber: 'UN-230', powerReserve: 72, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 3, jewels: null, cosc: false, priceRange: 5, brandTier: 4, style: 'sport' },
  { brand: 'Ulysse Nardin', model: 'Freak Out', reference: '2053-132', year: 2017, caseDiameter: 45, caseThickness: 13.95, waterResistance: 30, movement: 'Automatic', caliber: 'UN-205', powerReserve: 168, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: null, cosc: false, priceRange: 5, brandTier: 4, style: 'sport' },
  { brand: 'Ulysse Nardin', model: 'Blast Tourbillon', reference: '1725-400', year: 2020, caseDiameter: 45, caseThickness: 14, waterResistance: 50, movement: 'Automatic', caliber: 'UN-172', powerReserve: 72, caseMaterial: 'Titanium', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: null, cosc: false, priceRange: 5, brandTier: 4, style: 'sport' },
  { brand: 'Ulysse Nardin', model: 'Marine Torpilleur', reference: '1183-320', year: 2017, caseDiameter: 42, caseThickness: 11.65, waterResistance: 50, movement: 'Automatic', caliber: 'UN-118', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 50, cosc: true, priceRange: 4, brandTier: 4, style: 'dress' },
  { brand: 'Ulysse Nardin', model: 'Executive Dual Time', reference: '243-00', year: 2015, caseDiameter: 43, caseThickness: 12.3, waterResistance: 100, movement: 'Automatic', caliber: 'UN-24', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 39, cosc: false, priceRange: 4, brandTier: 4, style: 'sport' },

  // ─── Montblanc (currently 9 models) ───
  { brand: 'Montblanc', model: '1858 Geosphere', reference: '119286', year: 2018, caseDiameter: 42, caseThickness: 12.7, waterResistance: 100, movement: 'Automatic', caliber: 'MB 29.25', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26, cosc: false, priceRange: 3, brandTier: 3, style: 'pilot' },
  { brand: 'Montblanc', model: 'Heritage Monopusher Chronograph', reference: '119948', year: 2020, caseDiameter: 42, caseThickness: 12.65, waterResistance: 50, movement: 'Automatic', caliber: 'MB M13.21', powerReserve: 50, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 32, cosc: false, priceRange: 4, brandTier: 3, style: 'chrono' },
  { brand: 'Montblanc', model: 'Star Legacy Nicolas Rieussec Chronograph', reference: '128673', year: 2021, caseDiameter: 43, caseThickness: 14.9, waterResistance: 30, movement: 'Automatic', caliber: 'MB R200', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 40, cosc: false, priceRange: 4, brandTier: 3, style: 'chrono' },
  { brand: 'Montblanc', model: '1858 Automatic', reference: '117833', year: 2018, caseDiameter: 40, caseThickness: 10.2, waterResistance: 100, movement: 'Automatic', caliber: 'MB 24.15', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26, cosc: false, priceRange: 2, brandTier: 3, style: 'field' },

  // ─── H. Moser & Cie (currently 5 models) ───
  { brand: 'H. Moser & Cie', model: 'Endeavour Perpetual Calendar', reference: '1341-0200', year: 2020, caseDiameter: 40.8, caseThickness: 11.2, waterResistance: 30, movement: 'Automatic', caliber: 'HMC 800', powerReserve: 168, caseMaterial: 'White gold', bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 2.5, jewels: 32, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'H. Moser & Cie', model: 'Streamliner Flyback Chronograph', reference: '6902-1200', year: 2020, caseDiameter: 42.3, caseThickness: 14.2, waterResistance: 120, movement: 'Automatic', caliber: 'HMC 902', powerReserve: 54, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: null, cosc: false, priceRange: 5, brandTier: 5, style: 'sport' },
  { brand: 'H. Moser & Cie', model: 'Pioneer Centre Seconds', reference: '3200-1200', year: 2018, caseDiameter: 42.8, caseThickness: 11.2, waterResistance: 120, movement: 'Automatic', caliber: 'HMC 200', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: false, priceRange: 4, brandTier: 5, style: 'sport' },
  { brand: 'H. Moser & Cie', model: 'Venturer Small Seconds', reference: '2327-0207', year: 2019, caseDiameter: 39, caseThickness: 9.3, waterResistance: 30, movement: 'Manual', caliber: 'HMC 327', powerReserve: 72, caseMaterial: 'White gold', bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 2.5, jewels: 27, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },

  // ─── Richard Mille (currently 13 models) ───
  { brand: 'Richard Mille', model: 'RM 011 Flyback Chronograph', reference: 'RM011', year: 2007, caseDiameter: 50, caseThickness: 16.15, waterResistance: 50, movement: 'Automatic', caliber: 'RMAC1', powerReserve: 55, caseMaterial: 'Carbon TPT', bezelMaterial: 'Carbon TPT', crystal: 'Sapphire', frequency: 4, jewels: null, cosc: false, priceRange: 5, brandTier: 5, style: 'chrono' },
  { brand: 'Richard Mille', model: 'RM 035 Rafael Nadal', reference: 'RM035', year: 2012, caseDiameter: 50, caseThickness: 12.92, waterResistance: 50, movement: 'Manual', caliber: 'RMUL2', powerReserve: 55, caseMaterial: 'Magnesium-aluminum alloy', bezelMaterial: 'Magnesium-aluminum alloy', crystal: 'Sapphire', frequency: 4, jewels: 20, cosc: false, priceRange: 5, brandTier: 5, style: 'sport' },
  { brand: 'Richard Mille', model: 'RM 50-03 McLaren F1', reference: 'RM50-03', year: 2017, caseDiameter: 44.5, caseThickness: 16.1, waterResistance: 30, movement: 'Manual', caliber: 'RM50-03', powerReserve: 70, caseMaterial: 'Graphene-carbon TPT', bezelMaterial: 'Graphene-carbon TPT', crystal: 'Sapphire', frequency: 3, jewels: null, cosc: false, priceRange: 5, brandTier: 5, style: 'sport' },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const w of NEW_WATCHES) {
    const slug = `${toSlug(w.brand)}-${toSlug(w.model)}`
    const apiId = `manual-day5-${slug}`
    try {
      const existing = await prisma.watch.findUnique({ where: { slug }, select: { id: true } })
      if (existing) {
        console.log(`  ~ ${w.brand} ${w.model} (already in DB)`)
        skipped++
        continue
      }
      await prisma.watch.create({
        data: { ...w, slug, apiId, imageUrl: null },
      })
      console.log(`  ✓ ${w.brand} ${w.model}`)
      created++
    } catch (e) {
      console.log(`  ✗ ${w.brand} ${w.model}: ${e.message.slice(0, 80)}`)
      skipped++
    }
  }

  const total = await prisma.watch.count()
  console.log(`\n=== DONE ===`)
  console.log(`Added: ${created}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Total watches in DB: ${total}`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1) })
