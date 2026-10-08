/**
 * Manual seed script with real watch data (sourced from public specs).
 * No API calls — directly populates Supabase with accurate watch specs.
 */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function toSlug(brand, model) {
  return `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

const watches = [
  // ── ROLEX ─────────────────────────────────────────
  { brand:'Rolex', model:'Submariner Date', reference:'126610LN', year:2020, caseDiameter:41, caseThickness:12.5, waterResistance:300, movement:'Automatic', caliber:'Cal. 3235', powerReserve:70, caseMaterial:'Oystersteel', bezelMaterial:'Cerachrom ceramic', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:4, brandTier:4, style:'diver' },
  { brand:'Rolex', model:'Submariner No Date', reference:'124060', year:2020, caseDiameter:41, caseThickness:11.9, waterResistance:300, movement:'Automatic', caliber:'Cal. 3230', powerReserve:70, caseMaterial:'Oystersteel', bezelMaterial:'Cerachrom ceramic', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:4, brandTier:4, style:'diver' },
  { brand:'Rolex', model:'Daytona', reference:'116500LN', year:2016, caseDiameter:40, caseThickness:12.2, waterResistance:100, movement:'Automatic', caliber:'Cal. 4130', powerReserve:72, caseMaterial:'Oystersteel', bezelMaterial:'Cerachrom ceramic', crystal:'Sapphire', frequency:4, jewels:44, cosc:true, priceRange:5, brandTier:4, style:'chrono' },
  { brand:'Rolex', model:'GMT-Master II', reference:'126710BLNR', year:2019, caseDiameter:40, caseThickness:12.1, waterResistance:100, movement:'Automatic', caliber:'Cal. 3285', powerReserve:70, caseMaterial:'Oystersteel', bezelMaterial:'Cerachrom ceramic', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:4, brandTier:4, style:'sport' },
  { brand:'Rolex', model:'Datejust 41', reference:'126334', year:2017, caseDiameter:41, caseThickness:11.8, waterResistance:100, movement:'Automatic', caliber:'Cal. 3235', powerReserve:70, caseMaterial:'Oystersteel', bezelMaterial:'White gold fluted', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:4, brandTier:4, style:'dress' },
  { brand:'Rolex', model:'Day-Date 40', reference:'228235', year:2015, caseDiameter:40, caseThickness:12.4, waterResistance:100, movement:'Automatic', caliber:'Cal. 3255', powerReserve:70, caseMaterial:'18k Rose Gold', bezelMaterial:'18k Rose Gold fluted', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:5, brandTier:4, style:'dress' },
  { brand:'Rolex', model:'Explorer II', reference:'226570', year:2021, caseDiameter:42, caseThickness:12.5, waterResistance:100, movement:'Automatic', caliber:'Cal. 3285', powerReserve:70, caseMaterial:'Oystersteel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:4, brandTier:4, style:'sport' },
  { brand:'Rolex', model:'Sea-Dweller', reference:'126600', year:2017, caseDiameter:43, caseThickness:14.7, waterResistance:1220, movement:'Automatic', caliber:'Cal. 3235', powerReserve:70, caseMaterial:'Oystersteel', bezelMaterial:'Cerachrom ceramic', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:4, brandTier:4, style:'diver' },
  { brand:'Rolex', model:'Sky-Dweller', reference:'326934', year:2017, caseDiameter:42, caseThickness:14.1, waterResistance:100, movement:'Automatic', caliber:'Cal. 9001', powerReserve:72, caseMaterial:'Oystersteel', bezelMaterial:'White gold fluted', crystal:'Sapphire', frequency:4, jewels:40, cosc:true, priceRange:5, brandTier:4, style:'sport' },
  { brand:'Rolex', model:'Explorer 36', reference:'124270', year:2021, caseDiameter:36, caseThickness:11.5, waterResistance:100, movement:'Automatic', caliber:'Cal. 3230', powerReserve:70, caseMaterial:'Oystersteel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:4, brandTier:4, style:'sport' },

  // ── OMEGA ─────────────────────────────────────────
  { brand:'Omega', model:'Seamaster Diver 300M', reference:'210.30.42.20.01.001', year:2018, caseDiameter:42, caseThickness:13.1, waterResistance:300, movement:'Automatic', caliber:'Co-Axial Master Chronometer 8800', powerReserve:55, caseMaterial:'Stainless steel', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:3.5, jewels:39, cosc:true, priceRange:3, brandTier:3, style:'diver' },
  { brand:'Omega', model:'Speedmaster Moonwatch Professional', reference:'310.30.42.50.01.001', year:2021, caseDiameter:42, caseThickness:13.2, waterResistance:50, movement:'Manual', caliber:'Cal. 3861', powerReserve:50, caseMaterial:'Stainless steel', bezelMaterial:'Aluminium', crystal:'Hesalite', frequency:4, jewels:26, cosc:true, priceRange:3, brandTier:3, style:'chrono' },
  { brand:'Omega', model:'Planet Ocean 600M', reference:'215.30.44.21.01.001', year:2016, caseDiameter:43.5, caseThickness:16.1, waterResistance:600, movement:'Automatic', caliber:'Cal. 8900', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:3.5, jewels:39, cosc:true, priceRange:3, brandTier:3, style:'diver' },
  { brand:'Omega', model:'Constellation 41', reference:'131.30.41.21.01.001', year:2020, caseDiameter:41, caseThickness:12, waterResistance:50, movement:'Automatic', caliber:'Cal. 8900', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:3.5, jewels:39, cosc:true, priceRange:3, brandTier:3, style:'dress' },
  { brand:'Omega', model:'Aqua Terra 150M', reference:'220.10.41.21.01.001', year:2017, caseDiameter:41, caseThickness:13.2, waterResistance:150, movement:'Automatic', caliber:'Cal. 8900', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:3.5, jewels:39, cosc:true, priceRange:3, brandTier:3, style:'sport' },
  { brand:'Omega', model:'De Ville Prestige', reference:'424.10.40.20.02.003', year:2017, caseDiameter:39.5, caseThickness:9.4, waterResistance:30, movement:'Automatic', caliber:'Cal. 2500', powerReserve:48, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:3.5, jewels:27, cosc:true, priceRange:2, brandTier:3, style:'dress' },

  // ── PATEK PHILIPPE ────────────────────────────────
  { brand:'Patek Philippe', model:'Nautilus 5711/1A', reference:'5711/1A-010', year:2021, caseDiameter:40, caseThickness:8.3, waterResistance:120, movement:'Automatic', caliber:'Cal. 26-330 S C', powerReserve:45, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:29, cosc:false, priceRange:5, brandTier:5, style:'sport' },
  { brand:'Patek Philippe', model:'Aquanaut 5167A', reference:'5167A-001', year:2007, caseDiameter:40, caseThickness:8.1, waterResistance:120, movement:'Automatic', caliber:'Cal. 324 S C', powerReserve:45, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:29, cosc:false, priceRange:5, brandTier:5, style:'sport' },
  { brand:'Patek Philippe', model:'Calatrava 5227G', reference:'5227G-010', year:2013, caseDiameter:39, caseThickness:9.2, waterResistance:30, movement:'Automatic', caliber:'Cal. 324 S C', powerReserve:45, caseMaterial:'18k White Gold', bezelMaterial:'18k White Gold', crystal:'Sapphire', frequency:4, jewels:29, cosc:false, priceRange:5, brandTier:5, style:'dress' },
  { brand:'Patek Philippe', model:'Chronograph 5172G', reference:'5172G-001', year:2019, caseDiameter:41, caseThickness:11.5, waterResistance:30, movement:'Manual', caliber:'Cal. CH 29-535 PS', powerReserve:65, caseMaterial:'18k White Gold', bezelMaterial:'18k White Gold', crystal:'Sapphire', frequency:4, jewels:33, cosc:false, priceRange:5, brandTier:5, style:'chrono' },

  // ── AUDEMARS PIGUET ───────────────────────────────
  { brand:'Audemars Piguet', model:'Royal Oak 15500ST', reference:'15500ST.OO.1220ST.01', year:2022, caseDiameter:41, caseThickness:9.8, waterResistance:50, movement:'Automatic', caliber:'Cal. 4302', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:40, cosc:false, priceRange:5, brandTier:5, style:'sport' },
  { brand:'Audemars Piguet', model:'Royal Oak Offshore Diver', reference:'15710ST.OO.A002CA.01', year:2014, caseDiameter:42, caseThickness:14.1, waterResistance:300, movement:'Automatic', caliber:'Cal. 3120', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:40, cosc:false, priceRange:5, brandTier:5, style:'diver' },
  { brand:'Audemars Piguet', model:'Royal Oak Chronograph', reference:'26331ST.OO.1220ST.01', year:2017, caseDiameter:41, caseThickness:11, waterResistance:50, movement:'Automatic', caliber:'Cal. 2385', powerReserve:40, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:3, jewels:37, cosc:false, priceRange:5, brandTier:5, style:'chrono' },
  { brand:'Audemars Piguet', model:'Code 11.59', reference:'15210OR.OO.A616CR.01', year:2019, caseDiameter:41, caseThickness:10.7, waterResistance:30, movement:'Automatic', caliber:'Cal. 4302', powerReserve:70, caseMaterial:'18k Rose Gold', bezelMaterial:'18k Rose Gold', crystal:'Sapphire', frequency:4, jewels:40, cosc:false, priceRange:5, brandTier:5, style:'dress' },

  // ── TUDOR ─────────────────────────────────────────
  { brand:'Tudor', model:'Black Bay 58', reference:'M79030N-0001', year:2018, caseDiameter:39, caseThickness:11.9, waterResistance:200, movement:'Automatic', caliber:'Cal. MT5402', powerReserve:70, caseMaterial:'Stainless steel', bezelMaterial:'Aluminium', crystal:'Sapphire', frequency:4, jewels:26, cosc:true, priceRange:2, brandTier:3, style:'diver' },
  { brand:'Tudor', model:'Black Bay', reference:'M7941A1A0RU-0001', year:2022, caseDiameter:41, caseThickness:14.8, waterResistance:200, movement:'Automatic', caliber:'Cal. MT5602', powerReserve:70, caseMaterial:'Stainless steel', bezelMaterial:'Aluminium', crystal:'Sapphire', frequency:4, jewels:26, cosc:true, priceRange:2, brandTier:3, style:'diver' },
  { brand:'Tudor', model:'Pelagos 39', reference:'M25407N-0001', year:2022, caseDiameter:39, caseThickness:12.3, waterResistance:200, movement:'Automatic', caliber:'Cal. MT5400', powerReserve:70, caseMaterial:'Titanium', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:4, jewels:26, cosc:true, priceRange:3, brandTier:3, style:'diver' },
  { brand:'Tudor', model:'Black Bay Chrono', reference:'M79360N-0002', year:2021, caseDiameter:41, caseThickness:14.4, waterResistance:200, movement:'Automatic', caliber:'Cal. MT5813', powerReserve:70, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:31, cosc:true, priceRange:3, brandTier:3, style:'chrono' },

  // ── IWC ───────────────────────────────────────────
  { brand:'IWC', model:'Portugieser Chronograph', reference:'IW371605', year:2020, caseDiameter:41, caseThickness:13.1, waterResistance:30, movement:'Automatic', caliber:'Cal. 69355', powerReserve:46, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:33, cosc:false, priceRange:3, brandTier:3, style:'chrono' },
  { brand:'IWC', model:'Pilot Mark XX', reference:'IW328201', year:2022, caseDiameter:40, caseThickness:10.8, waterResistance:100, movement:'Automatic', caliber:'Cal. 32111', powerReserve:120, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:21, cosc:false, priceRange:3, brandTier:3, style:'pilot' },
  { brand:'IWC', model:'Big Pilot 43', reference:'IW329301', year:2021, caseDiameter:43, caseThickness:13.6, waterResistance:100, movement:'Automatic', caliber:'Cal. 82100', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:32, cosc:false, priceRange:4, brandTier:3, style:'pilot' },

  // ── BREITLING ─────────────────────────────────────
  { brand:'Breitling', model:'Navitimer B01 Chronograph', reference:'AB0127211B1P1', year:2019, caseDiameter:43, caseThickness:14.2, waterResistance:30, movement:'Automatic', caliber:'Cal. B01', powerReserve:70, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:47, cosc:true, priceRange:3, brandTier:3, style:'chrono' },
  { brand:'Breitling', model:'Superocean Heritage II', reference:'AB2020161C1S1', year:2020, caseDiameter:42, caseThickness:13.4, waterResistance:200, movement:'Automatic', caliber:'Cal. B20', powerReserve:70, caseMaterial:'Stainless steel', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:4, jewels:38, cosc:true, priceRange:3, brandTier:3, style:'diver' },
  { brand:'Breitling', model:'Chronomat B01 42', reference:'AB0134101B1A1', year:2020, caseDiameter:42, caseThickness:14.5, waterResistance:200, movement:'Automatic', caliber:'Cal. B01', powerReserve:70, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:47, cosc:true, priceRange:3, brandTier:3, style:'chrono' },

  // ── TAG HEUER ─────────────────────────────────────
  { brand:'TAG Heuer', model:'Monaco', reference:'CBL2111.BA0644', year:2020, caseDiameter:39, caseThickness:14.5, waterResistance:100, movement:'Automatic', caliber:'Cal. Heuer 02', powerReserve:80, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:33, cosc:false, priceRange:2, brandTier:2, style:'chrono' },
  { brand:'TAG Heuer', model:'Carrera Chronograph', reference:'CBS2210.BA0637', year:2023, caseDiameter:39, caseThickness:14.3, waterResistance:100, movement:'Automatic', caliber:'Cal. Heuer 02', powerReserve:80, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:33, cosc:false, priceRange:2, brandTier:2, style:'chrono' },
  { brand:'TAG Heuer', model:'Aquaracer Professional 300', reference:'WBP201B.BA0632', year:2021, caseDiameter:43, caseThickness:12.5, waterResistance:300, movement:'Automatic', caliber:'Cal. 5', powerReserve:38, caseMaterial:'Stainless steel', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:4, jewels:25, cosc:false, priceRange:2, brandTier:2, style:'diver' },

  // ── CARTIER ───────────────────────────────────────
  { brand:'Cartier', model:'Santos de Cartier Medium', reference:'WSSA0029', year:2018, caseDiameter:35.1, caseThickness:8.83, waterResistance:100, movement:'Automatic', caliber:'Cal. 1847 MC', powerReserve:42, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:25, cosc:false, priceRange:3, brandTier:4, style:'dress' },
  { brand:'Cartier', model:'Santos de Cartier Large', reference:'WSSA0018', year:2018, caseDiameter:39.8, caseThickness:9.38, waterResistance:100, movement:'Automatic', caliber:'Cal. 1847 MC', powerReserve:42, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:25, cosc:false, priceRange:4, brandTier:4, style:'dress' },
  { brand:'Cartier', model:'Tank Francaise', reference:'WSTA0065', year:2023, caseDiameter:32, caseThickness:6.8, waterResistance:30, movement:'Quartz', caliber:'Cal. 057', powerReserve:null, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:null, jewels:null, cosc:false, priceRange:3, brandTier:4, style:'dress' },

  // ── GRAND SEIKO ───────────────────────────────────
  { brand:'Grand Seiko', model:'Snowflake', reference:'SBGA211', year:2016, caseDiameter:41, caseThickness:12.5, waterResistance:100, movement:'Spring Drive', caliber:'Cal. 9R65', powerReserve:72, caseMaterial:'Titanium', bezelMaterial:'Titanium', crystal:'Sapphire', frequency:3.6, jewels:30, cosc:false, priceRange:3, brandTier:4, style:'dress' },
  { brand:'Grand Seiko', model:'Heritage Hi-Beat', reference:'SBGH205', year:2017, caseDiameter:40, caseThickness:13, waterResistance:100, movement:'Automatic', caliber:'Cal. 9S85', powerReserve:55, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:5, jewels:37, cosc:false, priceRange:3, brandTier:4, style:'dress' },
  { brand:'Grand Seiko', model:'Evolution 9 Diver', reference:'SLGA015', year:2023, caseDiameter:43.8, caseThickness:14.7, waterResistance:200, movement:'Spring Drive', caliber:'Cal. 9RA5', powerReserve:120, caseMaterial:'Titanium', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:3.6, jewels:50, cosc:false, priceRange:4, brandTier:4, style:'diver' },

  // ── JAEGER-LECOULTRE ──────────────────────────────
  { brand:'Jaeger-LeCoultre', model:'Reverso Classic Medium', reference:'Q2548521', year:2016, caseDiameter:40.1, caseThickness:8.5, waterResistance:30, movement:'Manual', caliber:'Cal. 822/2', powerReserve:45, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:3, jewels:19, cosc:false, priceRange:3, brandTier:4, style:'dress' },
  { brand:'Jaeger-LeCoultre', model:'Master Ultra Thin Moon', reference:'Q1368420', year:2015, caseDiameter:39, caseThickness:10.8, waterResistance:50, movement:'Automatic', caliber:'Cal. 925/1', powerReserve:70, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:32, cosc:false, priceRange:4, brandTier:4, style:'dress' },

  // ── ZENITH ────────────────────────────────────────
  { brand:'Zenith', model:'Chronomaster Sport', reference:'03.3100.3600/21.M3100', year:2021, caseDiameter:41, caseThickness:12.6, waterResistance:100, movement:'Automatic', caliber:'El Primero 3600', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:5, jewels:31, cosc:false, priceRange:3, brandTier:3, style:'chrono' },
  { brand:'Zenith', model:'Defy Skyline', reference:'03.9300.3620/51.I001', year:2022, caseDiameter:41, caseThickness:11.2, waterResistance:100, movement:'Automatic', caliber:'Elite 6150', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:5, jewels:27, cosc:false, priceRange:3, brandTier:3, style:'sport' },

  // ── PANERAI ───────────────────────────────────────
  { brand:'Panerai', model:'Luminor Marina 44mm', reference:'PAM01312', year:2020, caseDiameter:44, caseThickness:15.6, waterResistance:300, movement:'Automatic', caliber:'Cal. P.9010', powerReserve:72, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:31, cosc:false, priceRange:3, brandTier:3, style:'diver' },
  { brand:'Panerai', model:'Submersible 42mm', reference:'PAM00959', year:2020, caseDiameter:42, caseThickness:14.1, waterResistance:300, movement:'Automatic', caliber:'Cal. P.9010', powerReserve:72, caseMaterial:'Stainless steel', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:4, jewels:31, cosc:false, priceRange:3, brandTier:3, style:'diver' },

  // ── HUBLOT ────────────────────────────────────────
  { brand:'Hublot', model:'Big Bang Unico', reference:'441.NX.1170.RX', year:2020, caseDiameter:42, caseThickness:14.5, waterResistance:100, movement:'Automatic', caliber:'Cal. HUB1280', powerReserve:72, caseMaterial:'Titanium', bezelMaterial:'Ceramic', crystal:'Sapphire', frequency:4, jewels:38, cosc:false, priceRange:4, brandTier:3, style:'chrono' },
  { brand:'Hublot', model:'Classic Fusion', reference:'511.NX.1171.RX', year:2018, caseDiameter:45, caseThickness:11.3, waterResistance:50, movement:'Automatic', caliber:'Cal. HUB1100', powerReserve:42, caseMaterial:'Titanium', bezelMaterial:'Titanium', crystal:'Sapphire', frequency:4, jewels:25, cosc:false, priceRange:3, brandTier:3, style:'sport' },

  // ── VACHERON CONSTANTIN ───────────────────────────
  { brand:'Vacheron Constantin', model:'Overseas 4500V', reference:'4500V/110A-B126', year:2016, caseDiameter:41, caseThickness:11, waterResistance:150, movement:'Automatic', caliber:'Cal. 5100', powerReserve:60, caseMaterial:'Stainless steel', bezelMaterial:'Stainless steel', crystal:'Sapphire', frequency:4, jewels:32, cosc:false, priceRange:5, brandTier:5, style:'sport' },
  { brand:'Vacheron Constantin', model:'Patrimony', reference:'85180/000G-9230', year:2012, caseDiameter:40, caseThickness:8.1, waterResistance:30, movement:'Automatic', caliber:'Cal. 2450 Q6', powerReserve:40, caseMaterial:'18k White Gold', bezelMaterial:'18k White Gold', crystal:'Sapphire', frequency:4, jewels:27, cosc:false, priceRange:5, brandTier:5, style:'dress' },

  // ── A. LANGE & SÖHNE ──────────────────────────────
  { brand:'A. Lange & Söhne', model:'Lange 1', reference:'191.032', year:2015, caseDiameter:38.5, caseThickness:10.7, waterResistance:30, movement:'Manual', caliber:'Cal. L121.1', powerReserve:72, caseMaterial:'18k Rose Gold', bezelMaterial:'18k Rose Gold', crystal:'Sapphire', frequency:3, jewels:53, cosc:false, priceRange:5, brandTier:5, style:'dress' },
  { brand:'A. Lange & Söhne', model:'Saxonia Thin', reference:'201.033', year:2011, caseDiameter:40, caseThickness:5.9, waterResistance:30, movement:'Manual', caliber:'Cal. L093.1', powerReserve:72, caseMaterial:'18k Rose Gold', bezelMaterial:'18k Rose Gold', crystal:'Sapphire', frequency:3, jewels:21, cosc:false, priceRange:5, brandTier:5, style:'dress' },
]

async function main() {
  console.log(`=== Manual Seed: ${watches.length} watches ===\n`)

  let added = 0
  for (const w of watches) {
    const slug = toSlug(w.brand, w.model)
    const apiId = `manual-${slug}`

    try {
      await prisma.watch.upsert({
        where: { slug },
        update: { ...w, slug: undefined, apiId: undefined },
        create: { ...w, slug, apiId },
      })
      added++
      console.log(`  ✓ ${w.brand} ${w.model}`)
    } catch (err) {
      console.log(`  ✗ ${w.brand} ${w.model}: ${err.message?.substring(0, 80)}`)
    }
  }

  // Auto-generate comparisons
  console.log('\nGenerating comparisons...')
  const allWatches = await prisma.watch.findMany({ orderBy: [{ brand: 'asc' }, { model: 'asc' }] })
  const byStyle = {}
  for (const w of allWatches) {
    if (!byStyle[w.style]) byStyle[w.style] = []
    byStyle[w.style].push(w)
  }

  let compCount = 0
  for (const [, sw] of Object.entries(byStyle)) {
    for (let i = 0; i < sw.length && i < 12; i++) {
      for (let j = i + 1; j < sw.length && j < 12; j++) {
        if (sw[i].brand === sw[j].brand) continue
        const slug = `${toSlug(sw[i].brand, sw[i].model)}-vs-${toSlug(sw[j].brand, sw[j].model)}`
        try {
          await prisma.comparison.upsert({
            where: { slug },
            update: {},
            create: { watchAId: sw[i].id, watchBId: sw[j].id, slug, viewCount: 0 },
          })
          compCount++
        } catch { /* skip */ }
      }
    }
  }

  const totalWatches = await prisma.watch.count()
  const totalComps = await prisma.comparison.count()
  console.log(`\n=== DONE ===`)
  console.log(`Watches added/updated: ${added}`)
  console.log(`Comparisons created: ${compCount}`)
  console.log(`Total watches in DB: ${totalWatches}`)
  console.log(`Total comparisons in DB: ${totalComps}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
