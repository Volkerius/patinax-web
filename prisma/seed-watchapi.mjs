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
  // Rolex
  { brand: 'Rolex', model: 'Air-King', reference: '126900', year: 2022, caseDiameter: 40, caseThickness: 13.1, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 3230', powerReserve: 70, caseMaterial: 'Oystersteel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 31, cosc: true, priceRange: 4, style: 'sport', brandTier: 4 },

  // Blancpain
  { brand: 'Blancpain', model: 'Villeret', reference: '6654-1127-55B', year: 2020, caseDiameter: 40, caseThickness: 9.4, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1335', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 35, cosc: false, priceRange: 4, style: 'dress', brandTier: 5 },
  { brand: 'Blancpain', model: 'Villeret Ultra-Slim', reference: '6651-1127-55B', year: 2019, caseDiameter: 40, caseThickness: 7.7, waterResistance: 30, movement: 'Automatic', caliber: 'Cal. 1151', powerReserve: 100, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 27, cosc: false, priceRange: 4, style: 'dress', brandTier: 5 },

  // Breitling
  { brand: 'Breitling', model: 'Aviator 8', reference: 'A17315101B1X1', year: 2018, caseDiameter: 41, caseThickness: 10.6, waterResistance: 100, movement: 'Automatic', caliber: 'B17', powerReserve: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: true, priceRange: 3, style: 'pilot', brandTier: 3 },
  { brand: 'Breitling', model: 'Super AVI', reference: 'A233801A1B1X1', year: 2022, caseDiameter: 46, caseThickness: 15.9, waterResistance: 100, movement: 'Automatic', caliber: 'B04', powerReserve: 70, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 8, jewels: 28, cosc: true, priceRange: 3, style: 'pilot', brandTier: 3 },
  { brand: 'Breitling', model: 'Top Time', reference: 'A23310121G1X1', year: 2020, caseDiameter: 41, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic', caliber: 'B23', powerReserve: 48, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: true, priceRange: 3, style: 'sport', brandTier: 3 },

  // Cartier
  { brand: 'Cartier', model: 'Calibre de Cartier', reference: 'WSCA0006', year: 2010, caseDiameter: 42, caseThickness: 11.7, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 1904-PS MC', powerReserve: 48, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 27, cosc: false, priceRange: 3, style: 'dress', brandTier: 4 },
  { brand: 'Cartier', model: 'Ronde Croisière', reference: 'WSRN0003', year: 2015, caseDiameter: 42, caseThickness: 11.3, waterResistance: 100, movement: 'Automatic', caliber: 'Cal. 1847 MC', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: false, priceRange: 3, style: 'dress', brandTier: 4 },

  // Citizen
  { brand: 'Citizen', model: 'Promaster Diver', reference: 'BN0150-28E', year: 2015, caseDiameter: 44, caseThickness: 12, waterResistance: 200, movement: 'Eco-Drive Solar', caliber: 'E168', powerReserve: null, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null, cosc: false, priceRange: 1, style: 'dive', brandTier: 1 },
  { brand: 'Citizen', model: 'Promaster Marine', reference: 'NY0040-09EE', year: 2017, caseDiameter: 42, caseThickness: 13, waterResistance: 200, movement: 'Automatic', caliber: '8204', powerReserve: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: 6, jewels: 21, cosc: false, priceRange: 1, style: 'dive', brandTier: 1 },

  // Grand Seiko
  { brand: 'Grand Seiko', model: 'Elegance SBGK006', reference: 'SBGK006', year: 2019, caseDiameter: 39, caseThickness: 11.6, waterResistance: 30, movement: 'Manual', caliber: '9S63', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 10, jewels: 30, cosc: false, priceRange: 3, style: 'dress', brandTier: 4 },
  { brand: 'Grand Seiko', model: 'Evolution 9 SLGA007', reference: 'SLGA007', year: 2022, caseDiameter: 40, caseThickness: 11.8, waterResistance: 100, movement: 'Spring Drive', caliber: '9RA2', powerReserve: 120, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 50, cosc: false, priceRange: 4, style: 'sport', brandTier: 4 },
  { brand: 'Grand Seiko', model: 'Heritage SBGA211', reference: 'SBGA211', year: 2017, caseDiameter: 41, caseThickness: 12.5, waterResistance: 100, movement: 'Spring Drive', caliber: '9R65', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 30, cosc: false, priceRange: 3, style: 'sport', brandTier: 4 },
  { brand: 'Grand Seiko', model: 'Sport SBGE257', reference: 'SBGE257', year: 2021, caseDiameter: 40.5, caseThickness: 14.7, waterResistance: 200, movement: 'Spring Drive', caliber: '9R66', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 30, cosc: false, priceRange: 3, style: 'sport', brandTier: 4 },

  // Hamilton
  { brand: 'Hamilton', model: 'Intra-Matic Auto', reference: 'H38425720', year: 2021, caseDiameter: 40, caseThickness: 11.8, waterResistance: 50, movement: 'Automatic', caliber: 'H-10', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'dress', brandTier: 2 },
  { brand: 'Hamilton', model: 'Jazzmaster Viewmatic', reference: 'H32515555', year: 2020, caseDiameter: 40, caseThickness: 11.5, waterResistance: 50, movement: 'Automatic', caliber: 'H-10', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'dress', brandTier: 2 },
  { brand: 'Hamilton', model: 'Jazzmaster Performer', reference: 'H36215130', year: 2023, caseDiameter: 38, caseThickness: 10.9, waterResistance: 50, movement: 'Automatic', caliber: 'H-10', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'dress', brandTier: 2 },
  { brand: 'Hamilton', model: 'Khaki Field Mechanical', reference: 'H69439931', year: 2018, caseDiameter: 38, caseThickness: 9.5, waterResistance: 50, movement: 'Manual', caliber: 'H-50', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 17, cosc: false, priceRange: 1, style: 'field', brandTier: 2 },
  { brand: 'Hamilton', model: 'Khaki Field King', reference: 'H64455533', year: 2019, caseDiameter: 40, caseThickness: 11.1, waterResistance: 50, movement: 'Automatic', caliber: 'H-40', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'field', brandTier: 2 },
  { brand: 'Hamilton', model: 'Khaki Field Titanium', reference: 'H70575733', year: 2020, caseDiameter: 42, caseThickness: 11.8, waterResistance: 100, movement: 'Automatic', caliber: 'H-10', powerReserve: 80, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'field', brandTier: 2 },
  { brand: 'Hamilton', model: 'Khaki Navy Frogman', reference: 'H77455330', year: 2019, caseDiameter: 42, caseThickness: 14.8, waterResistance: 300, movement: 'Automatic', caliber: 'H-10', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'dive', brandTier: 2 },
  { brand: 'Hamilton', model: 'Khaki Pilot Day Date', reference: 'H64615135', year: 2018, caseDiameter: 42, caseThickness: 11.9, waterResistance: 100, movement: 'Automatic', caliber: 'H-40', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'pilot', brandTier: 2 },
  { brand: 'Hamilton', model: 'Khaki Pilot Pioneer', reference: 'H76455933', year: 2020, caseDiameter: 43, caseThickness: 13, waterResistance: 100, movement: 'Automatic', caliber: 'H-10', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'pilot', brandTier: 2 },
  { brand: 'Hamilton', model: 'Khaki X-Wind', reference: 'H77616533', year: 2019, caseDiameter: 45, caseThickness: 15, waterResistance: 100, movement: 'Automatic', caliber: 'H-21', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: false, priceRange: 2, style: 'pilot', brandTier: 2 },
  { brand: 'Hamilton', model: 'Spirit of Liberty', reference: 'H42415551', year: 2018, caseDiameter: 42, caseThickness: 11.5, waterResistance: 50, movement: 'Automatic', caliber: 'H-10', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 25, cosc: false, priceRange: 1, style: 'dress', brandTier: 2 },
  { brand: 'Hamilton', model: 'Ventura', reference: 'H24411732', year: 2017, caseDiameter: 32.3, caseThickness: 10.3, waterResistance: 50, movement: 'Quartz', caliber: 'F06.111', powerReserve: null, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null, cosc: false, priceRange: 1, style: 'dress', brandTier: 2 },

  // Hublot
  { brand: 'Hublot', model: 'Big Bang Original', reference: '301.SB.131.RX', year: 2005, caseDiameter: 44, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic', caliber: 'HUB4100', powerReserve: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: false, priceRange: 3, style: 'sport', brandTier: 3 },
  { brand: 'Hublot', model: 'Square Bang', reference: '821.NM.0170.RX', year: 2022, caseDiameter: 43, caseThickness: 13.3, waterResistance: 100, movement: 'Automatic', caliber: 'UNICO2', powerReserve: 72, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 38, cosc: false, priceRange: 4, style: 'sport', brandTier: 3 },

  // IWC
  { brand: 'IWC', model: 'Pilot Chronograph', reference: 'IW378001', year: 2021, caseDiameter: 41, caseThickness: 15.3, waterResistance: 60, movement: 'Automatic', caliber: '69385', powerReserve: 46, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 33, cosc: false, priceRange: 3, style: 'pilot', brandTier: 4 },
  { brand: 'IWC', model: 'Pilot Chronograph Top Gun', reference: 'IW389101', year: 2022, caseDiameter: 44.5, caseThickness: 15.7, waterResistance: 60, movement: 'Automatic', caliber: '69380', powerReserve: 46, caseMaterial: 'Ceramic', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 8, jewels: 33, cosc: false, priceRange: 4, style: 'pilot', brandTier: 4 },
  { brand: 'IWC', model: 'Pilot Mark XX', reference: 'IW328203', year: 2022, caseDiameter: 40, caseThickness: 10.8, waterResistance: 100, movement: 'Automatic', caliber: '32111', powerReserve: 120, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 21, cosc: false, priceRange: 3, style: 'pilot', brandTier: 4 },
  { brand: 'IWC', model: 'Da Vinci Perpetual Calendar', reference: 'IW392103', year: 2017, caseDiameter: 43, caseThickness: 14.9, waterResistance: 30, movement: 'Automatic', caliber: '89630', powerReserve: 68, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 38, cosc: false, priceRange: 5, style: 'dress', brandTier: 4 },

  // Jaeger-LeCoultre
  { brand: 'Jaeger-LeCoultre', model: 'Polaris', reference: '9068670', year: 2018, caseDiameter: 41, caseThickness: 11.6, waterResistance: 200, movement: 'Automatic', caliber: '898E/1', powerReserve: 70, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 32, cosc: false, priceRange: 4, style: 'sport', brandTier: 4 },
  { brand: 'Jaeger-LeCoultre', model: 'Rendez-Vous', reference: '3468421', year: 2020, caseDiameter: 34, caseThickness: 8.5, waterResistance: 50, movement: 'Automatic', caliber: '967A', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 20, cosc: false, priceRange: 4, style: 'dress', brandTier: 4 },
  { brand: 'Jaeger-LeCoultre', model: 'Memovox', reference: '9038670', year: 2023, caseDiameter: 40, caseThickness: 13.3, waterResistance: 200, movement: 'Automatic', caliber: '956', powerReserve: 45, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 19, cosc: false, priceRange: 4, style: 'sport', brandTier: 4 },

  // Longines
  { brand: 'Longines', model: 'Heritage Classic', reference: 'L2.828.4.73.0', year: 2020, caseDiameter: 38.5, caseThickness: 11.1, waterResistance: 30, movement: 'Automatic', caliber: 'L893.5', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 7.2, jewels: 21, cosc: false, priceRange: 1, style: 'dress', brandTier: 2 },

  // Oris
  { brand: 'Oris', model: 'Aquis Date', reference: '01 733 7730 4135', year: 2019, caseDiameter: 41.5, caseThickness: 13, waterResistance: 300, movement: 'Automatic', caliber: 'Oris 733', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 2, style: 'dive', brandTier: 2 },
  { brand: 'Oris', model: 'Aquis GMT Date', reference: '01 798 7754 4135', year: 2019, caseDiameter: 43.5, caseThickness: 13.6, waterResistance: 300, movement: 'Automatic', caliber: 'Oris 798', powerReserve: 56, caseMaterial: 'Stainless steel', bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: false, priceRange: 2, style: 'dive', brandTier: 2 },
  { brand: 'Oris', model: 'Big Crown Pointer Date', reference: '01 754 7741 4065', year: 2020, caseDiameter: 40, caseThickness: 11.2, waterResistance: 50, movement: 'Automatic', caliber: 'Oris 754', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 2, style: 'pilot', brandTier: 2 },
  { brand: 'Oris', model: 'Divers Sixty-Five', reference: '01 733 7707 4064', year: 2015, caseDiameter: 40, caseThickness: 12.9, waterResistance: 100, movement: 'Automatic', caliber: 'Oris 733', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 8, jewels: 26, cosc: false, priceRange: 2, style: 'dive', brandTier: 2 },
  { brand: 'Oris', model: 'ProPilot X Calibre 400', reference: '01 400 7778 7153', year: 2022, caseDiameter: 39, caseThickness: 11.5, waterResistance: 100, movement: 'Automatic', caliber: 'Oris 400', powerReserve: 120, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 30, cosc: false, priceRange: 2, style: 'pilot', brandTier: 2 },
  { brand: 'Oris', model: 'Rectangular', reference: '01 561 7783 4061', year: 2019, caseDiameter: 25.5, caseThickness: 7.9, waterResistance: 30, movement: 'Automatic', caliber: 'Oris 561', powerReserve: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 23, cosc: false, priceRange: 2, style: 'dress', brandTier: 2 },

  // Panerai
  { brand: 'Panerai', model: 'Radiomir', reference: 'PAM00572', year: 2014, caseDiameter: 45, caseThickness: 14, waterResistance: 100, movement: 'Manual', caliber: 'P.3000', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 21, cosc: false, priceRange: 3, style: 'sport', brandTier: 3 },
  { brand: 'Panerai', model: 'Radiomir Black Seal', reference: 'PAM00754', year: 2019, caseDiameter: 45, caseThickness: 15.6, waterResistance: 100, movement: 'Automatic', caliber: 'P.4000', powerReserve: 72, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 31, cosc: false, priceRange: 3, style: 'sport', brandTier: 3 },

  // Patek Philippe
  { brand: 'Patek Philippe', model: 'Perpetual Calendar', reference: '5320G-001', year: 2017, caseDiameter: 40, caseThickness: 11.1, waterResistance: 30, movement: 'Automatic', caliber: '324 S QR', powerReserve: 45, caseMaterial: '18k White Gold', bezelMaterial: '18k White Gold', crystal: 'Sapphire', frequency: 8, jewels: 34, cosc: true, priceRange: 5, style: 'dress', brandTier: 5 },
  { brand: 'Patek Philippe', model: 'World Time', reference: '5231J-001', year: 2019, caseDiameter: 38.5, caseThickness: 10.2, waterResistance: 30, movement: 'Automatic', caliber: '240 HU', powerReserve: 48, caseMaterial: '18k Yellow Gold', bezelMaterial: '18k Yellow Gold', crystal: 'Sapphire', frequency: 6, jewels: 33, cosc: true, priceRange: 5, style: 'dress', brandTier: 5 },
  { brand: 'Patek Philippe', model: 'Twenty~4', reference: '7300/1200A-010', year: 2018, caseDiameter: 36, caseThickness: 8.2, waterResistance: 30, movement: 'Automatic', caliber: '324 S C', powerReserve: 45, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 29, cosc: true, priceRange: 4, style: 'dress', brandTier: 5 },
  { brand: 'Patek Philippe', model: 'Grand Complications Minute Repeater', reference: '5078G-001', year: 2005, caseDiameter: 38, caseThickness: 9.7, waterResistance: 30, movement: 'Automatic', caliber: 'R 27 PS', powerReserve: 48, caseMaterial: '18k White Gold', bezelMaterial: '18k White Gold', crystal: 'Sapphire', frequency: 6, jewels: 39, cosc: true, priceRange: 5, style: 'dress', brandTier: 5 },
  { brand: 'Patek Philippe', model: 'Celestial', reference: '6102P-001', year: 2014, caseDiameter: 44, caseThickness: 12.6, waterResistance: 30, movement: 'Automatic', caliber: '240 LU CL C', powerReserve: 48, caseMaterial: 'Platinum', bezelMaterial: 'Platinum', crystal: 'Sapphire', frequency: 6, jewels: 45, cosc: true, priceRange: 5, style: 'dress', brandTier: 5 },

  // Tissot
  { brand: 'Tissot', model: 'Gentleman Powermatic 80', reference: 'T127.407.11.031.00', year: 2019, caseDiameter: 40, caseThickness: 10.6, waterResistance: 100, movement: 'Automatic', caliber: 'Powermatic 80.111', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 23, cosc: false, priceRange: 1, style: 'dress', brandTier: 1 },
  { brand: 'Tissot', model: 'Le Locle Powermatic 80', reference: 'T006.407.11.033.00', year: 2018, caseDiameter: 39.3, caseThickness: 9.75, waterResistance: 30, movement: 'Automatic', caliber: 'Powermatic 80', powerReserve: 80, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 6, jewels: 23, cosc: false, priceRange: 1, style: 'dress', brandTier: 1 },

  // Tudor
  { brand: 'Tudor', model: 'Heritage Chrono', reference: '70330N', year: 2013, caseDiameter: 42, caseThickness: 14, waterResistance: 150, movement: 'Automatic', caliber: '7753', powerReserve: 46, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 27, cosc: false, priceRange: 2, style: 'sport', brandTier: 3 },

  // Vacheron Constantin
  { brand: 'Vacheron Constantin', model: 'Overseas Automatic', reference: '4500V/110A-B128', year: 2016, caseDiameter: 41, caseThickness: 11, waterResistance: 150, movement: 'Automatic', caliber: '5100', powerReserve: 60, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 8, jewels: 37, cosc: true, priceRange: 5, style: 'sport', brandTier: 5 },

  // Roger Dubuis (new brand)
  { brand: 'Roger Dubuis', model: 'Excalibur', reference: 'RDDBEX0966', year: 2022, caseDiameter: 42, caseThickness: 12.6, waterResistance: 50, movement: 'Automatic', caliber: 'RD830', powerReserve: 72, caseMaterial: 'Titanium', bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: true, priceRange: 5, style: 'sport', brandTier: 5 },
  { brand: 'Roger Dubuis', model: 'Excalibur Spider', reference: 'RDDBEX0955', year: 2021, caseDiameter: 45, caseThickness: 14.2, waterResistance: 50, movement: 'Automatic', caliber: 'RD830', powerReserve: 72, caseMaterial: 'Carbon', bezelMaterial: 'Carbon', crystal: 'Sapphire', frequency: 8, jewels: 25, cosc: true, priceRange: 5, style: 'sport', brandTier: 5 },
  { brand: 'Roger Dubuis', model: 'Excalibur Monobalancier', reference: 'RDDBEX0815', year: 2020, caseDiameter: 42, caseThickness: 12.1, waterResistance: 50, movement: 'Automatic', caliber: 'RD720SQ', powerReserve: 60, caseMaterial: 'Rose Gold', bezelMaterial: 'Rose Gold', crystal: 'Sapphire', frequency: 8, jewels: 28, cosc: true, priceRange: 5, style: 'dress', brandTier: 5 },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const w of NEW_WATCHES) {
    const slug = `${toSlug(w.brand)}-${toSlug(w.model)}`
    const apiId = `watchapi-${slug}`
    try {
      await prisma.watch.upsert({
        where: { slug },
        update: {},
        create: { slug, apiId, ...w },
      })
      created++
    } catch (e) {
      console.error(`Skip ${w.brand} ${w.model}: ${e.message}`)
      skipped++
    }
  }

  const total = await prisma.watch.count()
  console.log(`Done: ${created} created, ${skipped} skipped. Total watches: ${total}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
