/**
 * Day 5 batch: ~50 hand-authored watches covering the highest-SEO-value gaps.
 * No imageUrl — WatchImage falls back to the SVG illustration.
 *
 * Split:
 *   Big brands (Rolex, Omega, Tudor) — popular missing models
 *   Niche curated brands (Piaget, Bulgari, UN, Moser, GO, Blancpain, Chopard) — depth
 *   Mid-tier (Grand Seiko, Nomos, Oris, Hamilton, Seiko) — long-tail SEO
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function toSlug(str) {
  return str.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')
}

const NEW_WATCHES = [
  // ══════════════════════════════════════════════════════════════════
  // BIG BRANDS — popular missing references
  // ══════════════════════════════════════════════════════════════════

  // Rolex
  { brand: 'Rolex', model: 'GMT-Master II Pepsi', reference: '126710BLRO', year: 2018, caseDiameter: 40, caseThickness: 12, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 3285', powerReserve: 70, caseMaterial: 'Oystersteel', bezelMaterial: 'Cerachrom', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: true, priceRange: 4, brandTier: 4, style: 'sport' },
  { brand: 'Rolex', model: 'GMT-Master II Batman', reference: '126710BLNR', year: 2019, caseDiameter: 40, caseThickness: 12, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 3285', powerReserve: 70, caseMaterial: 'Oystersteel', bezelMaterial: 'Cerachrom', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: true, priceRange: 4, brandTier: 4, style: 'sport' },
  { brand: 'Rolex', model: 'GMT-Master II Sprite', reference: '126720VTNR', year: 2022, caseDiameter: 40, caseThickness: 12, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 3285', powerReserve: 70, caseMaterial: 'Oystersteel', bezelMaterial: 'Cerachrom', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: true, priceRange: 4, brandTier: 4, style: 'sport' },
  { brand: 'Rolex', model: 'Explorer II 42mm', reference: '226570', year: 2021, caseDiameter: 42, caseThickness: 12.5, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 3285', powerReserve: 70, caseMaterial: 'Oystersteel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: true, priceRange: 4, brandTier: 4, style: 'sport' },
  { brand: 'Rolex', model: 'Oyster Perpetual 41', reference: '124300', year: 2020, caseDiameter: 41, caseThickness: 11.8, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 3230', powerReserve: 70, caseMaterial: 'Oystersteel', bezelMaterial: 'Oystersteel', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: true, priceRange: 3, brandTier: 4, style: 'sport' },
  { brand: 'Rolex', model: 'Datejust 36 Wimbledon', reference: '126234', year: 2018, caseDiameter: 36, caseThickness: 11.9, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 3235', powerReserve: 70, caseMaterial: 'Oystersteel', bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: true, priceRange: 3, brandTier: 4, style: 'dress' },
  { brand: 'Rolex', model: 'Cellini Time', reference: '50509', year: 2014, caseDiameter: 39, caseThickness: 9.5, waterResistance: 50, movement: 'Automatic', caliber: 'Cal. 3132', powerReserve: 48, caseMaterial: 'White gold', bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: true, priceRange: 4, brandTier: 4, style: 'dress' },

  // Omega
  { brand: 'Omega', model: 'Seamaster Aqua Terra 150M', reference: '220.10.41.21.03.001', year: 2017, caseDiameter: 41, caseThickness: 13.2, waterResistance: 150, movement: 'Automatic', caliber: 'Cal. 8900', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 39, cosc: true, priceRange: 3, brandTier: 4, style: 'sport' },
  { brand: 'Omega', model: 'Speedmaster Dark Side of the Moon', reference: '311.92.44.51.01.007', year: 2013, caseDiameter: 44.25, caseThickness: 16, waterResistance: 50, movement: 'Automatic', caliber: 'Cal. 9300', powerReserve: 60, caseMaterial: 'Ceramic', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 54, cosc: true, priceRange: 4, brandTier: 4, style: 'chrono' },
  { brand: 'Omega', model: 'Constellation Globemaster', reference: '130.33.41.22.02.001', year: 2015, caseDiameter: 39, caseThickness: 12.5, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 8900', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 39, cosc: true, priceRange: 3, brandTier: 4, style: 'dress' },
  { brand: 'Omega', model: 'Seamaster Planet Ocean GMT', reference: '215.30.44.22.01.001', year: 2016, caseDiameter: 43.5, caseThickness: 17.25, waterResistance: 600, movement: 'Automatic', caliber: 'Cal. 8906', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 39, cosc: true, priceRange: 3, brandTier: 4, style: 'diver' },
  { brand: 'Omega', model: 'De Ville Hour Vision', reference: '433.10.41.21.06.001', year: 2017, caseDiameter: 41, caseThickness: 12.9, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 8900', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 39, cosc: true, priceRange: 3, brandTier: 4, style: 'dress' },

  // Tudor
  { brand: 'Tudor', model: 'Black Bay Bronze', reference: '79250BA', year: 2016, caseDiameter: 43, caseThickness: 14.8, waterResistance: 200, movement: 'Automatic', caliber: 'MT5601', powerReserve: 70, caseMaterial: 'Bronze', bezelMaterial: 'Bronze', crystal: 'Sapphire', frequency: 4, jewels: 26, cosc: true, priceRange: 2, brandTier: 3, style: 'diver' },
  { brand: 'Tudor', model: 'Black Bay Pro', reference: 'M79470-0001', year: 2022, caseDiameter: 39, caseThickness: 14.6, waterResistance: 200, movement: 'Automatic', caliber: 'MT5652', powerReserve: 70, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 28, cosc: true, priceRange: 2, brandTier: 3, style: 'sport' },
  { brand: 'Tudor', model: 'Black Bay Ceramic', reference: 'M79210CNU-0001', year: 2021, caseDiameter: 41, caseThickness: 14.4, waterResistance: 200, movement: 'Automatic', caliber: 'MT5602-1U', powerReserve: 70, caseMaterial: 'Ceramic', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: true, priceRange: 2, brandTier: 3, style: 'diver' },
  { brand: 'Tudor', model: 'Royal 41', reference: 'M28600-0005', year: 2020, caseDiameter: 41, caseThickness: 11.6, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 2824', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25, cosc: false, priceRange: 2, brandTier: 3, style: 'sport' },
  { brand: 'Tudor', model: '1926 41mm', reference: 'M91650-0001', year: 2018, caseDiameter: 41, caseThickness: 10.7, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 2824', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25, cosc: false, priceRange: 1, brandTier: 3, style: 'dress' },

  // ══════════════════════════════════════════════════════════════════
  // NICHE CURATED BRANDS — depth for curated-intro SEO targets
  // ══════════════════════════════════════════════════════════════════

  // Piaget
  { brand: 'Piaget', model: 'Altiplano Ultimate Concept', reference: 'G0A45501', year: 2020, caseDiameter: 41, caseThickness: 2, waterResistance: 20, movement: 'Manual', caliber: 'Cal. 900P-UC', powerReserve: 44, caseMaterial: 'Cobalt alloy', bezelMaterial: 'Cobalt alloy', crystal: 'Sapphire', frequency: 4, jewels: 21, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'Piaget', model: 'Polo Skeleton', reference: 'G0A45001', year: 2021, caseDiameter: 42, caseThickness: 6.5, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1200S1', powerReserve: 44, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 27, cosc: false, priceRange: 5, brandTier: 5, style: 'sport' },
  { brand: 'Piaget', model: 'Polo Perpetual Calendar Ultra-Thin', reference: 'G0A45001', year: 2022, caseDiameter: 42, caseThickness: 8.65, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1255P', powerReserve: 50, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: null, cosc: false, priceRange: 5, brandTier: 5, style: 'sport' },
  { brand: 'Piaget', model: 'Limelight Gala', reference: 'G0A41160', year: 2018, caseDiameter: 32, caseThickness: null, waterResistance: 30, movement: 'Quartz', caliber: 'Cal. 56P', powerReserve: null, caseMaterial: 'Rose gold', bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: null, jewels: null, cosc: false, priceRange: 4, brandTier: 5, style: 'dress' },

  // Ulysse Nardin
  { brand: 'Ulysse Nardin', model: 'Diver Lemon Shark', reference: '1183-170LE', year: 2021, caseDiameter: 44, caseThickness: 14.2, waterResistance: 300, movement: 'Automatic', caliber: 'UN-118', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 50, cosc: false, priceRange: 4, brandTier: 4, style: 'diver' },
  { brand: 'Ulysse Nardin', model: 'Classico Manufacture', reference: '3203-136-2', year: 2014, caseDiameter: 40, caseThickness: 10.7, waterResistance: 50, movement: 'Automatic', caliber: 'UN-320', powerReserve: 48, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 30, cosc: false, priceRange: 3, brandTier: 4, style: 'dress' },

  // H. Moser & Cie
  { brand: 'H. Moser & Cie', model: 'Endeavour Funky Blue', reference: '1341-0215', year: 2017, caseDiameter: 40.8, caseThickness: 11.2, waterResistance: 30, movement: 'Automatic', caliber: 'HMC 800', powerReserve: 168, caseMaterial: 'White gold', bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 2.5, jewels: 32, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'H. Moser & Cie', model: 'Streamliner Centre Seconds', reference: '6201-1200', year: 2021, caseDiameter: 40, caseThickness: 10.8, waterResistance: 120, movement: 'Automatic', caliber: 'HMC 200', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: false, priceRange: 4, brandTier: 5, style: 'sport' },

  // Glashütte Original
  { brand: 'Glashütte Original', model: 'Senator Chronometer', reference: '1-58-01-02-04-04', year: 2017, caseDiameter: 42, caseThickness: 13.45, waterResistance: 50, movement: 'Automatic', caliber: 'Cal. 58-01', powerReserve: 44, caseMaterial: 'White gold', bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 34, cosc: false, priceRange: 4, brandTier: 4, style: 'dress' },
  { brand: 'Glashütte Original', model: 'PanoReserve', reference: '1-65-01-22-12-61', year: 2018, caseDiameter: 40, caseThickness: 12.4, waterResistance: 50, movement: 'Manual', caliber: 'Cal. 65-01', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 54, cosc: false, priceRange: 3, brandTier: 4, style: 'dress' },
  { brand: 'Glashütte Original', model: 'SeaQ 1969', reference: '1-39-11-09-80-33', year: 2020, caseDiameter: 39.5, caseThickness: 12.15, waterResistance: 200, movement: 'Automatic', caliber: 'Cal. 39-11', powerReserve: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26, cosc: false, priceRange: 3, brandTier: 4, style: 'diver' },

  // Blancpain
  { brand: 'Blancpain', model: 'Fifty Fathoms Bathyscaphe Chronograph Flyback', reference: '5200-0130-B52A', year: 2017, caseDiameter: 43.6, caseThickness: 15.25, waterResistance: 300, movement: 'Automatic', caliber: 'Cal. F385', powerReserve: 50, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 5, jewels: 37, cosc: false, priceRange: 4, brandTier: 5, style: 'chrono' },
  { brand: 'Blancpain', model: 'Villeret Ultra Slim', reference: '6606-1127-55B', year: 2016, caseDiameter: 40, caseThickness: 9.3, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1151', powerReserve: 100, caseMaterial: 'Red gold', bezelMaterial: 'Red gold', crystal: 'Sapphire', frequency: 3, jewels: 35, cosc: false, priceRange: 5, brandTier: 5, style: 'dress' },
  { brand: 'Blancpain', model: 'Air Command', reference: 'AC02-12B40-63B', year: 2022, caseDiameter: 42.5, caseThickness: 15.7, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. F388B', powerReserve: 50, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 37, cosc: false, priceRange: 4, brandTier: 5, style: 'pilot' },

  // Chopard
  { brand: 'Chopard', model: 'Alpine Eagle 41', reference: '298600-3001', year: 2019, caseDiameter: 41, caseThickness: 9.75, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 01.01-C', powerReserve: 60, caseMaterial: 'Lucent Steel A223', bezelMaterial: 'Lucent Steel A223', crystal: 'Sapphire', frequency: 4, jewels: 31, cosc: true, priceRange: 4, brandTier: 4, style: 'sport' },
  { brand: 'Chopard', model: 'L.U.C XPS 1860', reference: '161946-1001', year: 2018, caseDiameter: 40, caseThickness: 7.2, waterResistance: 30, movement: 'Automatic', caliber: 'L.U.C 96.01-L', powerReserve: 65, caseMaterial: 'Rose gold', bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 4, jewels: 29, cosc: true, priceRange: 4, brandTier: 4, style: 'dress' },
  { brand: 'Chopard', model: 'Mille Miglia GTS Chronograph', reference: '158570-3001', year: 2017, caseDiameter: 44, caseThickness: 14.77, waterResistance: 50, movement: 'Automatic', caliber: 'Cal. 03.05-M', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25, cosc: true, priceRange: 3, brandTier: 4, style: 'chrono' },

  // ══════════════════════════════════════════════════════════════════
  // MID-TIER — long-tail SEO
  // ══════════════════════════════════════════════════════════════════

  // Grand Seiko
  { brand: 'Grand Seiko', model: 'Snowflake', reference: 'SBGA211', year: 2010, caseDiameter: 41, caseThickness: 12.5, waterResistance: 100, movement: 'Spring Drive', caliber: 'Cal. 9R65', powerReserve: 72, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: null, jewels: 30, cosc: false, priceRange: 3, brandTier: 4, style: 'dress' },
  { brand: 'Grand Seiko', model: 'White Birch', reference: 'SLGH005', year: 2021, caseDiameter: 40, caseThickness: 11.7, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 9SA5', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 47, cosc: false, priceRange: 4, brandTier: 4, style: 'dress' },
  { brand: 'Grand Seiko', model: 'Spring Drive Chronograph GMT', reference: 'SBGC231', year: 2019, caseDiameter: 44.5, caseThickness: 16.1, waterResistance: 200, movement: 'Spring Drive', caliber: 'Cal. 9R96', powerReserve: 72, caseMaterial: 'High-Intensity Titanium', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: null, jewels: 50, cosc: false, priceRange: 4, brandTier: 4, style: 'chrono' },
  { brand: 'Grand Seiko', model: 'Heritage Collection Spring Drive', reference: 'SBGA413', year: 2020, caseDiameter: 40.5, caseThickness: 12.8, waterResistance: 100, movement: 'Spring Drive', caliber: 'Cal. 9R65', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: 30, cosc: false, priceRange: 3, brandTier: 4, style: 'dress' },

  // Nomos
  { brand: 'Nomos', model: 'Tangente 38', reference: '164', year: 2005, caseDiameter: 37.5, caseThickness: 6.8, waterResistance: 30, movement: 'Manual', caliber: 'Cal. Alpha', powerReserve: 43, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 17, cosc: false, priceRange: 2, brandTier: 3, style: 'dress' },
  { brand: 'Nomos', model: 'Metro Neomatik 41', reference: '1114', year: 2018, caseDiameter: 41, caseThickness: 7.9, waterResistance: 50, movement: 'Automatic', caliber: 'Cal. DUW 3001', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 27, cosc: false, priceRange: 2, brandTier: 3, style: 'dress' },
  { brand: 'Nomos', model: 'Club Campus', reference: '708', year: 2018, caseDiameter: 38.5, caseThickness: 8.5, waterResistance: 100, movement: 'Manual', caliber: 'Cal. Alpha', powerReserve: 43, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 17, cosc: false, priceRange: 1, brandTier: 3, style: 'dress' },
  { brand: 'Nomos', model: 'Zürich World Time', reference: '805', year: 2011, caseDiameter: 39.9, caseThickness: 10.95, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. Xi', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 26, cosc: false, priceRange: 3, brandTier: 3, style: 'dress' },

  // Oris
  { brand: 'Oris', model: 'Aquis Date Calibre 400', reference: '01 400 7763 4135', year: 2020, caseDiameter: 41.5, caseThickness: 13.2, waterResistance: 300, movement: 'Automatic', caliber: 'Cal. 400', powerReserve: 120, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: false, priceRange: 2, brandTier: 2, style: 'diver' },
  { brand: 'Oris', model: 'ProPilot X Calibre 115', reference: '01 115 7759 4134', year: 2016, caseDiameter: 44, caseThickness: 13.1, waterResistance: 100, movement: 'Manual', caliber: 'Cal. 115', powerReserve: 240, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 40, cosc: false, priceRange: 3, brandTier: 2, style: 'pilot' },
  { brand: 'Oris', model: 'Divers Sixty-Five 36mm', reference: '01 733 7771 4354', year: 2020, caseDiameter: 36, caseThickness: 11.5, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 733', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25, cosc: false, priceRange: 1, brandTier: 2, style: 'diver' },

  // Hamilton
  { brand: 'Hamilton', model: 'Khaki Navy Pioneer Small Second', reference: 'H78419553', year: 2019, caseDiameter: 40, caseThickness: 10.55, waterResistance: 100, movement: 'Manual', caliber: 'H-50', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 17, cosc: false, priceRange: 1, brandTier: 2, style: 'field' },
  { brand: 'Hamilton', model: 'American Classic Intra-Matic Auto', reference: 'H38455751', year: 2019, caseDiameter: 42, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic', caliber: 'H-31', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27, cosc: false, priceRange: 1, brandTier: 2, style: 'chrono' },
  { brand: 'Hamilton', model: 'PSR MTX', reference: 'H52434130', year: 2020, caseDiameter: 41, caseThickness: 13.65, waterResistance: 100, movement: 'Quartz', caliber: 'H-500', powerReserve: null, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null, cosc: false, priceRange: 1, brandTier: 2, style: 'dress' },

  // Seiko
  { brand: 'Seiko', model: 'Prospex SLA017 Recreation', reference: 'SLA017J1', year: 2017, caseDiameter: 44.3, caseThickness: 15.3, waterResistance: 200, movement: 'Automatic', caliber: 'Cal. 8L35', powerReserve: 50, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26, cosc: false, priceRange: 2, brandTier: 2, style: 'diver' },
  { brand: 'Seiko', model: 'Presage Cocktail Time', reference: 'SRPB41J1', year: 2017, caseDiameter: 40.5, caseThickness: 11.8, waterResistance: 50, movement: 'Automatic', caliber: 'Cal. 4R35', powerReserve: 41, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Hardlex', frequency: 3, jewels: 23, cosc: false, priceRange: 1, brandTier: 2, style: 'dress' },
  { brand: 'Seiko', model: 'Presage SARW035 Enamel', reference: 'SARW035', year: 2018, caseDiameter: 40.5, caseThickness: 12.4, waterResistance: 50, movement: 'Automatic', caliber: 'Cal. 6R27', powerReserve: 45, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 29, cosc: false, priceRange: 1, brandTier: 2, style: 'dress' },
  { brand: 'Seiko', model: 'Astron GPS Solar', reference: 'SSH047J1', year: 2020, caseDiameter: 42.9, caseThickness: 12.2, waterResistance: 100, movement: 'Quartz', caliber: 'Cal. 5X53', powerReserve: null, caseMaterial: 'Titanium', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: null, jewels: null, cosc: false, priceRange: 2, brandTier: 2, style: 'sport' },
  { brand: 'Seiko', model: 'Prospex SPB143 62MAS Re-edition', reference: 'SPB143J1', year: 2020, caseDiameter: 40.5, caseThickness: 13.2, waterResistance: 200, movement: 'Automatic', caliber: 'Cal. 6R35', powerReserve: 70, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 24, cosc: false, priceRange: 1, brandTier: 2, style: 'diver' },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const w of NEW_WATCHES) {
    const slug = `${toSlug(w.brand)}-${toSlug(w.model)}`
    const apiId = `manual-day5-batch-${slug}`
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
