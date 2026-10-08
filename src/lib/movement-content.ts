// Movement hub content maps — targets the "<movement> watches" keyword cluster
// (e.g., "automatic watches", "quartz watches", "spring drive").

export interface MovementContent {
  slug: string
  label: string
  title: string
  metaTitle: string
  metaDescription: string
  /** DB movement values that count toward this hub. */
  dbValues: string[]
  intro: string
  highlights: string[]
  faq: { question: string; answer: string }[]
}

export const MOVEMENT_MAP: Record<string, MovementContent> = {
  automatic: {
    slug: 'automatic',
    label: 'Automatic Watches',
    title: 'Automatic Watches',
    metaTitle: 'Best Automatic Watches — Self-Winding Luxury Watches Compared',
    metaDescription: 'Compare automatic luxury watches from Rolex, Omega, Patek Philippe, AP and more. Self-winding movements, power reserves, COSC certification side by side.',
    dbValues: ['Automatic'],
    intro: `Automatic watches — also called self-winding — use a weighted rotor that spins with wrist motion to tension the mainspring. The invention dates to Abraham-Louis Perrelet in 1777, but the modern self-winding wristwatch emerged in 1923 with John Harwood's bumper-automatic design. Today automatic movements power the overwhelming majority of luxury mechanical watches — it's the default expectation at every price tier above quartz.

The category covers every major manufacturer: Rolex (Perpetual 3235, 3230), Omega (Co-Axial 8800, 8900), Patek Philippe (324 S C, 240), Audemars Piguet (4302, 7121), Jaeger-LeCoultre (Master Calibre 899, 925), Grand Seiko (9S), and JLC's Calibre 868. Within automatics, distinguish between in-house movements (made by the watch brand itself) and sourced movements (ETA, Sellita, La Joux-Perret base movements, often modified). Rolex, Lange, JLC, and Patek are fully in-house; most other brands use combinations.

Key automatic specifications: power reserve (how long it runs off the wrist, usually 38–80 hours), frequency (28,800 vph is standard, 36,000 is high-beat, 21,600 is slow-beat), COSC certification (chronometer certified to ±4/+6 seconds/day), and date complications. A well-regulated modern automatic runs within ±2 seconds per day — tighter than most people need. For a watch you'll wear daily, automatic is the default choice.`,
    highlights: [
      'Self-winding via wrist motion — no battery needed',
      'Power reserve typically 38–80 hours',
      'COSC certification: ±4/+6 seconds per day',
      '28,800 vph standard frequency (4 Hz)',
      'Default movement type at $1,000+ retail',
    ],
    faq: [
      {
        question: 'How often do I need to wind an automatic watch?',
        answer: 'If worn daily for 8+ hours, never — the rotor keeps the mainspring fully wound. If left off for longer than the power reserve (typically 40–70 hours), you\'ll need to manually wind the crown 20–40 turns to restart, then wear normally. A watch winder is only necessary for perpetual calendar complications where resetting is tedious.',
      },
      {
        question: 'What is the difference between automatic and manual winding?',
        answer: 'Manual-wind watches only wind when you turn the crown — there is no rotor. The movement is usually thinner (no rotor adds 2–3mm of thickness) and considered more "pure" by enthusiasts. Automatic watches wind themselves while worn. Both can be chronometer-certified; both can have the same accuracy. The choice is aesthetic and architectural.',
      },
      {
        question: 'How accurate is a luxury automatic watch?',
        answer: 'Chronometer-grade COSC certification requires ±4/+6 seconds per day. Most luxury automatics run tighter than this after regulation — Rolex guarantees ±2 seconds per day across its Superlative Chronometer range. Omega\'s Master Chronometer (METAS certified) holds 0/+5 seconds. High-end movements (Lange, Patek) typically run at ±1–2 seconds.',
      },
    ],
  },

  manual: {
    slug: 'manual',
    label: 'Manual Wind Watches',
    title: 'Manual Wind Watches',
    metaTitle: 'Best Manual Wind Watches — Hand-Wound Luxury Watches Compared',
    metaDescription: 'Compare manual wind luxury watches from Lange, Patek Philippe, JLC, Omega Speedmaster and more. Hand-wound movements, thin profiles, traditional watchmaking.',
    dbValues: ['Manual', 'Manual winding'],
    intro: `Manual-wind watches require daily winding via the crown — 20 to 40 turns in the morning provides 40 or more hours of running. The movement has no rotor, which eliminates 2–3mm of thickness and allows the thinnest mechanical watches ever made (Piaget Altiplano Ultimate at 2mm total, Bulgari Octo Finissimo at 5.5mm). Manual-wind is the traditional watchmaking format — every wristwatch was manual-wind until Harwood's 1923 automatic invention.

The category is where thinness, movement visibility, and horological tradition intersect. The Omega Speedmaster Professional (Caliber 1861/3861) is the Moon Watch and the most famous manual-wind chronograph. The Lange 1815 and Saxonia Thin, Patek Calatrava 5196P, and Vacheron Patrimony Manual are the benchmarks for dress watches. The JLC Reverso uses manual movements specifically so the caseback is flat and engravable. The Panerai Luminor Marina Manual retains the historical format of the Italian Navy-issued originals.

Why choose manual over automatic: the daily winding ritual is part of the appeal for many collectors, the movement is typically thinner, the caseback view is unobstructed by a rotor, and the case can be slimmer on the wrist. Why not: you must wind it daily or it stops — for owners with multiple watches in rotation, this becomes a minor inconvenience. For a single daily-worn dress watch or a collector piece, manual-wind is the more intentional choice.`,
    highlights: [
      'Daily winding via crown — 20–40 turns for full power reserve',
      'Thinner cases possible (no rotor mass)',
      'Unobstructed caseback view of the movement',
      'Traditional format — every pre-1923 wristwatch was manual',
      'Category leaders: Omega Speedmaster, Lange 1815, Patek Calatrava',
    ],
    faq: [
      {
        question: 'Is it bad to overwind a manual watch?',
        answer: 'Modern manual movements have a slipping-bridle mainspring that prevents overwinding — when fully tensioned, the bridle slips and no damage occurs. You\'ll feel the crown become slightly stiffer at full wind. Older (pre-1960s) manual watches without slipping bridles can actually overwind; gently turn until you feel resistance, not past it.',
      },
      {
        question: 'How long does a manual wind last before needing to be wound again?',
        answer: 'Most modern manual movements offer 40–80 hours of power reserve. The Omega 3861 in the Speedmaster gives 50 hours. The Lange manual movements often offer 55–72 hours. High-end manual calibers with twin mainspring barrels (AP 2003 chronograph caliber) can exceed 100 hours. In practice, daily winding ensures you never see the watch stop.',
      },
      {
        question: 'Why is the Omega Speedmaster manual instead of automatic?',
        answer: 'NASA specifications for the moon landing required a manual-wind chronograph — automatic rotors were considered less reliable under weightless conditions. The 1969 specification has never been changed. The Speedmaster Professional remains manual-wind as a heritage requirement. The "Speedmaster Moonwatch" is always manual; other Speedmaster variants (Racing, Reduced, Moonphase) can be automatic.',
      },
    ],
  },

  quartz: {
    slug: 'quartz',
    label: 'Quartz Watches',
    title: 'Quartz Watches',
    metaTitle: 'Best Luxury Quartz Watches — Precision Watches Compared',
    metaDescription: 'Compare luxury quartz watches from Grand Seiko, Cartier, Breitling Superquartz and more. Ultra-precise quartz movements, long battery life, thin profiles.',
    dbValues: ['Quartz'],
    intro: `Luxury quartz watches are the most accurate mechanical-aesthetic watches produced at scale. A standard quartz movement runs within ±15 seconds per month; thermocompensated high-accuracy quartz (Grand Seiko 9F, Citizen Chronomaster AT, Breitling Superquartz) achieves ±10 seconds per year. For reference, the most accurate mechanical watch (Grand Seiko VFA chronometer) runs ±2 seconds per day — a thermocompensated quartz is roughly 300x more accurate.

The category was effectively destroyed by the quartz crisis (1970s-80s) when cheap quartz movements nearly ended traditional Swiss mechanical watchmaking. The comeback path was narrow: either (a) make quartz so precise it outperforms anything else (Grand Seiko 9F caliber in the $4,000 SBGX range, Citizen Chronomaster AT at $3,500), or (b) embrace quartz as thin and reliable for fashion-adjacent dress watches where battery life matters (Cartier Tank Must, Panthère, and certain Santos references).

Why choose a luxury quartz: thinness (no mainspring barrel or rotor allows sub-5mm cases), accuracy, reliability, and multi-year battery life. Why not: no winding ritual, no visible movement beauty, and (for most collectors) less emotional engagement. Grand Seiko's 9F quartz is the respectability exception — a hand-assembled, hand-regulated quartz movement with ±10 seconds per year accuracy that enthusiasts rate alongside the brand's mechanical calibers.`,
    highlights: [
      'Ultra-precise — thermocompensated quartz holds ±10 sec/year',
      'Thin cases — no mainspring barrel needed',
      'Multi-year battery life (5–10 years typical)',
      'Grand Seiko 9F caliber: hand-assembled, $4,000+ retail',
      'Cartier dress line (Tank Must, Panthère) mostly quartz',
    ],
    faq: [
      {
        question: 'Why are some quartz watches so expensive?',
        answer: 'Luxury quartz is either hand-assembled (Grand Seiko 9F, F.P. Journe quartz) with mechanical-grade finishing, or uses thermocompensated and ultra-precise circuits (Breitling Superquartz, Longines VHP). The movement costs more than a standard ETA mechanical. The premium reflects precision engineering — mid-range quartz watches (~$200) share little with a $5,000 Grand Seiko SBGX.',
      },
      {
        question: 'Is a mechanical watch better than a quartz watch?',
        answer: 'Better depends on goal. Mechanical wins on craftsmanship, tradition, movement beauty, and long-term service (mechanical can be serviced indefinitely). Quartz wins on accuracy (no mechanical watch approaches thermocompensated quartz precision), thinness, reliability (no winding needed), and price-to-performance at the entry level. For a precision instrument, quartz; for a heritage object, mechanical.',
      },
      {
        question: 'How long do quartz watch batteries last?',
        answer: 'Typically 2–10 years depending on movement. Standard Ronda and ETA quartz: 3–5 years. Grand Seiko 9F: 3 years (it runs multiple motors). Citizen Eco-Drive: no battery — solar cells with a 5–7 year capacitor lifespan. Most Cartier Tank and Panthère quartz: 4–6 years. Replacement is a $30–100 service.',
      },
    ],
  },

  'spring-drive': {
    slug: 'spring-drive',
    label: 'Spring Drive Watches',
    title: 'Spring Drive Watches',
    metaTitle: 'Grand Seiko Spring Drive Watches — Hybrid Movement Watches Compared',
    metaDescription: 'Compare Grand Seiko Spring Drive luxury watches — hybrid mechanical-quartz movements. Smooth-sweeping seconds, ±15 seconds/month accuracy.',
    dbValues: ['Spring Drive'],
    intro: `Spring Drive is Grand Seiko's proprietary hybrid movement — a mechanical mainspring and gear train regulated by a quartz oscillator instead of a traditional balance wheel. Invented by Yoshikazu Akahane at Seiko in 1977 and brought to production in 1999 after 22 years of development, Spring Drive combines the power source and three-dimensional gear train of a mechanical watch with the absolute precision of quartz timing.

The visible signature is the seconds hand — it sweeps perfectly smoothly rather than beating at 6, 8, or 10 Hz like mechanical movements. The glide is continuous because the movement uses a Tri-Synchro Regulator: the mainspring drives the hands via a gear train, a quartz oscillator provides the timing reference, and an electromagnetic brake (instead of an escapement) regulates the gear train to match quartz precision. The movement is entirely mechanical in power; entirely quartz in regulation.

Current production is limited to Grand Seiko's Spring Drive calibers (9R series — 9R65 base, 9R86 chronograph, 9R96 high-end) and Credor references above $20,000. The SBGA211 "Snowflake" (38.8x12.5mm) is the iconic everyday Spring Drive. The SBGA415 "Skyflake" and SBGH273 Hi-Beat variants extend the range. For buyers who want a smoothly sweeping seconds hand with quartz-level accuracy and mechanical movement architecture, Spring Drive is the only option — no other manufacturer produces the technology.`,
    highlights: [
      'Hybrid mechanical mainspring + quartz-regulated timing',
      'Smooth-sweeping seconds hand (no tick)',
      '±15 seconds per month accuracy — 5–10x better than mechanical',
      '72-hour power reserve (9R65 caliber)',
      'Grand Seiko exclusive — no other manufacturer produces it',
    ],
    faq: [
      {
        question: 'Is a Spring Drive watch mechanical or quartz?',
        answer: 'Both and neither — the power comes from a mechanical mainspring that you wind automatically or manually, but the timing regulation uses a quartz oscillator and electromagnetic brake instead of a traditional balance wheel. There is no battery. Maintenance is similar to a mechanical watch (service every 5–7 years).',
      },
      {
        question: 'Why does the seconds hand move smoothly on a Spring Drive?',
        answer: 'Mechanical watches use an escapement that locks and releases the gear train 6–10 times per second, producing visible ticks. Spring Drive replaces the escapement with an electromagnetically-braked glide wheel that rotates continuously at exactly 8 times per second, producing a perfectly smooth sweep. The effect is visually striking and impossible to replicate with any other movement type.',
      },
      {
        question: 'How does Spring Drive accuracy compare to mechanical and quartz?',
        answer: '±15 seconds per month (±1 second per day) accuracy. A chronometer-certified mechanical watch is ±4/+6 seconds per day — Spring Drive is roughly 5x more accurate. Standard quartz is ±15 seconds per month as well, so Spring Drive matches quartz on timekeeping while providing mechanical aesthetics.',
      },
    ],
  },
}

export const ALL_MOVEMENTS = Object.keys(MOVEMENT_MAP)
