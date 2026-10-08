/**
 * Fill missing specs (caliber, waterResistance, powerReserve, caseDiameter, caseThickness)
 * for watches that were imported from Kaggle with incomplete data.
 * Uses a 3-tier lookup: KNOWN_SPECS → BRAND_DEFAULTS → STYLE_DEFAULTS.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── KNOWN_SPECS: keyed by [brand, modelSubstring] ─────────────────────────
// Each entry: { caliber, waterResistance (meters), powerReserve (hours), caseDiameter (mm), caseThickness (mm) }
const KNOWN_SPECS = [
  // ── Rolex ──
  { brand: 'Rolex', match: 'submariner',       specs: { caliber: 'Cal. 3235', waterResistance: 300, powerReserve: 70, caseDiameter: 41, caseThickness: 12.5 } },
  { brand: 'Rolex', match: 'daytona',           specs: { caliber: 'Cal. 4130', waterResistance: 100, powerReserve: 72, caseDiameter: 40, caseThickness: 12.2 } },
  { brand: 'Rolex', match: 'gmt-master',        specs: { caliber: 'Cal. 3285', waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 12.1 } },
  { brand: 'Rolex', match: 'gmt master',        specs: { caliber: 'Cal. 3285', waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 12.1 } },
  { brand: 'Rolex', match: 'datejust',          specs: { caliber: 'Cal. 3235', waterResistance: 100, powerReserve: 70, caseDiameter: 41, caseThickness: 11.8 } },
  { brand: 'Rolex', match: 'day-date',          specs: { caliber: 'Cal. 3255', waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 12.1 } },
  { brand: 'Rolex', match: 'day date',          specs: { caliber: 'Cal. 3255', waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 12.1 } },
  { brand: 'Rolex', match: 'explorer ii',       specs: { caliber: 'Cal. 3285', waterResistance: 100, powerReserve: 70, caseDiameter: 42, caseThickness: 12.5 } },
  { brand: 'Rolex', match: 'explorer',          specs: { caliber: 'Cal. 3230', waterResistance: 100, powerReserve: 70, caseDiameter: 36, caseThickness: 11.5 } },
  { brand: 'Rolex', match: 'air-king',          specs: { caliber: 'Cal. 3230', waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 11.8 } },
  { brand: 'Rolex', match: 'air king',          specs: { caliber: 'Cal. 3230', waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 11.8 } },
  { brand: 'Rolex', match: 'milgauss',          specs: { caliber: 'Cal. 3131', waterResistance: 100, powerReserve: 48, caseDiameter: 40, caseThickness: 12.8 } },
  { brand: 'Rolex', match: 'yacht-master ii',   specs: { caliber: 'Cal. 4161', waterResistance: 100, powerReserve: 72, caseDiameter: 44, caseThickness: 14.2 } },
  { brand: 'Rolex', match: 'yacht-master',      specs: { caliber: 'Cal. 3235', waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 11.9 } },
  { brand: 'Rolex', match: 'yacht master',      specs: { caliber: 'Cal. 3235', waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 11.9 } },
  { brand: 'Rolex', match: 'sea-dweller deepsea', specs: { caliber: 'Cal. 3235', waterResistance: 3900, powerReserve: 70, caseDiameter: 44, caseThickness: 17.7 } },
  { brand: 'Rolex', match: 'sea-dweller',       specs: { caliber: 'Cal. 3235', waterResistance: 1220, powerReserve: 70, caseDiameter: 43, caseThickness: 14.7 } },
  { brand: 'Rolex', match: 'sea dweller',       specs: { caliber: 'Cal. 3235', waterResistance: 1220, powerReserve: 70, caseDiameter: 43, caseThickness: 14.7 } },
  { brand: 'Rolex', match: 'cellini',           specs: { caliber: 'Cal. 3165', waterResistance: 50, powerReserve: 48, caseDiameter: 39, caseThickness: 10.2 } },
  { brand: 'Rolex', match: 'oyster perpetual',  specs: { caliber: 'Cal. 3230', waterResistance: 100, powerReserve: 70, caseDiameter: 41, caseThickness: 11.6 } },
  { brand: 'Rolex', match: 'sky-dweller',       specs: { caliber: 'Cal. 9001', waterResistance: 100, powerReserve: 72, caseDiameter: 42, caseThickness: 14.1 } },
  { brand: 'Rolex', match: 'sky dweller',       specs: { caliber: 'Cal. 9001', waterResistance: 100, powerReserve: 72, caseDiameter: 42, caseThickness: 14.1 } },

  // ── Omega ──
  { brand: 'Omega', match: 'speedmaster professional', specs: { caliber: 'Cal. 3861', waterResistance: 50, powerReserve: 50, caseDiameter: 42, caseThickness: 13.2 } },
  { brand: 'Omega', match: 'speedmaster moonwatch',    specs: { caliber: 'Cal. 3861', waterResistance: 50, powerReserve: 50, caseDiameter: 42, caseThickness: 13.2 } },
  { brand: 'Omega', match: 'speedmaster',       specs: { caliber: 'Cal. 9900', waterResistance: 50, powerReserve: 60, caseDiameter: 42, caseThickness: 14.3 } },
  { brand: 'Omega', match: 'seamaster 300',     specs: { caliber: 'Cal. 8912', waterResistance: 300, powerReserve: 60, caseDiameter: 41, caseThickness: 13.7 } },
  { brand: 'Omega', match: 'seamaster planet ocean', specs: { caliber: 'Cal. 8900', waterResistance: 600, powerReserve: 60, caseDiameter: 43.5, caseThickness: 16.1 } },
  { brand: 'Omega', match: 'planet ocean',      specs: { caliber: 'Cal. 8900', waterResistance: 600, powerReserve: 60, caseDiameter: 43.5, caseThickness: 16.1 } },
  { brand: 'Omega', match: 'seamaster aqua terra', specs: { caliber: 'Cal. 8900', waterResistance: 150, powerReserve: 60, caseDiameter: 41, caseThickness: 13.2 } },
  { brand: 'Omega', match: 'aqua terra',        specs: { caliber: 'Cal. 8900', waterResistance: 150, powerReserve: 60, caseDiameter: 41, caseThickness: 13.2 } },
  { brand: 'Omega', match: 'seamaster diver 300m', specs: { caliber: 'Cal. 8800', waterResistance: 300, powerReserve: 55, caseDiameter: 42, caseThickness: 13.6 } },
  { brand: 'Omega', match: 'seamaster',         specs: { caliber: 'Cal. 8800', waterResistance: 300, powerReserve: 55, caseDiameter: 42, caseThickness: 13.6 } },
  { brand: 'Omega', match: 'constellation',     specs: { caliber: 'Cal. 8700', waterResistance: 50, powerReserve: 60, caseDiameter: 41, caseThickness: 12.4 } },
  { brand: 'Omega', match: 'de ville',          specs: { caliber: 'Cal. 8500', waterResistance: 30, powerReserve: 60, caseDiameter: 41, caseThickness: 11.0 } },

  // ── Patek Philippe ──
  { brand: 'Patek Philippe', match: 'nautilus',  specs: { caliber: 'Cal. 26-330 S C', waterResistance: 120, powerReserve: 45, caseDiameter: 40, caseThickness: 8.3 } },
  { brand: 'Patek Philippe', match: 'aquanaut',  specs: { caliber: 'Cal. 26-330 S C', waterResistance: 120, powerReserve: 45, caseDiameter: 40.8, caseThickness: 8.1 } },
  { brand: 'Patek Philippe', match: 'calatrava', specs: { caliber: 'Cal. 324 S C', waterResistance: 30, powerReserve: 45, caseDiameter: 39, caseThickness: 8.6 } },
  { brand: 'Patek Philippe', match: 'grand complications', specs: { caliber: 'Cal. 240 Q', waterResistance: 30, powerReserve: 48, caseDiameter: 38, caseThickness: 10.2 } },
  { brand: 'Patek Philippe', match: 'world time', specs: { caliber: 'Cal. 240 HU', waterResistance: 30, powerReserve: 48, caseDiameter: 38.5, caseThickness: 10.2 } },
  { brand: 'Patek Philippe', match: 'perpetual calendar', specs: { caliber: 'Cal. 240 Q', waterResistance: 30, powerReserve: 48, caseDiameter: 40, caseThickness: 11.8 } },
  { brand: 'Patek Philippe', match: 'annual calendar', specs: { caliber: 'Cal. 324 S QA LU', waterResistance: 30, powerReserve: 45, caseDiameter: 40.5, caseThickness: 10.5 } },

  // ── Audemars Piguet ──
  { brand: 'Audemars Piguet', match: 'royal oak offshore', specs: { caliber: 'Cal. 3126/3840', waterResistance: 100, powerReserve: 55, caseDiameter: 42, caseThickness: 14.4 } },
  { brand: 'Audemars Piguet', match: 'royal oak',  specs: { caliber: 'Cal. 4302', waterResistance: 50, powerReserve: 70, caseDiameter: 41, caseThickness: 10.4 } },
  { brand: 'Audemars Piguet', match: 'code 11.59', specs: { caliber: 'Cal. 4302', waterResistance: 30, powerReserve: 70, caseDiameter: 41, caseThickness: 10.7 } },

  // ── Tudor ──
  { brand: 'Tudor', match: 'black bay 58',      specs: { caliber: 'Cal. MT5402', waterResistance: 200, powerReserve: 70, caseDiameter: 39, caseThickness: 11.9 } },
  { brand: 'Tudor', match: 'black bay',         specs: { caliber: 'Cal. MT5602', waterResistance: 200, powerReserve: 70, caseDiameter: 41, caseThickness: 12.7 } },
  { brand: 'Tudor', match: 'pelagos',           specs: { caliber: 'Cal. MT5612', waterResistance: 500, powerReserve: 70, caseDiameter: 42, caseThickness: 14.3 } },
  { brand: 'Tudor', match: 'ranger',            specs: { caliber: 'Cal. MT5402', waterResistance: 100, powerReserve: 70, caseDiameter: 39, caseThickness: 12.0 } },

  // ── IWC ──
  { brand: 'IWC', match: 'portugieser chronograph', specs: { caliber: 'Cal. 69355', waterResistance: 30, powerReserve: 46, caseDiameter: 41, caseThickness: 13.1 } },
  { brand: 'IWC', match: 'portugieser',         specs: { caliber: 'Cal. 82200', waterResistance: 30, powerReserve: 60, caseDiameter: 42.3, caseThickness: 14.2 } },
  { brand: 'IWC', match: 'pilot mark',          specs: { caliber: 'Cal. 32110', waterResistance: 60, powerReserve: 72, caseDiameter: 40, caseThickness: 10.8 } },
  { brand: 'IWC', match: "pilot's watch mark",  specs: { caliber: 'Cal. 32110', waterResistance: 60, powerReserve: 72, caseDiameter: 40, caseThickness: 10.8 } },
  { brand: 'IWC', match: 'big pilot',           specs: { caliber: 'Cal. 52110', waterResistance: 60, powerReserve: 168, caseDiameter: 46.2, caseThickness: 15.3 } },
  { brand: 'IWC', match: 'portofino',           specs: { caliber: 'Cal. 35111', waterResistance: 30, powerReserve: 42, caseDiameter: 40, caseThickness: 9.2 } },
  { brand: 'IWC', match: 'aquatimer',           specs: { caliber: 'Cal. 30120', waterResistance: 300, powerReserve: 42, caseDiameter: 42, caseThickness: 14.1 } },
  { brand: 'IWC', match: 'ingenieur',           specs: { caliber: 'Cal. 32110', waterResistance: 100, powerReserve: 72, caseDiameter: 40, caseThickness: 10.0 } },

  // ── Breitling ──
  { brand: 'Breitling', match: 'navitimer',     specs: { caliber: 'Cal. B01', waterResistance: 30, powerReserve: 70, caseDiameter: 41, caseThickness: 14.2 } },
  { brand: 'Breitling', match: 'superocean heritage', specs: { caliber: 'Cal. B20', waterResistance: 200, powerReserve: 70, caseDiameter: 42, caseThickness: 13.1 } },
  { brand: 'Breitling', match: 'superocean',    specs: { caliber: 'Cal. B17', waterResistance: 300, powerReserve: 38, caseDiameter: 42, caseThickness: 14.2 } },
  { brand: 'Breitling', match: 'chronomat',     specs: { caliber: 'Cal. B01', waterResistance: 200, powerReserve: 70, caseDiameter: 42, caseThickness: 15.1 } },
  { brand: 'Breitling', match: 'avenger',       specs: { caliber: 'Cal. B01', waterResistance: 300, powerReserve: 70, caseDiameter: 44, caseThickness: 16.5 } },
  { brand: 'Breitling', match: 'premier',       specs: { caliber: 'Cal. B01', waterResistance: 100, powerReserve: 70, caseDiameter: 42, caseThickness: 14.4 } },

  // ── TAG Heuer ──
  { brand: 'TAG Heuer', match: 'carrera',       specs: { caliber: 'Cal. Heuer 02', waterResistance: 100, powerReserve: 80, caseDiameter: 42, caseThickness: 14.7 } },
  { brand: 'TAG Heuer', match: 'monaco',        specs: { caliber: 'Cal. Heuer 02', waterResistance: 100, powerReserve: 80, caseDiameter: 39, caseThickness: 14.5 } },
  { brand: 'TAG Heuer', match: 'aquaracer',     specs: { caliber: 'Cal. 5', waterResistance: 300, powerReserve: 38, caseDiameter: 43, caseThickness: 12.2 } },
  { brand: 'TAG Heuer', match: 'formula 1',     specs: { caliber: 'Quartz', waterResistance: 200, powerReserve: null, caseDiameter: 43, caseThickness: 12.4 } },
  { brand: 'TAG Heuer', match: 'formula1',      specs: { caliber: 'Quartz', waterResistance: 200, powerReserve: null, caseDiameter: 43, caseThickness: 12.4 } },

  // ── Cartier ──
  { brand: 'Cartier', match: 'tank française',  specs: { caliber: 'Cal. 1847 MC', waterResistance: 30, powerReserve: 38, caseDiameter: 32, caseThickness: 6.9 } },
  { brand: 'Cartier', match: 'tank francaise',  specs: { caliber: 'Cal. 1847 MC', waterResistance: 30, powerReserve: 38, caseDiameter: 32, caseThickness: 6.9 } },
  { brand: 'Cartier', match: 'tank',            specs: { caliber: 'Cal. 1847 MC', waterResistance: 30, powerReserve: 38, caseDiameter: 34, caseThickness: 7.6 } },
  { brand: 'Cartier', match: 'santos',          specs: { caliber: 'Cal. 1847 MC', waterResistance: 100, powerReserve: 38, caseDiameter: 39.8, caseThickness: 9.1 } },
  { brand: 'Cartier', match: 'ballon bleu',     specs: { caliber: 'Cal. 1847 MC', waterResistance: 30, powerReserve: 38, caseDiameter: 40, caseThickness: 12.1 } },
  { brand: 'Cartier', match: 'pasha',           specs: { caliber: 'Cal. 1847 MC', waterResistance: 100, powerReserve: 38, caseDiameter: 41, caseThickness: 9.4 } },

  // ── Hublot ──
  { brand: 'Hublot', match: 'big bang',         specs: { caliber: 'Cal. HUB1242', waterResistance: 100, powerReserve: 72, caseDiameter: 44, caseThickness: 14.5 } },
  { brand: 'Hublot', match: 'classic fusion',   specs: { caliber: 'Cal. HUB1112', waterResistance: 50, powerReserve: 42, caseDiameter: 42, caseThickness: 10.3 } },
  { brand: 'Hublot', match: 'spirit of big bang', specs: { caliber: 'Cal. HUB4700', waterResistance: 100, powerReserve: 50, caseDiameter: 42, caseThickness: 13.6 } },

  // ── Panerai ──
  { brand: 'Panerai', match: 'luminor marina',  specs: { caliber: 'Cal. P.9010', waterResistance: 300, powerReserve: 72, caseDiameter: 44, caseThickness: 15.6 } },
  { brand: 'Panerai', match: 'luminor due',     specs: { caliber: 'Cal. P.900', waterResistance: 30, powerReserve: 72, caseDiameter: 42, caseThickness: 10.7 } },
  { brand: 'Panerai', match: 'luminor',         specs: { caliber: 'Cal. P.9010', waterResistance: 300, powerReserve: 72, caseDiameter: 44, caseThickness: 15.6 } },
  { brand: 'Panerai', match: 'radiomir',        specs: { caliber: 'Cal. P.6000', waterResistance: 100, powerReserve: 72, caseDiameter: 45, caseThickness: 14.0 } },
  { brand: 'Panerai', match: 'submersible',     specs: { caliber: 'Cal. P.9010', waterResistance: 300, powerReserve: 72, caseDiameter: 42, caseThickness: 14.2 } },

  // ── Zenith ──
  { brand: 'Zenith', match: 'el primero',       specs: { caliber: 'Cal. El Primero 400', waterResistance: 100, powerReserve: 50, caseDiameter: 42, caseThickness: 12.6 } },
  { brand: 'Zenith', match: 'chronomaster',     specs: { caliber: 'Cal. El Primero 3600', waterResistance: 100, powerReserve: 60, caseDiameter: 42, caseThickness: 14.1 } },
  { brand: 'Zenith', match: 'defy',             specs: { caliber: 'Cal. Elite 670', waterResistance: 100, powerReserve: 50, caseDiameter: 41, caseThickness: 10.8 } },
  { brand: 'Zenith', match: 'pilot',            specs: { caliber: 'Cal. Elite 679', waterResistance: 100, powerReserve: 50, caseDiameter: 40, caseThickness: 12.0 } },

  // ── Jaeger-LeCoultre ──
  { brand: 'Jaeger-LeCoultre', match: 'reverso classic', specs: { caliber: 'Cal. 822/2', waterResistance: 30, powerReserve: 42, caseDiameter: 40.1, caseThickness: 8.5 } },
  { brand: 'Jaeger-LeCoultre', match: 'reverso',specs: { caliber: 'Cal. 822/2', waterResistance: 30, powerReserve: 42, caseDiameter: 40.1, caseThickness: 8.5 } },
  { brand: 'Jaeger-LeCoultre', match: 'master ultra thin', specs: { caliber: 'Cal. 849', waterResistance: 50, powerReserve: 43, caseDiameter: 39, caseThickness: 7.3 } },
  { brand: 'Jaeger-LeCoultre', match: 'master control', specs: { caliber: 'Cal. 899', waterResistance: 50, powerReserve: 70, caseDiameter: 40, caseThickness: 8.9 } },
  { brand: 'Jaeger-LeCoultre', match: 'master', specs: { caliber: 'Cal. 899', waterResistance: 50, powerReserve: 70, caseDiameter: 40, caseThickness: 8.9 } },
  { brand: 'Jaeger-LeCoultre', match: 'polaris',specs: { caliber: 'Cal. 898E/1', waterResistance: 200, powerReserve: 70, caseDiameter: 42, caseThickness: 13.1 } },

  // ── Vacheron Constantin ──
  { brand: 'Vacheron Constantin', match: 'overseas', specs: { caliber: 'Cal. 5100', waterResistance: 150, powerReserve: 60, caseDiameter: 41, caseThickness: 11.0 } },
  { brand: 'Vacheron Constantin', match: 'patrimony', specs: { caliber: 'Cal. 1400', waterResistance: 30, powerReserve: 40, caseDiameter: 40, caseThickness: 7.3 } },
  { brand: 'Vacheron Constantin', match: 'traditionnelle', specs: { caliber: 'Cal. 2450 Q6', waterResistance: 30, powerReserve: 40, caseDiameter: 41, caseThickness: 10.3 } },
  { brand: 'Vacheron Constantin', match: 'fiftysi', specs: { caliber: 'Cal. 1326', waterResistance: 30, powerReserve: 60, caseDiameter: 40, caseThickness: 8.3 } },

  // ── Grand Seiko ──
  { brand: 'Grand Seiko', match: 'snowflake',   specs: { caliber: 'Cal. 9R65', waterResistance: 100, powerReserve: 72, caseDiameter: 41, caseThickness: 12.3 } },
  { brand: 'Grand Seiko', match: 'spring drive', specs: { caliber: 'Cal. 9R65', waterResistance: 100, powerReserve: 72, caseDiameter: 41, caseThickness: 12.5 } },
  { brand: 'Grand Seiko', match: 'sbga',        specs: { caliber: 'Cal. 9R65', waterResistance: 100, powerReserve: 72, caseDiameter: 41, caseThickness: 12.5 } },
  { brand: 'Grand Seiko', match: 'sbgh',        specs: { caliber: 'Cal. 9S85', waterResistance: 100, powerReserve: 55, caseDiameter: 40, caseThickness: 13.0 } },
  { brand: 'Grand Seiko', match: 'sbgw',        specs: { caliber: 'Cal. 9S64', waterResistance: 30, powerReserve: 72, caseDiameter: 37.3, caseThickness: 11.2 } },
  { brand: 'Grand Seiko', match: 'heritage',    specs: { caliber: 'Cal. 9S85', waterResistance: 100, powerReserve: 55, caseDiameter: 40, caseThickness: 13.0 } },

  // ── Longines ──
  { brand: 'Longines', match: 'master collection', specs: { caliber: 'Cal. L893.5', waterResistance: 30, powerReserve: 72, caseDiameter: 40, caseThickness: 10.0 } },
  { brand: 'Longines', match: 'hydroconquest',  specs: { caliber: 'Cal. L888.5', waterResistance: 300, powerReserve: 72, caseDiameter: 41, caseThickness: 12.2 } },
  { brand: 'Longines', match: 'spirit',         specs: { caliber: 'Cal. L888.4', waterResistance: 100, powerReserve: 72, caseDiameter: 42, caseThickness: 11.5 } },
  { brand: 'Longines', match: 'conquest',       specs: { caliber: 'Cal. L888.4', waterResistance: 100, powerReserve: 72, caseDiameter: 41, caseThickness: 11.0 } },
  { brand: 'Longines', match: 'legend diver',   specs: { caliber: 'Cal. L888.5', waterResistance: 300, powerReserve: 72, caseDiameter: 42, caseThickness: 13.0 } },

  // ── Tissot ──
  { brand: 'Tissot', match: 'prx',              specs: { caliber: 'Cal. Powermatic 80', waterResistance: 100, powerReserve: 80, caseDiameter: 40, caseThickness: 10.4 } },
  { brand: 'Tissot', match: 'seastar',          specs: { caliber: 'Cal. Powermatic 80', waterResistance: 300, powerReserve: 80, caseDiameter: 43, caseThickness: 12.6 } },
  { brand: 'Tissot', match: 'gentleman',        specs: { caliber: 'Cal. Powermatic 80', waterResistance: 100, powerReserve: 80, caseDiameter: 40, caseThickness: 10.6 } },
  { brand: 'Tissot', match: 'le locle',         specs: { caliber: 'Cal. Powermatic 80', waterResistance: 30, powerReserve: 80, caseDiameter: 39.3, caseThickness: 9.9 } },

  // ── Seiko (non-Grand Seiko) ──
  { brand: 'Seiko', match: 'presage',           specs: { caliber: 'Cal. 4R35', waterResistance: 50, powerReserve: 41, caseDiameter: 40.5, caseThickness: 11.8 } },
  { brand: 'Seiko', match: 'prospex',           specs: { caliber: 'Cal. 6R35', waterResistance: 200, powerReserve: 70, caseDiameter: 42.6, caseThickness: 13.2 } },
  { brand: 'Seiko', match: 'astron',            specs: { caliber: 'Cal. 5X53', waterResistance: 100, powerReserve: null, caseDiameter: 42.7, caseThickness: 12.4 } },

  // ── A. Lange & Söhne ──
  { brand: 'A. Lange', match: 'lange 1',        specs: { caliber: 'Cal. L121.1', waterResistance: 30, powerReserve: 72, caseDiameter: 38.5, caseThickness: 9.8 } },
  { brand: 'A. Lange', match: 'saxonia',        specs: { caliber: 'Cal. L941.1', waterResistance: 30, powerReserve: 72, caseDiameter: 38.5, caseThickness: 7.2 } },
  { brand: 'A. Lange', match: 'zeitwerk',       specs: { caliber: 'Cal. L043.1', waterResistance: 30, powerReserve: 36, caseDiameter: 41.9, caseThickness: 12.6 } },
  { brand: 'A. Lange', match: 'odysseus',       specs: { caliber: 'Cal. L155.1', waterResistance: 120, powerReserve: 50, caseDiameter: 40.5, caseThickness: 11.1 } },
  { brand: 'A. Lange', match: 'datograph',      specs: { caliber: 'Cal. L951.6', waterResistance: 30, powerReserve: 60, caseDiameter: 41, caseThickness: 13.1 } },

  // ── Richard Mille ──
  { brand: 'Richard Mille', match: 'rm 011',    specs: { caliber: 'Cal. RMAC3', waterResistance: 50, powerReserve: 55, caseDiameter: 50, caseThickness: 16.15 } },
  { brand: 'Richard Mille', match: 'rm 035',    specs: { caliber: 'Cal. RMUL3', waterResistance: 50, powerReserve: 55, caseDiameter: 48, caseThickness: 11.7 } },
  { brand: 'Richard Mille', match: 'rm 055',    specs: { caliber: 'Cal. RMUL2', waterResistance: 50, powerReserve: 55, caseDiameter: 49.9, caseThickness: 13.0 } },
  { brand: 'Richard Mille', match: 'rm011',     specs: { caliber: 'Cal. RMAC3', waterResistance: 50, powerReserve: 55, caseDiameter: 50, caseThickness: 16.15 } },
  { brand: 'Richard Mille', match: 'rm035',     specs: { caliber: 'Cal. RMUL3', waterResistance: 50, powerReserve: 55, caseDiameter: 48, caseThickness: 11.7 } },
  { brand: 'Richard Mille', match: 'rm055',     specs: { caliber: 'Cal. RMUL2', waterResistance: 50, powerReserve: 55, caseDiameter: 49.9, caseThickness: 13.0 } },

  // ── Blancpain ──
  { brand: 'Blancpain', match: 'fifty fathoms', specs: { caliber: 'Cal. 1315', waterResistance: 300, powerReserve: 120, caseDiameter: 45, caseThickness: 15.4 } },
  { brand: 'Blancpain', match: 'villeret',      specs: { caliber: 'Cal. 6654', waterResistance: 30, powerReserve: 72, caseDiameter: 40, caseThickness: 8.7 } },

  // ── Chopard ──
  { brand: 'Chopard', match: 'alpine eagle',    specs: { caliber: 'Cal. 01.01-C', waterResistance: 100, powerReserve: 60, caseDiameter: 41, caseThickness: 9.7 } },
  { brand: 'Chopard', match: 'mille miglia',    specs: { caliber: 'Cal. 01.08-C', waterResistance: 100, powerReserve: 60, caseDiameter: 44, caseThickness: 15.5 } },

  // ── Girard-Perregaux ──
  { brand: 'Girard-Perregaux', match: 'laureato', specs: { caliber: 'Cal. GP01800', waterResistance: 100, powerReserve: 54, caseDiameter: 42, caseThickness: 10.7 } },

  // ── Oris ──
  { brand: 'Oris', match: 'aquis',              specs: { caliber: 'Cal. 400', waterResistance: 300, powerReserve: 120, caseDiameter: 41.5, caseThickness: 13.4 } },
  { brand: 'Oris', match: 'big crown',          specs: { caliber: 'Cal. 754', waterResistance: 50, powerReserve: 38, caseDiameter: 40, caseThickness: 11.5 } },
  { brand: 'Oris', match: 'divers sixty-five',  specs: { caliber: 'Cal. 400', waterResistance: 100, powerReserve: 120, caseDiameter: 40, caseThickness: 12.9 } },
  { brand: 'Oris', match: 'divers 65',          specs: { caliber: 'Cal. 400', waterResistance: 100, powerReserve: 120, caseDiameter: 40, caseThickness: 12.9 } },

  // ── NOMOS ──
  { brand: 'NOMOS', match: 'tangente',          specs: { caliber: 'Cal. Alpha', waterResistance: 30, powerReserve: 43, caseDiameter: 35, caseThickness: 6.8 } },
  { brand: 'NOMOS', match: 'club',              specs: { caliber: 'Cal. Alpha', waterResistance: 100, powerReserve: 43, caseDiameter: 36, caseThickness: 8.6 } },
  { brand: 'NOMOS', match: 'orion',             specs: { caliber: 'Cal. Alpha', waterResistance: 30, powerReserve: 43, caseDiameter: 35, caseThickness: 7.6 } },
  { brand: 'NOMOS', match: 'metro',             specs: { caliber: 'Cal. DUW 4401', waterResistance: 30, powerReserve: 42, caseDiameter: 37, caseThickness: 7.8 } },
  { brand: 'NOMOS', match: 'ludwig',            specs: { caliber: 'Cal. Alpha', waterResistance: 30, powerReserve: 43, caseDiameter: 35, caseThickness: 7.4 } },

  // ── Sinn ──
  { brand: 'Sinn', match: '104',                specs: { caliber: 'Cal. SW 220-1', waterResistance: 200, powerReserve: 38, caseDiameter: 41, caseThickness: 11.5 } },
  { brand: 'Sinn', match: '556',                specs: { caliber: 'Cal. SW 200-1', waterResistance: 200, powerReserve: 38, caseDiameter: 38.5, caseThickness: 10.0 } },
  { brand: 'Sinn', match: 'u50',                specs: { caliber: 'Cal. SW 300-1', waterResistance: 500, powerReserve: 42, caseDiameter: 41, caseThickness: 12.2 } },
  { brand: 'Sinn', match: 'u1',                 specs: { caliber: 'Cal. SW 200-1', waterResistance: 1000, powerReserve: 38, caseDiameter: 44, caseThickness: 14.7 } },

  // ── Piaget ──
  { brand: 'Piaget', match: 'altiplano',        specs: { caliber: 'Cal. 1200P', waterResistance: 30, powerReserve: 44, caseDiameter: 40, caseThickness: 6.4 } },
  { brand: 'Piaget', match: 'polo',             specs: { caliber: 'Cal. 1160P', waterResistance: 50, powerReserve: 50, caseDiameter: 42, caseThickness: 9.4 } },

  // ── Bell & Ross ──
  { brand: 'Bell & Ross', match: 'br 03',       specs: { caliber: 'Cal. BR-CAL.302', waterResistance: 100, powerReserve: 38, caseDiameter: 41, caseThickness: 12.2 } },
  { brand: 'Bell & Ross', match: 'br 05',       specs: { caliber: 'Cal. BR-CAL.321', waterResistance: 100, powerReserve: 38, caseDiameter: 40, caseThickness: 10.3 } },

  // ── Baume & Mercier ──
  { brand: 'Baume & Mercier', match: 'riviera', specs: { caliber: 'Cal. Baumatic BM13-1975A', waterResistance: 100, powerReserve: 120, caseDiameter: 42, caseThickness: 10.3 } },
  { brand: 'Baume & Mercier', match: 'classima',specs: { caliber: 'Cal. Baumatic BM13', waterResistance: 50, powerReserve: 120, caseDiameter: 40, caseThickness: 9.9 } },

  // ── Frederique Constant ──
  { brand: 'Frederique Constant', match: 'slimline', specs: { caliber: 'Cal. FC-710', waterResistance: 30, powerReserve: 42, caseDiameter: 40, caseThickness: 8.2 } },
  { brand: 'Frederique Constant', match: 'classic', specs: { caliber: 'Cal. FC-303', waterResistance: 50, powerReserve: 38, caseDiameter: 40, caseThickness: 9.5 } },

  // ── Montblanc ──
  { brand: 'Montblanc', match: '1858',          specs: { caliber: 'Cal. MB 24.15', waterResistance: 100, powerReserve: 42, caseDiameter: 42, caseThickness: 12.6 } },
  { brand: 'Montblanc', match: 'heritage',      specs: { caliber: 'Cal. MB 24.08', waterResistance: 30, powerReserve: 42, caseDiameter: 40, caseThickness: 9.3 } },

  // ── Ulysse Nardin ──
  { brand: 'Ulysse Nardin', match: 'marine',    specs: { caliber: 'Cal. UN-118', waterResistance: 100, powerReserve: 60, caseDiameter: 42, caseThickness: 12.7 } },
  { brand: 'Ulysse Nardin', match: 'diver',     specs: { caliber: 'Cal. UN-118', waterResistance: 300, powerReserve: 60, caseDiameter: 44, caseThickness: 14.0 } },

  // ── Breguet ──
  { brand: 'Breguet', match: 'classique',       specs: { caliber: 'Cal. 777Q', waterResistance: 30, powerReserve: 50, caseDiameter: 38, caseThickness: 8.6 } },
  { brand: 'Breguet', match: 'marine',          specs: { caliber: 'Cal. 777A', waterResistance: 100, powerReserve: 50, caseDiameter: 40, caseThickness: 11.8 } },
  { brand: 'Breguet', match: 'tradition',       specs: { caliber: 'Cal. 507 DR1', waterResistance: 30, powerReserve: 50, caseDiameter: 40, caseThickness: 11.7 } },

  // ── Hamilton ──
  { brand: 'Hamilton', match: 'khaki field',    specs: { caliber: 'Cal. H-10', waterResistance: 100, powerReserve: 80, caseDiameter: 42, caseThickness: 11.0 } },
  { brand: 'Hamilton', match: 'jazzmaster',     specs: { caliber: 'Cal. H-32', waterResistance: 50, powerReserve: 80, caseDiameter: 40, caseThickness: 11.5 } },
  { brand: 'Hamilton', match: 'intra-matic',    specs: { caliber: 'Cal. H-31', waterResistance: 100, powerReserve: 60, caseDiameter: 40, caseThickness: 14.4 } },
  { brand: 'Hamilton', match: 'ventura',        specs: { caliber: 'Quartz', waterResistance: 50, powerReserve: null, caseDiameter: 32.3, caseThickness: 10.5 } },

  // ── Rado ──
  { brand: 'Rado', match: 'captain cook',       specs: { caliber: 'Cal. R813', waterResistance: 200, powerReserve: 80, caseDiameter: 42, caseThickness: 12.3 } },
  { brand: 'Rado', match: 'diastar',            specs: { caliber: 'Cal. R863', waterResistance: 100, powerReserve: 80, caseDiameter: 38, caseThickness: 11.2 } },

  // ── Glashutte Original ──
  { brand: 'Glashütte Original', match: 'senator', specs: { caliber: 'Cal. 100-03', waterResistance: 50, powerReserve: 55, caseDiameter: 40, caseThickness: 11.2 } },
  { brand: 'Glashutte Original', match: 'senator', specs: { caliber: 'Cal. 100-03', waterResistance: 50, powerReserve: 55, caseDiameter: 40, caseThickness: 11.2 } },
  { brand: 'Glashütte Original', match: 'panomatic', specs: { caliber: 'Cal. 90-02', waterResistance: 50, powerReserve: 42, caseDiameter: 40, caseThickness: 12.0 } },
  { brand: 'Glashutte Original', match: 'panomatic', specs: { caliber: 'Cal. 90-02', waterResistance: 50, powerReserve: 42, caseDiameter: 40, caseThickness: 12.0 } },
]

// ─── BRAND_DEFAULTS ──────────────────────────────────────────────────────────
const BRAND_DEFAULTS = {
  'Rolex':               { waterResistance: 100, powerReserve: 70, caseDiameter: 40, caseThickness: 12.0 },
  'Omega':               { waterResistance: 100, powerReserve: 60, caseDiameter: 41, caseThickness: 13.0 },
  'Patek Philippe':      { waterResistance: 30, powerReserve: 45, caseDiameter: 39, caseThickness: 9.0 },
  'Audemars Piguet':     { waterResistance: 50, powerReserve: 60, caseDiameter: 41, caseThickness: 10.5 },
  'Tudor':               { waterResistance: 200, powerReserve: 70, caseDiameter: 41, caseThickness: 12.5 },
  'IWC':                 { waterResistance: 60, powerReserve: 60, caseDiameter: 41, caseThickness: 12.0 },
  'Breitling':           { waterResistance: 100, powerReserve: 70, caseDiameter: 42, caseThickness: 14.0 },
  'TAG Heuer':           { waterResistance: 100, powerReserve: 38, caseDiameter: 41, caseThickness: 12.5 },
  'Cartier':             { waterResistance: 30, powerReserve: 38, caseDiameter: 37, caseThickness: 8.5 },
  'Hublot':              { waterResistance: 100, powerReserve: 50, caseDiameter: 42, caseThickness: 13.0 },
  'Panerai':             { waterResistance: 300, powerReserve: 72, caseDiameter: 44, caseThickness: 15.0 },
  'Zenith':              { waterResistance: 100, powerReserve: 50, caseDiameter: 42, caseThickness: 12.5 },
  'Jaeger-LeCoultre':    { waterResistance: 50, powerReserve: 50, caseDiameter: 40, caseThickness: 9.0 },
  'Vacheron Constantin': { waterResistance: 30, powerReserve: 40, caseDiameter: 40, caseThickness: 8.5 },
  'Grand Seiko':         { waterResistance: 100, powerReserve: 72, caseDiameter: 40, caseThickness: 12.5 },
  'Longines':            { waterResistance: 50, powerReserve: 72, caseDiameter: 40, caseThickness: 11.0 },
  'Tissot':              { waterResistance: 100, powerReserve: 80, caseDiameter: 40, caseThickness: 10.5 },
  'Seiko':               { waterResistance: 100, powerReserve: 41, caseDiameter: 40, caseThickness: 12.0 },
  'A. Lange & Söhne':    { waterResistance: 30, powerReserve: 72, caseDiameter: 38.5, caseThickness: 9.0 },
  'A. Lange':            { waterResistance: 30, powerReserve: 72, caseDiameter: 38.5, caseThickness: 9.0 },
  'Richard Mille':       { waterResistance: 50, powerReserve: 55, caseDiameter: 49, caseThickness: 14.0 },
  'Blancpain':           { waterResistance: 100, powerReserve: 100, caseDiameter: 42, caseThickness: 13.0 },
  'Chopard':             { waterResistance: 100, powerReserve: 60, caseDiameter: 41, caseThickness: 10.5 },
  'Girard-Perregaux':    { waterResistance: 100, powerReserve: 54, caseDiameter: 42, caseThickness: 11.0 },
  'Oris':                { waterResistance: 100, powerReserve: 38, caseDiameter: 41, caseThickness: 12.0 },
  'NOMOS':               { waterResistance: 30, powerReserve: 43, caseDiameter: 36, caseThickness: 7.5 },
  'Sinn':                { waterResistance: 200, powerReserve: 38, caseDiameter: 41, caseThickness: 11.5 },
  'Piaget':              { waterResistance: 30, powerReserve: 44, caseDiameter: 40, caseThickness: 7.0 },
  'Bell & Ross':         { waterResistance: 100, powerReserve: 38, caseDiameter: 41, caseThickness: 12.0 },
  'Baume & Mercier':     { waterResistance: 50, powerReserve: 42, caseDiameter: 40, caseThickness: 10.0 },
  'Frederique Constant': { waterResistance: 50, powerReserve: 38, caseDiameter: 40, caseThickness: 9.5 },
  'Montblanc':           { waterResistance: 50, powerReserve: 42, caseDiameter: 40, caseThickness: 10.5 },
  'Ulysse Nardin':       { waterResistance: 100, powerReserve: 60, caseDiameter: 42, caseThickness: 12.5 },
  'Breguet':             { waterResistance: 30, powerReserve: 50, caseDiameter: 38, caseThickness: 9.5 },
  'Hamilton':            { waterResistance: 100, powerReserve: 80, caseDiameter: 42, caseThickness: 11.5 },
  'Rado':                { waterResistance: 100, powerReserve: 80, caseDiameter: 40, caseThickness: 11.0 },
  'Glashütte Original':  { waterResistance: 50, powerReserve: 55, caseDiameter: 40, caseThickness: 11.5 },
  'Glashutte Original':  { waterResistance: 50, powerReserve: 55, caseDiameter: 40, caseThickness: 11.5 },
  'Franck Muller':       { waterResistance: 30, powerReserve: 42, caseDiameter: 39, caseThickness: 11.0 },
  'Bulgari':             { waterResistance: 100, powerReserve: 60, caseDiameter: 41, caseThickness: 10.0 },
  'BVLGARI':             { waterResistance: 100, powerReserve: 60, caseDiameter: 41, caseThickness: 10.0 },
  'Corum':               { waterResistance: 100, powerReserve: 42, caseDiameter: 42, caseThickness: 11.5 },
  'Roger Dubuis':        { waterResistance: 50, powerReserve: 60, caseDiameter: 42, caseThickness: 14.0 },
  'MB&F':                { waterResistance: 30, powerReserve: 72, caseDiameter: 40, caseThickness: 20.0 },
  'H. Moser':            { waterResistance: 30, powerReserve: 72, caseDiameter: 40, caseThickness: 10.5 },
  'H. Moser & Cie':      { waterResistance: 30, powerReserve: 72, caseDiameter: 40, caseThickness: 10.5 },
  'Jacob & Co':          { waterResistance: 30, powerReserve: 48, caseDiameter: 47, caseThickness: 16.0 },
}

// ─── STYLE_DEFAULTS (final fallback) ──────────────────────────────────────────
const STYLE_DEFAULTS = {
  diver:  { waterResistance: 200, powerReserve: 42, caseDiameter: 42, caseThickness: 14.0 },
  dress:  { waterResistance: 30, powerReserve: 42, caseDiameter: 38, caseThickness: 9.0 },
  chrono: { waterResistance: 100, powerReserve: 48, caseDiameter: 42, caseThickness: 14.0 },
  pilot:  { waterResistance: 60, powerReserve: 42, caseDiameter: 43, caseThickness: 13.0 },
  sport:  { waterResistance: 100, powerReserve: 42, caseDiameter: 41, caseThickness: 12.0 },
  field:  { waterResistance: 100, powerReserve: 42, caseDiameter: 40, caseThickness: 11.0 },
}

// ─── Helper: find matching known specs ──────────────────────────────────────
function findKnownSpecs(brand, model) {
  const bLower = (brand || '').toLowerCase()
  const mLower = (model || '').toLowerCase()

  for (const entry of KNOWN_SPECS) {
    const entryBrand = entry.brand.toLowerCase()
    // Brand must match (or be a substring — handles "A. Lange & Söhne" vs "A. Lange")
    if (!bLower.includes(entryBrand) && !entryBrand.includes(bLower)) continue
    if (mLower.includes(entry.match.toLowerCase())) {
      return entry.specs
    }
  }
  return null
}

// ─── Helper: find brand defaults ──────────────────────────────────────────────
function findBrandDefaults(brand) {
  // Try exact match first
  if (BRAND_DEFAULTS[brand]) return BRAND_DEFAULTS[brand]
  // Try partial match
  const bLower = (brand || '').toLowerCase()
  for (const [key, val] of Object.entries(BRAND_DEFAULTS)) {
    if (bLower.includes(key.toLowerCase()) || key.toLowerCase().includes(bLower)) {
      return val
    }
  }
  return null
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('Fetching watches with missing specs...')

  const watches = await prisma.watch.findMany({
    where: {
      OR: [
        { caliber: null },
        { waterResistance: null },
        { powerReserve: null },
        { caseDiameter: null },
        { caseThickness: null },
      ],
    },
  })

  console.log(`Found ${watches.length} watches with at least one missing spec field.\n`)

  const stats = {
    total: watches.length,
    updated: 0,
    fieldsSet: { caliber: 0, waterResistance: 0, powerReserve: 0, caseDiameter: 0, caseThickness: 0 },
    matchedKnown: 0,
    matchedBrand: 0,
    matchedStyle: 0,
    skipped: 0,
  }

  for (let i = 0; i < watches.length; i++) {
    const w = watches[i]

    // 1) Try KNOWN_SPECS
    let specs = findKnownSpecs(w.brand, w.model)
    let source = 'known'

    // 2) Fall back to BRAND_DEFAULTS
    if (!specs) {
      specs = findBrandDefaults(w.brand)
      source = 'brand'
    }

    // 3) Fall back to STYLE_DEFAULTS
    if (!specs) {
      specs = STYLE_DEFAULTS[w.style] || STYLE_DEFAULTS['sport']
      source = 'style'
    }

    // Build update payload — only fill NULL fields
    const data = {}

    if (w.caliber === null && specs.caliber) {
      data.caliber = specs.caliber
      stats.fieldsSet.caliber++
    }
    if (w.waterResistance === null && specs.waterResistance != null) {
      data.waterResistance = specs.waterResistance
      stats.fieldsSet.waterResistance++
    }
    if (w.powerReserve === null && specs.powerReserve != null) {
      data.powerReserve = specs.powerReserve
      stats.fieldsSet.powerReserve++
    }
    if (w.caseDiameter === null && specs.caseDiameter != null) {
      data.caseDiameter = specs.caseDiameter
      stats.fieldsSet.caseDiameter++
    }
    if (w.caseThickness === null && specs.caseThickness != null) {
      data.caseThickness = specs.caseThickness
      stats.fieldsSet.caseThickness++
    }

    if (Object.keys(data).length === 0) {
      stats.skipped++
      continue
    }

    await prisma.watch.update({
      where: { id: w.id },
      data,
    })

    stats.updated++
    if (source === 'known') stats.matchedKnown++
    else if (source === 'brand') stats.matchedBrand++
    else stats.matchedStyle++

    if ((i + 1) % 50 === 0) {
      console.log(`  Progress: ${i + 1}/${watches.length} processed...`)
    }
  }

  console.log('\n══════════════════════════════════════════')
  console.log('  FILL SPECS COMPLETE')
  console.log('══════════════════════════════════════════')
  console.log(`  Watches with missing specs: ${stats.total}`)
  console.log(`  Watches updated:            ${stats.updated}`)
  console.log(`  Watches skipped (no fill):  ${stats.skipped}`)
  console.log('──────────────────────────────────────────')
  console.log(`  Matched via KNOWN_SPECS:    ${stats.matchedKnown}`)
  console.log(`  Matched via BRAND_DEFAULTS: ${stats.matchedBrand}`)
  console.log(`  Matched via STYLE_DEFAULTS: ${stats.matchedStyle}`)
  console.log('──────────────────────────────────────────')
  console.log('  Fields filled:')
  console.log(`    caliber:         ${stats.fieldsSet.caliber}`)
  console.log(`    waterResistance: ${stats.fieldsSet.waterResistance}`)
  console.log(`    powerReserve:    ${stats.fieldsSet.powerReserve}`)
  console.log(`    caseDiameter:    ${stats.fieldsSet.caseDiameter}`)
  console.log(`    caseThickness:   ${stats.fieldsSet.caseThickness}`)
  const totalFields = Object.values(stats.fieldsSet).reduce((a, b) => a + b, 0)
  console.log(`    TOTAL fields:    ${totalFields}`)
  console.log('══════════════════════════════════════════\n')
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
