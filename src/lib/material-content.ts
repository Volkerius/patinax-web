// Material hub content maps — each hub targets a long-tail "<material> watches" keyword cluster.
// The match function maps normalized slugs to the set of DB caseMaterial string variants.

export interface MaterialContent {
  slug: string
  label: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  highlights: string[]
  faq: { question: string; answer: string }[]
}

export const MATERIAL_MAP: Record<string, MaterialContent> = {
  steel: {
    slug: 'steel',
    label: 'Stainless Steel Watches',
    title: 'Stainless Steel Watches',
    metaTitle: 'Best Stainless Steel Watches — Luxury Steel Watches Compared',
    metaDescription: 'Compare luxury stainless steel watches from Rolex, Omega, Tudor, Patek Philippe and more. Oystersteel, 904L, and premium steel alloys side by side.',
    intro: `Stainless steel is the default case material of modern luxury watchmaking — chosen by Rolex, Omega, Audemars Piguet, Patek Philippe, and every other major maison for at least one flagship reference. The category splits into standard 316L (used by most brands), harder 904L "Oystersteel" (Rolex), proprietary alloys like Omega's O-MEGASTEEL and Chopard's Lucent Steel, and specialty grades like submarine steel in Panerai's Luminor Marina.

The appeal is simple: steel is corrosion-resistant, scratch-tolerant (relative to gold), takes a high polish, and keeps a luxury watch at a price point where it can be worn without anxiety. A steel Rolex Submariner, Royal Oak, or Nautilus is the most recognized object in the entire luxury watch market. Sport steel references typically command the highest secondary-market premiums because they combine everyday durability with design heritage.

Cross-shop steel dive watches (Submariner vs Seamaster vs Black Bay), integrated-bracelet steel sport watches (Royal Oak vs Nautilus vs Overseas), and the entry-tier steel daily wearers (Tudor Black Bay 58, Grand Seiko SBGA211, Tissot PRX). Steel is where luxury watchmaking proves it can be both finished to haute-horlogerie standards and durable enough for unrestricted daily wear.`,
    highlights: [
      '316L and 904L Oystersteel are industry standards',
      'Corrosion-resistant and highly polishable',
      'Best value-to-durability ratio in luxury watchmaking',
      'Steel sport watches command highest secondary market premiums',
      'Foundation material for 60%+ of all luxury watches produced',
    ],
    faq: [
      {
        question: 'Is 904L Oystersteel better than 316L stainless steel?',
        answer: 'Rolex\'s 904L Oystersteel is harder, more corrosion-resistant, and polishes brighter than the industry-standard 316L. The difference is real but small — for 99% of wear scenarios, 316L is completely adequate. Oystersteel\'s main advantage is long-term polish retention, which matters for Rolex\'s lifetime-finish philosophy.',
      },
      {
        question: 'Which luxury watch brands use premium steel alloys?',
        answer: 'Rolex uses 904L Oystersteel, Omega uses O-MEGASTEEL on higher-end Seamasters, Chopard uses Lucent Steel A223, Sinn uses submarine steel and tegimented steel, Damasko uses ice-hardened steel. Most other brands including Patek Philippe, Audemars Piguet, and JLC use standard 316L.',
      },
      {
        question: 'Why do steel luxury watches cost so much?',
        answer: 'The case material is a small fraction of the total cost — what you\'re paying for is the movement, finishing, brand heritage, and market demand. A steel Nautilus 5711 costs more than a gold version at retail because demand is higher. The material sets a floor; the rest comes from craftsmanship and desirability.',
      },
    ],
  },

  gold: {
    slug: 'gold',
    label: 'Gold Watches',
    title: 'Gold Watches',
    metaTitle: 'Best Gold Watches — Luxury Gold Watches Compared (Rose, White, Yellow)',
    metaDescription: 'Compare luxury gold watches — 18k rose gold, white gold, yellow gold, and proprietary alloys like Everose and Sedna. Rolex, Patek Philippe, Audemars Piguet compared.',
    intro: `Gold watches are the historical default of luxury watchmaking. Before stainless steel became acceptable in the 1970s, every "proper" dress watch was cased in 18k yellow gold, white gold, or platinum. Today gold cases split into three colour families — yellow (classic), white (discreet, reads like steel from a distance), and rose/red/pink (warmest on the wrist) — each with maker-specific alloys.

The proprietary alloys matter. Rolex's Everose is a pink gold with added platinum that resists fading over time, meaning it holds its warm hue decades into ownership. Omega's Sedna Gold and Moonshine Gold use similar platinum additions for colour stability. Lange's honey gold (5N+) is a custom alloy unique to certain Zeitwerk and 1815 references. These aren't marketing — they reflect real differences in how the gold ages on your wrist.

Cross-shop the Rolex Daytona in gold (Everose, white, yellow) vs the AP Royal Oak in rose gold vs the Patek 5711 in rose gold. For dress watches, the Calatrava, Saxonia, and Patrimony in white gold or platinum set the benchmark. Gold is heavier than steel (notably so on a bracelet), commands a 2–3x price premium over steel versions of the same reference, and represents a long-term hold given the underlying metal value.`,
    highlights: [
      '18k gold alloys: yellow, white, rose/red, and maker-specific (Everose, Sedna, Moonshine)',
      'Platinum additions improve long-term color stability',
      'Heavier on the wrist than steel (2–3x denser)',
      '2–3x price premium vs steel of same reference',
      'Intrinsic material value acts as a price floor',
    ],
    faq: [
      {
        question: 'What is the difference between rose gold, Everose, and red gold?',
        answer: 'Rose/red/pink gold are all 18k alloys with copper for warmth — the distinction is percentage (red highest copper, rose medium, pink least). Rolex\'s Everose adds a small amount of platinum to standard rose gold to prevent the copper from oxidizing, keeping the color stable for decades. Most other brands\' rose gold will shift slightly warmer over many years.',
      },
      {
        question: 'Which is more valuable: white gold or platinum watches?',
        answer: 'Platinum costs more per gram than white gold and is denser (more weight), so a platinum case adds both material and perceived value. Visually, platinum reads slightly warmer and grayer than white gold, which is often rhodium-plated. Patek Philippe marks platinum cases with a small diamond set into the case at 6 o\'clock.',
      },
      {
        question: 'Do gold watches hold their value?',
        answer: 'Modern gold sport watches (gold Daytona, Nautilus, Royal Oak) hold value extremely well because demand exceeds retail availability. Vintage gold dress watches are typically priced below retail in good condition — fashion has moved away from small gold dress watches. Platinum is generally the least liquid material secondhand.',
      },
    ],
  },

  titanium: {
    slug: 'titanium',
    label: 'Titanium Watches',
    title: 'Titanium Watches',
    metaTitle: 'Best Titanium Watches — Lightweight Luxury Watches Compared',
    metaDescription: 'Compare titanium luxury watches from Omega, Panerai, IWC, Grand Seiko and more. Grade 2 vs Grade 5 titanium, weight, hypoallergenic properties.',
    intro: `Titanium watches prioritize low weight over the polish and density of steel or gold. A titanium case is roughly 40% lighter than a comparable steel case — a 45mm chronograph that would sit heavy in steel becomes almost unnoticeable on the wrist in titanium. Grade 2 (commercially pure) is softer and easier to finish but scratches more readily; Grade 5 (Ti-6Al-4V, alloyed with aluminum and vanadium) is harder, more scratch-resistant, and used by most luxury makers.

The category leaders are Omega (Titanium Seamaster and Speedmaster), Panerai (most modern Luminor and Radiomir Marina Militare references), IWC (Pilot's Watch Chronograph Top Gun), Grand Seiko (high-intensity titanium unique to Japan), Zenith (Defy Skyline), and Tudor (Pelagos). Panerai's Submersible and Luminor Marina DMLS use powder-bed titanium printing for complex case geometries impossible in forged metal.

The practical reason to choose titanium over steel: you will not feel it on your wrist after an hour. The tradeoff is that satin titanium finishing dominates — bright polish is harder to achieve and easier to mark. For larger watches (42mm+), titanium is the difference between comfort and constant awareness. For under-40mm dress watches, steel is usually the better choice since the weight advantage matters less.`,
    highlights: [
      '40% lighter than equivalent steel case',
      'Hypoallergenic — no nickel reaction issues',
      'Corrosion-resistant, including salt water',
      'Grade 5 (6Al-4V) is the preferred aerospace alloy',
      'Best for 42mm+ case sizes where steel becomes heavy',
    ],
    faq: [
      {
        question: 'Is titanium better than stainless steel for watches?',
        answer: 'Better for comfort on larger cases (42mm+), better for allergy sufferers, and better for corrosion resistance in saltwater. Steel is better for polish brightness, scratch resistance on Grade 2 titanium, and secondary-market value retention. For a 40mm-and-under daily wearer, steel is usually preferred; for a 44mm chronograph, titanium transforms wearability.',
      },
      {
        question: 'Does titanium scratch more easily than steel?',
        answer: 'Grade 2 titanium is softer than 316L steel and scratches more readily. Grade 5 titanium is comparable to steel in scratch resistance and can be harder with surface treatments. DLC or ceramic coatings (as on Grand Seiko\'s high-intensity titanium and Panerai\'s Carbotech) significantly improve scratch resistance.',
      },
      {
        question: 'Why are some titanium watches so much more expensive than steel versions?',
        answer: 'Titanium is more expensive per kilo than steel, harder to machine (tool wear), and harder to finish to luxury standards because it conducts heat poorly. Brands like Omega and Grand Seiko charge a premium for titanium variants that reflects both material and labor cost — typically 10–30% over steel at the same model.',
      },
    ],
  },

  ceramic: {
    slug: 'ceramic',
    label: 'Ceramic Watches',
    title: 'Ceramic Watches',
    metaTitle: 'Best Ceramic Watches — High-Tech Ceramic Luxury Watches Compared',
    metaDescription: 'Compare ceramic luxury watches from Rolex, Omega, Hublot, Panerai and more. Scratch-proof ceramic cases, ceramic bezels, and all-ceramic constructions.',
    intro: `Ceramic in watchmaking means zirconium oxide (ZrO₂) sintered at 1,400°C — not the pottery sense. The material is nearly impossible to scratch (9 on the Mohs scale, vs 6 for steel), extremely lightweight, and completely colorfast — a black ceramic Daytona bezel looks identical after ten years of daily wear. The tradeoff is brittleness: ceramic can chip or crack under sharp impact where steel would just dent.

The category splits into ceramic bezels (Rolex Cerachrom, Omega ceramic bezels — widely adopted) and full ceramic cases (Hublot Big Bang Unico, Omega Dark Side of the Moon, IWC Top Gun Ceratanium which is a titanium-ceramic hybrid). Bezel-only ceramic is the most common implementation because a ceramic case requires specialized tooling to produce to dimensional tolerances suitable for crown stems and case-back threads.

The appeal for everyday wear: a full-ceramic case is lighter than steel, cooler against the skin, and immune to the micro-scratches that dull steel watches within months. The tradeoff beyond brittleness is cost — ceramic cases are notably more expensive to manufacture than steel. For a case you'll wear under a shirt cuff daily in a work environment, black or brushed ceramic is unmatched for keeping the watch looking new.`,
    highlights: [
      'Mohs hardness 9 — near scratch-proof',
      'Colorfast — black stays black, white stays white',
      'Lightweight — comparable to titanium',
      'Cool against the skin, hypoallergenic',
      'Brittle under sharp impact (tradeoff vs steel)',
    ],
    faq: [
      {
        question: 'Can ceramic watches break?',
        answer: 'Ceramic can shatter or chip under sharp impact — a hard knock against a doorframe or dropping onto tile can crack a ceramic case or bezel where steel would dent. For desk-bound daily wear or office environments, this is rarely an issue. For manual-labor or high-impact use, steel or titanium is safer.',
      },
      {
        question: 'Why are ceramic watches more expensive than steel?',
        answer: 'Ceramic blanks are produced by mixing zirconium powder, pressing, and sintering at 1,400°C, then machined with diamond tooling. The process is slower, has higher reject rates, and requires specialized equipment. For a comparable reference, ceramic typically adds $1,000–5,000 to the retail price vs steel.',
      },
      {
        question: 'What is Cerachrom and is it different from other ceramics?',
        answer: 'Cerachrom is Rolex\'s proprietary ceramic used on Submariner, GMT-Master II, and Daytona bezels. The formulation is harder and more uniform than standard zirconia ceramic and allows two-color ceramic (Batman, Pepsi, root beer) by firing two halves and joining them. Functionally, it\'s the current benchmark for ceramic bezel production.',
      },
    ],
  },

  bronze: {
    slug: 'bronze',
    label: 'Bronze Watches',
    title: 'Bronze Watches',
    metaTitle: 'Best Bronze Watches — Patina-Developing Luxury Watches Compared',
    metaDescription: 'Compare luxury bronze watches from Panerai, Tudor, Oris and more. Marine-grade bronze, developing patina, unique aging characteristics.',
    intro: `Bronze watches develop a patina — a brown-green oxidation layer that forms uniquely on every wrist based on sweat, humidity, and wear patterns. No two bronze watches age the same way. The material traces its watchmaking relevance to naval and diving instruments — bronze was the traditional material for ship fittings and diving helmets because it resists saltwater corrosion while slowly developing a protective oxide layer.

The modern category was defined by the Panerai Luminor Submersible 1950 Bronzo PAM 507 in 2011, which established bronze as a luxury material rather than merely a curiosity. The Tudor Black Bay Bronze, Oris Divers Sixty-Five Bronze, and Bell & Ross BR 03-92 Diver Bronze are the most accessible references. High-end bronze watches use aluminum-bronze or CuSn8 marine-grade alloys that patina predictably and can be polished back to near-factory condition if desired.

Bronze watches are not for everyone. The green patina looks striking to some and like tarnish to others. The material is heavier than steel (roughly 10% denser) and softer — it dents rather than scratches. For buyers who want a watch that ages visibly and becomes uniquely theirs, bronze is the only case material that changes daily. For buyers who want a pristine finish indefinitely, steel or ceramic is the better choice.`,
    highlights: [
      'Develops unique patina — every watch ages differently',
      'Marine-grade bronze (aluminum-bronze, CuSn8) resists corrosion',
      'Heavier than steel, softer than titanium',
      'Can be polished back to original finish',
      'Category leaders: Panerai, Tudor, Oris, Bell & Ross',
    ],
    faq: [
      {
        question: 'Is the patina on a bronze watch permanent?',
        answer: 'No — the patina is a thin oxide layer that can be removed with polish (Cape Cod cloth, lemon juice, or professional repolishing). Many owners let it develop for years then reset it. The underlying bronze is unchanged; only the surface oxidation accumulates.',
      },
      {
        question: 'Can bronze watches cause skin reactions?',
        answer: 'Bronze contains copper, which can leave temporary green marks on skin under heavy sweating — this is copper salts forming, not an allergy. Most bronze watches use steel case backs specifically to avoid skin contact with the bronze. For wearers with nickel allergies, bronze is usually better-tolerated than steel.',
      },
      {
        question: 'Which bronze watch has the best-developed patina?',
        answer: 'The Panerai Bronzo PAM 507 and its successors are the reference — aluminum-bronze with proprietary heat treatment produces the deepest, most-desirable patina. The Tudor Black Bay Bronze uses a similar alloy and is widely considered the best-value entry. Avoid "bronze-colored" watches (gold-tinted PVD on steel) — these do not patina.',
      },
    ],
  },

  carbon: {
    slug: 'carbon',
    label: 'Carbon Fiber Watches',
    title: 'Carbon Fiber Watches',
    metaTitle: 'Best Carbon Fiber Watches — Lightweight Tech Watches Compared',
    metaDescription: 'Compare carbon fiber and composite watches from Richard Mille, Audemars Piguet, Panerai and more. NTPT carbon, forged carbon, TPT quartz cases.',
    intro: `Carbon fiber watches are the lightest cases in luxury watchmaking — roughly 60% lighter than titanium and approaching the weight of a plastic watch while maintaining genuine mechanical luxury. The category exists mainly because of Richard Mille, whose NTPT Carbon and Quartz TPT cases set the aesthetic and technical standard, and because high-end motorsport and aerospace manufacturers have driven the composite manufacturing capability.

The material varies significantly. Forged carbon (Audemars Piguet, Panerai Carbotech) uses compressed carbon fiber fragments in a polymer matrix, producing a uniquely random pattern where no two cases look alike. NTPT carbon (Richard Mille) uses thousands of layers of thin carbon sheets at alternating angles, creating a directional striated pattern. Carbon TPT adds silica quartz layers for a marbled appearance. Each approach produces a visibly different surface.

Carbon watches are almost always sport-oriented — chronographs, divers, or skeletonized references where the material's tech aesthetic matches the purpose. Expect to pay 30–100% more than a steel version of the same reference because composite case production is slow and has high reject rates. The weight advantage is dramatic — a full carbon chronograph in the 45mm range can weigh less than a quartz G-Shock.`,
    highlights: [
      '60% lighter than titanium, matching plastic in feel',
      'Unique pattern per case — no two cases identical',
      'Hypoallergenic — no metal content',
      'Highly corrosion and temperature stable',
      'Premium: Richard Mille NTPT, AP Forged Carbon, Panerai Carbotech',
    ],
    faq: [
      {
        question: 'Is a carbon fiber watch durable?',
        answer: 'Yes — composite carbon is stronger than steel by weight and resists most abrasion. It can chip on sharp impact like ceramic but does not dent or deform. Long-term UV exposure can slowly dull the finish on some formulations (polymer-matrix composites); pure NTPT is UV-stable.',
      },
      {
        question: 'Why are carbon watches so expensive?',
        answer: 'Production is slow and reject rates are high. NTPT carbon is laid up sheet-by-sheet, autoclaved, then CNC-machined like metal — a single case takes significantly longer than a forged steel case. Richard Mille\'s Quartz TPT and NTPT carbon cases cost the brand more to produce than equivalent titanium.',
      },
      {
        question: 'How do I tell real carbon from carbon-look PVD?',
        answer: 'Real carbon shows the fiber pattern throughout the case thickness when viewed from any angle — chips or machining marks still reveal the pattern. Carbon-look PVD or printed finishes are flat with no depth. On Audemars Piguet forged carbon, the pattern randomness is obvious and unrepeatable; on fakes, it tends to be uniform.',
      },
    ],
  },

  platinum: {
    slug: 'platinum',
    label: 'Platinum Watches',
    title: 'Platinum Watches',
    metaTitle: 'Best Platinum Watches — Ultra-Luxury Platinum Watches Compared',
    metaDescription: 'Compare platinum luxury watches from Patek Philippe, Rolex, Lange, Vacheron and more. 950 Pt, weight, identification marks, secondary-market performance.',
    intro: `Platinum is the rarest and densest case material in serial-production luxury watchmaking. A platinum case weighs roughly 60% more than gold of the same dimensions and 2.4x more than steel — a platinum Daytona on a leather strap feels unmistakably different from any other watch on your wrist. The metal is 950 Pt (95% platinum, 5% iridium or ruthenium), compared to 18k gold's 75% purity.

Platinum watches are a subtle flex — visually, the metal reads like a warm gray that can be mistaken for white gold or steel from a distance. This is intentional. Patek Philippe marks platinum cases with a small diamond set into the lug between 5 and 6 o'clock. Rolex platinum Day-Dates and Daytonas are distinguishable by their specific ice-blue dials unique to platinum references. Lange's platinum Datograph and 1815 are among the most sought-after dress watches of the modern era.

The downside is cost. Platinum adds $20,000–60,000 to the retail price of a reference over its gold equivalent, and that premium does NOT fully hold on the secondary market — platinum Rolex sports often trade below steel versions despite the higher MSRP. Platinum makes sense for dress watches where you want maximum material prestige and a lifetime piece, less for flipping. The metal is also harder to work than gold, which is why platinum watches tend to come from the handful of makers with platinum finishing expertise.`,
    highlights: [
      '950 Pt purity standard (95% platinum)',
      '2.4x denser than steel, 1.6x denser than gold',
      'Visually reads like warm gray white gold',
      'Patek Philippe marks platinum with a diamond at 6 o\'clock',
      'Rolex platinum Day-Date and Daytona have unique ice-blue dials',
    ],
    faq: [
      {
        question: 'Why are platinum watches heavier than gold watches?',
        answer: 'Platinum is 21.4 g/cm³ vs gold at 19.3 g/cm³ — about 10% denser. Combined with the higher purity (950 vs 750 for 18k gold), a platinum case weighs roughly 60% more than the equivalent-volume 18k gold case. On a bracelet the weight is noticeable; on a leather strap it feels substantial but balanced.',
      },
      {
        question: 'Do platinum watches hold their value?',
        answer: 'Platinum dress watches from Lange, Patek Philippe, and Vacheron hold value well — they are bought as lifetime pieces. Platinum sports watches (Rolex Submariner, Daytona) often trade below steel versions on the secondary market despite higher retail prices, because the material premium is less valued by sport-watch buyers.',
      },
      {
        question: 'How do I identify a platinum watch case?',
        answer: 'Look for "Pt950" or "950" hallmark on the case back. Patek Philippe adds a small diamond between the 5 and 6 o\'clock lugs. The weight is the easiest field check — a platinum case feels unmistakably heavy compared to gold or steel of the same dimensions. Ice-blue dials on certain Rolex references also indicate platinum.',
      },
    ],
  },
}

export const ALL_MATERIALS = Object.keys(MATERIAL_MAP)

/**
 * Maps a normalized material slug to the set of DB `caseMaterial` values
 * that should match it. Returns a Prisma `in` array for use in WHERE clauses.
 */
export function materialDbValues(slug: string): string[] {
  switch (slug) {
    case 'steel':
      return [
        'Stainless steel', 'Steel', 'Oystersteel', 'Lucent Steel', 'Lucent Steel A223',
        'O-MEGASTEEL', 'Submarine steel', 'eSteel',
      ]
    case 'gold':
      return [
        '18k rose gold', '18k white gold', '18k yellow gold', '18k Everose gold', '18k red gold',
        '18k Rose Gold', '18k White Gold', '18k Yellow Gold', '18k Sedna gold', 'Goldtech',
        'White gold', 'Rose gold', 'Yellow gold', 'Red gold', 'Rose Gold',
      ]
    case 'titanium':
      return [
        'Titanium', 'RLX Titanium', 'High-Intensity Titanium', 'Grade 5 Titanium',
        'Grade 2 Titanium', 'Titanium DLC',
      ]
    case 'ceramic':
      return [
        'Ceramic', 'High-tech ceramic', 'Black ceramic',
      ]
    case 'bronze':
      return ['Bronze']
    case 'carbon':
      return [
        'Carbon', 'Carbon NTPT', 'Carbon TPT', 'Carbon TPT and Quartz TPT',
        'Graphene-carbon TPT', 'Carbotech',
      ]
    case 'platinum':
      return ['Platinum', '950 Platinum']
    default:
      return []
  }
}
