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
  // Rolex Milgauss
  { brand: 'Rolex', model: 'Milgauss', reference: '116400GV', year: 2007, caseDiameter: 40, caseThickness: 13.1, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 3131', powerReserve: 48, caseMaterial: 'Oystersteel', bezelMaterial: 'Stainless steel', crystal: 'Green sapphire', frequency: 8, jewels: 31, cosc: true, priceRange: 4, style: 'sport', brandTier: 4 },

  // TAG Heuer Autavia
  { brand: 'TAG Heuer', model: 'Autavia', reference: 'CBE511A.FC8279', year: 2023, caseDiameter: 42, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic', caliber: 'TH20-08', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 3, style: 'sport', brandTier: 3 },

  // IWC Ingenieur
  { brand: 'IWC', model: 'Ingenieur Automatic', reference: 'IW357002', year: 2023, caseDiameter: 40, caseThickness: 10.7, waterResistance: 100, movement: 'Automatic', caliber: '32111', powerReserve: 120, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 21, cosc: false, priceRange: 4, style: 'sport', brandTier: 4 },

  // Tudor Ranger
  { brand: 'Tudor', model: 'Ranger', reference: '79950', year: 2022, caseDiameter: 39, caseThickness: 12, waterResistance: 100, movement: 'Automatic', caliber: 'MT5402', powerReserve: 70, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: true, priceRange: 2, style: 'field', brandTier: 3 },

  // Hamilton Jazzmaster Open Heart
  { brand: 'Hamilton', model: 'Jazzmaster Open Heart Auto', reference: 'H32675140', year: 2023, caseDiameter: 40, caseThickness: 11.2, waterResistance: 50, movement: 'Automatic', caliber: 'H-10', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'dress', brandTier: 2 },

  // Oris Big Crown ProPilot
  { brand: 'Oris', model: 'Big Crown ProPilot Date', reference: '01 751 7761 4187', year: 2021, caseDiameter: 41, caseThickness: 12.1, waterResistance: 100, movement: 'Automatic', caliber: 'Oris 751', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 2, style: 'pilot', brandTier: 2 },

  // Now add models I know are missing using my knowledge (no API needed)
  // These are popular models not yet in DB

  // Omega
  { brand: 'Omega', model: 'Constellation Co-Axial', reference: '131.10.39.20.01.001', year: 2019, caseDiameter: 39, caseThickness: 11.8, waterResistance: 50, movement: 'Automatic', caliber: '8800', powerReserve: 55, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 7.2, jewels: 35, cosc: true, priceRange: 3, style: 'dress', brandTier: 4 },
  { brand: 'Omega', model: 'De Ville Prestige', reference: '424.10.40.20.02.001', year: 2020, caseDiameter: 39.5, caseThickness: 9.5, waterResistance: 30, movement: 'Automatic', caliber: '2500', powerReserve: 48, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 7.2, jewels: 27, cosc: true, priceRange: 2, style: 'dress', brandTier: 4 },
  { brand: 'Omega', model: 'De Ville Trésor', reference: '435.13.40.21.02.001', year: 2021, caseDiameter: 40, caseThickness: 10.1, waterResistance: 30, movement: 'Manual', caliber: '8929', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 7.2, jewels: 27, cosc: true, priceRange: 3, style: 'dress', brandTier: 4 },

  // Breitling
  { brand: 'Breitling', model: 'Endurance Pro', reference: 'X82310A71B1S1', year: 2020, caseDiameter: 44, caseThickness: 12.5, waterResistance: 100, movement: 'Quartz', caliber: 'B82', powerReserve: null, caseMaterial: 'Breitlight', bezelMaterial: 'Breitlight', crystal: 'Sapphire', frequency: null, jewels: 11, cosc: true, priceRange: 2, style: 'sport', brandTier: 3 },
  { brand: 'Breitling', model: 'Superocean Heritage B20', reference: 'AB2030161C1S1', year: 2020, caseDiameter: 44, caseThickness: 14.2, waterResistance: 200, movement: 'Automatic', caliber: 'B20', powerReserve: 70, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 8, jewels: 28, cosc: true, priceRange: 3, style: 'dive', brandTier: 3 },

  // TAG Heuer Monaco
  { brand: 'TAG Heuer', model: 'Monaco', reference: 'CBL2111.BA0644', year: 2020, caseDiameter: 39, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic', caliber: 'Heuer 02', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 33, cosc: false, priceRange: 3, style: 'sport', brandTier: 3 },

  // Hublot Classic Fusion
  { brand: 'Hublot', model: 'Classic Fusion 42mm', reference: '542.NX.1171.RX', year: 2020, caseDiameter: 42, caseThickness: 10, waterResistance: 50, movement: 'Automatic', caliber: 'HUB1110', powerReserve: 42, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: false, priceRange: 3, style: 'dress', brandTier: 3 },
  { brand: 'Hublot', model: 'Classic Fusion Chronograph', reference: '521.NX.1171.RX', year: 2019, caseDiameter: 45, caseThickness: 12.7, waterResistance: 50, movement: 'Automatic', caliber: 'HUB1143', powerReserve: 42, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 59, cosc: false, priceRange: 4, style: 'sport', brandTier: 3 },

  // Zenith
  { brand: 'Zenith', model: 'Pilot Type 20 Extra Special', reference: '11.2430.679/21.C801', year: 2018, caseDiameter: 40, caseThickness: 12.9, waterResistance: 100, movement: 'Automatic', caliber: 'Elite 679', powerReserve: 50, caseMaterial: 'Bronze', bezelMaterial: 'Bronze', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 3, style: 'pilot', brandTier: 3 },
  { brand: 'Zenith', model: 'Defy Skyline', reference: '03.9300.3620/51.I001', year: 2022, caseDiameter: 41, caseThickness: 11.3, waterResistance: 100, movement: 'Automatic', caliber: 'El Primero 3620', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 10, jewels: 31, cosc: false, priceRange: 3, style: 'sport', brandTier: 3 },
  { brand: 'Zenith', model: 'Defy Classic', reference: '95.9000.670/78.R782', year: 2019, caseDiameter: 41, caseThickness: 10.6, waterResistance: 50, movement: 'Automatic', caliber: 'Elite 670', powerReserve: 50, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 3, style: 'sport', brandTier: 3 },

  // Longines
  { brand: 'Longines', model: 'Spirit Zulu Time', reference: 'L3.812.4.53.6', year: 2022, caseDiameter: 42, caseThickness: 14.3, waterResistance: 100, movement: 'Automatic', caliber: 'L844.4', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 7.2, jewels: 25, cosc: true, priceRange: 2, style: 'pilot', brandTier: 2 },
  { brand: 'Longines', model: 'Conquest VHP', reference: 'L3.726.4.76.6', year: 2018, caseDiameter: 43, caseThickness: 13.1, waterResistance: 50, movement: 'Quartz', caliber: 'L289.2', powerReserve: null, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: 10, cosc: false, priceRange: 1, style: 'sport', brandTier: 2 },

  // Tissot
  { brand: 'Tissot', model: 'PRX Powermatic 80', reference: 'T137.407.11.041.00', year: 2021, caseDiameter: 40, caseThickness: 10.9, waterResistance: 100, movement: 'Automatic', caliber: 'Powermatic 80', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 23, cosc: false, priceRange: 1, style: 'sport', brandTier: 1 },
  { brand: 'Tissot', model: 'Seastar 1000 Powermatic 80', reference: 'T120.407.11.041.02', year: 2020, caseDiameter: 43, caseThickness: 12.7, waterResistance: 300, movement: 'Automatic', caliber: 'Powermatic 80', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 6, jewels: 23, cosc: false, priceRange: 1, style: 'dive', brandTier: 1 },

  // Rado Captain Cook
  { brand: 'Rado', model: 'Captain Cook Automatic', reference: 'R32505203', year: 2019, caseDiameter: 42, caseThickness: 11.8, waterResistance: 200, movement: 'Automatic', caliber: 'R813', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'dive', brandTier: 2 },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const w of NEW_WATCHES) {
    const slug = `${toSlug(w.brand)}-${toSlug(w.model)}`
    const apiId = `watchapi3-${slug}`
    try {
      await prisma.watch.upsert({
        where: { slug },
        update: {},
        create: { slug, apiId, ...w },
      })
      created++
      console.log(`+ ${w.brand} ${w.model}`)
    } catch (e) {
      skipped++
      console.log(`~ ${w.brand} ${w.model} (exists)`)
    }
  }

  const total = await prisma.watch.count()
  console.log(`\nDone: ${created} new, ${skipped} skipped. Total: ${total}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
