/**
 * Curated brand intro content for the top luxury watch brands.
 * Used on /brand/[slug] pages to provide unique, SEO-rich content.
 *
 * Brand keys are lowercase slugs (matching toSlug() output).
 * For brands not in this map, the brand page falls back to a data-driven intro
 * generated from the watch collection stats.
 */

export interface BrandContent {
  /** ~30-word tagline for hero/meta */
  tagline: string
  /** 3-paragraph intro shown above the watch grid (~200 words) */
  intro: string
  /** Founded year */
  founded: number
  /** Headquarters */
  headquarters: string
  /** Hero collection names (most recognizable) */
  flagshipCollections: string[]
}

export const BRAND_CONTENT: Record<string, BrandContent> = {
  rolex: {
    tagline: 'The defining name in luxury sports and tool watches, prized for engineering, vertical integration, and value retention.',
    founded: 1905,
    headquarters: 'Geneva, Switzerland',
    flagshipCollections: ['Submariner', 'Daytona', 'GMT-Master II', 'Datejust', 'Day-Date', 'Explorer', 'Sea-Dweller'],
    intro: `Founded in London in 1905 by Hans Wilsdorf and relocated to Geneva in 1919, Rolex is the most recognized name in luxury watchmaking. The Swiss manufacturer is fully vertically integrated — producing its own movements, cases, dials, and even the gold and platinum used in its precious-metal references. This control over every component is the foundation of Rolex's reputation for tolerance, durability, and consistency.

The collection is organized around purpose: dive watches (Submariner, Sea-Dweller, Deepsea), travel watches (GMT-Master II), aviation pieces (Air-King), chronographs (Daytona), exploration tools (Explorer, Explorer II), and dress sport hybrids (Datejust, Day-Date, Sky-Dweller, Yacht-Master). Every model uses an in-house automatic caliber, COSC chronometer-certified, and the brand's proprietary Superlative Chronometer rating tightens that to ±2 seconds per day.

Rolex sits at the entry-to-mid point of true Swiss luxury — typically $7,000 to $50,000 retail — but secondary-market premiums on sport models often push real prices higher. Cross-shop the Submariner against the Tudor Black Bay or Omega Seamaster, and the Daytona against the Omega Speedmaster or Zenith El Primero.`,
  },

  omega: {
    tagline: 'Swiss icon best known for the Speedmaster Moonwatch and Seamaster diver, with deep involvement in space and Olympic timekeeping.',
    founded: 1848,
    headquarters: 'Biel/Bienne, Switzerland',
    flagshipCollections: ['Speedmaster', 'Seamaster', 'Constellation', 'De Ville', 'Aqua Terra'],
    intro: `Founded in 1848 in La Chaux-de-Fonds and now headquartered in Biel/Bienne, Omega is one of the few Swiss houses that competes with Rolex on volume, distribution, and brand recognition. The Speedmaster Professional became the first watch worn on the Moon in 1969 — a credential no other manufacturer can replicate — and the brand has been the official timekeeper of the Olympic Games more times than any competitor.

The current lineup is organized around four pillars. The Speedmaster covers manual-wind chronographs, anchored by the Moonwatch reference. The Seamaster spans dive watches (Seamaster Diver 300M, Planet Ocean) and the everyday Aqua Terra. The Constellation is the brand's polished dress-sport hybrid, and the De Ville covers traditional dress watches.

Most modern Omega calibers use the Co-Axial escapement, an alternative to the standard Swiss lever pioneered by George Daniels and developed in-house. Master Chronometer certification adds magnetic resistance to 15,000 gauss and ±0 to +5 seconds per day accuracy. Pricing typically runs $3,500 to $15,000, making Omega a direct cross-shop with mid-tier Rolex sport references.`,
  },

  'patek-philippe': {
    tagline: 'The most prestigious Geneva manufacture, recognized for haute horlogerie complications and the Nautilus and Calatrava lines.',
    founded: 1839,
    headquarters: 'Geneva, Switzerland',
    flagshipCollections: ['Nautilus', 'Aquanaut', 'Calatrava', 'Complications', 'Grand Complications'],
    intro: `Founded in Geneva in 1839 and family-owned by the Stern family since 1932, Patek Philippe is widely regarded as the apex of the traditional Swiss watchmaking trinity (alongside Audemars Piguet and Vacheron Constantin). Every Patek wears the Geneva Seal or the brand's own Patek Philippe Seal — the most stringent quality marks in the industry, governing finishing, accuracy, and movement architecture.

The collection ranges from simple time-only Calatrava dress watches (the brand's design language reference) to the integrated-bracelet sports icons Nautilus and Aquanaut, to the Complications and Grand Complications lines that produce perpetual calendars, minute repeaters, split-seconds chronographs, and combinations of all three. The reference 5711 Nautilus and the 5167 Aquanaut have spent the past decade as the most demanded steel sports watches in the world, with multi-year waitlists at retail and significant secondary-market premiums.

Pricing starts around $25,000 for entry Calatravas and runs into seven figures for the Grandmaster Chime. Even the simplest Patek typically holds value better than most luxury watches at the same retail price.`,
  },

  'audemars-piguet': {
    tagline: 'Independent Le Brassus manufacture, defined by the Royal Oak — the watch that made integrated-bracelet steel sports watches a luxury category.',
    founded: 1875,
    headquarters: 'Le Brassus, Switzerland',
    flagshipCollections: ['Royal Oak', 'Royal Oak Offshore', 'Code 11.59', 'Royal Oak Concept'],
    intro: `Founded in 1875 in Le Brassus and one of the few major Swiss houses still owned by descendants of its founders, Audemars Piguet built its modern identity on a single watch: the Royal Oak. Designed by Gérald Genta in 1972 and originally derided as overpriced — a steel watch costing more than gold dress watches — the Royal Oak created the integrated-bracelet luxury sports watch category that Patek (Nautilus), Vacheron (Overseas), and dozens of others later followed.

The current catalog runs from 34mm Royal Oak ladies' references to the 44mm Royal Oak Offshore Diver and the 42mm Royal Oak Concept tourbillons. The Code 11.59 collection, introduced in 2019, gives AP a contemporary round-case dress-sport platform outside the Royal Oak silhouette. Both lines are powered by in-house Manufacture Royale movements, finished to haute-horlogerie standards.

Royal Oak steel sport references — the 15500 (formerly 15400) — sit alongside the Nautilus 5711 and Aquanaut 5167 in the rarefied "stainless steel sports watches with multi-year waitlists" category. Retail starts around $25,000.`,
  },

  'vacheron-constantin': {
    tagline: 'The oldest continuously operating watch manufacturer (1755), maker of haute horlogerie complications and the Overseas integrated sports watch.',
    founded: 1755,
    headquarters: 'Geneva, Switzerland',
    flagshipCollections: ['Overseas', 'Patrimony', 'Traditionnelle', 'Historiques', 'Métiers d\'Art'],
    intro: `Founded in Geneva in 1755 by Jean-Marc Vacheron, Vacheron Constantin is the oldest continuously operating watch manufacturer in the world. It completes the "Holy Trinity" of Swiss haute horlogerie alongside Patek Philippe and Audemars Piguet, and every watch carries the Geneva Seal — guaranteeing in-canton manufacture and movement finishing to the strictest published criteria.

The current collection is structured around clear identities. The Patrimony and Traditionnelle cover round dress watches with classical proportions. The Historiques line revives specific archive references with modern movements inside vintage cases. The Overseas, introduced in 1996 and significantly redesigned in 2016, is the brand's integrated-bracelet luxury sports watch and the natural cross-shop with the Royal Oak and Nautilus. The Métiers d'Art collection showcases enameling, engraving, and gem-setting craft.

Vacheron has historically positioned itself as the most discreet of the three top Geneva houses, less aggressive on marketing than Patek or AP and often slightly more attainable at comparable complication levels. Entry pricing for steel Overseas references starts around $25,000.`,
  },

  cartier: {
    tagline: 'Paris jeweler-watchmaker whose Tank, Santos, and Panthère shapes are among the most recognized watch designs of the twentieth century.',
    founded: 1847,
    headquarters: 'Paris, France',
    flagshipCollections: ['Tank', 'Santos', 'Ballon Bleu', 'Panthère', 'Pasha', 'Drive'],
    intro: `Founded in Paris in 1847 by Louis-François Cartier and now part of the Richemont group, Cartier sits at the rare intersection of jewelry house and serious watchmaker. The Santos, designed for aviator Alberto Santos-Dumont in 1904, predates Rolex's first wristwatch by years. The Tank, introduced in 1917 and inspired by the geometry of First World War armored vehicles, is among the most copied watch designs in history and remains in continuous production.

The collection is built around shape rather than complication: square-cushion (Santos), rectangular (Tank), oval (Baignoire), round (Ballon Bleu, Drive, Ronde), and barrel (Tonneau). Most models are available in steel, gold, and gem-set executions across multiple sizes for both men and women. Movement choice ranges from quartz at entry level to in-house mechanicals (Cartier 1904 MC family) in the higher Santos, Tank, and Drive references.

Cartier's pricing spans an unusually wide band — quartz Tank Solos under $3,000 to platinum Tonneau perpetual calendars over $100,000 — making it accessible at multiple entry points unlike most peers in this tier.`,
  },

  iwc: {
    tagline: 'Schaffhausen-based maker of pilot, marine, and Portugieser watches, known for clean utilitarian design and large case sizes.',
    founded: 1868,
    headquarters: 'Schaffhausen, Switzerland',
    flagshipCollections: ['Pilot', 'Portugieser', 'Portofino', 'Aquatimer', 'Ingenieur', 'Da Vinci'],
    intro: `Founded in 1868 by American engineer Florentine Ariosto Jones in Schaffhausen — the German-speaking corner of Switzerland — IWC is the only major Swiss manufacture located outside French- or Italian-speaking cantons. The brand's industrial American heritage shows in its design language: clean dials, legible typography, and case sizes that have historically run larger than its Geneva peers.

The collection is anchored by the Pilot's Watch family, derived from IWC's Mark XI military pilot references and currently spanning Big Pilot, Mark XX, Top Gun (with ceramic and Ceratanium cases), and Spitfire references. The Portugieser, first launched in 1939, is the brand's flagship dress chronograph and remains one of the most recognizable round dress watches in luxury watchmaking. The Portofino and Da Vinci cover more refined dress and complicated dress executions, while the Aquatimer (currently dormant in the lineup) and Ingenieur cover dive and engineering tool watches.

IWC pricing runs $5,000 to $25,000 for the bulk of the catalog, placing it in direct competition with Omega, Breitling, and entry Rolex on the dress and pilot fronts.`,
  },

  'jaeger-lecoultre': {
    tagline: 'Vallée de Joux manufacture, supplier of movements to Patek and AP, maker of the Reverso and over a thousand in-house calibers.',
    founded: 1833,
    headquarters: 'Le Sentier, Switzerland',
    flagshipCollections: ['Reverso', 'Master Control', 'Polaris', 'Atmos', 'Duometre', 'Rendez-Vous'],
    intro: `Founded in 1833 by Antoine LeCoultre in Le Sentier, Jaeger-LeCoultre is among the most technically capable manufactures in the Vallée de Joux. The Manufacture has produced more than 1,200 distinct in-house calibers in its history and historically supplied movement blanks and complications to Patek Philippe, Audemars Piguet, and Vacheron Constantin — earning it the informal title "the watchmaker's watchmaker."

The Reverso, introduced in 1931 with a reversible case originally designed for British army polo players in India, is the brand's defining model and one of the rare watches with a genuinely distinctive case architecture. The Master Control is the round dress-watch backbone of the lineup, available in time-only, calendar, geographic, and chronograph executions. The Polaris revives the brand's 1968 dive heritage with modern proportions, and the Atmos clock — a perpetual mechanical clock powered by ambient temperature changes — is a category of one.

JLC pricing starts around $8,000 for steel Reverso Classic Monoface references and runs into haute-horlogerie territory for the Duomètre and Hybris Mechanica complications.`,
  },

  tudor: {
    tagline: 'Rolex\'s sister brand, offering tool-watch heritage with in-house movements at a fraction of Rolex pricing.',
    founded: 1926,
    headquarters: 'Geneva, Switzerland',
    flagshipCollections: ['Black Bay', 'Pelagos', 'Ranger', 'Royal', 'Black Bay Pro', 'Black Bay GMT'],
    intro: `Founded by Rolex's Hans Wilsdorf in 1926 to offer Rolex-quality cases at lower price points, Tudor spent most of the twentieth century as a quiet supplier to military and tool-watch markets — including French Marine Nationale dive watches and US Navy SEAL contracts. The brand was relaunched globally in 2010 with a sharper identity centered on heritage tool watches.

The Black Bay collection is the modern face of Tudor: vintage-inspired dive watches in 41mm, 36mm, and 39mm sizes, the Black Bay 58 (a smaller-cased homage to the 1958 Submariner reference 7924), and the Black Bay GMT, Pro, and Chrono variants. The Pelagos is the brand's purpose-built modern titanium diver, and the Ranger and Royal cover field-watch and dress-sport segments respectively.

Since 2015, Tudor has used in-house Manufacture Calibre movements in most references — distinguishing it from competitors at this price tier who still rely on outsourced Sellita or ETA movements. Most Tudor sport references retail $3,500 to $5,500, making the brand a direct cross-shop with Omega Seamaster and entry-level Rolex sport models.`,
  },

  breitling: {
    tagline: 'Swiss chronograph specialist with strong aviation heritage, defined by the Navitimer slide-rule chronograph.',
    founded: 1884,
    headquarters: 'Grenchen, Switzerland',
    flagshipCollections: ['Navitimer', 'Chronomat', 'Superocean', 'Premier', 'Avenger', 'Top Time'],
    intro: `Founded in 1884 by Léon Breitling in Saint-Imier and now headquartered in Grenchen, Breitling built its identity around the chronograph. The brand introduced the first independent chronograph pusher (1915) and the first dual-pusher chronograph (1934), and was a co-developer of the Caliber 11 automatic chronograph movement that debuted in 1969.

The Navitimer, launched in 1952, integrates a circular slide rule into the bezel for in-flight calculations and remains the most recognizable pilot's chronograph in production. The Chronomat is the brand's everyday integrated-bracelet sports chronograph, the Superocean covers dive watches across multiple price tiers, the Premier line offers more refined dress chronographs, and the Avenger handles oversized military-style pilot pieces.

Most modern Breitling chronographs use the in-house Manufacture Caliber B01, COSC chronometer-certified, with a 70-hour power reserve. Pricing typically runs $4,000 to $10,000, placing Breitling alongside Omega and Tudor as a serious mid-luxury Swiss option, with stronger emphasis on chronograph complications than either competitor.`,
  },

  'tag-heuer': {
    tagline: 'La Chaux-de-Fonds chronograph house, defined by the Carrera and the Monaco — the first square automatic chronograph.',
    founded: 1860,
    headquarters: 'La Chaux-de-Fonds, Switzerland',
    flagshipCollections: ['Carrera', 'Monaco', 'Aquaracer', 'Formula 1', 'Autavia', 'Connected'],
    intro: `Founded in 1860 by Edouard Heuer in Saint-Imier and rebranded TAG Heuer after its 1985 acquisition by Techniques d'Avant Garde, the company has been a chronograph specialist for most of its history. Heuer was a co-developer of the Caliber 11 automatic chronograph in 1969 — the same project that produced the first square-case automatic chronograph, the Monaco, made famous by Steve McQueen in Le Mans (1971).

The Carrera, introduced in 1963 by Jack Heuer, is the brand's racing chronograph backbone and remains in continuous production. The Monaco preserves its distinctive square case across multiple movement variants. The Aquaracer covers the dive-watch segment, the Formula 1 and Connected (smartwatch) lines provide entry pricing, and the Autavia revival recovers the brand's 1960s pilot/racing chronograph identity.

Most current TAG Heuer chronographs use the in-house Caliber Heuer 02, with a 75-hour power reserve, in mid-tier and flagship references. Pricing spans $1,800 (Formula 1 quartz) to $25,000 (Carrera Plasma Diamond), giving the brand a wider entry point than most Swiss competitors at this tier.`,
  },

  zenith: {
    tagline: 'Le Locle manufacture famous for the El Primero — the first integrated automatic chronograph, beating at 5 Hz since 1969.',
    founded: 1865,
    headquarters: 'Le Locle, Switzerland',
    flagshipCollections: ['El Primero', 'Chronomaster', 'Defy', 'Pilot', 'Elite'],
    intro: `Founded in 1865 by Georges Favre-Jacot in Le Locle, Zenith is one of the few Swiss manufactures that survived the quartz crisis with its industrial movement-making capability intact — largely because a worker named Charles Vermot hid the El Primero tooling in 1975 against management orders to scrap it. That decision preserved one of the most important automatic chronograph calibers in horological history.

The El Primero, introduced in 1969, was the first integrated automatic chronograph movement (developed in parallel with the Heuer/Breitling Caliber 11 and the Seiko 6139). It beats at 5 Hz (36,000 vph), allowing 1/10-second timing — still rare today — and provided the chronograph movement for the Rolex Daytona from 1988 to 2000. The Chronomaster line continues this lineage, while the Defy collection houses the brand's contemporary high-frequency and skeleton work, and the Pilot revives Zenith's early-twentieth-century aviation heritage.

Pricing typically runs $7,000 to $15,000 for current Chronomaster references — competitive with Omega Speedmaster and below most Breitling chronograph flagships.`,
  },

  hublot: {
    tagline: 'Nyon-based "Art of Fusion" manufacture, defined by the Big Bang chronograph and unconventional case material combinations.',
    founded: 1980,
    headquarters: 'Nyon, Switzerland',
    flagshipCollections: ['Big Bang', 'Classic Fusion', 'Spirit of Big Bang', 'MP Collection'],
    intro: `Founded in 1980 by Carlo Crocco in Nyon, Hublot built its identity on the unconventional pairing of luxury watch cases with rubber straps — radical for the era and copied widely since. The brand was acquired by LVMH in 2008 and has since become one of the most aggressive marketing operations in the industry, with high-profile partnerships across football (FIFA, UEFA), Formula 1 (Ferrari), and basketball (NBA).

The Big Bang chronograph, introduced in 2005, defined the brand's "Art of Fusion" identity through unusual material combinations — ceramic, carbon fiber, sapphire, ceramic-and-king-gold, magnesium — built around an Hublot-specific case architecture with exposed screws and a layered bezel. The Classic Fusion offers the same design language in slimmer cases, the Spirit of Big Bang adopts a tonneau silhouette, and the MP collection houses the brand's most experimental complicated work.

Hublot pricing runs from $5,000 (Classic Fusion quartz) to over $1 million (MP-09 Tourbillon Bi-Axis Sapphire), with most Big Bang references in the $15,000–$30,000 range.`,
  },

  panerai: {
    tagline: 'Florentine instrument-maker turned watch brand, defined by oversized cushion-case dive watches with cathedral-style hands.',
    founded: 1860,
    headquarters: 'Neuchâtel, Switzerland (Florence origins)',
    flagshipCollections: ['Luminor', 'Radiomir', 'Submersible', 'Luminor Due'],
    intro: `Founded in Florence in 1860 as a precision instrument workshop, Panerai supplied dive watches, depth gauges, and compasses to the Italian Royal Navy from the 1930s onward. The brand was effectively military-only for sixty years, becoming a civilian luxury watchmaker only after its 1997 acquisition by Vendôme (now Richemont).

The Radiomir (1936) and Luminor (1950) — both designed for the Italian Navy frogmen — define the brand's silhouette: oversized 44–47mm cushion cases, sandwich dials with luminous numerals visible underwater, and either a wire-lug strap (Radiomir) or a crown-protecting bridge (Luminor). The Submersible adds dive-bezel functionality to the Luminor case, and the Luminor Due offers a slimmer 38–42mm version for buyers who find the original case too imposing.

Movements range from outsourced ETA bases at the entry tier to in-house Manufacture Panerai calibers — the P.5000 hand-wound (8-day power reserve) and the P.9000 automatic — in higher references. Pricing typically runs $5,500 to $20,000.`,
  },

  'grand-seiko': {
    tagline: 'The premium Seiko division, producing JDM-rooted dress and sport watches with Spring Drive and Hi-Beat movements.',
    founded: 1960,
    headquarters: 'Shizukuishi & Shiojiri, Japan',
    flagshipCollections: ['Heritage', 'Sport', 'Elegance', 'Evolution 9'],
    intro: `Established in 1960 as Seiko's premium expression and reorganized as a fully separate brand in 2017, Grand Seiko is the only mechanical watchmaker outside Switzerland and Germany operating at the haute-horlogerie level with full vertical integration. Movements, dials, hands, cases, and even the studios that train hand-finishers are entirely in-house, split between the Shizukuishi Watch Studio (mechanical) and Shinshu Watch Studio (Spring Drive and quartz).

The brand offers three distinct movement families. The 9S mechanical caliber (including Hi-Beat 36000 references) competes directly with Swiss chronometers and uses the brand's own MEMS escape wheels. Spring Drive — the Grand Seiko-exclusive technology that combines a mainspring with an electromagnetic regulator — produces the smoothest seconds-hand sweep in watchmaking, accurate to ±1 second per day. The 9F quartz caliber, used in entry references, achieves ±10 seconds per year.

Dial work is the brand's other defining strength: textured patterns ("Snowflake," "Mt. Iwate," "White Birch") that change appearance under different lighting. Pricing runs $3,000 to $35,000.`,
  },

  longines: {
    tagline: 'Saint-Imier institution since 1832, the volume leader in mid-tier Swiss watchmaking with strong heritage pilot and dress lines.',
    founded: 1832,
    headquarters: 'Saint-Imier, Switzerland',
    flagshipCollections: ['Master Collection', 'HydroConquest', 'Spirit', 'Heritage', 'Conquest'],
    intro: `Founded in 1832 by Auguste Agassiz in Saint-Imier and now part of the Swatch Group, Longines is one of the highest-volume Swiss manufacturers at the affordable-luxury tier. The brand was a pioneering supplier of pilot watches in the 1920s and 1930s — including the Lindbergh Hour Angle and the Charles Lindbergh-spec Aviator references — and its archive of vintage references is unusually deep, supporting the strongest heritage-revival program at this price tier.

The current collection covers four main territories. The Master Collection is the dress-watch backbone, with moonphase and chronograph variants. The Spirit and Heritage Pilot lines revive the brand's 1930s aviation history with modern automatic movements. The HydroConquest is the volume dive watch, competing directly with the Tudor Black Bay and the Tag Heuer Aquaracer. The Conquest covers entry-tier sports watches.

Most Longines references use modified ETA movements (Caliber L888, L688, L633), with COSC chronometer certification on selected references. Pricing typically runs $1,500 to $4,000, placing Longines firmly between mass-market Swiss (Tissot, Hamilton) and mid-luxury (Tudor, Omega).`,
  },

  tissot: {
    tagline: 'Le Locle volume manufacturer, the everyday Swiss watch — affordable mechanicals, T-Touch innovation, and the PRX integrated sports watch.',
    founded: 1853,
    headquarters: 'Le Locle, Switzerland',
    flagshipCollections: ['PRX', 'T-Touch', 'Le Locle', 'Seastar', 'Heritage'],
    intro: `Founded in 1853 by Charles-Félicien Tissot and his son in Le Locle, Tissot has been part of the Swatch Group since 1985 and serves as the group's highest-volume Swiss-made brand below Longines. The brand's distinctive contribution to the industry is the T-Touch — the first tactile-screen analog watch, introduced in 1999 — combining touch-sensitive sapphire with traditional analog displays.

The current breakout reference is the PRX, a 1978-archive revival of an integrated-bracelet sports watch in 35mm, 39.5mm, and 40mm cases, available in quartz and Powermatic 80 automatic versions. The PRX captures the same integrated-case-and-bracelet design language as the Royal Oak and Nautilus at a fraction of the price, and has driven significant new attention to the brand since its 2021 launch.

Other lines include the Heritage (re-editions of vintage Tissot references), the Seastar (entry-tier diver), the Le Locle (dress), and the Gentleman (modern dress-sport). Pricing runs $300 (quartz) to $2,500, making Tissot the most accessible serious Swiss mechanical brand on the market.`,
  },

  hamilton: {
    tagline: 'American military-watch heritage now under Swatch Group, defined by the Khaki Field and the Ventura electric watch.',
    founded: 1892,
    headquarters: 'Biel/Bienne, Switzerland (Lancaster, PA origins)',
    flagshipCollections: ['Khaki Field', 'Khaki Aviation', 'Khaki Navy', 'Ventura', 'Jazzmaster', 'American Classic'],
    intro: `Founded in 1892 in Lancaster, Pennsylvania, Hamilton became the dominant supplier of railroad-grade and military watches to American forces — over a million Hamilton watches were issued during the Second World War, and the brand supplied the Marine Chronometer used by the US Navy. Movement production moved to Switzerland in the late 1960s, and the brand has been part of the Swatch Group since 1974, but the design identity remains rooted in American military and industrial themes.

The Khaki Field is the entry-tier military watch reference — a 38mm or 42mm sandblasted-case automatic with a 24-hour-marked dial, used in the Christopher Nolan film Interstellar — and remains one of the most recommended affordable Swiss mechanical watches. The Khaki Aviation and Khaki Navy expand the same design language into pilot and dive segments. The Ventura, with its distinctive shield-shaped case (originally electric in 1957, now quartz or automatic), was famously worn by Elvis Presley and remains a category of one.

Most Hamilton mechanicals use the H-10 or H-30 modified ETA caliber (80-hour power reserve). Pricing runs $400 to $2,500.`,
  },

  'bell-and-ross': {
    tagline: 'Paris/La Chaux-de-Fonds aviation specialist, defined by the BR-01 square cockpit-instrument case.',
    founded: 1992,
    headquarters: 'Paris, France (manufacturing in La Chaux-de-Fonds, Switzerland)',
    flagshipCollections: ['BR 01', 'BR 03', 'BR 05', 'BR V', 'Vintage'],
    intro: `Founded in 1992 by Bruno Belamich and Carlos A. Rosillo in Paris, with Swiss manufacturing in La Chaux-de-Fonds, Bell & Ross built its identity around a single design proposition: cockpit instruments translated to wristwatches. The BR-01 (46mm) and the slightly more wearable BR-03 (42mm) take the round dial of an aviation altimeter or attitude indicator and surround it with a square steel or ceramic case fixed by four exposed corner screws — a silhouette unlike anything else in luxury watchmaking.

The BR-05, introduced in 2019, is the brand's integrated-bracelet response to the Royal Oak / Nautilus segment, with a square dial inside a rounded square case. The BR V (Vintage) line offers traditional round-case watches drawn from civilian aviation heritage. Most Bell & Ross references use Sellita- or ETA-base automatic movements, with select higher-tier pieces using La Joux-Perret in-house calibers.

Pricing runs $2,800 to $15,000 for the standard catalog, with limited editions and specialty cases (titanium, ceramic, bronze, skeleton) reaching higher. The brand cross-shops directly with IWC Pilot, Bremont, and the Hublot Big Bang.`,
  },

  bulgari: {
    tagline: 'Italian jewelry house known for ultra-thin record-breaking watches and the integrated Octo Finissimo sports collection.',
    founded: 1884,
    headquarters: 'Rome, Italy (manufacturing in Switzerland)',
    flagshipCollections: ['Octo Finissimo', 'Serpenti', 'Diva\'s Dream', 'Lvcea', 'Aluminium'],
    intro: `Founded in Rome in 1884 by Sotirio Bulgari, the house is primarily a jewelry maker but has spent the past two decades building one of the most respected men's watch programs in luxury. The pivot started with the 2002 acquisition of Daniel Roth, Gerald Genta, and movement specialist Manufacture de Haute Horlogerie, giving Bulgari its own complications atelier in Le Sentier.

The Octo Finissimo collection has set seven world records for thinness since 2014, including the thinnest mechanical watch (1.80mm), the thinnest tourbillon, the thinnest minute repeater, the thinnest perpetual calendar, and the thinnest automatic. The Octo case — a Genta-derived integrated-bracelet design with multiple geometric facets — is one of the most distinctive sports-watch silhouettes in production.

Other lines include the Serpenti (the brand's snake-bracelet jewelry watch in continuous production since 1948), the Lvcea (women's contemporary dress), and the Aluminium revival of the brand's 1990s steel-and-rubber sports watch. Pricing runs $3,000 to $250,000+, with most Octo Finissimo references in the $13,000–$25,000 range.`,
  },

  chopard: {
    tagline: 'Geneva-based family manufacturer, dual identity in racing chronographs (Mille Miglia) and haute horlogerie (LUC).',
    founded: 1860,
    headquarters: 'Meyrin (Geneva), Switzerland',
    flagshipCollections: ['L.U.C', 'Mille Miglia', 'Alpine Eagle', 'Happy Sport', 'Happy Diamonds'],
    intro: `Founded in 1860 by Louis-Ulysse Chopard in Sonvilier and family-owned since 1963 by the Scheufele family, Chopard operates two distinct identities. The L.U.C collection — named for Louis-Ulysse Chopard — is the brand's haute-horlogerie program, with in-house movements built and finished in the Fleurier manufacture, eligible for the Geneva Seal and the Poinçon de Fleurier quality marks. The Mille Miglia is the brand's racing-chronograph identity, tied to Chopard's title sponsorship of the Mille Miglia historic Italian car race since 1988.

The Alpine Eagle, introduced in 2019 and based on the brand's 1980 St. Moritz reference, is Chopard's response to the integrated-bracelet luxury sports watch segment. The Happy Sport and Happy Diamonds lines, with their floating-diamond signature, are the women's complement to the men's lineup.

Pricing covers an unusually wide band — Mille Miglia chronographs from $4,500, Alpine Eagle steel from $13,000, L.U.C complications into six figures — with the Fairmined-certified ethical-gold program a notable point of differentiation in the high-end segment.`,
  },

  piaget: {
    tagline: 'La Côte-aux-Fées specialist in ultra-thin movements, jewelry watches, and the Polo and Altiplano collections.',
    founded: 1874,
    headquarters: 'La Côte-aux-Fées, Switzerland',
    flagshipCollections: ['Altiplano', 'Polo', 'Limelight', 'Possession'],
    intro: `Founded in 1874 by Georges-Édouard Piaget in La Côte-aux-Fées and now part of Richemont, Piaget is the historical specialist in ultra-thin watch movements. The Caliber 9P (1957) and 12P (1960) — both still benchmarked today — established the brand's reputation for movements that could be fitted into cases under 3mm thick, enabling jewelry watches and dress watches with proportions impossible for competitors using standard calibers.

The Altiplano line continues this tradition, with the Altiplano Ultimate Concept holding the record for thinnest mechanical watch (2mm total case thickness) until Bulgari surpassed it. The Polo, introduced in 1979, is Piaget's integrated-bracelet sports/dress hybrid, repositioned in 2016 as the Polo S with a more accessible steel-case offering. The Limelight collection covers women's high-jewelry watches, where Piaget's combined movement and gem-setting capability is the brand's most differentiated competence.

Pricing reflects the manufacture's tier — Polo S steel from $11,000, Altiplano gold from $18,000, complicated and gem-set references substantially higher.`,
  },

  blancpain: {
    tagline: 'Le Brassus manufacture, oldest watch brand by name (1735), modern revival under Jean-Claude Biver in 1983.',
    founded: 1735,
    headquarters: 'Le Brassus, Switzerland',
    flagshipCollections: ['Fifty Fathoms', 'Villeret', 'L-Evolution', 'Bathyscaphe'],
    intro: `Originally founded in 1735 by Jehan-Jacques Blancpain in Villeret, the brand was wound down during the quartz crisis and revived in 1983 by Jacques Piguet and Jean-Claude Biver — the latter going on to lead Hublot and TAG Heuer through their modern resurgences. The relaunched Blancpain operated under the famously combative slogan: "Since 1735, Blancpain has never made a quartz watch and never will."

The Fifty Fathoms, introduced in 1953 for the French combat-swimmer corps, is one of the original modern dive watches — predating the Submariner by months — and remains the brand's most recognized model. The Bathyscaphe is its modern slimmer companion. The Villeret line covers traditional round dress watches in the brand's haute-horlogerie register, including ultra-thin perpetual calendars and the eight-day Carrousel. The L-Evolution houses contemporary case shapes and complications.

Movement work is done entirely in-house at Le Brassus and Le Sentier (the latter shared with Frédéric Piguet, Blancpain's sister manufacturer within Swatch Group). Pricing starts around $11,000 for steel Bathyscaphe references and runs into haute-horlogerie territory.`,
  },

  'glashutte-original': {
    tagline: 'Saxon manufacture rebuilt after German reunification, defined by the PanoMatic asymmetric dial and full in-house production.',
    founded: 1845,
    headquarters: 'Glashütte, Germany',
    flagshipCollections: ['Senator', 'PanoMatic', 'SeaQ', 'Sixties', 'Spezialist'],
    intro: `The Glashütte watchmaking tradition dates to 1845, when Ferdinand Adolph Lange established what would become Germany's center of fine watchmaking. Glashütte Original, the manufacture as it exists today, was reorganized after German reunification in 1990 from the GDR-era VEB Glashütter Uhrenbetriebe combine and now operates as one of two major brands (alongside A. Lange & Söhne) producing watches in the Glashütte tradition.

German watchmaking style is distinctly different from Swiss: three-quarter plates instead of bridges, gold chatons securing jewels, blued screws, hand-engraved balance cocks, and the Glashütte stripes finishing pattern in place of Côtes de Genève. Glashütte Original holds these traditions while also operating one of the very few full-production manufactures in the industry — making movements, dials, hairsprings, and cases entirely in-house in Saxony.

The PanoMatic (off-center dial), Senator (round dress), Sixties (1960s-style cushion case), and SeaQ (modern dive watch) cover the main territories. Pricing typically runs $8,000 to $40,000, sitting between mid-luxury Swiss and the haute-horlogerie tier.`,
  },

  'a-lange-und-sohne': {
    tagline: 'Saxon haute horlogerie revived in 1990, considered the German equivalent of Patek Philippe — defined by the Lange 1 asymmetric dial.',
    founded: 1845,
    headquarters: 'Glashütte, Germany',
    flagshipCollections: ['Lange 1', 'Saxonia', '1815', 'Datograph', 'Zeitwerk', 'Odysseus'],
    intro: `Founded in 1845 in Glashütte by Ferdinand Adolph Lange — the man who established German fine watchmaking as a craft — the original A. Lange & Söhne ceased operations after the Soviet expropriation of Saxon industry in 1948. The brand was refounded in 1990 by Walter Lange (great-grandson of Ferdinand) immediately after German reunification, and has since become widely regarded as the German equivalent of Patek Philippe.

The Lange 1, introduced in 1994 as the brand's first post-revival reference, established the modern Lange visual language: an asymmetric dial layout with off-center hours, large date in a double-window aperture, and a power reserve indicator. The Saxonia covers slim dress watches, the 1815 line revives the brand's pocket-watch heritage in modern wristwatches, the Datograph is the haute-horlogerie chronograph that Philippe Dufour has publicly called the most beautifully finished chronograph movement made today, and the Zeitwerk uses a digital hours-and-minutes display driven by a constant-force escapement.

Lange's hand-finishing — particularly the German silver three-quarter plate, hand-engraved balance cock, and gold chatons — is benchmarked against Patek Philippe and Vacheron in the haute-horlogerie tier. Pricing starts around $30,000 and reaches well into seven figures.`,
  },

  'richard-mille': {
    tagline: 'Les Breuleux ultra-luxury maker founded in 2001, defined by tonneau-case skeletonized movements in carbon and exotic materials.',
    founded: 2001,
    headquarters: 'Les Breuleux, Switzerland',
    flagshipCollections: ['RM 011', 'RM 035', 'RM 27', 'RM 67', 'RM 50'],
    intro: `Founded in 2001 by French entrepreneur Richard Mille in partnership with Audemars Piguet's APRP movement workshop, Richard Mille has compressed the development arc of an ultra-luxury watch brand into roughly two decades. The brand's design proposition is consistent: a tonneau-shaped case (almost never round), an aggressively skeletonized baseplate visible through a sapphire dial side, and case construction using materials sourced from Formula 1 engineering — carbon TPT, Quartz TPT, NTPT, Toughened Ceramic, titanium-aluminum lithium alloys.

The brand's marketing strategy is built almost entirely on athlete partnerships — Rafael Nadal wears the RM 27 series during professional tennis matches, Bubba Watson wore an RM 38 during PGA tournaments, Sebastian Vettel and Felipe Massa represent the F1 program — putting Richard Mille watches in active sports environments where most luxury watches would never be worn.

Movements are developed by Audemars Piguet Renaud & Papi (APRP), Vaucher, and the Richard Mille in-house team in Les Breuleux. Pricing starts around $90,000 (RM 67 Extra Flat Automatic) and reaches into the millions for tourbillons and gem-set references — among the highest entry points in the luxury watch industry.`,
  },

  'ulysse-nardin': {
    tagline: 'Le Locle marine chronometer specialist, modern leader in silicon escapement technology and the Freak free-balance complication.',
    founded: 1846,
    headquarters: 'Le Locle, Switzerland',
    flagshipCollections: ['Marine', 'Diver', 'Freak', 'Blast', 'Executive'],
    intro: `Founded in 1846 by Ulysse Nardin in Le Locle, the brand built its nineteenth- and early-twentieth-century reputation on marine chronometers — winning more than 4,300 observatory accuracy prizes and supplying chronometers to over 50 navies worldwide. The pivot to modern relevance came in 2001 with the Freak, designed by Ludwig Oechslin: a movement with no dial, no hands, and no traditional balance wheel, using the entire baseplate as the rotating display.

The Freak also introduced silicon escape wheels and lever components to mass-production watchmaking — anti-magnetic, lubrication-free, and dimensionally precise to a degree impossible in traditional brass-and-steel construction. Most modern Ulysse Nardin movements use silicon hairsprings and escapements, including the Anchor Tourbillon's flexure-based escapement and the Innovision concept watches.

The Marine collection houses the brand's traditional dress and complicated work, the Diver covers the dive-watch segment with proprietary case construction, and the Blast adds open-architecture skeleton design to the Marine and Executive families. Pricing runs $7,500 to $250,000+, placing standard Marine references alongside Tudor and Omega flagships and Freak/Blast complications well into haute-horlogerie territory.`,
  },

  montblanc: {
    tagline: 'German pen-maker turned Swiss watch brand under Richemont, with serious haute horlogerie via Minerva and the 1858 collection.',
    founded: 1906,
    headquarters: 'Le Locle, Switzerland (Hamburg pen origins)',
    flagshipCollections: ['1858', 'Heritage', 'Star Legacy', 'TimeWalker', 'Bohème'],
    intro: `Founded as a pen company in Hamburg in 1906 and acquired by Richemont in 1977, Montblanc entered serious watchmaking in 1997 with the launch of its Le Locle facility. The strategic upgrade came in 2007 with the acquisition of Manufacture Minerva — a 159-year-old Villeret movement specialist — which gave Montblanc credible haute-horlogerie capability for the first time, including monopusher chronographs, pocket-watch-derived calibers, and the historic Pythagore movement architecture.

The 1858 collection, introduced in 2015 and inspired by Minerva's vintage military and exploration watches, has become the brand's most recognized line — bronze cases, smoked dials, and modern-sized 40–42mm proportions for vintage-aesthetic buyers. The Heritage and Star Legacy lines cover more traditional dress watches, the TimeWalker covers contemporary sports watches, and the Bohème line offers women's dress references.

Most current Montblanc references use modified Sellita movements at the entry tier, with in-house Minerva calibers in the higher 1858 Geosphere, Monopusher Chronograph, and Tourbillon variants. Pricing runs $2,500 (entry quartz) to $250,000+ (Minerva limited editions).`,
  },

  oris: {
    tagline: 'Independent Hölstein manufacturer, the largest non-Swatch independent at this tier — known for affordable Swiss mechanicals.',
    founded: 1904,
    headquarters: 'Hölstein, Switzerland',
    flagshipCollections: ['Aquis', 'Big Crown', 'ProPilot', 'Divers Sixty-Five', 'Artelier'],
    intro: `Founded in 1904 by Paul Cattin and Georges Christian in Hölstein, Oris is one of the few sizeable Swiss watchmakers that remains genuinely independent — not part of Swatch, Richemont, LVMH, or Kering. The brand was once the world's largest pin-pallet watchmaker (an inexpensive escapement variant), pivoted to lever-escapement production in the 1980s, and has held a consistent affordable-mechanical niche since then.

The Aquis is the brand's modern dive-watch family, with 36mm to 43.5mm case sizes, ceramic bezels, and proprietary Oris-developed bracelet quick-change systems. The Divers Sixty-Five revives the brand's 1965 dive watch in vintage-aesthetic 36mm and 40mm cases. The Big Crown ProPilot houses the brand's pilot watches, including the Big Crown Pointer Date — a 1938 reference revival with an unusual centrally-mounted date hand. The Artelier covers dress watches.

Most Oris references use modified Sellita movements, but the brand has invested heavily in its own Calibre 400 family — five-day power reserve, 10-year service interval, anti-magnetic to 2,250 gauss — which has progressively replaced the Sellita base across higher references. Pricing runs $1,800 to $5,000.`,
  },

  rado: {
    tagline: 'Lengnau-based pioneer in scratch-resistant ceramic and high-tech material watch cases, part of the Swatch Group.',
    founded: 1917,
    headquarters: 'Lengnau, Switzerland',
    flagshipCollections: ['Captain Cook', 'True', 'DiaStar', 'HyperChrome', 'Centrix'],
    intro: `Founded in 1917 by the Schlup brothers in Lengnau and renamed Rado in 1957, the brand has been the Swiss industry's specialist in scratch-resistant case materials for over six decades. The DiaStar, introduced in 1962, was the first watch with a hardmetal (tungsten carbide) case and remains in continuous production. The brand later pioneered the use of high-tech ceramic — first in 1986 with the Integral, then expanded across most of the catalog through the 1990s and 2000s.

The True, True Square, and True Thinline references showcase monobloc ceramic case construction in colors not achievable through conventional steel finishing — matte black, plasma high-tech, white, brown, and various pastels. The Captain Cook revives the brand's 1962 dive watch with vintage-correct proportions in steel and bronze, and the HyperChrome and Centrix cover sport-dress hybrid territory.

Most Rado watches use the Powermatic 80 movement (modified ETA C07.111), with an 80-hour power reserve and antimagnetic Nivachron hairspring. Pricing typically runs $1,200 to $4,000, placing Rado alongside Tissot and Hamilton in the affordable-Swiss tier with material-science differentiation as its primary point of competition.`,
  },
}
