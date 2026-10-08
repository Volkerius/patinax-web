// Curated vintage reference database for top luxury watch models.
// Each entry is a real, well-documented historical reference. These watches
// have decades of collector demand and target highly specific long-tail
// search queries (e.g., "rolex 5513", "omega ck 2998", "daytona 6263").
//
// Fields: brand, parentModel, reference, year, caseDiameter, caseMaterial,
// bezelMaterial, movement, caliber, waterResistance, description, style.

export const VINTAGE_REFERENCES = [
  // ── Rolex Submariner vintage ────────────────────────────────────────────
  { brand: 'Rolex', parentModel: 'Submariner', reference: '6204', year: 1953, caseDiameter: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: 'A.260', waterResistance: 100, style: 'diver',
    description: 'The Reference 6204 is the original Rolex Submariner — launched in 1953 as the first wristwatch certified to 100m of water resistance. It established the design vocabulary every modern dive watch follows: rotating timing bezel, Mercedes hands, and luminous indices. The 6204 is among the rarest Rolex sport references; period-correct examples regularly cross seven figures at auction.' },
  { brand: 'Rolex', parentModel: 'Submariner', reference: '6538', year: 1956, caseDiameter: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '1030', waterResistance: 200, style: 'diver',
    description: 'The Reference 6538 — known to collectors as the "Big Crown" — was Sean Connery\'s Submariner in early James Bond films. The oversized 8mm Brevet crown enabled easier grip with diving gloves. Production ran from 1956 to 1959 and the reference now anchors the most desirable vintage Submariner subcategory.' },
  { brand: 'Rolex', parentModel: 'Submariner', reference: '5512', year: 1959, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '1530', waterResistance: 200, style: 'diver',
    description: 'The 5512 marked the beginning of the modern 40mm Submariner case (crown guards added). It ran from 1959 through 1978 in chronometer-grade form; non-chronometer counterpart was the 5513. Four-line dials and "underline" transitional dials from the early 1960s are particularly collected.' },
  { brand: 'Rolex', parentModel: 'Submariner', reference: '5513', year: 1962, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '1520', waterResistance: 200, style: 'diver',
    description: 'The 5513 is the longest-running vintage Submariner reference, produced from 1962 to 1989. Non-COSC certified (no "Superlative" line on the dial early in production), it covered the full range of dial evolutions: gilt, matte, glossy, tritium, with countless variations. This is the entry-level vintage Submariner for most collectors.' },
  { brand: 'Rolex', parentModel: 'Submariner', reference: '1680', year: 1969, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '1575', waterResistance: 200, style: 'diver',
    description: 'The 1680 introduced the date complication and Cyclops to the Submariner line in 1969. Earliest examples carried a "red Submariner" line on the dial — these "Red Sub" variants are among the most valuable post-vintage Subs. The reference ran until 1979.' },
  { brand: 'Rolex', parentModel: 'Submariner', reference: '16800', year: 1979, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '3035', waterResistance: 200, style: 'diver',
    description: 'The 16800 brought the modern sapphire crystal and quickset date to the Submariner line in 1979. It also upgraded depth rating to 300m — the figure the line has carried ever since. Transitional matte and glossy dials make for varied collector hunting.' },
  { brand: 'Rolex', parentModel: 'Submariner', reference: '14060', year: 1989, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '3000', waterResistance: 300, style: 'diver',
    description: 'The 14060 was the no-date Submariner from 1989 to 2002 (later the 14060M to 2012). Non-COSC certified, the cleanest dial layout in the entire Sub catalog — beloved by purists who prefer the watch without a date window.' },

  // ── Rolex GMT-Master vintage ────────────────────────────────────────────
  { brand: 'Rolex', parentModel: 'GMT-Master', reference: '6542', year: 1955, caseDiameter: 38, caseMaterial: 'Stainless steel', bezelMaterial: 'Bakelite', movement: 'Automatic', caliber: '1036', waterResistance: 50, style: 'pilot',
    description: 'The 6542 is the first GMT-Master, developed in collaboration with Pan American Airways for transatlantic flight crews. The original Bakelite bezel was famously fragile — most surviving examples have been replaced by aluminum bezels. Pre-bezel-update 6542s with original Bakelite are among the most valuable Rolex sport watches.' },
  { brand: 'Rolex', parentModel: 'GMT-Master', reference: '1675', year: 1960, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Automatic', caliber: '1565', waterResistance: 100, style: 'pilot',
    description: 'The 1675 is the longest-running and most iconic vintage GMT-Master, produced from 1960 to 1980. Pepsi (red/blue) and root beer (brown/gold) bezels span the entire production. Pointed crown guards (early 1960s) and PCG 1675s are particularly sought-after.' },
  { brand: 'Rolex', parentModel: 'GMT-Master', reference: '16750', year: 1981, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Automatic', caliber: '3075', waterResistance: 100, style: 'pilot',
    description: 'The 16750 introduced the quickset date to the GMT-Master line. Production was brief (1981 to 1988) before being replaced by the 16700 series. The dial often features tritium lume and matte black or Pepsi bezels.' },
  { brand: 'Rolex', parentModel: 'GMT-Master II', reference: '16760', year: 1983, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Automatic', caliber: '3085', waterResistance: 100, style: 'pilot',
    description: 'The 16760 — known as "Fat Lady" or "Sophia Loren" — was the first GMT-Master II, with the new 3085 caliber allowing independent local hour adjustment. The case was thicker than its predecessor (hence the nickname) to accommodate the new movement.' },
  { brand: 'Rolex', parentModel: 'GMT-Master II', reference: '16710', year: 1989, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Automatic', caliber: '3185', waterResistance: 100, style: 'pilot',
    description: 'The 16710 ran from 1989 to 2007 as the daily-wear GMT-Master II. Available with Pepsi, Coke (red/black), and all-black bezels. The last generation before ceramic Cerachrom bezels — beloved for its slim profile compared to the modern 116710.' },

  // ── Rolex Daytona vintage ───────────────────────────────────────────────
  { brand: 'Rolex', parentModel: 'Daytona', reference: '6239', year: 1963, caseDiameter: 37, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Manual', caliber: 'Valjoux 72', waterResistance: 50, style: 'chrono',
    description: 'The 6239 is the first Cosmograph Daytona — launched in 1963 with manual-wind Valjoux 72 movement and exterior tachymeter bezel. This reference includes the rare "Paul Newman" exotic dial variants which are now among the most valuable wristwatches ever sold.' },
  { brand: 'Rolex', parentModel: 'Daytona', reference: '6263', year: 1971, caseDiameter: 37, caseMaterial: 'Stainless steel', bezelMaterial: 'Acrylic', movement: 'Manual', caliber: 'Valjoux 727', waterResistance: 50, style: 'chrono',
    description: 'The 6263 introduced screw-down pushers and the "Oyster" case branding to the Daytona in 1971. Acrylic bezel insert with painted tachymeter scale. Production ran until 1987 — the last manual-wind Daytona reference before the Zenith automatic 16520.' },
  { brand: 'Rolex', parentModel: 'Daytona', reference: '16520', year: 1988, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: 'Zenith El Primero', waterResistance: 100, style: 'chrono',
    description: 'The 16520 — known as the "Zenith Daytona" — was the first automatic Daytona, using a heavily modified Zenith El Primero base movement. Produced from 1988 to 2000, this reference saw enormous demand and long waitlists at retail. The watch that established the modern Daytona as a market icon.' },

  // ── Rolex Day-Date vintage ──────────────────────────────────────────────
  { brand: 'Rolex', parentModel: 'Day-Date', reference: '1803', year: 1959, caseDiameter: 36, caseMaterial: '18k yellow gold', bezelMaterial: '18k yellow gold', movement: 'Automatic', caliber: '1555', waterResistance: 30, style: 'dress',
    description: 'The 1803 is the long-running classic Day-Date reference, produced from 1959 to 1977. Smooth or fluted bezels in 18k yellow, white, or rose gold — also platinum at the upper end. Worn by US Presidents, astronauts, and corporate icons; established the "President" nickname for the bracelet.' },
  { brand: 'Rolex', parentModel: 'Day-Date', reference: '18038', year: 1977, caseDiameter: 36, caseMaterial: '18k yellow gold', bezelMaterial: '18k yellow gold', movement: 'Automatic', caliber: '3055', waterResistance: 30, style: 'dress',
    description: 'The 18038 brought sapphire crystal, quickset date, and the 3055 movement to the Day-Date in 1977. Production ran until 1988 across all gold variants. Five-digit references like the 18038 are the entry tier for vintage Day-Date collecting today.' },

  // ── Rolex Datejust vintage ──────────────────────────────────────────────
  { brand: 'Rolex', parentModel: 'Datejust', reference: '1601', year: 1962, caseDiameter: 36, caseMaterial: 'Stainless steel', bezelMaterial: '18k white gold', movement: 'Automatic', caliber: '1565', waterResistance: 50, style: 'dress',
    description: 'The 1601 is the most iconic vintage Datejust — fluted white gold bezel on steel case, produced from 1962 to 1977. Available in countless dial variants, including the desirable "linen", "tapestry", and "wide boy" indices. The pre-eminent vintage Rolex daily wearer.' },
  { brand: 'Rolex', parentModel: 'Datejust', reference: '16030', year: 1977, caseDiameter: 36, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '3035', waterResistance: 100, style: 'dress',
    description: 'The 16030 introduced the modern Datejust with sapphire crystal, smooth bezel, and the 3035 movement. Produced from 1977 to 1988. This is the bridge generation between vintage and modern Datejusts — accessible pricing and bulletproof reliability.' },

  // ── Rolex Explorer vintage ──────────────────────────────────────────────
  { brand: 'Rolex', parentModel: 'Explorer', reference: '1016', year: 1963, caseDiameter: 36, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '1560', waterResistance: 100, style: 'field',
    description: 'The 1016 is the most iconic vintage Explorer — produced from 1963 until 1989, the longest-running Explorer reference. Tropical dials (faded brown over the decades) and "underline" transitional pieces are particularly desirable. Worn by Sir Edmund Hillary on his Everest expeditions.' },
  { brand: 'Rolex', parentModel: 'Explorer', reference: '14270', year: 1989, caseDiameter: 36, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '3000', waterResistance: 100, style: 'field',
    description: 'The 14270 modernized the Explorer with sapphire crystal and applied indices in 1989. Production ran until 2001. Often considered the sweet spot for "neo-vintage" Explorer collecting — modern reliability with classic 36mm proportions.' },

  // ── Rolex Sea-Dweller vintage ───────────────────────────────────────────
  { brand: 'Rolex', parentModel: 'Sea-Dweller', reference: '1665', year: 1967, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '1575', waterResistance: 610, style: 'diver',
    description: 'The 1665 is the original Sea-Dweller, developed with COMEX for saturation diving. Helium escape valve, 610m depth rating, and "Submariner Sea-Dweller" or "Double Red" dial variants. Produced from 1967 to 1977. Prototype "Single Red" dials are among the most valuable Rolex pieces ever.' },
  { brand: 'Rolex', parentModel: 'Sea-Dweller', reference: '16660', year: 1978, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '3035', waterResistance: 1220, style: 'diver',
    description: 'The 16660 — known as the "Triple Six" — doubled depth rating to 1,220m and added sapphire crystal in 1978. Matte and glossy dial generations span its production run to 1989. Beloved by collectors for being the "last Rolex tool watch" in many ways.' },

  // ── Omega Speedmaster vintage ───────────────────────────────────────────
  { brand: 'Omega', parentModel: 'Speedmaster', reference: 'CK 2915', year: 1957, caseDiameter: 39, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Manual', caliber: '321', waterResistance: 60, style: 'chrono',
    description: 'The CK 2915 is the first Speedmaster — launched in 1957 with the legendary Caliber 321 column-wheel chronograph. Broad arrow handset, steel bezel with tachymeter scale. Three sub-variants exist (2915-1, -2, -3) all produced through 1959. The DNA reference for every Speedmaster that followed.' },
  { brand: 'Omega', parentModel: 'Speedmaster', reference: 'CK 2998', year: 1959, caseDiameter: 39, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Manual', caliber: '321', waterResistance: 60, style: 'chrono',
    description: 'The CK 2998 introduced the now-iconic black aluminum bezel and alpha hands to the Speedmaster line in 1959. Wally Schirra wore a CK 2998 on the Mercury-Atlas 8 mission in 1962, making it the first Speedmaster in space. Production ran across multiple sub-variants until 1962.' },
  { brand: 'Omega', parentModel: 'Speedmaster', reference: '105.012', year: 1964, caseDiameter: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Manual', caliber: '321', waterResistance: 60, style: 'chrono',
    description: 'The 105.012 is the first Speedmaster with the "Professional" designation on the dial and the asymmetric case that became standard for the Moonwatch line. This is the reference NASA flight-qualified for manned space missions in 1965 — the watch that became the Moonwatch.' },
  { brand: 'Omega', parentModel: 'Speedmaster', reference: '145.012', year: 1967, caseDiameter: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Manual', caliber: '321', waterResistance: 60, style: 'chrono',
    description: 'The 145.012 was the last Speedmaster reference produced with the original Caliber 321 column-wheel chronograph movement, before the cost-optimized 861 took over in 1968. Buzz Aldrin\'s lunar Speedmaster was a 145.012 — making this the actual reference worn on the Moon.' },
  { brand: 'Omega', parentModel: 'Speedmaster', reference: '145.022', year: 1968, caseDiameter: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Manual', caliber: '861', waterResistance: 60, style: 'chrono',
    description: 'The 145.022 was the first Speedmaster with the new Caliber 861 cam-actuated chronograph — produced from 1968 onwards as the standard "Moonwatch" reference. Twenty-plus years of production make this the most accessible vintage Speedmaster for collectors.' },

  // ── Omega Seamaster vintage ─────────────────────────────────────────────
  { brand: 'Omega', parentModel: 'Seamaster', reference: 'CK 2518', year: 1948, caseDiameter: 35, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '344', waterResistance: 30, style: 'dress',
    description: 'The CK 2518 is the first Seamaster, launched in 1948 to mark Omega\'s 100th anniversary. Based on military waterproofed watches Omega supplied to the British military in WWII. Time-only dress proportions, automatic movement, leather strap — established the Seamaster template.' },
  { brand: 'Omega', parentModel: 'Seamaster 300', reference: '165.024', year: 1969, caseDiameter: 41, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Automatic', caliber: '552', waterResistance: 200, style: 'diver',
    description: 'The 165.024 is the second-generation Seamaster 300, produced from 1969 to 1973. Sword hands, sleek 41mm proportions, and the "Big Triangle" bezel make this one of the most balanced vintage divers ever made. The reference modern Seamaster 300 reissues are based on.' },

  // ── Omega Constellation vintage ─────────────────────────────────────────
  { brand: 'Omega', parentModel: 'Constellation', reference: '2852', year: 1958, caseDiameter: 35, caseMaterial: '14k yellow gold', bezelMaterial: '14k yellow gold', movement: 'Automatic', caliber: '505', waterResistance: 30, style: 'dress',
    description: 'The Constellation 2852 features the iconic "pie pan" dial and applied indices, produced in solid 14k or 18k gold across multiple sub-variants. Caliber 505 chronometer movement was among the most accurate of its era. The reference that established the Constellation as Omega\'s precision flagship.' },
  { brand: 'Omega', parentModel: 'Constellation', reference: '168.005', year: 1966, caseDiameter: 34, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '561', waterResistance: 30, style: 'dress',
    description: 'The 168.005 brought a sharper, more contemporary "C-shape" case to the Constellation line in 1966. Available in steel, gold-capped, and solid gold across many dial variants. Production ran through the early 1970s before the quartz crisis disrupted the line.' },

  // ── Tudor Vintage ───────────────────────────────────────────────────────
  { brand: 'Tudor', parentModel: 'Submariner', reference: '7928', year: 1959, caseDiameter: 39, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: 'ETA 390', waterResistance: 200, style: 'diver',
    description: 'The Tudor Submariner 7928 was Tudor\'s answer to the Rolex 5512 — same Oyster case, ETA-based movement instead of in-house Rolex caliber, at a fraction of the price. Issued to the French Marine Nationale and US Navy SEALs. Modern Tudor heritage divers (Black Bay) directly reference this design.' },
  { brand: 'Tudor', parentModel: 'Monte Carlo', reference: '7159', year: 1976, caseDiameter: 40, caseMaterial: 'Stainless steel', bezelMaterial: 'Aluminum', movement: 'Manual', caliber: 'Valjoux 234', waterResistance: 50, style: 'chrono',
    description: 'The Tudor 7159 — informally "Monte Carlo" for its racing-themed dial — is the most desirable vintage Tudor chronograph. Manual-wind Valjoux 234, distinctive blue-and-orange chronograph aesthetic. The reference Heritage Chrono pieces from 2010 onwards directly reference.' },

  // ── Audemars Piguet Royal Oak vintage ───────────────────────────────────
  { brand: 'Audemars Piguet', parentModel: 'Royal Oak', reference: '5402ST', year: 1972, caseDiameter: 39, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '2121', waterResistance: 50, style: 'sport',
    description: 'The 5402ST is the original Royal Oak — designed by Gerald Genta in a single night, launched at Baselworld 1972 at a price higher than gold dress watches. The "Jumbo" (39mm) octagonal bezel with eight exposed screws and integrated bracelet redefined what a luxury sport watch could be. Production ran in three numbered series (A, B, C) through 1980.' },

  // ── Patek Philippe vintage ──────────────────────────────────────────────
  { brand: 'Patek Philippe', parentModel: 'Calatrava', reference: '96', year: 1932, caseDiameter: 30, caseMaterial: '18k yellow gold', bezelMaterial: '18k yellow gold', movement: 'Manual', caliber: '12-120', waterResistance: 0, style: 'dress',
    description: 'The Reference 96 is the first Patek Philippe Calatrava, designed in 1932 by David Penney following Bauhaus principles. Three decades of production established the Calatrava template every dress watch follows: thin case, clean dial, time-only complication. The 96 is the oldest continuously produced Patek model line.' },
  { brand: 'Patek Philippe', parentModel: 'Nautilus', reference: '3700', year: 1976, caseDiameter: 42, caseMaterial: 'Stainless steel', bezelMaterial: 'Stainless steel', movement: 'Automatic', caliber: '28-255 C', waterResistance: 120, style: 'sport',
    description: 'The 3700 is the original Patek Philippe Nautilus, designed by Gerald Genta in 1976 — four years after his Royal Oak. Often called "Jumbo" for its 42mm porthole-inspired case. Production ran until 1990 and the design language defined every Nautilus that followed. Steel 3700s have become some of the most coveted vintage references in modern collecting.' },
  { brand: 'Patek Philippe', parentModel: 'Chronograph', reference: '1518', year: 1941, caseDiameter: 35, caseMaterial: '18k yellow gold', bezelMaterial: '18k yellow gold', movement: 'Manual', caliber: '13-130 Q', waterResistance: 30, style: 'chrono',
    description: 'The Reference 1518 was the first perpetual calendar chronograph wristwatch in serial production, launched by Patek Philippe in 1941. Manual-wind Valjoux-based caliber with Patek-finished perpetual calendar module. Only 281 examples were produced over fourteen years; one of the most consequential watches in horological history.' },
]
