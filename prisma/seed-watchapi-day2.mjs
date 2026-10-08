import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

const NEW_WATCHES = [
  // Frederique Constant
  { brand: 'Frederique Constant', model: 'Manufacture Slimline', reference: 'FC-710S4S6', year: 2017, caseDiameter: 42, caseThickness: 10.2, waterResistance: 30, movement: 'Automatic', caliber: 'FC-710', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 2, style: 'dress', brandTier: 2 },
  { brand: 'Frederique Constant', model: 'Manufacture Slimline Perpetual Calendar', reference: 'FC-775S4S6', year: 2016, caseDiameter: 42, caseThickness: 11.5, waterResistance: 30, movement: 'Automatic', caliber: 'FC-775', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 2, style: 'dress', brandTier: 2 },
  { brand: 'Frederique Constant', model: 'Manufacture Worldtimer', reference: 'FC-718WM4H6', year: 2018, caseDiameter: 42, caseThickness: 12.3, waterResistance: 50, movement: 'Automatic', caliber: 'FC-718', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 2, style: 'dress', brandTier: 2 },

  // Girard-Perregaux
  { brand: 'Girard-Perregaux', model: 'Laureato', reference: '81010-11-131-11A', year: 2016, caseDiameter: 42, caseThickness: 10.7, waterResistance: 100, movement: 'Automatic', caliber: 'GP01800-0004', powerReserve: 54, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 28, cosc: false, priceRange: 4, style: 'sport', brandTier: 4 },

  // Richard Mille
  { brand: 'Richard Mille', model: 'RM 005', reference: 'RM005', year: 2003, caseDiameter: 38, caseThickness: 13.8, waterResistance: 50, movement: 'Automatic', caliber: 'RM005', powerReserve: 50, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 28, cosc: false, priceRange: 5, style: 'sport', brandTier: 5 },
  { brand: 'Richard Mille', model: 'RM 016', reference: 'RM016', year: 2008, caseDiameter: 38, caseThickness: 9.5, waterResistance: 50, movement: 'Automatic', caliber: 'CRMA2', powerReserve: 55, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 28, cosc: false, priceRange: 5, style: 'dress', brandTier: 5 },
  { brand: 'Richard Mille', model: 'RM 029', reference: 'RM029', year: 2012, caseDiameter: 39.7, caseThickness: 12.5, waterResistance: 50, movement: 'Automatic', caliber: 'RMAA1', powerReserve: 50, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 31, cosc: false, priceRange: 5, style: 'sport', brandTier: 5 },
  { brand: 'Richard Mille', model: 'RM 030', reference: 'RM030', year: 2011, caseDiameter: 42.7, caseThickness: 15.1, waterResistance: 50, movement: 'Automatic', caliber: 'RMXP1', powerReserve: 55, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 35, cosc: false, priceRange: 5, style: 'sport', brandTier: 5 },
  { brand: 'Richard Mille', model: 'RM 037', reference: 'RM037', year: 2012, caseDiameter: 34.4, caseThickness: 12.3, waterResistance: 50, movement: 'Automatic', caliber: 'CRMA1', powerReserve: 50, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 31, cosc: false, priceRange: 5, style: 'sport', brandTier: 5 },
  { brand: 'Richard Mille', model: 'RM 055', reference: 'RM055', year: 2013, caseDiameter: 42.7, caseThickness: 13.1, waterResistance: 50, movement: 'Manual', caliber: 'RM055', powerReserve: 55, caseMaterial: 'Titanium', bezelMaterial: 'Carbon TPT', crystal: 'Sapphire', frequency: 8, jewels: 19, cosc: false, priceRange: 5, style: 'sport', brandTier: 5 },
  { brand: 'Richard Mille', model: 'RM 07-01', reference: 'RM07-01', year: 2014, caseDiameter: 31.4, caseThickness: 11.2, waterResistance: 50, movement: 'Automatic', caliber: 'CRMA2', powerReserve: 50, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 28, cosc: false, priceRange: 5, style: 'sport', brandTier: 5 },

  // Breguet (from API but checking what's missing)
  // We have 6 Breguet in DB, API has: Classique, Marine, Reine de Naples, Tradition
  // Let's check which are new

  // Chopard L.U.C (from search results)
  { brand: 'Chopard', model: 'L.U.C XPS', reference: '168558-3001', year: 2017, caseDiameter: 40, caseThickness: 7.7, waterResistance: 30, movement: 'Automatic', caliber: 'L.U.C 96.12-L', powerReserve: 65, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 29, cosc: true, priceRange: 4, style: 'dress', brandTier: 4 },
  { brand: 'Chopard', model: 'L.U.C Quattro', reference: '161926-5001', year: 2015, caseDiameter: 43, caseThickness: 11.6, waterResistance: 30, movement: 'Manual', caliber: 'L.U.C 98.01-L', powerReserve: 216, caseMaterial: '18k Rose Gold', bezelMaterial: '18k Rose Gold', crystal: 'Sapphire', frequency: 8, jewels: 36, cosc: true, priceRange: 5, style: 'dress', brandTier: 4 },

  // Franck Muller Vanguard (from search)
  { brand: 'Franck Muller', model: 'Vanguard', reference: 'V45SCDT', year: 2016, caseDiameter: 44, caseThickness: 14.2, waterResistance: 30, movement: 'Automatic', caliber: 'FM 0800', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: false, priceRange: 3, style: 'dress', brandTier: 3 },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const w of NEW_WATCHES) {
    const slug = `${toSlug(w.brand)}-${toSlug(w.model)}`
    const apiId = `watchapi2-${slug}`
    try {
      await prisma.watch.upsert({
        where: { slug },
        update: {},
        create: { slug, apiId, ...w },
      })
      created++
      console.log(`+ ${w.brand} ${w.model}`)
    } catch (e) {
      console.error(`Skip ${w.brand} ${w.model}: ${e.message.slice(0, 80)}`)
      skipped++
    }
  }

  const total = await prisma.watch.count()
  console.log(`\nDone: ${created} created, ${skipped} skipped. Total watches: ${total}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
