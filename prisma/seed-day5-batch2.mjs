/**
 * Day 5 batch 2: 30 more factual watches for remaining SEO-target brands.
 * Includes two brands currently absent from DB: Parmigiani Fleurier, F.P. Journe.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function toSlug(str) {
  return str.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')
}

const NEW_WATCHES = [
  // ─── Cartier (49 → more) ───
  { brand: 'Cartier', model: 'Santos Dumont Large', reference: 'WGSA0021', year: 2019, caseDiameter: 38, caseThickness: 7.3, waterResistance: 30, movement: 'Manual', caliber: 'Cal. 430 MC', powerReserve: 38, caseMaterial: 'Yellow gold', bezelMaterial: 'Yellow gold', crystal: 'Sapphire', frequency: 3, jewels: 18, cosc: false, priceRange: 4, brandTier: 4, style: 'dress' },
  { brand: 'Cartier', model: 'Tank Must', reference: 'WSTA0041', year: 2021, caseDiameter: 33.7, caseThickness: 7.45, waterResistance: 30, movement: 'Quartz', caliber: null, powerReserve: null, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null, cosc: false, priceRange: 2, brandTier: 4, style: 'dress' },
  { brand: 'Cartier', model: 'Pasha de Cartier 41mm', reference: 'WSPA0010', year: 2020, caseDiameter: 41, caseThickness: 9.55, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 1847 MC', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 23, cosc: false, priceRange: 3, brandTier: 4, style: 'sport' },
  { brand: 'Cartier', model: 'Ballon Bleu 42mm', reference: 'W69012Z4', year: 2007, caseDiameter: 42, caseThickness: 13, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 049', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25, cosc: false, priceRange: 3, brandTier: 4, style: 'dress' },
  { brand: 'Cartier', model: 'Drive de Cartier', reference: 'WSNM0004', year: 2016, caseDiameter: 40, caseThickness: 11.25, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1904-PS MC', powerReserve: 48, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: false, priceRange: 3, brandTier: 4, style: 'dress' },

  // ─── IWC (42 → more) ───
  { brand: 'IWC', model: 'Portugieser Perpetual Calendar', reference: 'IW503404', year: 2020, caseDiameter: 44.2, caseThickness: 14.9, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 52616', powerReserve: 168, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 54, cosc: false, priceRange: 5, brandTier: 4, style: 'dress' },
  { brand: 'IWC', model: 'Pilot Top Gun Chronograph', reference: 'IW389101', year: 2019, caseDiameter: 44.5, caseThickness: 16.75, waterResistance: 60, movement: 'Automatic', caliber: 'Cal. 69380', powerReserve: 46, caseMaterial: 'Ceratanium', bezelMaterial: 'Ceratanium', crystal: 'Sapphire', frequency: 4, jewels: 33, cosc: false, priceRange: 4, brandTier: 4, style: 'pilot' },
  { brand: 'IWC', model: 'Big Pilot 43', reference: 'IW329301', year: 2021, caseDiameter: 43, caseThickness: 13.6, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 82100', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25, cosc: false, priceRange: 3, brandTier: 4, style: 'pilot' },
  { brand: 'IWC', model: 'Portofino Hand-Wound Eight Days', reference: 'IW510103', year: 2015, caseDiameter: 45, caseThickness: 9.4, waterResistance: 30, movement: 'Manual', caliber: 'Cal. 59210', powerReserve: 192, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29, cosc: false, priceRange: 4, brandTier: 4, style: 'dress' },
  { brand: 'IWC', model: 'Pilot Mark XX', reference: 'IW328201', year: 2022, caseDiameter: 40, caseThickness: 10.8, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 32111', powerReserve: 120, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 21, cosc: false, priceRange: 3, brandTier: 4, style: 'pilot' },

  // ─── Vacheron Constantin ───
  { brand: 'Vacheron Constantin', model: 'Overseas Automatic', reference: '4500V/110A-B128', year: 2016, caseDiameter: 41, caseThickness: 11, waterResistance: 150, movement: 'Automatic', caliber: 'Cal. 5100', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 37, cosc: false, priceRange: 5, brandTier: 5, style: 'sport' },
  { brand: 'Vacheron Constantin', model: 'Overseas Chronograph', reference: '5500V/110A-B075', year: 2016, caseDiameter: 42.5, caseThickness: 13.7, waterResistance: 150, movement: 'Automatic', caliber: 'Cal. 5200', powerReserve: 52, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 54, cosc: false, priceRange: 5, brandTier: 5, style: 'chrono' },
  { brand: 'Vacheron Constantin', model: 'Patrimony Manual', reference: '81180/000G-9117', year: 2015, caseDiameter: 40, caseThickness: 6.79, waterResistance: 30, movement: 'Manual', caliber: 'Cal. 1400', powerReserve: 40, caseMaterial: 'White gold', bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 20, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'Vacheron Constantin', model: 'Traditionnelle Complete Calendar', reference: '4010T/000R-B344', year: 2018, caseDiameter: 41, caseThickness: 10.72, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 2460 QCL/1', powerReserve: 40, caseMaterial: 'Rose gold', bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'Vacheron Constantin', model: 'Fiftysix Automatic', reference: '4600E/000R-B441', year: 2018, caseDiameter: 40, caseThickness: 9.6, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1326', powerReserve: 48, caseMaterial: 'Rose gold', bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },

  // ─── Jaeger-LeCoultre ───
  { brand: 'Jaeger-LeCoultre', model: 'Reverso Tribute Small Seconds', reference: 'Q3978480', year: 2016, caseDiameter: 45.6, caseThickness: 9.14, waterResistance: 30, movement: 'Manual', caliber: 'Cal. 822/2', powerReserve: 45, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 19, cosc: false, priceRange: 4, brandTier: 5, style: 'dress' },
  { brand: 'Jaeger-LeCoultre', model: 'Polaris Date', reference: 'Q9068180', year: 2018, caseDiameter: 42, caseThickness: 13.92, waterResistance: 200, movement: 'Automatic', caliber: 'Cal. 899/1', powerReserve: 70, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33, cosc: false, priceRange: 4, brandTier: 5, style: 'sport' },
  { brand: 'Jaeger-LeCoultre', model: 'Master Ultra Thin Moon', reference: 'Q1368420', year: 2017, caseDiameter: 39, caseThickness: 9.9, waterResistance: 50, movement: 'Automatic', caliber: 'Cal. 925/1', powerReserve: 70, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 32, cosc: false, priceRange: 4, brandTier: 5, style: 'dress' },

  // ─── Zenith ───
  { brand: 'Zenith', model: 'Chronomaster Sport', reference: '03.3100.3600/69.M3100', year: 2021, caseDiameter: 41, caseThickness: 13.6, waterResistance: 100, movement: 'Automatic', caliber: 'El Primero 3600', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 5, jewels: 35, cosc: true, priceRange: 4, brandTier: 3, style: 'chrono' },
  { brand: 'Zenith', model: 'Defy El Primero 21', reference: '95.9000.9004/78.R582', year: 2017, caseDiameter: 44, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic', caliber: 'El Primero 9004', powerReserve: 50, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 50, jewels: 53, cosc: false, priceRange: 4, brandTier: 3, style: 'chrono' },
  { brand: 'Zenith', model: 'Chronomaster Original', reference: '03.3200.3600/69.M3200', year: 2021, caseDiameter: 38, caseThickness: 12.6, waterResistance: 50, movement: 'Automatic', caliber: 'El Primero 3600', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 35, cosc: true, priceRange: 3, brandTier: 3, style: 'chrono' },

  // ─── Panerai ───
  { brand: 'Panerai', model: 'Submersible Verde Militare', reference: 'PAM01055', year: 2020, caseDiameter: 42, caseThickness: 15, waterResistance: 300, movement: 'Automatic', caliber: 'Cal. P.900', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 23, cosc: false, priceRange: 3, brandTier: 4, style: 'diver' },
  { brand: 'Panerai', model: 'Luminor Marina 44mm', reference: 'PAM01312', year: 2018, caseDiameter: 44, caseThickness: 14.9, waterResistance: 300, movement: 'Automatic', caliber: 'Cal. P.9010', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: false, priceRange: 3, brandTier: 4, style: 'diver' },
  { brand: 'Panerai', model: 'Radiomir 1940 3 Days', reference: 'PAM00514', year: 2015, caseDiameter: 42, caseThickness: 11.3, waterResistance: 100, movement: 'Manual', caliber: 'Cal. P.3000', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 21, cosc: false, priceRange: 3, brandTier: 4, style: 'dress' },

  // ─── Parmigiani Fleurier (currently 0 in DB) ───
  { brand: 'Parmigiani Fleurier', model: 'Tonda PF Micro-Rotor', reference: 'PFC914-1020001', year: 2021, caseDiameter: 40, caseThickness: 7.8, waterResistance: 60, movement: 'Automatic', caliber: 'Cal. PF703', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Platinum', crystal: 'Sapphire', frequency: 3, jewels: 29, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'Parmigiani Fleurier', model: 'Tonda PF Automatic', reference: 'PFC905-1020002', year: 2021, caseDiameter: 40, caseThickness: 8.5, waterResistance: 60, movement: 'Automatic', caliber: 'Cal. PF770', powerReserve: 48, caseMaterial: 'Rose gold', bezelMaterial: 'Platinum', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'Parmigiani Fleurier', model: 'Tonda GT', reference: 'PFC910-1020002', year: 2019, caseDiameter: 42, caseThickness: 11.7, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. PF043', powerReserve: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: false, priceRange: 4, brandTier: 5, style: 'sport' },

  // ─── F.P. Journe (currently 0) ───
  { brand: 'F.P. Journe', model: 'Chronomètre Souverain', reference: 'CS', year: 2005, caseDiameter: 40, caseThickness: 8.6, waterResistance: 30, movement: 'Manual', caliber: 'Cal. 1304', powerReserve: 56, caseMaterial: 'Rose gold', bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 3, jewels: 20, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'F.P. Journe', model: 'Octa Automatique Lune', reference: 'OCT AUT LUNE', year: 2004, caseDiameter: 40, caseThickness: 10.9, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1300.3', powerReserve: 120, caseMaterial: 'Platinum', bezelMaterial: 'Platinum', crystal: 'Sapphire', frequency: 3, jewels: 39, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'F.P. Journe', model: 'Centigraphe Souverain', reference: 'CTS', year: 2007, caseDiameter: 40, caseThickness: 10.7, waterResistance: 30, movement: 'Manual', caliber: 'Cal. 1506', powerReserve: 80, caseMaterial: 'Rose gold', bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 3, jewels: 50, cosc: false, priceRange: 5, brandTier: 5, style: 'chrono' },
  { brand: 'F.P. Journe', model: 'Lineсsport', reference: 'LS', year: 2013, caseDiameter: 44, caseThickness: 12, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1300.3', powerReserve: 120, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 3, jewels: 39, cosc: false, priceRange: 5, brandTier: 5, style: 'sport' },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const w of NEW_WATCHES) {
    const slug = `${toSlug(w.brand)}-${toSlug(w.model)}`
    const apiId = `manual-day5-b2-${slug}`
    try {
      const existing = await prisma.watch.findUnique({ where: { slug }, select: { id: true } })
      if (existing) {
        console.log(`  ~ ${w.brand} ${w.model}`)
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
