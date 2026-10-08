export interface StyleContent {
  slug: string
  label: string
  title: string
  metaTitle: string
  metaDescription: string
  /** Multi-paragraph intro separated by blank lines. */
  intro: string
  highlights: string[]
  faq: { question: string; answer: string }[]
}

export const STYLE_MAP: Record<string, StyleContent> = {
  diver: {
    slug: 'diver',
    label: 'Diving Watches',
    title: 'Diving Watches',
    metaTitle: 'Best Diving Watches — Top Dive Watches Compared',
    metaDescription: 'Compare top diving watches from Rolex, Omega, Tudor, Blancpain, Seiko and more. Water resistance, bezel materials, and movements compared side by side.',
    intro: `Diving watches are purpose-built underwater instruments that have become the most universally recognized wristwatch category in luxury watchmaking. The blueprint was established in 1953 by two watches launched within months of each other — the Rolex Submariner and the Blancpain Fifty Fathoms — both designed for professional and military divers in an era when SCUBA diving was just becoming accessible. Every modern dive watch traces its design vocabulary (rotating bezel, screw-down crown, luminous markers, oversized hands) to those two references.

The current category is anchored by the Rolex Submariner, Omega Seamaster Diver 300M, Tudor Black Bay, Blancpain Fifty Fathoms, Panerai Submersible, IWC Aquatimer, and Seiko Prospex. ISO 6425 sets the formal standard for what a watch must demonstrate to be marked "diver's" — minimum 100m water resistance (most genuine dive watches exceed 200m), unidirectional rotating bezel with elapsed-time markings, contrasting visibility readable at 25cm in darkness, and shock and magnetic resistance. Most luxury dive watches significantly exceed these baselines, with the Rolex Sea-Dweller rated to 1,220m and the Omega Ultra Deep tested to 6,000m.

For most buyers a dive watch is purchased as an everyday wear rather than for actual diving — the over-engineered case construction, scratch-resistant ceramic bezels, and high-legibility dials simply make them excellent daily watches. Cross-shop the Submariner against the Tudor Black Bay (Rolex DNA, lower price), the Omega Seamaster (more advanced movement, Co-Axial escapement), and the Grand Seiko SBGA463 (Spring Drive smoothness, Japanese hand-finishing). At the entry tier, the Seiko Prospex SPB143 and Tissot Seastar 1000 deliver real ISO 6425 specs at well under $1,000.`,
    highlights: [
      'Water resistance 100m to 6,000m+',
      'Unidirectional rotating bezel for tracking dive time',
      'Luminous indices and hands for low-visibility legibility',
      'Screw-down crown for full pressure sealing',
      'ISO 6425 certification standard',
    ],
    faq: [
      {
        question: 'What is the best diving watch for the money?',
        answer: 'Under $1,000: Seiko Prospex SPB143 or Tissot Seastar 1000 Powermatic 80. Under $5,000: Tudor Black Bay 58 or Longines HydroConquest. $5,000-$15,000: Rolex Submariner or Omega Seamaster Diver 300M. Above $15,000: Blancpain Fifty Fathoms or Panerai Submersible.',
      },
      {
        question: 'How much water resistance do I need for actual diving?',
        answer: 'For recreational SCUBA diving, 200m (20 ATM) is the ISO 6425 minimum for a genuine dive watch. For technical or saturation diving, 300m+ is recommended. Models like the Rolex Sea-Dweller (1,220m) and Omega Planet Ocean Ultra Deep (6,000m) provide professional-tier specs that exceed any recreational requirement.',
      },
      {
        question: 'What is the difference between a dive watch and a regular watch?',
        answer: 'A genuine dive watch must meet ISO 6425: minimum 100m water resistance, unidirectional rotating bezel with 60-minute elapsed-time markings, screw-down or equivalently sealed crown, luminous markers visible at 25cm darkness, and shock/magnetic resistance. Regular sports watches lack the bezel and the formal certification.',
      },
    ],
  },

  dress: {
    slug: 'dress',
    label: 'Dress Watches',
    title: 'Dress Watches',
    metaTitle: 'Best Dress Watches — Elegant Timepieces Compared',
    metaDescription: 'Compare luxury dress watches from Patek Philippe, A. Lange & Söhne, JLC, Vacheron and more. Thin profiles, hand-finished movements compared.',
    intro: `Dress watches represent the original purpose of the wristwatch when it transitioned from a battlefield instrument in the 1910s to a civilian accessory in the 1920s. The defining principles have remained consistent for a century: a thin case (under 10mm), a clean and uncluttered dial, modest case diameter (typically 36–40mm), a leather strap, and a precious-metal case. The form prioritizes elegance and discretion over function — a dress watch should be visible only when the wearer wants it to be.

The benchmark references in the category are the Patek Philippe Calatrava, the Vacheron Constantin Patrimony, the Jaeger-LeCoultre Master Ultra Thin, the A. Lange & Söhne Saxonia Thin, and the Cartier Tank. At the more accessible tier, the Longines Master Collection, Tissot Le Locle, and Hamilton Intra-Matic deliver the same design language at a fraction of the price. Most haute-horlogerie dress watches use ultra-thin movements (Piaget's Caliber 1200P at 2.35mm, JLC's Caliber 849 at 1.85mm, Bulgari's Octo Finissimo at 1.8mm hand-wound) — the dress watch category has historically driven the industry's thinness records.

Modern dress watches face a difficult market position. The cultural shift away from formal business attire over the past two decades has reduced the everyday occasions for which a dress watch is the obviously correct choice. The category's response has been to push toward dress-sport hybrids (Royal Oak, Nautilus, Overseas, Octo Finissimo) that retain the thinness and finishing traditions of classical dress watches while accepting steel cases, integrated bracelets, and 50–100m water resistance — making them wearable in environments where a leather-strap Calatrava would feel out of context.`,
    highlights: [
      'Ultra-thin cases, typically 6–10mm thickness',
      'Clean, minimalist dials with applied indices',
      '36–40mm case diameter for under-cuff wear',
      'Precious metal cases (gold, platinum)',
      'Leather straps with deployant or pin buckles',
    ],
    faq: [
      {
        question: 'What makes a good dress watch?',
        answer: 'A good dress watch features a thin profile (under 10mm), a clean and uncluttered dial, 36–40mm diameter, applied (not printed) indices, and a leather strap. Movement quality and hand-finishing matter more in this category than any other — the watch is meant to be examined closely under the cuff. Patek Calatrava, Lange Saxonia, and JLC Master Ultra Thin set the modern benchmarks.',
      },
      {
        question: 'Can you wear a dress watch every day?',
        answer: 'Modern dress watches with 50m+ water resistance and durable case materials handle daily wear comfortably. The Cartier Tank Solo and JLC Master Control are common everyday choices. The traditional 30m water resistance pieces are better reserved for occasions, since rain, hand-washing, and accidental splashes can affect the case seal over time.',
      },
      {
        question: 'What size should a dress watch be?',
        answer: 'Traditional dress watches range from 36mm to 40mm in diameter, with the historical sweet spot around 38mm. Smaller cases (33–36mm) are reading as more contemporary and gender-neutral than they did a decade ago. The key constraint is the case slipping under a shirt cuff — anything over 12mm thick or 42mm wide compromises this.',
      },
    ],
  },

  sport: {
    slug: 'sport',
    label: 'Sport Watches',
    title: 'Sport Watches',
    metaTitle: 'Best Sport Watches — Luxury Sports Timepieces',
    metaDescription: 'Compare luxury sport watches from Audemars Piguet, Patek Philippe, Vacheron, Rolex and more. Integrated bracelets, in-house movements compared.',
    intro: `The luxury sports watch category as it exists today was created in 1972 by a single watch: the Audemars Piguet Royal Oak, designed by Gérald Genta. The Royal Oak introduced the integrated-bracelet steel sports watch — a category combination that didn't exist before. Patek Philippe followed in 1976 with the Nautilus (also Genta), Vacheron Constantin in 1977 with the 222 (the predecessor to the modern Overseas), and IWC, Piaget, and others followed through the late 1970s and early 1980s. Today these integrated-bracelet luxury sports watches occupy the highest demand position in the entire watch market.

The defining design language is consistent across the category: a steel case with hand-finished facets (alternating satin and polished surfaces), an integrated bracelet (no spring bars between case and bracelet — the bracelet is engineered as part of the case), a 38–42mm diameter, a thin profile (8–10mm), and a textured dial (the AP "Tapisserie," Patek's "horizontal embossed," Vacheron's "half-Maltese-cross"). Movements are universally in-house and visible through sapphire casebacks. Water resistance typically runs 50–100m — enough for swimming and daily wear, not full diving duty.

The current segment leaders in steel are the Patek Nautilus (5711 discontinued, 5811/1G current), AP Royal Oak (15500ST), Vacheron Overseas (4500V), Piaget Polo S, Bulgari Octo Finissimo, Bell & Ross BR 05, and the more accessible Tissot PRX. Demand for the top three (Patek/AP/Vacheron) significantly exceeds production, with multi-year waitlists at authorized dealers and 1.5–3x retail premiums on the secondary market. Cross-shop the Royal Oak against the Nautilus and Overseas at the top tier, and the Octo Finissimo against the Polo S at the more attainable end.`,
    highlights: [
      'Integrated bracelet as part of case design',
      '38–42mm steel cases with alternating satin/polished finishing',
      'Textured dials (Tapisserie, embossed, hand-engraved)',
      '50–100m water resistance for everyday use',
      'In-house movements visible through sapphire casebacks',
    ],
    faq: [
      {
        question: 'What is the most popular luxury sport watch?',
        answer: 'The AP Royal Oak (15500ST) and Patek Nautilus (5811/1G) are the two most demanded references in the entire luxury watch market, both with multi-year waitlists at authorized dealers and significant secondary-market premiums. The Vacheron Overseas and Bulgari Octo Finissimo are direct competitors with shorter waitlists and stronger value retention vs retail.',
      },
      {
        question: 'Are luxury sport watches good investments?',
        answer: 'Steel sport references from the Holy Trinity (AP Royal Oak 15500/15202, Patek Nautilus 5711/5811, Vacheron Overseas 4500V) have historically appreciated 20-100% above retail in the secondary market over 3-5 year holding periods. However, this is exceptional — most other luxury watches do not appreciate, and recent market corrections have softened steel-sport premiums.',
      },
      {
        question: 'What makes a sport watch different from a diving watch?',
        answer: 'Sport watches prioritize wearability and design refinement — typically 50–100m water resistance, no rotating bezel, integrated bracelet, polished finishing. Dive watches prioritize underwater function — 200m+ water resistance, unidirectional rotating bezel, oversized luminous markers, screw-down crowns. The Royal Oak is a sport watch; the Submariner is a dive watch.',
      },
    ],
  },

  pilot: {
    slug: 'pilot',
    label: 'Pilot Watches',
    title: 'Pilot Watches',
    metaTitle: 'Best Pilot Watches — Aviation Timepieces Compared',
    metaDescription: 'Compare pilot watches from IWC, Breitling, Zenith, Longines and more. Large dials, GMT functions, slide-rule bezels and aviation heritage compared.',
    intro: `Pilot watches were the first specialized wristwatches developed for a profession outside the military. Cartier produced the original — the Santos, designed for aviator Alberto Santos-Dumont in 1904 — but the category's design vocabulary was established in the 1930s and 1940s by the German B-Uhr (Beobachtungsuhren) navigation watches: 55mm cases, oversized crowns operable with gloves, large luminous Arabic numerals, and railroad-style minute tracks for precise time-setting against radio signals.

The modern category preserves the visual language at more wearable sizes. The IWC Big Pilot (46mm) and Mark XX (40mm) are the canonical references, supplied to most major air forces during and after the Second World War. The Breitling Navitimer (1952) added a slide-rule bezel for in-flight calculations and remains the most recognizable pilot's chronograph. The Zenith Pilot Type 20, Longines Spirit, Bell & Ross BR V, Hamilton Khaki Aviation, and Bremont MB series cover the rest of the category, with sizes ranging from 40mm dress-pilot to 47mm Big Pilot.

Modern pilot watches divide into three sub-categories. Pure pilot watches (IWC Mark XX, Hamilton Khaki Aviation, Stowa Flieger) are large, legible, time-only or with a date — the cleanest expression of the category. Pilot chronographs (Breitling Navitimer, Zenith Pilot Cronómetro Tipo CP-2, Longines Avigation Big Eye) add stopwatch functionality. GMT pilot watches (Longines Spirit Zulu Time, IWC Pilot Timezoner, Tudor Black Bay GMT) add a second timezone display essential for crossing date lines. For most non-pilot buyers, the dress-pilot variants in 40–42mm cases (IWC Mark XX, Longines Spirit) are the most wearable everyday choice in the category.`,
    highlights: [
      'Large legible dials with Arabic numerals',
      '40–46mm case sizes for wear over flight suits',
      'Anti-magnetic case construction',
      'GMT, slide-rule, and chronograph complications',
      'Heritage from Second World War military aviation',
    ],
    faq: [
      {
        question: 'What is the best pilot watch brand?',
        answer: 'IWC is the consensus pick for pilot watches — the Big Pilot and Mark XX define the modern category. Breitling owns the chronograph segment with the Navitimer slide-rule chronograph. Zenith offers heritage-rich Pilot Type 20 references. At more accessible pricing, Longines Spirit and Hamilton Khaki Aviation deliver the same design language for under $3,000.',
      },
      {
        question: 'Why are pilot watches so big?',
        answer: 'Pilot watches were designed to be worn over flight suit sleeves and read at a glance during high-vibration flight — the original B-Uhr specs were 55mm. Modern pilot watches range from 40mm (IWC Mark XX) to 46mm (IWC Big Pilot), with the larger crowns originally designed for operation while wearing gloves at altitude.',
      },
      {
        question: 'Do pilots actually wear pilot watches?',
        answer: 'Most modern professional pilots wear digital quartz watches (Garmin, Casio G-Shock, Suunto) for cockpit use because of weight, glove compatibility, and battery life. Mechanical pilot watches are worn primarily as enthusiast pieces or as a heritage statement, not as primary cockpit instruments.',
      },
    ],
  },

  field: {
    slug: 'field',
    label: 'Field Watches',
    title: 'Field Watches',
    metaTitle: 'Best Field Watches — Military-Inspired Compared',
    metaDescription: 'Compare field watches from Hamilton, Longines, Tudor, Bremont and more. Military heritage, rugged construction, and legible 38–42mm dials compared.',
    intro: `Field watches evolved from the trench watches of the First World War — the first wristwatches issued to soldiers in significant numbers, replacing pocket watches that were impractical for military use. The modern category's visual language was set during the Second World War by the WWW (Watch, Wrist, Waterproof) specification issued by the British Ministry of Defence: a clean black dial, large white Arabic numerals, a 24-hour chapter ring, broad luminous hands, and a moderate 38mm case in steel or chromium-plated brass.

The benchmark modern field watch is the Hamilton Khaki Field — a direct descendant of the Hamilton field watches issued to American soldiers during the Vietnam War, available in both manual-wind (38mm Mechanical) and automatic (42mm Auto) versions for under $1,000. The Khaki Field also appeared on Matthew McConaughey's wrist throughout Christopher Nolan's Interstellar (2014), giving the watch unusual cultural penetration outside the watch enthusiast community. Other important references include the Longines Heritage Military, Tudor Ranger, Bremont Broadsword, Marathon GSAR, and Sinn 556.

Field watches occupy a specific sweet spot in the watch market: they are durable enough for genuine outdoor use (typically 100m water resistance, anti-shock movements), modest enough in size (38–42mm) for daily wear, affordable (most under $1,500), and historically meaningful through the WWW lineage. They are widely recommended as the ideal first mechanical watch for a non-collector — the design language is unobtrusive, the maintenance requirements are low, and the watches age gracefully over decades of wear. For a watch intended to do everything from desk work to weekend hiking without needing to be precious about it, the field watch category is the right answer.`,
    highlights: [
      'Clean military-style dials with Arabic numerals',
      '24-hour chapter ring for military time',
      '38–42mm case sizes for all-day wear',
      '100m water resistance and shock-resistant movements',
      'Canvas or leather straps with metal buckles',
    ],
    faq: [
      {
        question: 'What defines a field watch?',
        answer: 'A field watch is characterized by military-inspired design: a clean dial with Arabic numerals (often with 24-hour chapter ring), 38–42mm case, luminous hands, 100m water resistance, and a canvas or leather strap. The form prioritizes legibility, durability, and cost — most field watches retail under $1,500.',
      },
      {
        question: 'Are field watches good for everyday wear?',
        answer: 'Field watches are widely considered the ideal everyday mechanical watch. The 38–42mm case fits comfortably under any sleeve, the 100m water resistance handles rain and hand-washing, and the clean dial reads quickly. The Hamilton Khaki Field, Tudor Ranger, and Sinn 556 are all popular daily-wear choices.',
      },
      {
        question: 'What is the difference between a field watch and a pilot watch?',
        answer: 'Field watches are smaller (38–42mm vs 42–46mm pilot), more affordable (typically under $1,500 vs $3,000+ for pilots), and lack the GMT or slide-rule complications common in pilot watches. The categories share heritage (both rooted in mid-20th-century military issue) but field watches prioritize ground-soldier wearability, pilots prioritize cockpit legibility.',
      },
    ],
  },

  chrono: {
    slug: 'chrono',
    label: 'Chronograph Watches',
    title: 'Chronograph Watches',
    metaTitle: 'Best Chronograph Watches — Luxury Chronographs',
    metaDescription: 'Compare chronograph watches from Rolex, Omega, Patek Philippe, Breitling and more. Movement architecture, sub-dial layouts, and column-wheel chronographs compared.',
    intro: `The chronograph is one of the oldest and most mechanically complex complications in watchmaking — a watch within a watch, with a separate gear train that can be started, stopped, and reset independently of the timekeeping movement. The first wrist chronograph was patented by Longines in 1879, but the modern automatic chronograph was a 1969 simultaneous achievement: Heuer/Breitling/Hamilton (Caliber 11), Zenith (El Primero), and Seiko (6139) all launched the first integrated automatic chronograph movements within months of each other.

The benchmark chronograph references in modern watchmaking are the Omega Speedmaster Professional (the only watch certified for use on the Moon, used during all six lunar landings), the Rolex Daytona (the most demanded chronograph in the secondary market), the Patek Philippe 5172G (the apex of hand-finished chronograph movements), the Breitling Navitimer (the canonical pilot's chronograph with slide rule), the Zenith El Primero Chronomaster (the highest-frequency mainstream automatic chronograph at 5 Hz), and the A. Lange & Söhne Datograph (widely cited as the most beautifully finished chronograph movement currently produced).

Chronographs divide along two important axes. Mechanical architecture: column-wheel chronographs (Rolex 4130, Patek CHR 27-525, Lange L951.1) are smoother to operate and more expensive to manufacture than cam-actuated chronographs (most Sellita and Valjoux 7750 derivatives). Coupling system: vertical clutch (Rolex 4130, Omega 9300) eliminates the second-hand "jump" at start common to horizontal-clutch chronographs (most others). For everyday use these technical differences are imperceptible; for collectors evaluating long-term ownership and serviceability, they materially affect the choice between, say, a Daytona and a Speedmaster.`,
    highlights: [
      'Independent stopwatch with start/stop/reset pushers',
      'Column-wheel or cam-actuated movement architecture',
      'Vertical or horizontal clutch coupling',
      'Tachymeter or telemeter scales on bezels',
      '250+ component movements (vs ~130 for time-only)',
    ],
    faq: [
      {
        question: 'What is the most iconic chronograph watch?',
        answer: 'The Omega Speedmaster Professional ("Moonwatch") is the most historically significant — it was certified by NASA for spaceflight and worn during all six Apollo lunar landings, including the first Moon landing in 1969. The Rolex Daytona is the most demanded chronograph in the secondary market. The Patek Philippe 5172G represents the apex of hand-finished chronograph craft.',
      },
      {
        question: 'What is the difference between automatic and manual chronographs?',
        answer: 'Manual chronographs (Speedmaster Professional, Datograph, Patek 5172G) are typically thinner, hand-finished to higher standards, and preferred by collectors for movement purity. Automatic chronographs (Daytona, Speedmaster Reduced, Navitimer Caliber B01) are more convenient for daily wear, since they self-wind on the wrist and don\'t need to be set up before use.',
      },
      {
        question: 'Are chronograph watches worth the premium?',
        answer: 'Chronograph movements contain 250+ components vs ~130 for a time-only automatic — they require more development, finishing, and servicing labor, justifying higher pricing. The premium typically holds in the secondary market, particularly for column-wheel chronographs from Rolex, Omega, Patek, and Lange. Cam-actuated chronographs from less prestigious brands hold value less reliably.',
      },
    ],
  },
}

export const ALL_STYLES = Object.keys(STYLE_MAP) as Array<keyof typeof STYLE_MAP>
