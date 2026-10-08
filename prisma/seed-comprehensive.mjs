import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function makeSlug(brand, model) {
  return `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
}

const watches = [
  // ===== ROLEX (20) =====
  {
    brand: 'Rolex', model: 'Submariner Date', reference: '126610LN', year: 2020,
    caseDiameter: 41, caseThickness: 12.5, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 3235', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Cerachrom ceramic', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 4, brandTier: 4, style: 'diver',
  },
  {
    brand: 'Rolex', model: 'Submariner No Date', reference: '124060', year: 2020,
    caseDiameter: 41, caseThickness: 11.4, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 3230', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Cerachrom ceramic', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 4, brandTier: 4, style: 'diver',
  },
  {
    brand: 'Rolex', model: 'Daytona', reference: '116500LN', year: 2016,
    caseDiameter: 40, caseThickness: 12.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 4130', powerReserve: 72, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Cerachrom ceramic', crystal: 'Sapphire', frequency: 4, jewels: 44,
    cosc: true, priceRange: 4, brandTier: 4, style: 'chrono',
  },
  {
    brand: 'Rolex', model: 'GMT-Master II Batman', reference: '126710BLNR', year: 2019,
    caseDiameter: 40, caseThickness: 12.1, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3285', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Cerachrom ceramic', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 4, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Rolex', model: 'GMT-Master II Pepsi', reference: '126710BLRO', year: 2018,
    caseDiameter: 40, caseThickness: 12.1, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3285', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Cerachrom ceramic', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 4, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Rolex', model: 'Datejust 41', reference: '126334', year: 2017,
    caseDiameter: 41, caseThickness: 12, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3235', powerReserve: 70, caseMaterial: 'Oystersteel and white gold',
    bezelMaterial: 'White gold fluted', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 4, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Rolex', model: 'Datejust 36', reference: '126234', year: 2019,
    caseDiameter: 36, caseThickness: 11.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3235', powerReserve: 70, caseMaterial: 'Oystersteel and white gold',
    bezelMaterial: 'White gold fluted', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Rolex', model: 'Day-Date 40', reference: '228235', year: 2015,
    caseDiameter: 40, caseThickness: 12.4, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3255', powerReserve: 70, caseMaterial: '18k Everose gold',
    bezelMaterial: 'Everose gold fluted', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 5, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Rolex', model: 'Explorer 36', reference: '124270', year: 2021,
    caseDiameter: 36, caseThickness: 11.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3230', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 3, brandTier: 4, style: 'field',
  },
  {
    brand: 'Rolex', model: 'Explorer II', reference: '226570', year: 2021,
    caseDiameter: 42, caseThickness: 12.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3285', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 3, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Rolex', model: 'Sea-Dweller', reference: '126600', year: 2017,
    caseDiameter: 43, caseThickness: 14.7, waterResistance: 1220, movement: 'Automatic',
    caliber: 'Cal. 3235', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Cerachrom ceramic', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 4, brandTier: 4, style: 'diver',
  },
  {
    brand: 'Rolex', model: 'Deepsea', reference: '136660', year: 2022,
    caseDiameter: 44, caseThickness: 17.7, waterResistance: 3900, movement: 'Automatic',
    caliber: 'Cal. 3235', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Cerachrom ceramic', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 4, brandTier: 4, style: 'diver',
  },
  {
    brand: 'Rolex', model: 'Sky-Dweller', reference: '326934', year: 2017,
    caseDiameter: 42, caseThickness: 14.1, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 9001', powerReserve: 72, caseMaterial: 'Oystersteel and white gold',
    bezelMaterial: 'White gold fluted', crystal: 'Sapphire', frequency: 4, jewels: 40,
    cosc: true, priceRange: 4, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Rolex', model: 'Yacht-Master 40', reference: '126622', year: 2019,
    caseDiameter: 40, caseThickness: 11.9, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3235', powerReserve: 70, caseMaterial: 'Oystersteel and platinum',
    bezelMaterial: 'Platinum', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 4, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Rolex', model: 'Yacht-Master II', reference: '116681', year: 2011,
    caseDiameter: 44, caseThickness: 14.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 4161', powerReserve: 72, caseMaterial: 'Oystersteel and Everose gold',
    bezelMaterial: 'Cerachrom ceramic', crystal: 'Sapphire', frequency: 4, jewels: 47,
    cosc: true, priceRange: 4, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Rolex', model: 'Milgauss', reference: '116400GV', year: 2007,
    caseDiameter: 40, caseThickness: 13.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3131', powerReserve: 48, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Stainless steel', crystal: 'Green sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 3, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Rolex', model: 'Air-King', reference: '126900', year: 2022,
    caseDiameter: 40, caseThickness: 13.1, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3230', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 3, brandTier: 4, style: 'pilot',
  },
  {
    brand: 'Rolex', model: 'Oyster Perpetual 41', reference: '124300', year: 2020,
    caseDiameter: 41, caseThickness: 11.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3230', powerReserve: 70, caseMaterial: 'Oystersteel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Rolex', model: 'Cellini Moonphase', reference: '50535', year: 2017,
    caseDiameter: 39, caseThickness: 12.2, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 3195', powerReserve: 48, caseMaterial: '18k Everose gold',
    bezelMaterial: 'Everose gold', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 5, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Rolex', model: 'Cosmograph Daytona Rose Gold', reference: '116505', year: 2016,
    caseDiameter: 40, caseThickness: 12.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 4130', powerReserve: 72, caseMaterial: '18k Everose gold',
    bezelMaterial: 'Everose gold', crystal: 'Sapphire', frequency: 4, jewels: 44,
    cosc: true, priceRange: 5, brandTier: 4, style: 'chrono',
  },

  // ===== OMEGA (20) =====
  {
    brand: 'Omega', model: 'Seamaster Diver 300M', reference: '210.30.42.20.03.001', year: 2018,
    caseDiameter: 42, caseThickness: 13.6, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 8800', powerReserve: 55, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 35,
    cosc: true, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Omega', model: 'Seamaster Planet Ocean 600M', reference: '215.30.44.21.01.001', year: 2016,
    caseDiameter: 43.5, caseThickness: 16.1, waterResistance: 600, movement: 'Automatic',
    caliber: 'Cal. 8900', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 39,
    cosc: true, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Omega', model: 'Seamaster Aqua Terra 150M', reference: '220.10.41.21.03.001', year: 2017,
    caseDiameter: 41, caseThickness: 13.2, waterResistance: 150, movement: 'Automatic',
    caliber: 'Cal. 8900', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 39,
    cosc: true, priceRange: 3, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Omega', model: 'Speedmaster Moonwatch Professional', reference: '310.30.42.50.01.001', year: 2021,
    caseDiameter: 42, caseThickness: 13.2, waterResistance: 50, movement: 'Manual',
    caliber: 'Cal. 3861', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3, jewels: 26,
    cosc: true, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Omega', model: 'Speedmaster Racing', reference: '329.30.44.51.01.002', year: 2019,
    caseDiameter: 44.25, caseThickness: 16.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 9900', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 3.5, jewels: 54,
    cosc: true, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Omega', model: 'Speedmaster 57', reference: '332.10.41.51.01.001', year: 2022,
    caseDiameter: 40.5, caseThickness: 12.9, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 9906', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 54,
    cosc: true, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Omega', model: 'Constellation 41mm', reference: '131.10.41.21.03.001', year: 2019,
    caseDiameter: 41, caseThickness: 11.2, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 8900', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 39,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Omega', model: 'De Ville Prestige', reference: '424.10.40.20.03.001', year: 2018,
    caseDiameter: 39.5, caseThickness: 9.5, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 2500', powerReserve: 48, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 27,
    cosc: false, priceRange: 2, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Omega', model: 'De Ville Tresor', reference: '435.13.40.21.03.001', year: 2020,
    caseDiameter: 40, caseThickness: 10.2, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. 8929', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 27,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Omega', model: 'Seamaster 300', reference: '234.30.41.21.01.001', year: 2021,
    caseDiameter: 41, caseThickness: 14.3, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 8912', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 35,
    cosc: true, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Omega', model: 'Planet Ocean Ultra Deep', reference: '215.30.46.21.01.001', year: 2022,
    caseDiameter: 45.5, caseThickness: 18.1, waterResistance: 6000, movement: 'Automatic',
    caliber: 'Cal. 8912', powerReserve: 60, caseMaterial: 'O-MEGASTEEL',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 35,
    cosc: true, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Omega', model: 'Globemaster', reference: '130.30.39.21.03.001', year: 2015,
    caseDiameter: 39, caseThickness: 11.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 8901', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel fluted', crystal: 'Sapphire', frequency: 3.5, jewels: 39,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Omega', model: 'De Ville Hour Vision', reference: '433.33.41.21.03.001', year: 2017,
    caseDiameter: 41, caseThickness: 11.7, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 8900', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 39,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Omega', model: 'Constellation Small Seconds', reference: '131.13.39.20.02.001', year: 2019,
    caseDiameter: 39, caseThickness: 11.1, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 8704', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 39,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Omega', model: 'Seamaster Railmaster', reference: '220.10.40.20.01.001', year: 2017,
    caseDiameter: 40, caseThickness: 12.7, waterResistance: 150, movement: 'Automatic',
    caliber: 'Cal. 8806', powerReserve: 55, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 35,
    cosc: true, priceRange: 3, brandTier: 3, style: 'field',
  },
  {
    brand: 'Omega', model: 'De Ville Co-Axial', reference: '431.13.41.21.03.001', year: 2016,
    caseDiameter: 41, caseThickness: 10.7, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 8500', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 39,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Omega', model: 'Speedmaster Reduced', reference: '3510.50.00', year: 2006,
    caseDiameter: 39, caseThickness: 12, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 3220', powerReserve: 44, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Hesalite', frequency: 3, jewels: 47,
    cosc: false, priceRange: 2, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Omega', model: 'Seamaster Professional 300M Blue', reference: '210.30.42.20.03.001', year: 2018,
    caseDiameter: 42, caseThickness: 13.6, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 8800', powerReserve: 55, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 35,
    cosc: true, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Omega', model: 'De Ville Ladymatic', reference: '425.30.34.20.55.001', year: 2018,
    caseDiameter: 34, caseThickness: 11.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 8520', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 29,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Omega', model: 'Seamaster Bullhead', reference: '225.12.43.50.01.001', year: 2013,
    caseDiameter: 43, caseThickness: 16.6, waterResistance: 150, movement: 'Automatic',
    caliber: 'Cal. 3113', powerReserve: 52, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 37,
    cosc: true, priceRange: 3, brandTier: 3, style: 'chrono',
  },

  // ===== PATEK PHILIPPE (15) =====
  {
    brand: 'Patek Philippe', model: 'Nautilus 5711/1A', reference: '5711/1A-010', year: 2006,
    caseDiameter: 40, caseThickness: 8.3, waterResistance: 120, movement: 'Automatic',
    caliber: 'Cal. 26-330 S C', powerReserve: 45, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Patek Philippe', model: 'Aquanaut 5167A', reference: '5167A-001', year: 2007,
    caseDiameter: 40, caseThickness: 8.1, waterResistance: 120, movement: 'Automatic',
    caliber: 'Cal. 26-330 S C', powerReserve: 45, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Patek Philippe', model: 'Calatrava 5227G', reference: '5227G-010', year: 2013,
    caseDiameter: 39, caseThickness: 9.2, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 324 S C', powerReserve: 45, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Patek Philippe', model: 'Chronograph 5172G', reference: '5172G-001', year: 2019,
    caseDiameter: 41, caseThickness: 11.5, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. CH 29-535 PS', powerReserve: 65, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: true, priceRange: 5, brandTier: 5, style: 'chrono',
  },
  {
    brand: 'Patek Philippe', model: 'World Time 5231G', reference: '5231G-001', year: 2019,
    caseDiameter: 38.5, caseThickness: 10.2, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 240 HU', powerReserve: 48, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 3, jewels: 33,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Patek Philippe', model: 'Nautilus Chronograph 5980/1A', reference: '5980/1A-001', year: 2006,
    caseDiameter: 40.5, caseThickness: 12.3, waterResistance: 120, movement: 'Automatic',
    caliber: 'Cal. CH 28-520 C', powerReserve: 55, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 35,
    cosc: true, priceRange: 5, brandTier: 5, style: 'chrono',
  },
  {
    brand: 'Patek Philippe', model: 'Grand Complications 5270G', reference: '5270G-018', year: 2018,
    caseDiameter: 41, caseThickness: 12.4, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. CH 29-535 PS Q', powerReserve: 65, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: true, priceRange: 5, brandTier: 5, style: 'chrono',
  },
  {
    brand: 'Patek Philippe', model: 'Annual Calendar 5205R', reference: '5205R-010', year: 2013,
    caseDiameter: 40, caseThickness: 10.9, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 324 S QA LU 24H', powerReserve: 45, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 4, jewels: 34,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Patek Philippe', model: 'Aquanaut Travel Time 5164A', reference: '5164A-001', year: 2011,
    caseDiameter: 40.8, caseThickness: 11, waterResistance: 120, movement: 'Automatic',
    caliber: 'Cal. 324 S C FUS', powerReserve: 45, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Patek Philippe', model: 'Calatrava Pilot 5524G', reference: '5524G-001', year: 2015,
    caseDiameter: 42, caseThickness: 10.8, waterResistance: 60, movement: 'Automatic',
    caliber: 'Cal. 324 S C FUS', powerReserve: 45, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 5, brandTier: 5, style: 'pilot',
  },
  {
    brand: 'Patek Philippe', model: 'Twenty-4 7300/1200A', reference: '7300/1200A-010', year: 2018,
    caseDiameter: 36, caseThickness: 8.7, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 324 S C', powerReserve: 45, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Patek Philippe', model: 'Nautilus Travel Time 5990/1A', reference: '5990/1A-001', year: 2014,
    caseDiameter: 40.5, caseThickness: 12.3, waterResistance: 120, movement: 'Automatic',
    caliber: 'Cal. CH 28-520 C FUS', powerReserve: 55, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 34,
    cosc: true, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Patek Philippe', model: 'Perpetual Calendar 5327G', reference: '5327G-001', year: 2018,
    caseDiameter: 39, caseThickness: 11.7, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 324 S Q', powerReserve: 45, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 34,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Patek Philippe', model: 'Gondolo 5124G', reference: '5124G-011', year: 2009,
    caseDiameter: 33.4, caseThickness: 7.6, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. 25-21 REC', powerReserve: 44, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 3.6, jewels: 18,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Patek Philippe', model: 'Complications 5146G', reference: '5146G-001', year: 2005,
    caseDiameter: 39, caseThickness: 10.2, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 324 S IRM QA LU', powerReserve: 45, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 35,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },

  // ===== AUDEMARS PIGUET (15) =====
  {
    brand: 'Audemars Piguet', model: 'Royal Oak 15500ST', reference: '15500ST.OO.1220ST.01', year: 2019,
    caseDiameter: 41, caseThickness: 10.4, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 4302', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 32,
    cosc: false, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Offshore Diver', reference: '15710ST.OO.A002CA.01', year: 2017,
    caseDiameter: 42, caseThickness: 14.1, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 3120', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 40,
    cosc: false, priceRange: 5, brandTier: 5, style: 'diver',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Chronograph', reference: '26331ST.OO.1220ST.01', year: 2017,
    caseDiameter: 41, caseThickness: 11, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 2385', powerReserve: 40, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 37,
    cosc: false, priceRange: 5, brandTier: 5, style: 'chrono',
  },
  {
    brand: 'Audemars Piguet', model: 'Code 11.59', reference: '15210OR.OO.A002CR.01', year: 2019,
    caseDiameter: 41, caseThickness: 10.7, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 4302', powerReserve: 70, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 4, jewels: 32,
    cosc: false, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Offshore Chronograph', reference: '26470ST.OO.A027CA.01', year: 2014,
    caseDiameter: 42, caseThickness: 14.4, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3126/3840', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3, jewels: 59,
    cosc: false, priceRange: 5, brandTier: 5, style: 'chrono',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Jumbo Extra-Thin 15202ST', reference: '15202ST.OO.1240ST.01', year: 2012,
    caseDiameter: 39, caseThickness: 8.1, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 2121', powerReserve: 40, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 2.75, jewels: 36,
    cosc: false, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Perpetual Calendar 26574ST', reference: '26574ST.OO.1220ST.01', year: 2015,
    caseDiameter: 41, caseThickness: 9.5, waterResistance: 20, movement: 'Automatic',
    caliber: 'Cal. 5134', powerReserve: 40, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 2.75, jewels: 38,
    cosc: false, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Double Balance Wheel', reference: '15407ST.OO.1220ST.01', year: 2016,
    caseDiameter: 41, caseThickness: 10.4, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 3132', powerReserve: 45, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 40,
    cosc: false, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Selfwinding 37mm', reference: '15450ST.OO.1256ST.01', year: 2019,
    caseDiameter: 37, caseThickness: 9.8, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 3120', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 40,
    cosc: false, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Audemars Piguet', model: 'Millenary', reference: '77247BC.ZZ.A813CR.01', year: 2018,
    caseDiameter: 39.5, caseThickness: 10.6, waterResistance: 20, movement: 'Manual',
    caliber: 'Cal. 5201', powerReserve: 80, caseMaterial: '18k white gold',
    bezelMaterial: 'Diamond-set white gold', crystal: 'Sapphire', frequency: 3, jewels: 25,
    cosc: false, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Concept', reference: '26589IO.OO.D028CR.01', year: 2018,
    caseDiameter: 44, caseThickness: 15.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 2954', powerReserve: 48, caseMaterial: 'Titanium and ceramic',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3, jewels: 40,
    cosc: false, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Offshore Tourbillon', reference: '26421OR.OO.A002CA.01', year: 2018,
    caseDiameter: 44, caseThickness: 14.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 2947', powerReserve: 65, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 3, jewels: 29,
    cosc: false, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Frosted Gold', reference: '15454OR.GG.1259OR.01', year: 2017,
    caseDiameter: 37, caseThickness: 9.8, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 3120', powerReserve: 60, caseMaterial: '18k rose gold',
    bezelMaterial: 'Frosted rose gold', crystal: 'Sapphire', frequency: 3, jewels: 40,
    cosc: false, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Audemars Piguet', model: 'Jules Audemars', reference: '15180OR.OO.A002CR.01', year: 2016,
    caseDiameter: 39, caseThickness: 8.5, waterResistance: 20, movement: 'Automatic',
    caliber: 'Cal. 3120', powerReserve: 60, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 3, jewels: 40,
    cosc: false, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Audemars Piguet', model: 'Royal Oak Offshore Safari', reference: '26170ST.OO.D091CR.01', year: 2010,
    caseDiameter: 42, caseThickness: 14.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 3126/3840', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 59,
    cosc: false, priceRange: 5, brandTier: 5, style: 'chrono',
  },

  // ===== IWC (15) =====
  {
    brand: 'IWC', model: 'Portugieser Chronograph', reference: 'IW371605', year: 2020,
    caseDiameter: 41, caseThickness: 13.1, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 69355', powerReserve: 46, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'IWC', model: 'Pilot Mark XX', reference: 'IW328203', year: 2022,
    caseDiameter: 40, caseThickness: 10.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 32111', powerReserve: 120, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'IWC', model: 'Big Pilot 43', reference: 'IW329301', year: 2021,
    caseDiameter: 43, caseThickness: 13.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 82100', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 32,
    cosc: false, priceRange: 3, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'IWC', model: 'Portugieser Automatic 40', reference: 'IW358304', year: 2020,
    caseDiameter: 40.4, caseThickness: 12.3, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 82200', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 32,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'IWC', model: 'Portugieser Perpetual Calendar', reference: 'IW503701', year: 2020,
    caseDiameter: 44.2, caseThickness: 14.9, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 52610', powerReserve: 168, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 55,
    cosc: false, priceRange: 4, brandTier: 3, style: 'dress',
  },
  {
    brand: 'IWC', model: 'Pilot Chronograph Spitfire', reference: 'IW387901', year: 2019,
    caseDiameter: 41, caseThickness: 15.3, waterResistance: 60, movement: 'Automatic',
    caliber: 'Cal. 69380', powerReserve: 46, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 3, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'IWC', model: 'Pilot Automatic 36', reference: 'IW324010', year: 2021,
    caseDiameter: 36, caseThickness: 10.1, waterResistance: 60, movement: 'Automatic',
    caliber: 'Cal. 32111', powerReserve: 120, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'IWC', model: 'Ingenieur Automatic', reference: 'IW357002', year: 2017,
    caseDiameter: 40, caseThickness: 10.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 35111', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 28,
    cosc: false, priceRange: 3, brandTier: 3, style: 'sport',
  },
  {
    brand: 'IWC', model: 'Aquatimer Automatic', reference: 'IW329005', year: 2019,
    caseDiameter: 42, caseThickness: 14.1, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 30120', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Rubber coated', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: false, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'IWC', model: 'Portofino Automatic', reference: 'IW356517', year: 2019,
    caseDiameter: 40, caseThickness: 9.2, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 35111', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 28,
    cosc: false, priceRange: 2, brandTier: 3, style: 'dress',
  },
  {
    brand: 'IWC', model: 'Portofino Chronograph', reference: 'IW391407', year: 2019,
    caseDiameter: 42, caseThickness: 13.5, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 69355', powerReserve: 46, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'IWC', model: 'Big Pilot Heritage', reference: 'IW501004', year: 2019,
    caseDiameter: 46.2, caseThickness: 15.3, waterResistance: 60, movement: 'Automatic',
    caliber: 'Cal. 52110', powerReserve: 168, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 42,
    cosc: false, priceRange: 4, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'IWC', model: 'Portugieser Yacht Club', reference: 'IW390701', year: 2020,
    caseDiameter: 44.6, caseThickness: 15.6, waterResistance: 60, movement: 'Automatic',
    caliber: 'Cal. 89361', powerReserve: 68, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 35,
    cosc: false, priceRange: 4, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'IWC', model: 'Pilot Top Gun', reference: 'IW326901', year: 2019,
    caseDiameter: 41, caseThickness: 13.8, waterResistance: 60, movement: 'Automatic',
    caliber: 'Cal. 32110', powerReserve: 72, caseMaterial: 'Ceramic',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: false, priceRange: 3, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'IWC', model: 'Da Vinci Automatic', reference: 'IW356601', year: 2017,
    caseDiameter: 40, caseThickness: 10.3, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 35111', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 28,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },

  // ===== BREITLING (15) =====
  {
    brand: 'Breitling', model: 'Navitimer B01 Chronograph', reference: 'AB0127211B1P1', year: 2019,
    caseDiameter: 43, caseThickness: 14.2, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. B01', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 47,
    cosc: true, priceRange: 3, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'Breitling', model: 'Superocean Heritage II', reference: 'AB2010161C1A1', year: 2018,
    caseDiameter: 42, caseThickness: 13, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. B20', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 38,
    cosc: true, priceRange: 2, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Breitling', model: 'Chronomat B01 42', reference: 'AB0134101B1A1', year: 2020,
    caseDiameter: 42, caseThickness: 14.5, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. B01', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 47,
    cosc: true, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Breitling', model: 'Avenger Chronograph 45', reference: 'A13317101B1A1', year: 2019,
    caseDiameter: 45, caseThickness: 16.5, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 13', powerReserve: 48, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: true, priceRange: 2, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Breitling', model: 'Premier B01 Chronograph', reference: 'AB0118371G1P1', year: 2020,
    caseDiameter: 42, caseThickness: 14.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. B01', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 47,
    cosc: true, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Breitling', model: 'Superocean Automatic 42', reference: 'A17366D81A1S1', year: 2020,
    caseDiameter: 42, caseThickness: 13, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 17', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: true, priceRange: 2, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Breitling', model: 'Endurance Pro', reference: 'X82310A71B1S1', year: 2020,
    caseDiameter: 44, caseThickness: 12.5, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. B82', powerReserve: null, caseMaterial: 'Breitlight',
    bezelMaterial: 'Breitlight', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: true, priceRange: 2, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Breitling', model: 'Professional Aerospace Evo', reference: 'E79363101B1E1', year: 2019,
    caseDiameter: 43, caseThickness: 11, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. B79', powerReserve: null, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: true, priceRange: 2, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'Breitling', model: 'Navitimer 8 B01', reference: 'AB0117131C1P1', year: 2018,
    caseDiameter: 43, caseThickness: 14.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. B01', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 47,
    cosc: true, priceRange: 3, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'Breitling', model: 'Avenger Automatic GMT 45', reference: 'A32395101B1X1', year: 2019,
    caseDiameter: 45, caseThickness: 14.7, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 32', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: true, priceRange: 2, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Breitling', model: 'Colt Automatic', reference: 'A17313101I1A1', year: 2018,
    caseDiameter: 41, caseThickness: 11.2, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 17', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: true, priceRange: 2, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Breitling', model: 'Galactic 36', reference: 'A3733012/A788', year: 2015,
    caseDiameter: 36, caseThickness: 10.2, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. 74', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: true, priceRange: 2, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Breitling', model: 'Transocean Chronograph', reference: 'AB015212/BA99', year: 2015,
    caseDiameter: 43, caseThickness: 14.3, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. B01', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 47,
    cosc: true, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Breitling', model: 'Premier Automatic', reference: 'A37340351B1A1', year: 2019,
    caseDiameter: 40, caseThickness: 10.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 37', powerReserve: 56, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 24,
    cosc: true, priceRange: 2, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Breitling', model: 'Superocean 44', reference: 'A17367D81C1S1', year: 2019,
    caseDiameter: 44, caseThickness: 14.2, waterResistance: 1000, movement: 'Automatic',
    caliber: 'Cal. 17', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: true, priceRange: 2, brandTier: 3, style: 'diver',
  },

  // ===== TAG HEUER (15) =====
  {
    brand: 'TAG Heuer', model: 'Monaco', reference: 'CBL2111.BA0644', year: 2019,
    caseDiameter: 39, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Heuer 02', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 3, brandTier: 2, style: 'chrono',
  },
  {
    brand: 'TAG Heuer', model: 'Carrera Chronograph', reference: 'CBS2210.BA0855', year: 2020,
    caseDiameter: 42, caseThickness: 15.3, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Heuer 02', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 3, brandTier: 2, style: 'chrono',
  },
  {
    brand: 'TAG Heuer', model: 'Aquaracer Professional 300', reference: 'WBP201B.BA0632', year: 2021,
    caseDiameter: 43, caseThickness: 12.2, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. TH30-00', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'TAG Heuer', model: 'Carrera Calibre 16', reference: 'CV2A1R.BA0799', year: 2018,
    caseDiameter: 41, caseThickness: 15, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 16', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'chrono',
  },
  {
    brand: 'TAG Heuer', model: 'Formula 1 Chronograph', reference: 'CAZ1011.BA0842', year: 2019,
    caseDiameter: 43, caseThickness: 12.2, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. Ronda 5040.D', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 2, style: 'chrono',
  },
  {
    brand: 'TAG Heuer', model: 'Autavia', reference: 'WBE5114.EB0173', year: 2019,
    caseDiameter: 42, caseThickness: 14.3, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Heuer 02', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 2, brandTier: 2, style: 'sport',
  },
  {
    brand: 'TAG Heuer', model: 'Connected', reference: 'SBR8A10.BT6261', year: 2022,
    caseDiameter: 45, caseThickness: 13.5, waterResistance: 100, movement: 'Quartz',
    caliber: null, powerReserve: null, caseMaterial: 'Titanium',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 2, brandTier: 2, style: 'sport',
  },
  {
    brand: 'TAG Heuer', model: 'Link Calibre 5', reference: 'WBC2110.BA0603', year: 2018,
    caseDiameter: 41, caseThickness: 12.3, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 5', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'sport',
  },
  {
    brand: 'TAG Heuer', model: 'Carrera Calibre Heuer 01', reference: 'CAR201V.BA0714', year: 2016,
    caseDiameter: 43, caseThickness: 16.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Heuer 01', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 39,
    cosc: false, priceRange: 2, brandTier: 2, style: 'chrono',
  },
  {
    brand: 'TAG Heuer', model: 'Monaco Gulf Special Edition', reference: 'CBL2115.FC6494', year: 2021,
    caseDiameter: 39, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Heuer 02', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 3, brandTier: 2, style: 'chrono',
  },
  {
    brand: 'TAG Heuer', model: 'Aquaracer Professional 200', reference: 'WBP2111.BA0627', year: 2022,
    caseDiameter: 40, caseThickness: 12, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 5', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'TAG Heuer', model: 'Carrera Day-Date', reference: 'WAR201E.BA0723', year: 2018,
    caseDiameter: 41, caseThickness: 11, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 5', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'sport',
  },
  {
    brand: 'TAG Heuer', model: 'Formula 1 Quartz', reference: 'WAZ1110.BA0875', year: 2019,
    caseDiameter: 41, caseThickness: 11.3, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. Ronda 6003.H', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 2, style: 'sport',
  },
  {
    brand: 'TAG Heuer', model: 'Carrera Porsche', reference: 'CBN2A1F.BA0643', year: 2021,
    caseDiameter: 44, caseThickness: 15.3, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Heuer 02', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 3, brandTier: 2, style: 'chrono',
  },
  {
    brand: 'TAG Heuer', model: 'Heritage Calibre Heuer 02', reference: 'CBE2110.BA0687', year: 2019,
    caseDiameter: 42, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Heuer 02', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 33,
    cosc: false, priceRange: 2, brandTier: 2, style: 'chrono',
  },

  // ===== TUDOR (15) =====
  {
    brand: 'Tudor', model: 'Black Bay 58', reference: 'M79030N-0001', year: 2018,
    caseDiameter: 39, caseThickness: 11.9, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5402', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Tudor', model: 'Black Bay', reference: 'M7941A1A0RU-0001', year: 2022,
    caseDiameter: 41, caseThickness: 12.7, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5602', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Tudor', model: 'Pelagos 39', reference: 'M25407N-0001', year: 2022,
    caseDiameter: 39, caseThickness: 12.3, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5400', powerReserve: 70, caseMaterial: 'Titanium',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Tudor', model: 'Black Bay Chrono', reference: 'M79360N-0002', year: 2021,
    caseDiameter: 41, caseThickness: 14.9, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5813', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 35,
    cosc: true, priceRange: 2, brandTier: 2, style: 'chrono',
  },
  {
    brand: 'Tudor', model: 'Pelagos', reference: 'M25600TN-0001', year: 2015,
    caseDiameter: 42, caseThickness: 14.3, waterResistance: 500, movement: 'Automatic',
    caliber: 'Cal. MT5612', powerReserve: 70, caseMaterial: 'Titanium',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Tudor', model: 'Black Bay GMT', reference: 'M79830RB-0001', year: 2018,
    caseDiameter: 41, caseThickness: 14.8, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5652', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'sport',
  },
  {
    brand: 'Tudor', model: 'Black Bay Fifty-Eight Navy Blue', reference: 'M79030B-0001', year: 2020,
    caseDiameter: 39, caseThickness: 11.9, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5402', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Tudor', model: 'Black Bay Pro', reference: 'M79470-0001', year: 2022,
    caseDiameter: 39, caseThickness: 14.6, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5652', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'sport',
  },
  {
    brand: 'Tudor', model: 'Ranger', reference: 'M79950-0001', year: 2022,
    caseDiameter: 39, caseThickness: 12, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. MT5402', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'field',
  },
  {
    brand: 'Tudor', model: 'Royal', reference: 'M28500-0005', year: 2020,
    caseDiameter: 41, caseThickness: 11, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. T601', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Tudor', model: 'Black Bay Ceramic', reference: 'M79210CNU-0001', year: 2021,
    caseDiameter: 41, caseThickness: 14.4, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5602-1U', powerReserve: 70, caseMaterial: 'Ceramic',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Tudor', model: 'Black Bay Bronze', reference: 'M79250BA-0001', year: 2016,
    caseDiameter: 43, caseThickness: 14.7, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5601', powerReserve: 70, caseMaterial: 'Bronze',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Tudor', model: 'Black Bay S&G', reference: 'M79733N-0008', year: 2018,
    caseDiameter: 41, caseThickness: 14.8, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. MT5612', powerReserve: 70, caseMaterial: 'Steel and gold',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Tudor', model: '1926', reference: 'M91550-0001', year: 2018,
    caseDiameter: 41, caseThickness: 10, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. T601', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Tudor', model: 'Style', reference: 'M12510-0001', year: 2019,
    caseDiameter: 41, caseThickness: 10, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. T601', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },

  // ===== CARTIER (10) =====
  {
    brand: 'Cartier', model: 'Santos de Cartier Medium', reference: 'WSSA0029', year: 2018,
    caseDiameter: 35.1, caseThickness: 8.83, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 1847 MC', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 20,
    cosc: false, priceRange: 3, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Cartier', model: 'Santos de Cartier Large', reference: 'WSSA0018', year: 2018,
    caseDiameter: 39.8, caseThickness: 9.08, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 1847 MC', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 20,
    cosc: false, priceRange: 3, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Cartier', model: 'Tank Francaise', reference: 'WSTA0065', year: 2023,
    caseDiameter: 36.7, caseThickness: 8.15, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 1853 MC', powerReserve: 40, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: false, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Cartier', model: 'Tank Must', reference: 'WSTA0041', year: 2021,
    caseDiameter: 33.7, caseThickness: 6.6, waterResistance: 30, movement: 'Quartz',
    caliber: 'Cal. 690', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 2, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Cartier', model: 'Ballon Bleu 40mm', reference: 'WSBB0040', year: 2019,
    caseDiameter: 40, caseThickness: 12.4, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 1847 MC', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 20,
    cosc: false, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Cartier', model: 'Pasha de Cartier', reference: 'WSPA0009', year: 2020,
    caseDiameter: 41, caseThickness: 9.55, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 1847 MC', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 20,
    cosc: false, priceRange: 3, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Cartier', model: 'Drive de Cartier', reference: 'WSNM0004', year: 2016,
    caseDiameter: 40, caseThickness: 11.25, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 1904-PS MC', powerReserve: 48, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27,
    cosc: false, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Cartier', model: 'Santos-Dumont', reference: 'WSSA0022', year: 2019,
    caseDiameter: 43.5, caseThickness: 7.3, waterResistance: 30, movement: 'Quartz',
    caliber: 'Cal. 430 MC', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 2, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Cartier', model: 'Ronde Solo de Cartier', reference: 'WSRN0021', year: 2018,
    caseDiameter: 42, caseThickness: 11.3, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 049', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 20,
    cosc: false, priceRange: 2, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Cartier', model: 'Panthere de Cartier', reference: 'WSPN0007', year: 2017,
    caseDiameter: 27, caseThickness: 6, waterResistance: 30, movement: 'Quartz',
    caliber: 'Cal. 157', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 2, brandTier: 4, style: 'dress',
  },

  // ===== GRAND SEIKO (10) =====
  {
    brand: 'Grand Seiko', model: 'Snowflake SBGA211', reference: 'SBGA211', year: 2016,
    caseDiameter: 41, caseThickness: 12.5, waterResistance: 100, movement: 'Spring Drive',
    caliber: 'Cal. 9R65', powerReserve: 72, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: null, jewels: 30,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Grand Seiko', model: 'Heritage Hi-Beat SBGH205', reference: 'SBGH205', year: 2017,
    caseDiameter: 40, caseThickness: 13, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 9S85', powerReserve: 55, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 37,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Grand Seiko', model: 'Evolution 9 Diver SLGA015', reference: 'SLGA015', year: 2023,
    caseDiameter: 43.8, caseThickness: 14.7, waterResistance: 200, movement: 'Spring Drive',
    caliber: 'Cal. 9RA5', powerReserve: 120, caseMaterial: 'Titanium',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: null, jewels: 31,
    cosc: false, priceRange: 4, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Grand Seiko', model: 'Heritage SBGR261', reference: 'SBGR261', year: 2016,
    caseDiameter: 40.2, caseThickness: 13.3, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 9S65', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4.5, jewels: 35,
    cosc: false, priceRange: 2, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Grand Seiko', model: 'Spring Drive GMT SBGE255', reference: 'SBGE255', year: 2020,
    caseDiameter: 40.5, caseThickness: 13.8, waterResistance: 100, movement: 'Spring Drive',
    caliber: 'Cal. 9R66', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: 30,
    cosc: false, priceRange: 3, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Grand Seiko', model: 'Heritage SBGW231', reference: 'SBGW231', year: 2017,
    caseDiameter: 37.3, caseThickness: 11.6, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. 9S64', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4.5, jewels: 24,
    cosc: false, priceRange: 2, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Grand Seiko', model: 'Spring Drive SBGA413', reference: 'SBGA413', year: 2020,
    caseDiameter: 40, caseThickness: 12.3, waterResistance: 100, movement: 'Spring Drive',
    caliber: 'Cal. 9R65', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: 30,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Grand Seiko', model: 'Heritage Seasons SBGH271', reference: 'SBGH271', year: 2019,
    caseDiameter: 40, caseThickness: 13, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 9S85', powerReserve: 55, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 37,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Grand Seiko', model: '44GS SBGW251', reference: 'SBGW251', year: 2019,
    caseDiameter: 36.5, caseThickness: 11.6, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. 9S64', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4.5, jewels: 24,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Grand Seiko', model: 'Evolution 9 SLGH005', reference: 'SLGH005', year: 2020,
    caseDiameter: 40, caseThickness: 11.7, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 9SA5', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 47,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },

  // ===== JAEGER-LECOULTRE (10) =====
  {
    brand: 'Jaeger-LeCoultre', model: 'Reverso Classic Medium', reference: '2548520', year: 2016,
    caseDiameter: 40.1, caseThickness: 9.15, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. 822/2', powerReserve: 45, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 19,
    cosc: false, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Master Ultra Thin Moon', reference: '1368420', year: 2015,
    caseDiameter: 39, caseThickness: 9.9, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 925/1', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 37,
    cosc: false, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Master Control Date', reference: '4018420', year: 2020,
    caseDiameter: 40, caseThickness: 8.5, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 899', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 32,
    cosc: false, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Polaris Automatic', reference: '9008471', year: 2018,
    caseDiameter: 41, caseThickness: 11.3, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 898E/1', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 32,
    cosc: false, priceRange: 3, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Reverso Tribute', reference: '3978480', year: 2016,
    caseDiameter: 45.6, caseThickness: 9.73, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. 822', powerReserve: 45, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 19,
    cosc: false, priceRange: 3, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Master Geographic', reference: '4128420', year: 2020,
    caseDiameter: 40, caseThickness: 11.2, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 939', powerReserve: 40, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 41,
    cosc: false, priceRange: 4, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Polaris Chronograph', reference: '9028170', year: 2018,
    caseDiameter: 42, caseThickness: 14.4, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 751H', powerReserve: 65, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 37,
    cosc: false, priceRange: 3, brandTier: 4, style: 'chrono',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Master Calendar', reference: '4148420', year: 2020,
    caseDiameter: 40, caseThickness: 10.9, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 866', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 37,
    cosc: false, priceRange: 4, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Duometre Chronograph', reference: '6012521', year: 2019,
    caseDiameter: 42, caseThickness: 14.3, waterResistance: 50, movement: 'Manual',
    caliber: 'Cal. 380', powerReserve: 50, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 3, jewels: 52,
    cosc: false, priceRange: 5, brandTier: 4, style: 'chrono',
  },
  {
    brand: 'Jaeger-LeCoultre', model: 'Geophysic Universal Time', reference: '8108420', year: 2017,
    caseDiameter: 41.6, caseThickness: 11.5, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 772', powerReserve: 40, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 36,
    cosc: false, priceRange: 4, brandTier: 4, style: 'dress',
  },

  // ===== VACHERON CONSTANTIN (10) =====
  {
    brand: 'Vacheron Constantin', model: 'Overseas 4500V', reference: '4500V/110A-B483', year: 2016,
    caseDiameter: 41, caseThickness: 11, waterResistance: 150, movement: 'Automatic',
    caliber: 'Cal. 5100', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 36,
    cosc: true, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Vacheron Constantin', model: 'Patrimony', reference: '85180/000G-9230', year: 2014,
    caseDiameter: 40, caseThickness: 8.1, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 2450 Q6', powerReserve: 40, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 27,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Vacheron Constantin', model: 'Fiftysix', reference: '4600E/000A-B487', year: 2018,
    caseDiameter: 40, caseThickness: 9.6, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 1326', powerReserve: 48, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 4, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Vacheron Constantin', model: 'Overseas Chronograph 5500V', reference: '5500V/110A-B481', year: 2016,
    caseDiameter: 42.5, caseThickness: 12.9, waterResistance: 150, movement: 'Automatic',
    caliber: 'Cal. 5200', powerReserve: 52, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 37,
    cosc: true, priceRange: 5, brandTier: 5, style: 'chrono',
  },
  {
    brand: 'Vacheron Constantin', model: 'Patrimony Perpetual Calendar', reference: '43175/000R-9687', year: 2010,
    caseDiameter: 41, caseThickness: 10.2, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 1120 QP', powerReserve: 40, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 2.75, jewels: 36,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Vacheron Constantin', model: 'Historiques American 1921', reference: '1100S/000G-B734', year: 2021,
    caseDiameter: 40, caseThickness: 8.06, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. 4400 AS', powerReserve: 65, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Vacheron Constantin', model: 'Traditionnelle', reference: '87172/000G-9301', year: 2015,
    caseDiameter: 38, caseThickness: 8.1, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. 4400', powerReserve: 65, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: true, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'Vacheron Constantin', model: 'Overseas Dual Time 7900V', reference: '7900V/110A-B334', year: 2016,
    caseDiameter: 41, caseThickness: 12.6, waterResistance: 150, movement: 'Automatic',
    caliber: 'Cal. 5110 DT', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 36,
    cosc: true, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'Vacheron Constantin', model: 'Harmony Chronograph', reference: '5000H/000A-B582', year: 2015,
    caseDiameter: 42, caseThickness: 11.6, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 3300', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 36,
    cosc: true, priceRange: 5, brandTier: 5, style: 'chrono',
  },
  {
    brand: 'Vacheron Constantin', model: 'Fiftysix Complete Calendar', reference: '4000E/000A-B548', year: 2018,
    caseDiameter: 40, caseThickness: 11.6, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 2460 QCL/1', powerReserve: 40, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27,
    cosc: true, priceRange: 4, brandTier: 5, style: 'dress',
  },

  // ===== PANERAI (10) =====
  {
    brand: 'Panerai', model: 'Luminor Marina 44mm', reference: 'PAM01312', year: 2019,
    caseDiameter: 44, caseThickness: 15.6, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. P.9010', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Panerai', model: 'Submersible 42mm', reference: 'PAM00683', year: 2019,
    caseDiameter: 42, caseThickness: 14.2, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. P.9010', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Panerai', model: 'Radiomir 45mm', reference: 'PAM00995', year: 2020,
    caseDiameter: 45, caseThickness: 14, waterResistance: 100, movement: 'Manual',
    caliber: 'Cal. P.6000', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 19,
    cosc: true, priceRange: 3, brandTier: 3, style: 'field',
  },
  {
    brand: 'Panerai', model: 'Luminor Due 42mm', reference: 'PAM00904', year: 2019,
    caseDiameter: 42, caseThickness: 10.7, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. P.900', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 19,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Panerai', model: 'Luminor GMT', reference: 'PAM01535', year: 2020,
    caseDiameter: 44, caseThickness: 15.6, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. P.9011', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 3, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Panerai', model: 'Luminor Chrono', reference: 'PAM01110', year: 2020,
    caseDiameter: 44, caseThickness: 16.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. P.9200', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 37,
    cosc: true, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Panerai', model: 'Submersible Azzurro', reference: 'PAM01209', year: 2021,
    caseDiameter: 42, caseThickness: 14.2, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. P.9010', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 3, brandTier: 3, style: 'diver',
  },
  {
    brand: 'Panerai', model: 'Radiomir California', reference: 'PAM00931', year: 2018,
    caseDiameter: 47, caseThickness: 16, waterResistance: 100, movement: 'Manual',
    caliber: 'Cal. P.3000', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 21,
    cosc: true, priceRange: 3, brandTier: 3, style: 'field',
  },
  {
    brand: 'Panerai', model: 'Luminor Base Logo', reference: 'PAM00774', year: 2018,
    caseDiameter: 44, caseThickness: 15.6, waterResistance: 300, movement: 'Manual',
    caliber: 'Cal. P.6000', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 19,
    cosc: true, priceRange: 2, brandTier: 3, style: 'field',
  },
  {
    brand: 'Panerai', model: 'Luminor Power Reserve', reference: 'PAM01090', year: 2019,
    caseDiameter: 44, caseThickness: 15.6, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. P.9010', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 31,
    cosc: true, priceRange: 3, brandTier: 3, style: 'sport',
  },

  // ===== HUBLOT (10) =====
  {
    brand: 'Hublot', model: 'Big Bang Unico', reference: '441.NX.1170.RX', year: 2020,
    caseDiameter: 42, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. HUB1280', powerReserve: 72, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 38,
    cosc: false, priceRange: 4, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Hublot', model: 'Classic Fusion', reference: '511.NX.1171.RX', year: 2019,
    caseDiameter: 45, caseThickness: 11, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. HUB1112', powerReserve: 42, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Hublot', model: 'Spirit of Big Bang', reference: '601.NX.0173.LR', year: 2019,
    caseDiameter: 42, caseThickness: 13.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. HUB4700', powerReserve: 50, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 32,
    cosc: false, priceRange: 4, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Hublot', model: 'Big Bang Integral', reference: '451.NX.1170.NX', year: 2020,
    caseDiameter: 42, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. HUB1280', powerReserve: 72, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 38,
    cosc: false, priceRange: 4, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Hublot', model: 'Classic Fusion Chronograph', reference: '521.NX.1171.RX', year: 2019,
    caseDiameter: 45, caseThickness: 13.9, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. HUB1143', powerReserve: 42, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Hublot', model: 'Big Bang Meca-10', reference: '414.NI.1123.RX', year: 2018,
    caseDiameter: 45, caseThickness: 16.9, waterResistance: 100, movement: 'Manual',
    caliber: 'Cal. HUB1201', powerReserve: 240, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 3, jewels: 31,
    cosc: false, priceRange: 4, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Hublot', model: 'Classic Fusion Orlinski', reference: '550.NS.1800.RX.ORL19', year: 2019,
    caseDiameter: 40, caseThickness: 10.1, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. HUB1100', powerReserve: 42, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Hublot', model: 'Big Bang One Click', reference: '465.SX.2010.RX', year: 2020,
    caseDiameter: 39, caseThickness: 13, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. HUB1710', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 3, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Hublot', model: 'King Power', reference: '701.NX.0170.RX', year: 2017,
    caseDiameter: 48, caseThickness: 17.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. HUB4245', powerReserve: 72, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 44,
    cosc: false, priceRange: 4, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Hublot', model: 'MP-11', reference: '911.NX.0171.RX', year: 2018,
    caseDiameter: 45, caseThickness: 16, waterResistance: 50, movement: 'Manual',
    caliber: 'Cal. HUB9011', powerReserve: 336, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 3, jewels: 29,
    cosc: false, priceRange: 5, brandTier: 3, style: 'sport',
  },

  // ===== ZENITH (10) =====
  {
    brand: 'Zenith', model: 'Chronomaster Sport', reference: '03.3100.3600/69.M3100', year: 2021,
    caseDiameter: 41, caseThickness: 12.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'El Primero 3600', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 5, jewels: 31,
    cosc: false, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Zenith', model: 'Defy Skyline', reference: '03.9300.3620/78.I001', year: 2022,
    caseDiameter: 41, caseThickness: 10.7, waterResistance: 100, movement: 'Automatic',
    caliber: 'El Primero 3620', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 26,
    cosc: false, priceRange: 3, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Zenith', model: 'Chronomaster Original', reference: '03.3200.3600/21.C901', year: 2021,
    caseDiameter: 38, caseThickness: 12.6, waterResistance: 50, movement: 'Automatic',
    caliber: 'El Primero 3600', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 31,
    cosc: false, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Zenith', model: 'Pilot Type 20', reference: '11.1940.679/91.C807', year: 2019,
    caseDiameter: 45, caseThickness: 13.7, waterResistance: 100, movement: 'Automatic',
    caliber: 'Elite 679', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 3, style: 'pilot',
  },
  {
    brand: 'Zenith', model: 'Defy Classic', reference: '95.9000.670/78.R782', year: 2019,
    caseDiameter: 41, caseThickness: 10.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Elite 670', powerReserve: 50, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 3, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Zenith', model: 'Defy El Primero 21', reference: '95.9000.9004/78.R782', year: 2017,
    caseDiameter: 44, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'El Primero 9004', powerReserve: 50, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 50, jewels: 60,
    cosc: false, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Zenith', model: 'Chronomaster Revival', reference: '97.A384.400/21.C815', year: 2019,
    caseDiameter: 37, caseThickness: 12.6, waterResistance: 50, movement: 'Automatic',
    caliber: 'El Primero 400', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 5, jewels: 31,
    cosc: false, priceRange: 3, brandTier: 3, style: 'chrono',
  },
  {
    brand: 'Zenith', model: 'Defy Midnight', reference: '16.9200.670/01.MI001', year: 2020,
    caseDiameter: 36, caseThickness: 9.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Elite 670', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Zenith', model: 'Elite Classic', reference: '03.3100.670/01.C922', year: 2019,
    caseDiameter: 40.5, caseThickness: 8.9, waterResistance: 50, movement: 'Automatic',
    caliber: 'Elite 670', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Zenith', model: 'Pilot Automatic', reference: '03.2430.693/21.C723', year: 2019,
    caseDiameter: 40, caseThickness: 12.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Elite 693', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 3, style: 'pilot',
  },

  // ===== LONGINES (15) =====
  {
    brand: 'Longines', model: 'Master Collection', reference: 'L2.793.4.78.3', year: 2019,
    caseDiameter: 40, caseThickness: 10.2, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. L888.5', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Longines', model: 'HydroConquest', reference: 'L3.781.4.56.9', year: 2018,
    caseDiameter: 41, caseThickness: 12.2, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. L888.5', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Longines', model: 'Spirit', reference: 'L3.810.4.53.6', year: 2020,
    caseDiameter: 40, caseThickness: 11.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. L888.4', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: true, priceRange: 1, brandTier: 2, style: 'pilot',
  },
  {
    brand: 'Longines', model: 'Conquest Classic', reference: 'L2.785.4.56.6', year: 2019,
    caseDiameter: 40, caseThickness: 9.6, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. L888.2', powerReserve: 64, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'sport',
  },
  {
    brand: 'Longines', model: 'Legend Diver', reference: 'L3.774.4.90.2', year: 2019,
    caseDiameter: 42, caseThickness: 14.7, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. L888.5', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Longines', model: 'Heritage Classic', reference: 'L2.828.4.73.2', year: 2020,
    caseDiameter: 38.5, caseThickness: 11.7, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. L893.5', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Longines', model: 'Flagship Heritage', reference: 'L4.795.4.78.2', year: 2017,
    caseDiameter: 38.5, caseThickness: 9.5, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. L619', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Longines', model: 'Record', reference: 'L2.821.4.11.6', year: 2017,
    caseDiameter: 40, caseThickness: 10.7, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. L888.4', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: true, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Longines', model: 'Spirit Zulu Time', reference: 'L3.812.4.63.6', year: 2022,
    caseDiameter: 42, caseThickness: 13.7, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. L844.4', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 25,
    cosc: true, priceRange: 2, brandTier: 2, style: 'pilot',
  },
  {
    brand: 'Longines', model: 'DolceVita', reference: 'L5.755.4.71.0', year: 2019,
    caseDiameter: 27.7, caseThickness: 7.5, waterResistance: 30, movement: 'Quartz',
    caliber: 'Cal. L178', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Longines', model: 'Conquest V.H.P.', reference: 'L3.716.4.76.6', year: 2017,
    caseDiameter: 41, caseThickness: 10.7, waterResistance: 50, movement: 'Quartz',
    caliber: 'Cal. L289.2', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 2, style: 'sport',
  },
  {
    brand: 'Longines', model: 'La Grande Classique', reference: 'L4.709.4.11.6', year: 2019,
    caseDiameter: 36, caseThickness: 5.3, waterResistance: 30, movement: 'Quartz',
    caliber: 'Cal. L209', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Longines', model: 'Elegant Collection', reference: 'L4.910.4.72.2', year: 2019,
    caseDiameter: 39, caseThickness: 9.3, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. L888.2', powerReserve: 64, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Longines', model: 'Evidenza', reference: 'L2.643.4.73.4', year: 2018,
    caseDiameter: 33.1, caseThickness: 10.3, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. L602.2', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 17,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Longines', model: 'Presence', reference: 'L4.921.4.11.6', year: 2019,
    caseDiameter: 38.5, caseThickness: 8.5, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. L888.2', powerReserve: 64, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },

  // ===== TISSOT (15) =====
  {
    brand: 'Tissot', model: 'PRX', reference: 'T137.410.11.041.00', year: 2021,
    caseDiameter: 40, caseThickness: 10.4, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. ETA F06.115', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Tissot', model: 'PRX Powermatic 80', reference: 'T137.407.11.041.00', year: 2021,
    caseDiameter: 40, caseThickness: 10.9, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Powermatic 80', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 23,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Tissot', model: 'Gentleman Powermatic 80', reference: 'T127.407.11.041.00', year: 2019,
    caseDiameter: 40, caseThickness: 10.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Powermatic 80.111', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 23,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Tissot', model: 'Seastar 1000', reference: 'T120.407.11.041.02', year: 2020,
    caseDiameter: 43, caseThickness: 12.7, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. Powermatic 80', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 3.5, jewels: 23,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Tissot', model: 'Le Locle Powermatic 80', reference: 'T006.407.11.033.00', year: 2018,
    caseDiameter: 39.3, caseThickness: 9.8, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. Powermatic 80', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 23,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Tissot', model: 'Heritage Visodate', reference: 'T118.430.11.271.00', year: 2019,
    caseDiameter: 40, caseThickness: 11.6, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. Powermatic 80', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 23,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Tissot', model: 'Chrono XL', reference: 'T116.617.11.047.01', year: 2018,
    caseDiameter: 45, caseThickness: 11.4, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. ETA G10.212', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'chrono',
  },
  {
    brand: 'Tissot', model: 'PR 516', reference: 'T131.617.11.052.00', year: 2022,
    caseDiameter: 40, caseThickness: 11.9, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. ETA G10.212', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'chrono',
  },
  {
    brand: 'Tissot', model: 'T-Sport Supersport', reference: 'T125.610.11.051.00', year: 2020,
    caseDiameter: 40, caseThickness: 10.7, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. ETA F06.115', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Tissot', model: 'Carson Premium', reference: 'T122.410.11.033.00', year: 2019,
    caseDiameter: 40, caseThickness: 7.6, waterResistance: 50, movement: 'Quartz',
    caliber: 'Cal. ETA F06.115', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Tissot', model: 'Chemin des Tourelles', reference: 'T099.407.11.048.00', year: 2018,
    caseDiameter: 42, caseThickness: 11.4, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. Powermatic 80', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 23,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Tissot', model: 'Classic Dream', reference: 'T129.410.11.013.00', year: 2020,
    caseDiameter: 42, caseThickness: 6.9, waterResistance: 30, movement: 'Quartz',
    caliber: 'Cal. ETA F06.115', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Tissot', model: 'V8', reference: 'T106.417.11.051.00', year: 2018,
    caseDiameter: 42.5, caseThickness: 11.3, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. ETA G10.212', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'chrono',
  },
  {
    brand: 'Tissot', model: 'Ballade', reference: 'T108.408.22.037.00', year: 2018,
    caseDiameter: 41, caseThickness: 10.3, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. Powermatic 80.111', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 23,
    cosc: true, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Tissot', model: 'Navigator 3000', reference: 'T048.225.27.057.00', year: 2016,
    caseDiameter: 43, caseThickness: 14.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. C01.211', powerReserve: 45, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },

  // ===== SEIKO (15) =====
  {
    brand: 'Seiko', model: 'Presage Cocktail Time', reference: 'SRPB43', year: 2017,
    caseDiameter: 40.5, caseThickness: 11.8, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 4R35', powerReserve: 41, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Hardlex', frequency: 3, jewels: 23,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Seiko', model: 'Prospex SPB143', reference: 'SPB143', year: 2020,
    caseDiameter: 40.5, caseThickness: 13.2, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 6R35', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Seiko', model: 'Prospex King Turtle', reference: 'SRPE03', year: 2019,
    caseDiameter: 45, caseThickness: 13.4, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 4R36', powerReserve: 41, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Hardlex', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Seiko', model: 'Presage Sharp Edged', reference: 'SPB167', year: 2020,
    caseDiameter: 39.3, caseThickness: 11.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 6R35', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Seiko', model: 'Prospex Willard', reference: 'SPB151', year: 2020,
    caseDiameter: 42.7, caseThickness: 13.7, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 6R35', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Seiko', model: 'Prospex Sumo', reference: 'SPB101', year: 2019,
    caseDiameter: 45, caseThickness: 12.7, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 6R35', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Seiko', model: 'Presage Arita', reference: 'SPB171', year: 2020,
    caseDiameter: 40.5, caseThickness: 12.4, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 6R35', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Seiko', model: '5 Sports SRPD', reference: 'SRPD55', year: 2019,
    caseDiameter: 42.5, caseThickness: 13.4, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 4R36', powerReserve: 41, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Hardlex', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Seiko', model: 'King Seiko', reference: 'SPB279', year: 2022,
    caseDiameter: 37, caseThickness: 11.9, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 6R55', powerReserve: 70, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Seiko', model: 'Astron GPS Solar', reference: 'SSH063', year: 2020,
    caseDiameter: 42.7, caseThickness: 13.3, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 5X53', powerReserve: null, caseMaterial: 'Titanium',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 2, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Seiko', model: 'Prospex Samurai', reference: 'SRPD23', year: 2019,
    caseDiameter: 43.8, caseThickness: 12.8, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 4R35', powerReserve: 41, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Hardlex', frequency: 3, jewels: 23,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Seiko', model: 'Prospex Monster', reference: 'SRPD25', year: 2019,
    caseDiameter: 42.4, caseThickness: 13.1, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. 4R36', powerReserve: 41, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Hardlex', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Seiko', model: 'Presage Zen Garden', reference: 'SSA397', year: 2019,
    caseDiameter: 40.5, caseThickness: 11.8, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. 4R39', powerReserve: 41, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Hardlex', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Seiko', model: 'Prospex LX', reference: 'SNR029', year: 2019,
    caseDiameter: 44.8, caseThickness: 15.7, waterResistance: 300, movement: 'Spring Drive',
    caliber: 'Cal. 5R65', powerReserve: 72, caseMaterial: 'Titanium',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: null, jewels: 30,
    cosc: false, priceRange: 2, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Seiko', model: '5 Sports GMT', reference: 'SSK001', year: 2023,
    caseDiameter: 42.5, caseThickness: 13.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 4R34', powerReserve: 41, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Hardlex', frequency: 3, jewels: 24,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },

  // ===== CITIZEN (10) =====
  {
    brand: 'Citizen', model: 'Promaster Diver', reference: 'BN0151-09L', year: 2018,
    caseDiameter: 44, caseThickness: 12, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. E168', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Citizen', model: 'Eco-Drive One', reference: 'AR5000-50E', year: 2018,
    caseDiameter: 39, caseThickness: 2.98, waterResistance: 30, movement: 'Quartz',
    caliber: 'Cal. 8826', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 2, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Citizen', model: 'Promaster Navihawk', reference: 'JY8035-04E', year: 2019,
    caseDiameter: 48, caseThickness: 16.5, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. U680', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'pilot',
  },
  {
    brand: 'Citizen', model: 'Eco-Drive Titanium', reference: 'BM7360-82E', year: 2018,
    caseDiameter: 41, caseThickness: 9.2, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. E111', powerReserve: null, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Citizen', model: 'Promaster Aqualand', reference: 'BN2038-01L', year: 2019,
    caseDiameter: 46, caseThickness: 15.4, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. J250', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Citizen', model: 'Attesa', reference: 'CB5040-80E', year: 2019,
    caseDiameter: 42, caseThickness: 9.9, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. H145', powerReserve: null, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Citizen', model: 'Exceed', reference: 'CB1080-52A', year: 2019,
    caseDiameter: 38, caseThickness: 9.5, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. H149', powerReserve: null, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Citizen', model: 'Promaster Tough', reference: 'BN0211-09X', year: 2020,
    caseDiameter: 42, caseThickness: 11.7, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. E168', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'field',
  },
  {
    brand: 'Citizen', model: 'Series 8', reference: 'NA1004-87E', year: 2021,
    caseDiameter: 40.8, caseThickness: 11.4, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 0950', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 28,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Citizen', model: 'Corso', reference: 'BM7100-59E', year: 2019,
    caseDiameter: 41, caseThickness: 8.5, waterResistance: 100, movement: 'Quartz',
    caliber: 'Cal. E111', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },

  // ===== CASIO G-SHOCK (10) =====
  {
    brand: 'Casio G-Shock', model: 'MR-G', reference: 'MRG-B2000B-1A', year: 2020,
    caseDiameter: 49.8, caseThickness: 16.9, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 5634', powerReserve: null, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 2, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Casio G-Shock', model: 'MT-G', reference: 'MTG-B2000D-1A', year: 2021,
    caseDiameter: 51, caseThickness: 15.9, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 5612', powerReserve: null, caseMaterial: 'Stainless steel and resin',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Casio G-Shock', model: 'GM-B2100', reference: 'GM-B2100D-1A', year: 2022,
    caseDiameter: 44.4, caseThickness: 12.8, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 5610', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Casio G-Shock', model: 'GW-5000', reference: 'GW-5000U-1JF', year: 2021,
    caseDiameter: 42.8, caseThickness: 13.5, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 3459', powerReserve: null, caseMaterial: 'Resin with stainless steel',
    bezelMaterial: 'Resin', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Casio G-Shock', model: 'Full Metal GMW-B5000', reference: 'GMW-B5000D-1', year: 2018,
    caseDiameter: 43.2, caseThickness: 13, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 3461', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Casio G-Shock', model: 'Mudmaster GWG-2000', reference: 'GWG-2000-1A3', year: 2021,
    caseDiameter: 53.5, caseThickness: 16.7, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 5636', powerReserve: null, caseMaterial: 'Carbon and resin',
    bezelMaterial: 'Carbon', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'field',
  },
  {
    brand: 'Casio G-Shock', model: 'Rangeman GPR-B1000', reference: 'GPR-B1000-1', year: 2018,
    caseDiameter: 57.7, caseThickness: 20.2, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 5533', powerReserve: null, caseMaterial: 'Carbon fiber reinforced resin',
    bezelMaterial: 'Carbon', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'field',
  },
  {
    brand: 'Casio G-Shock', model: 'Frogman GWF-A1000', reference: 'GWF-A1000-1A', year: 2020,
    caseDiameter: 53.3, caseThickness: 18.3, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 5623', powerReserve: null, caseMaterial: 'Carbon fiber reinforced resin',
    bezelMaterial: 'Resin', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },
  {
    brand: 'Casio G-Shock', model: 'CasiOak GA-2100', reference: 'GA-2100-1A1', year: 2019,
    caseDiameter: 45.4, caseThickness: 11.8, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 5611', powerReserve: null, caseMaterial: 'Carbon Core Guard resin',
    bezelMaterial: 'Resin', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },
  {
    brand: 'Casio G-Shock', model: 'DW-5600', reference: 'DW-5600E-1V', year: 1996,
    caseDiameter: 42.8, caseThickness: 13.4, waterResistance: 200, movement: 'Quartz',
    caliber: 'Cal. 3229', powerReserve: null, caseMaterial: 'Resin',
    bezelMaterial: 'Resin', crystal: 'Mineral', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 1, style: 'sport',
  },

  // ===== ADDITIONAL WATCHES TO REACH 300+ =====

  // A. Lange & Sohne (5)
  {
    brand: 'A. Lange & Sohne', model: 'Lange 1', reference: '191.032', year: 2015,
    caseDiameter: 38.5, caseThickness: 10.7, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. L121.1', powerReserve: 72, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 3, jewels: 56,
    cosc: false, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'A. Lange & Sohne', model: 'Saxonia Thin', reference: '201.027', year: 2016,
    caseDiameter: 40, caseThickness: 5.9, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. L093.1', powerReserve: 72, caseMaterial: '18k white gold',
    bezelMaterial: 'White gold', crystal: 'Sapphire', frequency: 3, jewels: 21,
    cosc: false, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'A. Lange & Sohne', model: 'Zeitwerk', reference: '140.032', year: 2009,
    caseDiameter: 41.9, caseThickness: 12.6, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. L043.1', powerReserve: 36, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 3, jewels: 73,
    cosc: false, priceRange: 5, brandTier: 5, style: 'dress',
  },
  {
    brand: 'A. Lange & Sohne', model: 'Odysseus', reference: '363.068', year: 2019,
    caseDiameter: 40.5, caseThickness: 11.1, waterResistance: 120, movement: 'Automatic',
    caliber: 'Cal. L155.1 DAT', powerReserve: 50, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 32,
    cosc: false, priceRange: 5, brandTier: 5, style: 'sport',
  },
  {
    brand: 'A. Lange & Sohne', model: 'Datograph Up/Down', reference: '405.031', year: 2012,
    caseDiameter: 41, caseThickness: 13.1, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. L951.6', powerReserve: 60, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 3, jewels: 46,
    cosc: false, priceRange: 5, brandTier: 5, style: 'chrono',
  },

  // Blancpain (5)
  {
    brand: 'Blancpain', model: 'Fifty Fathoms', reference: '5015-1130-52', year: 2017,
    caseDiameter: 45, caseThickness: 15.5, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 1315', powerReserve: 120, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 35,
    cosc: false, priceRange: 4, brandTier: 4, style: 'diver',
  },
  {
    brand: 'Blancpain', model: 'Fifty Fathoms Bathyscaphe', reference: '5000-0130-B52A', year: 2019,
    caseDiameter: 43, caseThickness: 13.4, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. 1315', powerReserve: 120, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 35,
    cosc: false, priceRange: 4, brandTier: 4, style: 'diver',
  },
  {
    brand: 'Blancpain', model: 'Villeret Ultraplate', reference: '6104-1127-55A', year: 2016,
    caseDiameter: 40, caseThickness: 7.4, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 1151', powerReserve: 100, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 24,
    cosc: false, priceRange: 4, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Blancpain', model: 'Villeret Quantieme Complet', reference: '6654-1127-55B', year: 2017,
    caseDiameter: 40, caseThickness: 10.5, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 6654', powerReserve: 72, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3.5, jewels: 26,
    cosc: false, priceRange: 4, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Blancpain', model: 'Fifty Fathoms Flyback Chronograph', reference: '5085F-1130-52', year: 2018,
    caseDiameter: 45, caseThickness: 15.5, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. F185', powerReserve: 48, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 5, jewels: 37,
    cosc: false, priceRange: 5, brandTier: 4, style: 'chrono',
  },

  // Chopard (5)
  {
    brand: 'Chopard', model: 'Alpine Eagle 41', reference: '298600-3001', year: 2019,
    caseDiameter: 41, caseThickness: 9.7, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 01.01-C', powerReserve: 60, caseMaterial: 'Lucent Steel A223',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 4, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Chopard', model: 'L.U.C XPS', reference: '168592-3001', year: 2016,
    caseDiameter: 40, caseThickness: 7.7, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. L.U.C 96.12-L', powerReserve: 65, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Chopard', model: 'Mille Miglia GTS', reference: '168571-3001', year: 2018,
    caseDiameter: 43, caseThickness: 11.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. 01.01-M', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: true, priceRange: 3, brandTier: 3, style: 'sport',
  },
  {
    brand: 'Chopard', model: 'Happy Sport', reference: '278559-3001', year: 2019,
    caseDiameter: 36, caseThickness: 10, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. 09.01-C', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 3, brandTier: 3, style: 'dress',
  },
  {
    brand: 'Chopard', model: 'L.U.C Chrono One', reference: '161928-5001', year: 2017,
    caseDiameter: 42, caseThickness: 12.8, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. L.U.C 03.03-L', powerReserve: 60, caseMaterial: '18k rose gold',
    bezelMaterial: 'Rose gold', crystal: 'Sapphire', frequency: 5, jewels: 29,
    cosc: true, priceRange: 5, brandTier: 3, style: 'chrono',
  },

  // Girard-Perregaux (5)
  {
    brand: 'Girard-Perregaux', model: 'Laureato 42mm', reference: '81010-11-131-11A', year: 2017,
    caseDiameter: 42, caseThickness: 10.7, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. GP01800-1137', powerReserve: 54, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27,
    cosc: false, priceRange: 4, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Girard-Perregaux', model: 'Laureato Chronograph', reference: '81020-11-131-11A', year: 2017,
    caseDiameter: 42, caseThickness: 12.7, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. GP03300-0141', powerReserve: 46, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 39,
    cosc: false, priceRange: 4, brandTier: 4, style: 'chrono',
  },
  {
    brand: 'Girard-Perregaux', model: '1966 40mm', reference: '49555-11-131-BB60', year: 2016,
    caseDiameter: 40, caseThickness: 9.7, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. GP03300-0030', powerReserve: 46, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27,
    cosc: false, priceRange: 4, brandTier: 4, style: 'dress',
  },
  {
    brand: 'Girard-Perregaux', model: 'Laureato Absolute', reference: '81070-21-001-FB6A', year: 2018,
    caseDiameter: 44, caseThickness: 12.2, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. GP01800-0004', powerReserve: 46, caseMaterial: 'Titanium',
    bezelMaterial: 'Titanium', crystal: 'Sapphire', frequency: 4, jewels: 27,
    cosc: false, priceRange: 4, brandTier: 4, style: 'sport',
  },
  {
    brand: 'Girard-Perregaux', model: 'Cat Eye', reference: '80496-D11A-161-CK6A', year: 2018,
    caseDiameter: 35.4, caseThickness: 8.5, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. GP03300-0074', powerReserve: 46, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 27,
    cosc: false, priceRange: 3, brandTier: 4, style: 'dress',
  },

  // Nomos (5)
  {
    brand: 'Nomos', model: 'Tangente 38', reference: '164', year: 2019,
    caseDiameter: 37.5, caseThickness: 6.8, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. Alpha', powerReserve: 43, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 17,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Nomos', model: 'Club Campus', reference: '708', year: 2018,
    caseDiameter: 38.5, caseThickness: 8.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. DUW 5001', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 21,
    cosc: false, priceRange: 1, brandTier: 2, style: 'field',
  },
  {
    brand: 'Nomos', model: 'Metro 38', reference: '1108', year: 2019,
    caseDiameter: 38.5, caseThickness: 7.5, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. DUW 4401', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 21,
    cosc: false, priceRange: 2, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Nomos', model: 'Orion 38', reference: '380', year: 2018,
    caseDiameter: 38, caseThickness: 8.5, waterResistance: 30, movement: 'Manual',
    caliber: 'Cal. Alpha', powerReserve: 43, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 17,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Nomos', model: 'Ahoi', reference: '550', year: 2019,
    caseDiameter: 40, caseThickness: 9.8, waterResistance: 200, movement: 'Automatic',
    caliber: 'Cal. DUW 5101', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 2, style: 'diver',
  },

  // Oris (5)
  {
    brand: 'Oris', model: 'Aquis Date', reference: '01 733 7766 4135', year: 2021,
    caseDiameter: 41.5, caseThickness: 13, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. Oris 733 (SW 200-1)', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Oris', model: 'Big Crown Pointer Date', reference: '01 754 7741 4065', year: 2021,
    caseDiameter: 40, caseThickness: 12.3, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. Oris 754 (SW 200-1)', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'pilot',
  },
  {
    brand: 'Oris', model: 'Divers Sixty-Five', reference: '01 733 7707 4354', year: 2019,
    caseDiameter: 40, caseThickness: 12.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Oris 733 (SW 200-1)', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Oris', model: 'Big Crown ProPilot', reference: '01 751 7761 4065', year: 2020,
    caseDiameter: 41, caseThickness: 11.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Oris 751 (SW 200-1)', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'pilot',
  },
  {
    brand: 'Oris', model: 'Artelier Date', reference: '01 733 7721 4051', year: 2019,
    caseDiameter: 40, caseThickness: 10.7, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. Oris 733 (SW 200-1)', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },

  // Bell & Ross (5)
  {
    brand: 'Bell & Ross', model: 'BR 03-92 Diver', reference: 'BR0392-D-BU-ST/SRB', year: 2019,
    caseDiameter: 42, caseThickness: 12, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. BR-CAL.302', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'diver',
  },
  {
    brand: 'Bell & Ross', model: 'BR 05', reference: 'BR05A-BL-ST/SST', year: 2019,
    caseDiameter: 40, caseThickness: 9.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. BR-CAL.321', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'sport',
  },
  {
    brand: 'Bell & Ross', model: 'BR 03-92', reference: 'BR0392-BL-ST/SRB', year: 2018,
    caseDiameter: 42, caseThickness: 10.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. BR-CAL.302', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'pilot',
  },
  {
    brand: 'Bell & Ross', model: 'BR V2-92', reference: 'BRV292-BL-ST/SST', year: 2019,
    caseDiameter: 41, caseThickness: 11.5, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. BR-CAL.302', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'pilot',
  },
  {
    brand: 'Bell & Ross', model: 'BR V2-94 Chrono', reference: 'BRV294-BL-ST/SST', year: 2019,
    caseDiameter: 41, caseThickness: 14.8, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. BR-CAL.301', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'chrono',
  },

  // Hamilton (5)
  {
    brand: 'Hamilton', model: 'Khaki Field Mechanical', reference: 'H69439931', year: 2018,
    caseDiameter: 38, caseThickness: 9.5, waterResistance: 50, movement: 'Manual',
    caliber: 'Cal. H-50', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 17,
    cosc: false, priceRange: 1, brandTier: 1, style: 'field',
  },
  {
    brand: 'Hamilton', model: 'Khaki Aviation Pilot Day Date', reference: 'H64615135', year: 2018,
    caseDiameter: 42, caseThickness: 12.1, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. H-40', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 25,
    cosc: false, priceRange: 1, brandTier: 1, style: 'pilot',
  },
  {
    brand: 'Hamilton', model: 'Jazzmaster Open Heart', reference: 'H32705131', year: 2019,
    caseDiameter: 40, caseThickness: 11, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. H-10', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 3, jewels: 25,
    cosc: false, priceRange: 1, brandTier: 1, style: 'dress',
  },
  {
    brand: 'Hamilton', model: 'Intra-Matic Chronograph H', reference: 'H38416711', year: 2019,
    caseDiameter: 40, caseThickness: 14.4, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. H-31', powerReserve: 60, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 29,
    cosc: false, priceRange: 1, brandTier: 1, style: 'chrono',
  },
  {
    brand: 'Hamilton', model: 'Khaki Navy Scuba', reference: 'H82515130', year: 2020,
    caseDiameter: 40, caseThickness: 12.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. H-10', powerReserve: 80, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Aluminum', crystal: 'Sapphire', frequency: 3, jewels: 25,
    cosc: false, priceRange: 1, brandTier: 1, style: 'diver',
  },

  // Frederique Constant (3)
  {
    brand: 'Frederique Constant', model: 'Slimline Moonphase', reference: 'FC-705V4S4', year: 2019,
    caseDiameter: 42, caseThickness: 11, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. FC-705', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Frederique Constant', model: 'Highlife Automatic', reference: 'FC-303V4NH6B', year: 2020,
    caseDiameter: 41, caseThickness: 10.1, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. FC-303', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'sport',
  },
  {
    brand: 'Frederique Constant', model: 'Classics Automatic', reference: 'FC-303MC5B6', year: 2019,
    caseDiameter: 40, caseThickness: 9.4, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. FC-303', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },

  // Baume & Mercier (3)
  {
    brand: 'Baume & Mercier', model: 'Riviera Automatic', reference: 'M0A10620', year: 2021,
    caseDiameter: 42, caseThickness: 10.3, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. Baumatic BM13-1975AC-1', powerReserve: 120, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: false, priceRange: 2, brandTier: 2, style: 'sport',
  },
  {
    brand: 'Baume & Mercier', model: 'Clifton Baumatic', reference: 'M0A10400', year: 2018,
    caseDiameter: 40, caseThickness: 10.3, waterResistance: 50, movement: 'Automatic',
    caliber: 'Cal. Baumatic BM13-1975A', powerReserve: 120, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 26,
    cosc: true, priceRange: 1, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Baume & Mercier', model: 'Hampton', reference: 'M0A10523', year: 2020,
    caseDiameter: 35, caseThickness: 8.5, waterResistance: 50, movement: 'Quartz',
    caliber: 'Cal. ETA 980.163', powerReserve: null, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: null, jewels: null,
    cosc: false, priceRange: 1, brandTier: 2, style: 'dress',
  },

  // Montblanc (4)
  {
    brand: 'Montblanc', model: '1858 Automatic', reference: '117832', year: 2019,
    caseDiameter: 40, caseThickness: 11.6, waterResistance: 100, movement: 'Automatic',
    caliber: 'Cal. MB 24.15', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'field',
  },
  {
    brand: 'Montblanc', model: 'Heritage Chronometrie', reference: '116481', year: 2018,
    caseDiameter: 40, caseThickness: 10.5, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. MB 24.16', powerReserve: 42, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Montblanc', model: 'Star Legacy Automatic', reference: '126104', year: 2020,
    caseDiameter: 42, caseThickness: 10.6, waterResistance: 30, movement: 'Automatic',
    caliber: 'Cal. MB 24.15', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Stainless steel', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'dress',
  },
  {
    brand: 'Montblanc', model: '1858 Iced Sea', reference: '129369', year: 2022,
    caseDiameter: 41, caseThickness: 12.4, waterResistance: 300, movement: 'Automatic',
    caliber: 'Cal. MB 24.15', powerReserve: 38, caseMaterial: 'Stainless steel',
    bezelMaterial: 'Ceramic', crystal: 'Sapphire', frequency: 4, jewels: 25,
    cosc: false, priceRange: 2, brandTier: 2, style: 'diver',
  },
];

async function main() {
  console.log(`Starting comprehensive seed with ${watches.length} watches...\n`);

  let created = 0;
  let updated = 0;

  for (let i = 0; i < watches.length; i++) {
    const w = watches[i];
    const slug = makeSlug(w.brand, w.model);
    const apiId = `seed-${slug}`;

    const data = {
      apiId,
      brand: w.brand,
      model: w.model,
      reference: w.reference ?? null,
      year: w.year ?? null,
      caseDiameter: w.caseDiameter ?? null,
      caseThickness: w.caseThickness ?? null,
      waterResistance: w.waterResistance ?? null,
      movement: w.movement ?? null,
      caliber: w.caliber ?? null,
      powerReserve: w.powerReserve ?? null,
      caseMaterial: w.caseMaterial ?? null,
      bezelMaterial: w.bezelMaterial ?? null,
      crystal: w.crystal ?? null,
      frequency: w.frequency ?? null,
      jewels: w.jewels ?? null,
      cosc: w.cosc ?? false,
      priceRange: w.priceRange,
      brandTier: w.brandTier,
      style: w.style,
      slug,
    };

    try {
      const existing = await prisma.watch.findUnique({ where: { slug } });
      await prisma.watch.upsert({
        where: { slug },
        update: { ...data, slug: undefined, apiId: undefined },
        create: data,
      });
      if (existing) {
        updated++;
      } else {
        created++;
      }
      if ((i + 1) % 25 === 0 || i === watches.length - 1) {
        console.log(`  Progress: ${i + 1}/${watches.length} watches processed`);
      }
    } catch (err) {
      console.error(`  Error upserting ${slug}: ${err.message}`);
    }
  }

  console.log(`\nWatches: ${created} created, ${updated} updated`);

  // ===== AUTO-GENERATE COMPARISONS =====
  console.log('\nGenerating comparisons between watches of the same style but different brands...');

  const allWatches = await prisma.watch.findMany({ select: { id: true, brand: true, style: true, slug: true } });

  // Group by style
  const byStyle = {};
  for (const w of allWatches) {
    if (!byStyle[w.style]) byStyle[w.style] = [];
    byStyle[w.style].push(w);
  }

  let compCreated = 0;
  let compSkipped = 0;

  for (const [style, styleWatches] of Object.entries(byStyle)) {
    // Limit to first 12 watches per style to avoid combinatorial explosion
    const limited = styleWatches.slice(0, 12);
    console.log(`  Style "${style}": ${styleWatches.length} watches (using first ${limited.length} for comparisons)`);

    for (let i = 0; i < limited.length; i++) {
      for (let j = i + 1; j < limited.length; j++) {
        const a = limited[i];
        const b = limited[j];

        // Only compare different brands
        if (a.brand === b.brand) continue;

        const compSlug = `${a.slug}-vs-${b.slug}`;

        try {
          await prisma.comparison.upsert({
            where: { slug: compSlug },
            update: {},
            create: {
              watchAId: a.id,
              watchBId: b.id,
              slug: compSlug,
            },
          });
          compCreated++;
        } catch (err) {
          compSkipped++;
        }
      }
    }
  }

  console.log(`\nComparisons: ${compCreated} created/existing, ${compSkipped} skipped (errors/duplicates)`);

  // Final counts
  const totalWatches = await prisma.watch.count();
  const totalComparisons = await prisma.comparison.count();
  console.log(`\n=== Final Database Counts ===`);
  console.log(`Total watches: ${totalWatches}`);
  console.log(`Total comparisons: ${totalComparisons}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
