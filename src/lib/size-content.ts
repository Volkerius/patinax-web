// Size hub content maps — targets the "<size> watches" keyword cluster
// (e.g., "38mm watches", "42mm watches").

export interface SizeContent {
  slug: string
  label: string
  title: string
  metaTitle: string
  metaDescription: string
  /** Inclusive-lower, exclusive-upper diameter bounds in mm. */
  min: number
  max: number
  intro: string
  highlights: string[]
  faq: { question: string; answer: string }[]
}

export const SIZE_MAP: Record<string, SizeContent> = {
  compact: {
    slug: 'compact',
    label: 'Compact Watches (Under 38mm)',
    title: 'Compact Watches Under 38mm',
    metaTitle: 'Best Compact Watches Under 38mm — Small Case Luxury Watches',
    metaDescription: 'Compare compact luxury watches under 38mm. Dress watches, unisex references, and small-wrist-friendly sport watches from Cartier, Rolex, Patek Philippe and more.',
    min: 0,
    max: 38,
    intro: `Compact watches under 38mm are the historical norm of luxury watchmaking — every dress watch made before 1990 was in this size range, and the trend back toward smaller cases since 2020 has returned the category to cultural relevance. A 36mm or 37mm case sits comfortably under any shirt cuff, wears as gender-neutral, and photographs better than larger watches in close-up editorial work.

The category anchors are the Rolex Datejust 36 and Explorer 36, Cartier Tank and Santos small, Patek Philippe Calatrava 39 (and vintage 35mm), Cartier Panthère, and Omega De Ville Trésor. In sport watches, the Tudor Black Bay 36 and Grand Seiko SBGR series hit 36–37mm without compromising water resistance. The JLC Reverso Classic Monoface and smaller Reverso references are all under 38mm by design.

The argument for compact sizes: modern wrists average 170mm circumference, and anything over 40mm starts to crowd the lug-to-lug on typical proportions. A 36mm dress watch will photograph and wear elegantly on virtually any wrist. The argument against: sport complications (chronographs, GMTs, divers) are visually cramped under 40mm, which is why most modern sports references settled at 40–42mm. For a daily dress watch or unisex piece, under 38mm is the sweet spot.`,
    highlights: [
      'Historical dress-watch standard (pre-1990)',
      'Gender-neutral and unisex friendly',
      'Slides under any shirt cuff easily',
      'Trending up since 2020 in current watch culture',
      'Better proportions on smaller wrists (under 170mm circumference)',
    ],
    faq: [
      {
        question: 'Is 36mm too small for men\'s watches?',
        answer: '36mm is the traditional men\'s dress watch size — the Rolex Explorer was 36mm from 1953 until 2010. Modern taste is shifting back toward this size for both men and women. On wrists under 175mm circumference, a 36mm case looks proportionally correct; on larger wrists it can read small but is never inappropriate.',
      },
      {
        question: 'What is the smallest popular luxury watch size?',
        answer: 'Cartier Tank Louis (22x28mm), Cartier Panthère (22mm), and small Reverso (24x40mm) are the smallest popular references. For round cases, 34mm (Rolex Oyster Perpetual 34, Cartier Santos Medium) is the typical floor for current production. Vintage pieces go as small as 29–32mm.',
      },
      {
        question: 'Will a compact watch look too small on a large wrist?',
        answer: 'On wrists 190mm+ circumference, a 36mm case can read small but is often still flattering on a dress watch where elegance matters more than presence. For sports watches on large wrists, 40mm+ is usually preferred. The Steve McQueen look (38mm Explorer on a large wrist) is an established style.',
      },
    ],
  },

  classic: {
    slug: 'classic',
    label: 'Classic Size Watches (38-40mm)',
    title: 'Classic Size Watches 38-40mm',
    metaTitle: 'Best 38-40mm Watches — Classic Size Luxury Watches Compared',
    metaDescription: 'Compare 38mm and 40mm luxury watches — the classic sweet spot. Rolex, Omega, Tudor, Patek Philippe and more in the universal wrist-friendly size.',
    min: 38,
    max: 40,
    intro: `The 38–40mm range is the universal sweet spot of luxury watchmaking. Large enough to read clearly, small enough to slip under a shirt cuff, proportional on almost every wrist size from 160mm to 200mm circumference. This is where Rolex settled most of its modern references (Submariner at 40mm from 1954 to 2020, Explorer at 36/39mm, Datejust at 36/41mm), where Omega places the Seamaster 300 and Aqua Terra, and where the Tudor Black Bay 58 won over the watch community.

The Rolex Submariner at 40mm is the most-sold luxury watch of all time at this size range. The Tudor Black Bay 58 (39mm), Omega Seamaster 300 (39mm), Grand Seiko SBGA (40mm), and IWC Mark XX (40mm) are the current category's benchmarks. Dress watches like the Patek Calatrava 39, Lange Saxonia 38.5, and JLC Master Control 40 use this range to split the difference between traditional dress size and modern everyday presence.

For a first or only luxury watch, 38–40mm is the safest commitment. You will never find yourself wishing it were different on any wrist size. The category is also where the secondary market is deepest — a 40mm Submariner, 39mm Black Bay, or 40mm Speedmaster will always find a buyer because the size works for nearly everyone.`,
    highlights: [
      'Universal sweet spot — works on 160–200mm wrists',
      'Rolex\'s core size range for sport watches (Submariner 40mm, Explorer 39mm)',
      'Tudor Black Bay 58 (39mm) category leader at entry tier',
      'Splits the difference between dress and sport presence',
      'Deepest secondary-market liquidity',
    ],
    faq: [
      {
        question: 'What is the most popular luxury watch size?',
        answer: '40mm is the single most common modern luxury watch diameter — the historical Rolex Submariner size, and the default for most sport and sport-dress hybrids. 39mm (Omega Seamaster 300, Tudor Black Bay 58) runs a close second. Below 38mm is the dress-watch range; above 42mm becomes a larger-wrist preference.',
      },
      {
        question: 'Should I choose 38mm or 40mm?',
        answer: '38mm wears closer to a dress watch — smaller presence, more versatile under formal attire. 40mm wears as a modern all-rounder — visible but not oversized, equally at home under a suit cuff or with a t-shirt. On wrists under 170mm, 38mm often looks better; on 180mm+ wrists, 40mm is usually preferred.',
      },
      {
        question: 'Are 38-40mm watches unisex?',
        answer: 'Yes — the range is explicitly marketed as unisex by most modern brands. Rolex\'s Oyster Perpetual 36/41, Cartier Santos Medium, Tudor Black Bay 36/41, and Omega Aqua Terra 38 all exist specifically because buyer preferences have moved away from hard-gendered sizing. A 38-40mm watch reads appropriately on any adult wearer.',
      },
    ],
  },

  modern: {
    slug: 'modern',
    label: 'Modern Size Watches (40-42mm)',
    title: 'Modern Size Watches 40-42mm',
    metaTitle: 'Best 40-42mm Watches — Modern Sport Luxury Watches Compared',
    metaDescription: 'Compare 40-42mm luxury sport watches — the modern sport default. Rolex Submariner 41, AP Royal Oak 41, Nautilus 5711, Omega Seamaster 42 and more.',
    min: 40,
    max: 42,
    intro: `40–42mm is the default size for modern sport watches. The Rolex Submariner moved from 40mm to 41mm in 2020. The Royal Oak Jumbo 15202 was 39mm but most current Royal Oaks are 41mm. The Nautilus 5711 is 40mm; the Overseas 4500V is 41mm. This is where the contemporary sport-watch design language — integrated bracelets, visible bezels, legible dials with applied luminous markers — looks most correct.

The category leaders at 40–42mm include the Rolex Submariner 41, GMT-Master II (40mm), Omega Seamaster Diver 300M (42mm), AP Royal Oak 41, Patek Nautilus 5711 (40mm), Vacheron Overseas 41, Tudor Pelagos (42mm), and Panerai Luminor Marina 40/42. For chronographs, the Omega Speedmaster (42mm) and Rolex Daytona (40mm) define the modern size.

The reason for the shift to 40–42mm from the classic 38–40mm: visual balance on modern sport dials with larger lume plots, chronograph subdials, and GMT complications. A cluttered dial reads clearer with a slightly larger case. The tradeoff is cuff clearance — some 42mm watches with thick profiles don't slip under dress shirt cuffs as easily. For a modern daily sport watch, 40–42mm is the current production default.`,
    highlights: [
      'Default modern sport-watch size',
      'Rolex Submariner moved 40mm → 41mm in 2020',
      'Royal Oak 41, Nautilus 40, Overseas 41 — integrated sport standard',
      'Optimal for complications (chronographs, GMTs, divers)',
      'Still fits under most shirt cuffs depending on thickness',
    ],
    faq: [
      {
        question: 'Why did watch sizes move from 40mm to 41mm?',
        answer: 'Rolex specifically moved the Submariner from 40mm to 41mm in 2020 to match modern proportions and distinguish the new reference from vintage examples. The change is subtle on the wrist but noticeable in photos. Most other brands had already moved to 41–42mm for similar references — the 2020 Submariner update brought Rolex in line with category expectations.',
      },
      {
        question: 'Is 42mm too large for a daily watch?',
        answer: '42mm fits most wrists over 170mm circumference without overhang. The real question is case thickness, not diameter — a 42mm × 11mm watch wears smaller than a 40mm × 14mm dive watch. Lug-to-lug distance and lug design matter as much as diameter. For wrists under 170mm, stay at 40mm or below.',
      },
      {
        question: 'What\'s the difference between a 40mm chronograph and a 42mm chronograph?',
        answer: '40mm (Rolex Daytona, Zenith El Primero) wears as a sport watch with dress presence — subdials are readable but compact. 42mm (Omega Speedmaster, Breitling Navitimer) gives more dial room for legibility and makes the chronograph function more obvious at a glance. For a chronograph as a daily wearer, 40mm is often the more versatile choice.',
      },
    ],
  },

  oversized: {
    slug: 'oversized',
    label: 'Oversized Watches (42mm+)',
    title: 'Oversized Watches 42mm and Up',
    metaTitle: 'Best Oversized Watches 42mm+ — Large Case Luxury Watches Compared',
    metaDescription: 'Compare oversized luxury watches 42mm and larger. Panerai, Hublot Big Bang, Rolex Deepsea, IWC Big Pilot, and heavy-wrist-preferred sport watches.',
    min: 42,
    max: 999,
    intro: `Oversized watches (42mm and up) are a category defined more by presence than utility. Technical purpose drives the larger end (professional dive watches need larger crystals and cases for saturation depth, pilot's watches need legibility at glance), but most 44–47mm watches are chosen for visual impact rather than function. The category was largely created by Panerai in the late 1990s and expanded by Hublot, Audemars Piguet Offshore, IWC Big Pilot, and Richard Mille through the 2000s.

The defining references: Panerai Luminor 44mm (the original large watch), IWC Big Pilot 46mm, Hublot Big Bang 44/45mm, AP Royal Oak Offshore 42/44mm, Rolex Sea-Dweller 43mm and Deepsea 44mm, Breitling Navitimer 46mm. For a specific functional reason, these sizes exist; for style reasons, they persist. The category peaked around 2015 and has slightly retreated as smaller sizes regained cultural dominance, but it remains the reference for any wearer who wants the watch to be the dominant element on the wrist.

Wearability at 42mm+ depends heavily on lug-to-lug measurement. A 42mm Panerai Luminor has a short lug-to-lug (47mm) and wears manageably; a 44mm IWC Big Pilot has 57mm lug-to-lug and requires a wrist over 180mm to avoid overhang. Before committing to an oversized piece, measure both wrist circumference and wrist width — a wide flat wrist handles 44mm comfortably; a narrow wrist of the same circumference can find the same watch awkward.`,
    highlights: [
      'Maximum wrist presence — watch as primary accessory',
      'Required for saturation diving (Rolex Sea-Dweller/Deepsea)',
      'Category anchors: Panerai, IWC Big Pilot, Hublot Big Bang',
      'Peaked around 2015, slightly receding since',
      'Wearability depends on lug-to-lug more than diameter',
    ],
    faq: [
      {
        question: 'What wrist size is needed for a 44mm watch?',
        answer: 'Generally 180mm+ wrist circumference to avoid lug overhang, though flat wrists handle large cases better than round ones. Measure lug-to-lug distance — it should be at most your wrist width. A 44mm watch with 50mm lug-to-lug works on a 180mm wrist; a 44mm Big Pilot with 57mm lug-to-lug needs 190mm+.',
      },
      {
        question: 'Why are dive watches so large?',
        answer: 'Deep-rated dive watches (600m+) need thicker crystals, larger helium escape valves, and more internal volume for gaskets and screw-down crown assemblies. The Rolex Deepsea at 44×17.7mm is a functional response to 3,900m depth rating. For recreational diving under 300m, 40–42mm is entirely adequate; 44mm+ is mostly for extreme depth certifications or style.',
      },
      {
        question: 'Are oversized watches out of fashion now?',
        answer: 'The peak-oversized era (2008–2015) is clearly past, but 42–44mm remains the default sport watch size. True 46–48mm watches are now a niche preference — Panerai, IWC Big Pilot, and Hublot still serve this market. Under 36mm and over 44mm both trend up slightly while the 40–42mm middle consolidates.',
      },
    ],
  },
}

export const ALL_SIZES = Object.keys(SIZE_MAP)
