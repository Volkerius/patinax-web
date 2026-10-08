export interface TierContent {
  slug: string
  priceRange: number
  label: string
  priceLabel: string
  title: string
  metaTitle: string
  metaDescription: string
  /** Multi-paragraph intro separated by blank lines. */
  intro: string
  /** Brief bullet-point character traits of this tier. */
  highlights: string[]
  /** Notable brand/model examples that anchor this tier. */
  signatureBrands: string[]
  faq: { question: string; answer: string }[]
}

export const TIER_MAP: Record<string, TierContent> = {
  'entry-luxury': {
    slug: 'entry-luxury',
    priceRange: 1,
    label: 'Entry Luxury',
    priceLabel: 'Under $2,000',
    title: 'Entry Luxury Watches',
    metaTitle: 'Best Luxury Watches Under $2,000 — Compared',
    metaDescription: 'Compare entry-level luxury watches under $2,000 from Hamilton, Tissot, Longines, Seiko and more. Specs and value compared side by side.',
    signatureBrands: ['Hamilton', 'Tissot', 'Seiko', 'Longines (entry)', 'Oris (entry)', 'Citizen', 'Hamilton Khaki Field', 'Tissot PRX'],
    highlights: [
      'Swiss or Japanese mechanical movements',
      'Sapphire crystals on most references',
      '38–42mm case sizes for everyday wear',
      '50–200m water resistance',
      '40+ hour power reserves on automatics',
    ],
    intro: `The under-$2,000 segment is where mainstream Swiss and Japanese watchmaking is at its most competitive. Brands at this tier have to deliver a real mechanical movement, sapphire crystal, and durable case construction — anything less puts them in fashion-watch territory, where the buyer has dozens of better alternatives. The result is a price band where the value proposition is unusually strong: you get genuine watchmaking content for what most luxury retailers would treat as an accessory budget.

The dominant players are Hamilton (Khaki Field, Khaki Aviation, Ventura), Tissot (PRX, Le Locle, Heritage), and Seiko (Presage, Prospex, 5 Sports), with Longines, Oris, and Citizen filling out the rest of the field. Most use modified ETA, Sellita, or in-house Powermatic 80 / Caliber 9015 movements with 80-hour power reserves. The Tissot PRX Powermatic 80 in particular has redefined what's possible at this price point, offering an integrated-bracelet steel sports watch that visually evokes much more expensive Royal Oak / Nautilus references for a fraction of the cost.

This tier is the right starting point for a first serious watch, a daily-wear beater alongside a more expensive piece, or anyone who wants the experience of Swiss mechanical watchmaking without the second-mortgage commitment. The 12 most popular watches in this range typically cover dive, dress, pilot, field, and sports-dress styles, so most use cases are well represented.`,
    faq: [
      {
        question: 'What is the best luxury watch under $2,000?',
        answer: 'The Tissot PRX Powermatic 80 (~$725) is the strongest current value, offering an 80-hour automatic movement and integrated-bracelet design. The Hamilton Khaki Field (~$595) is the standard recommendation for a first mechanical watch. The Longines HydroConquest (~$1,775) and Oris Aquis Date (~$1,950) push the limits of the tier.',
      },
      {
        question: 'Are entry-level luxury watches worth it over fashion watches?',
        answer: 'Yes. Watches at this tier use Swiss or Japanese mechanical movements, sapphire crystals, and proper screw-down or push-in case backs — meaning they last decades with regular service. Fashion watches at the same price typically use disposable miyota or quartz movements with mineral crystal and limited serviceability.',
      },
      {
        question: 'Can you get an automatic Swiss watch under $1,000?',
        answer: 'Yes. The Tissot PRX Powermatic 80, Hamilton Khaki Field Mechanical and Auto, Certina DS PH200M, and Mido Ocean Star all sit under $1,000 and use modified ETA or Powermatic 80 automatic movements. Tag Heuer Formula 1 Calibre 5 references occasionally drop into this band on closeout pricing.',
      },
    ],
  },

  'accessible-luxury': {
    slug: 'accessible-luxury',
    priceRange: 2,
    label: 'Accessible Luxury',
    priceLabel: '$2,000 - $5,000',
    title: 'Accessible Luxury Watches',
    metaTitle: 'Best Watches $2,000–$5,000 — Luxury Compared',
    metaDescription: 'Compare luxury watches $2,000–$5,000 from Tudor, TAG Heuer, Longines, Oris and more. In-house movements, COSC, and premium materials compared.',
    signatureBrands: ['Tudor Black Bay', 'TAG Heuer Carrera', 'Oris Big Crown', 'Longines Spirit', 'Bell & Ross BR V', 'Bremont', 'Nomos'],
    highlights: [
      'In-house or top-grade modified movements',
      'COSC chronometer certification on selected references',
      '70+ hour power reserves',
      'Ceramic bezels and proprietary case finishes',
      'The "real watchmaking begins here" tier',
    ],
    intro: `The $2,000 to $5,000 band is where Swiss watchmaking transitions from "mainstream luxury" to "serious horological content." Brands operating here are expected to offer in-house movements (or top-grade modified Sellita/ETA bases), COSC chronometer certification on at least their headline references, and finishing details — applied indices, polished bevels, finer dial textures — that you don't see at the entry tier. The watches are also expected to maintain value better, with stronger secondary-market demand than the under-$2,000 tier.

The benchmark in this segment is the Tudor Black Bay, which uses Tudor's own Manufacture Calibre MT5602 (70-hour power reserve, COSC-certified) inside a 41mm or 39mm case — Rolex-affiliated quality at less than half the price of an Omega Seamaster. Other dominant references include the TAG Heuer Carrera Calibre Heuer 02 (in-house chronograph), the Longines Spirit Zulu Time GMT, the Oris Big Crown ProPilot Big Date, the Bell & Ross BR V series, and the Bremont H-4 Hercules. Nomos Glashütte sits slightly outside the mainstream Swiss field with its German hand-wound and automatic Bauhaus-style references.

This tier is the natural target for a buyer choosing a first "real" luxury watch — typically a single piece intended to last decades and serve as the everyday or special-occasion watch in a small collection. It's also the price band where the largest number of distinct sub-categories (dive, pilot, field, dress-sport, integrated-bracelet) are properly represented.`,
    faq: [
      {
        question: 'What is the best watch between $2,000 and $5,000?',
        answer: 'The Tudor Black Bay 58 (~$3,950) is the consensus pick for best value: in-house COSC-certified movement, Rolex-DNA case construction, and strong secondary-market demand. The TAG Heuer Carrera Calibre Heuer 02 (~$5,150) is the chronograph alternative. The Longines Spirit Zulu Time (~$3,200) is the GMT pick.',
      },
      {
        question: 'Is $5,000 enough for a good luxury watch?',
        answer: 'Absolutely. At $5,000 you can buy entry references from Omega (Aqua Terra), Breitling (Premier), Tudor (Black Bay GMT/Pro), and TAG Heuer (Carrera Caliber 16). These watches use in-house or top-tier modified movements with COSC certification, sapphire crystals, and ceramic or steel bezels.',
      },
      {
        question: 'Why do watches at this tier hold value better than entry luxury?',
        answer: 'Brands at this tier (Tudor, Omega entry, Breitling entry) have stronger consumer demand and more recognized model lineages than entry-luxury brands. The Tudor Black Bay 58, for example, regularly trades at or above retail on the secondary market — uncommon for Hamilton or Tissot at the under-$2,000 tier.',
      },
    ],
  },

  'mid-luxury': {
    slug: 'mid-luxury',
    priceRange: 3,
    label: 'Mid-Range Luxury',
    priceLabel: '$5,000 - $15,000',
    title: 'Mid-Range Luxury Watches',
    metaTitle: 'Best Watches $5,000–$15,000 — Top Brands Compared',
    metaDescription: 'Compare mid-range luxury watches from Rolex, Omega, Breitling, IWC and Cartier. In-house movements and value-retention compared.',
    signatureBrands: ['Rolex', 'Omega', 'Breitling', 'IWC', 'Cartier', 'Panerai', 'Grand Seiko', 'Zenith'],
    highlights: [
      'Full in-house movement programs (Rolex, Omega, Zenith)',
      'COSC + Master Chronometer / Superlative Chronometer ratings',
      'Strong secondary-market value retention',
      'Ceramic, gold, and titanium case material options',
      'The "everyone has heard of these brands" segment',
    ],
    intro: `The $5,000 to $15,000 tier is the heart of the luxury watch market — the price band where most of the brand names a non-collector would recognize actually sell. Rolex, Omega, Breitling, IWC, Cartier, and Panerai dominate the segment, with Zenith and Grand Seiko offering more horologically-focused alternatives at similar pricing. Above this tier, watches become genuinely scarce; below it, you lose access to the most demanded model lineages.

Movements at this tier are universally in-house or sister-house: Rolex's 32xx caliber family, Omega's Master Chronometer Co-Axial calibers, Breitling's Manufacture Caliber B01 chronograph, IWC's 32xxx and 89xxx in-house calibers, and Zenith's El Primero. Most carry chronometer certification — COSC at minimum, with Omega adding the more demanding METAS Master Chronometer specification (15,000 gauss anti-magnetism, ±0/+5 sec/day). Case construction uses 904L steel (Rolex), ceramic bezels (most), and full gold/two-tone executions on the higher references.

This is also the segment where secondary-market dynamics start to seriously affect value. Stainless steel sport Rolex (Submariner, Daytona, GMT-Master) trades well above retail on the secondary market, with multi-year waitlists at authorized dealers. Omega Speedmaster, Tudor Black Bay GMT, Cartier Santos, and Panerai Luminor all maintain strong resale values. For a buyer assembling a collection rather than a single watch, this tier offers the broadest range of distinct watchmaking traditions (American military-derived, Italian dive instrument, Swiss aviation chronograph, Japanese hand-finishing) under one budget umbrella.`,
    faq: [
      {
        question: 'Which brand is best between $5,000 and $15,000?',
        answer: 'Rolex offers unmatched brand recognition and resale strength — the Submariner, Datejust, and OP references all sit in this tier and trade above retail. Omega is the technical alternative, with the Co-Axial escapement and Master Chronometer certification offering accuracy and antimagnetism advantages. IWC and Breitling cover pilot/chronograph; Grand Seiko covers Japanese haute-horlogerie at the upper end.',
      },
      {
        question: 'Do mid-range luxury watches hold their value?',
        answer: 'Many do. Stainless-steel sport Rolex (Submariner, Daytona, GMT-Master) regularly trades at 1.3–2.5x retail on the secondary market. Omega Speedmaster Professional, Tudor Black Bay 58, and Cartier Santos hold value strongly. The exceptions are precious-metal references (gold Datejust, AP Code 11.59) which typically sell below retail unless they are limited-production.',
      },
      {
        question: 'Is a Rolex Submariner worth the waitlist?',
        answer: 'For a long-term keeper at this price tier, yes — the Submariner is the most resilient design in luxury watches, with sustained demand across 60+ years of production. For someone needing a watch immediately, an Omega Seamaster Diver 300M, Tudor Black Bay 58, or Grand Seiko SBGA463 covers the same use case at retail availability with comparable build quality.',
      },
    ],
  },

  'high-luxury': {
    slug: 'high-luxury',
    priceRange: 4,
    label: 'High-End Luxury',
    priceLabel: '$15,000 - $50,000',
    title: 'High-End Luxury Watches',
    metaTitle: 'Best Watches $15,000–$50,000 — High-End Compared',
    metaDescription: 'Compare high-end watches from Jaeger-LeCoultre, Blancpain, Glashütte Original, A. Lange & Söhne entry, and Audemars Piguet entry. Hand-finishing and complications compared.',
    signatureBrands: ['Jaeger-LeCoultre', 'Blancpain', 'Glashütte Original', 'Vacheron (entry)', 'AP Code 11.59 (entry)', 'Lange Saxonia', 'Bulgari Octo'],
    highlights: [
      'Fully in-house manufacture movements with hand-finishing',
      'Côtes de Genève, perlage, and hand-bevelled bridges',
      'Geneva Seal or Patek Philippe Seal eligibility',
      'Perpetual calendars, GMT, and chronograph complications',
      'Production volumes in thousands rather than tens of thousands',
    ],
    intro: `The $15,000 to $50,000 tier is the threshold where mainstream luxury ends and haute horlogerie begins. The brands operating here — Jaeger-LeCoultre, Blancpain, Glashütte Original, Bulgari Octo Finissimo, entry-tier A. Lange & Söhne (Saxonia), entry-tier Vacheron Constantin, and the Audemars Piguet Code 11.59 line — produce watches with hand-finishing standards that don't exist below this price band. Anglages (hand-bevelled bridge edges), inward angles cut by hand, hand-applied Côtes de Genève striping, and gold chatons securing jewels are the visible markers of this tier.

Movements are universally in-house, often with finishing inspectable through sapphire casebacks. JLC alone has produced more than 1,200 distinct calibers in its history. Glashütte Original and A. Lange & Söhne use the German three-quarter plate and hand-engraved balance cock — finishing traditions distinct from the Swiss anglage style. Bulgari's Octo Finissimo holds seven world records for thinnest mechanical movements (automatic, manual, chronograph, perpetual calendar, tourbillon, minute repeater) — a competence none of the larger Swiss houses can match.

This tier is where buyers move from "buying a brand" to "buying a movement." Production volumes are measured in thousands rather than tens of thousands per reference — JLC Reverso, Lange Saxonia, and Vacheron Patrimony don't have the waitlists of Rolex Submariner, but they offer materially deeper mechanical content and finishing for the additional spend. The natural upgrade path from a Rolex/Omega buyer is into JLC, Blancpain, or Glashütte Original at this tier.`,
    faq: [
      {
        question: 'What makes high-end watches worth $15,000+?',
        answer: 'Watches at this tier feature hand-finishing visible only under loupe magnification — anglages, polished countersinks, hand-engraved balance cocks, gold chatons. They use fully in-house movements assembled and adjusted by individual watchmakers rather than industrial production. The watches are also produced in lower volumes, contributing to long-term scarcity.',
      },
      {
        question: 'Which high-end watch brand offers the best value?',
        answer: 'Jaeger-LeCoultre is widely regarded as the best value in haute horlogerie, with movement quality and finishing comparable to the Holy Trinity (Patek, AP, Vacheron) at materially lower prices. The JLC Master Control Date and Reverso Classic Monoface sit at the entry of this tier and are universally recommended.',
      },
      {
        question: 'Is a Lange Saxonia better than a Patek Calatrava?',
        answer: 'They are competing benchmarks for hand-finished round dress watches. The Lange Saxonia uses a German three-quarter plate with hand-engraved balance cock and gold chatons — a different finishing tradition from the Calatrava\'s Geneva Seal Swiss anglage. Lange typically retails 20-30% below comparable Calatravas, making it the value play in the segment.',
      },
    ],
  },

  'ultra-luxury': {
    slug: 'ultra-luxury',
    priceRange: 5,
    label: 'Ultra Luxury',
    priceLabel: '$50,000+',
    title: 'Ultra Luxury Watches',
    metaTitle: 'Best Watches Over $50,000 — Ultra Luxury Compared',
    metaDescription: 'Compare ultra-luxury watches from Patek Philippe, Audemars Piguet, A. Lange & Söhne, Vacheron Constantin and Richard Mille. Grand complications and provenance compared.',
    signatureBrands: ['Patek Philippe', 'Audemars Piguet Royal Oak', 'Vacheron Overseas', 'A. Lange & Söhne Datograph', 'Richard Mille', 'F.P. Journe', 'Greubel Forsey'],
    highlights: [
      'Holy Trinity manufacture (Patek, AP, Vacheron) and equivalents',
      'Grand complications: perpetual calendar, minute repeater, tourbillon',
      'Geneva Seal or Patek Philippe Seal certified',
      'Production volumes in hundreds, not thousands',
      'Multi-year waitlists for steel sports references',
    ],
    intro: `The $50,000+ tier is the apex of mechanical watchmaking. The Holy Trinity manufactures — Patek Philippe, Audemars Piguet, and Vacheron Constantin — define the segment alongside A. Lange & Söhne, Richard Mille, and the independent makers (F.P. Journe, Greubel Forsey, Philippe Dufour, Voutilainen). Watches at this tier are produced in hundreds rather than thousands per reference, making waitlists at retail multi-year and secondary-market premiums substantial — particularly for steel sport references like the Patek Nautilus 5711, the AP Royal Oak 15500, and the Vacheron Overseas 4500V.

The mechanical content shifts from "in-house movement with hand finishing" (the high-luxury tier) to "grand complication with hand finishing." Perpetual calendars (mechanically tracking the irregular Gregorian calendar including leap years through 2100), minute repeaters (chiming the time on demand through gongs), tourbillons (a rotating escapement cage to average gravitational error), and combinations of all three become available — Patek's Grandmaster Chime alone combines 20 complications. Finishing standards are at their apex: every visible bevel hand-polished, every screw blued, every sink countersunk, and every plate striped or perlaged by hand.

For most buyers, this tier is aspirational rather than acquisitive — a Patek Calatrava at $30,000 is more common than a Grandmaster Chime at $2.5M. But the segment also includes the most demanded steel sports watches in the world (Nautilus 5711, Royal Oak 15500, Overseas 4500V), making it a serious target for collectors with the patience to wait three to five years at a Patek or AP authorized dealer for an allocation.`,
    faq: [
      {
        question: 'What is the best ultra-luxury watch brand?',
        answer: 'Patek Philippe is widely regarded as the apex of luxury watchmaking, distinguished by family ownership, the Patek Philippe Seal quality mark, and the deepest archive of historical complications. Audemars Piguet and Vacheron Constantin complete the Holy Trinity; A. Lange & Söhne is the German equivalent. Among independents, F.P. Journe and Philippe Dufour represent the very highest tier of hand-finishing.',
      },
      {
        question: 'Are ultra-luxury watches a good investment?',
        answer: 'Select references — Patek Nautilus 5711/1A, AP Royal Oak 15202ST/15500ST, Patek Aquanaut 5167A, and certain Lange Datograph references — have appreciated meaningfully above retail over 5-10 year holding periods. However, watches should be acquired primarily for the mechanical content; investment return is a secondary benefit and is not guaranteed for any specific reference.',
      },
      {
        question: 'How long is the waitlist for a Patek Nautilus?',
        answer: 'For the steel Nautilus 5711/1A (now discontinued) the waitlist was effectively infinite — Patek stopped accepting orders in 2021. For current references like the 5811/1G white-gold Nautilus, the 5712, and the Aquanaut 5167A, waitlists at authorized dealers typically run 2–7 years depending on the dealer and the buyer\'s purchase history with the brand.',
      },
    ],
  },
}

export const ALL_TIERS = Object.keys(TIER_MAP)
export const TIER_BY_PRICE_RANGE: Record<number, TierContent> = Object.fromEntries(
  Object.values(TIER_MAP).map(t => [t.priceRange, t])
)
