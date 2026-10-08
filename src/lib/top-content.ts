export interface TopFaq {
  question: string
  answer: string
}

export interface TopCategory {
  slug: string
  label: string
  metaTitle: string
  metaDescription: string
  intro: string
  prismaWhere: Record<string, unknown>
  orderBy: Record<string, string>
  faq: TopFaq[]
}

export const TOP_CATEGORIES: TopCategory[] = [
  {
    slug: 'best-diving-watches',
    label: 'Best Diving Watches',
    metaTitle: 'Best Diving Watches 2026 — Top 15 Dive Watches Ranked',
    metaDescription:
      'The 15 best diving watches of 2026 ranked by water resistance, build quality, and value. From the Rolex Submariner to the Omega Seamaster, find your ideal dive companion.',
    intro:
      'A great dive watch combines extreme water resistance with legibility, durability, and a unidirectional rotating bezel you can trust at depth. We ranked these 15 diver-style timepieces by water resistance rating, then factored in brand heritage, movement quality, and overall build to create a definitive list for 2026.',
    prismaWhere: { style: 'diver' },
    orderBy: { waterResistance: 'desc' },
    faq: [
      {
        question: 'What water resistance do I need for actual diving?',
        answer:
          'ISO 6425 requires at least 100 meters of water resistance for a watch to be classified as a dive watch. For recreational scuba diving, 200 meters is the practical standard. Professional saturation divers typically use watches rated to 300 meters or more.',
      },
      {
        question: 'Are luxury dive watches actually used for diving?',
        answer:
          'While dive computers have largely replaced watches as primary dive instruments, many divers still wear a mechanical dive watch as a reliable backup. The unidirectional bezel allows tracking elapsed bottom time independently of electronics.',
      },
      {
        question: 'What makes a good dive watch bezel?',
        answer:
          'A quality dive bezel must rotate only counter-clockwise (unidirectional) so accidental movement only shortens your perceived dive time, never extends it. Ceramic bezels are the current standard for scratch resistance and color longevity.',
      },
    ],
  },
  {
    slug: 'best-dress-watches',
    label: 'Best Dress Watches',
    metaTitle: 'Best Dress Watches 2026 — Top 15 Elegant Timepieces',
    metaDescription:
      'The 15 finest dress watches of 2026 ranked by prestige, craftsmanship, and design. Ultra-thin profiles, precious metals, and refined dials for formal occasions.',
    intro:
      'A dress watch is the ultimate expression of restrained elegance: thin enough to slip under a French cuff, refined enough to complement a bespoke suit, and prestigious enough to signal connoisseurship. We ranked these timepieces by brand tier and finishing quality to present the 15 best dress watches available in 2026.',
    prismaWhere: { style: 'dress' },
    orderBy: { brandTier: 'desc' },
    faq: [
      {
        question: 'How thin should a dress watch be?',
        answer:
          'Classic dress watch etiquette suggests a case thickness under 10 mm so the watch fits comfortably beneath a shirt cuff. Ultra-thin models from brands like Piaget and Jaeger-LeCoultre can be as slim as 6-8 mm.',
      },
      {
        question: 'Should a dress watch have complications?',
        answer:
          'Traditionalists prefer time-only or time-and-date dress watches for maximum elegance. However, subtle complications like a moon phase or a small seconds subdial are widely accepted and can add visual interest without compromising formality.',
      },
      {
        question: 'What case material is best for a dress watch?',
        answer:
          'Precious metals like gold (yellow, white, or rose) and platinum are traditional choices for dress watches. Stainless steel dress watches from top-tier brands offer a more understated and versatile alternative that pairs well with both formal and smart-casual attire.',
      },
    ],
  },
  {
    slug: 'best-chronograph-watches',
    label: 'Best Chronograph Watches',
    metaTitle: 'Best Chronograph Watches 2026 — Top 15 Chrono Watches Ranked',
    metaDescription:
      'The 15 best chronograph watches of 2026 ranked by prestige, movement quality, and design. Iconic stopwatch complications from Rolex Daytona to Omega Speedmaster.',
    intro:
      'The chronograph complication transforms a wristwatch into a precision timing instrument. From the Daytona circuit to the surface of the Moon, chronographs have earned their place in horological history. We ranked these 15 chronographs by brand prestige and movement sophistication to help you choose the best stopwatch on your wrist.',
    prismaWhere: { style: 'chrono' },
    orderBy: { brandTier: 'desc' },
    faq: [
      {
        question: 'What is the difference between a chronograph and a chronometer?',
        answer:
          'A chronograph is a watch with a built-in stopwatch function, operated by pushers on the side of the case. A chronometer is any watch that has passed COSC accuracy testing. A watch can be both a chronograph and a chronometer.',
      },
      {
        question: 'Do chronograph movements last as long as simpler movements?',
        answer:
          'Modern chronograph movements are engineered for longevity, but the additional complication means more parts that can wear over time. Regular servicing every 5-7 years keeps chronograph movements running reliably for decades.',
      },
      {
        question: 'What are the subdials on a chronograph for?',
        answer:
          'Most chronographs have two or three subdials: a running seconds indicator, a 30-minute counter for the stopwatch function, and sometimes a 12-hour counter. The central seconds hand is typically the chronograph (stopwatch) hand.',
      },
    ],
  },
  {
    slug: 'best-pilot-watches',
    label: 'Best Pilot Watches',
    metaTitle: 'Best Pilot Watches 2026 — Top 15 Aviation Timepieces',
    metaDescription:
      'The 15 best pilot watches of 2026 ranked by heritage, legibility, and brand prestige. From IWC Big Pilot to Breitling Navitimer, find the ultimate aviation timepiece.',
    intro:
      'Pilot watches were born from necessity: early aviators needed large, legible dials they could read at a glance in an open cockpit. Today, the best pilot watches honor that heritage with oversized crowns, anti-magnetic movements, and instrument-grade legibility. Here are the 15 finest aviation timepieces of 2026, ranked by brand prestige.',
    prismaWhere: { style: 'pilot' },
    orderBy: { brandTier: 'desc' },
    faq: [
      {
        question: 'What features define a pilot watch?',
        answer:
          'Key pilot watch features include high-contrast dials for instant legibility, oversized crowns operable with gloves, anti-magnetic protection, and often a triangle marker at 12 o\'clock for quick orientation. Many also include slide rule bezels or GMT complications.',
      },
      {
        question: 'Do pilots actually wear pilot watches?',
        answer:
          'Many professional and recreational pilots do wear purpose-built pilot watches as backup instruments. While modern avionics have reduced reliance on wrist-worn timekeeping, a quality pilot watch provides an independent time reference that requires no battery or connection.',
      },
      {
        question: 'What size is typical for a pilot watch?',
        answer:
          'Traditional pilot watches tend to run larger than average, typically between 40 mm and 46 mm in diameter. The oversized format traces back to cockpit-mounted clocks and the need for readability at arm\'s length. Modern versions often offer more wearable sizes around 40-43 mm.',
      },
    ],
  },
  {
    slug: 'best-affordable-luxury',
    label: 'Best Affordable Luxury Watches',
    metaTitle: 'Best Affordable Luxury Watches 2026 — Top 15 Under $5,000',
    metaDescription:
      'The 15 best affordable luxury watches of 2026. Premium craftsmanship and prestigious brands without the five-figure price tag. Entry-level luxury ranked by brand prestige.',
    intro:
      'Luxury watchmaking does not require a six-figure budget. These 15 timepieces deliver genuine Swiss craftsmanship, respected brand heritage, and movements you can be proud of, all within the most accessible price tiers. Ranked by brand prestige, this list proves that entry-level luxury can still be extraordinary.',
    prismaWhere: { priceRange: { in: [1, 2] } },
    orderBy: { brandTier: 'desc' },
    faq: [
      {
        question: 'Can you get a quality luxury watch under $5,000?',
        answer:
          'Absolutely. Brands like Longines, Tissot PRX, TAG Heuer, and Oris produce exceptional mechanical watches with in-house or top-grade movements well under the $5,000 mark. These watches offer genuine Swiss craftsmanship and horological credibility.',
      },
      {
        question: 'Are affordable luxury watches good investments?',
        answer:
          'While most watches in this price range will depreciate from retail, certain models from brands like Tudor and Longines have shown strong value retention. The real value lies in the ownership experience: wearing a well-crafted mechanical watch daily.',
      },
      {
        question: 'What should I look for in an entry-level luxury watch?',
        answer:
          'Prioritize movement quality (automatic with at least 38 hours of power reserve), sapphire crystal, solid bracelet or strap construction, and a brand with genuine horological heritage. Avoid fashion brands that use basic quartz movements at luxury price points.',
      },
    ],
  },
  {
    slug: 'best-automatic-watches',
    label: 'Best Automatic Watches',
    metaTitle: 'Best Automatic Watches 2026 — Top 15 Self-Winding Timepieces',
    metaDescription:
      'The 15 best automatic watches of 2026 ranked by power reserve. Self-winding mechanical excellence from the world\'s finest watchmakers, tested and compared.',
    intro:
      'Automatic (self-winding) watches harness the kinetic energy of your wrist movement to power the mainspring, eliminating the need for daily hand-winding. We ranked these 15 automatic timepieces by power reserve duration, because a longer reserve means greater convenience when the watch is off your wrist.',
    prismaWhere: { movement: { contains: 'Automatic' } },
    orderBy: { powerReserve: 'desc' },
    faq: [
      {
        question: 'How long does an automatic watch run without wearing it?',
        answer:
          'Most modern automatics offer 38-80 hours of power reserve. This means the watch will continue running for approximately two to three days after you take it off. Some models with extended reserves can run up to 5 days or more.',
      },
      {
        question: 'Do automatic watches need servicing?',
        answer:
          'Yes. Automatic watches should be serviced every 5-10 years depending on the manufacturer. Servicing involves disassembling the movement, cleaning all components, replacing worn parts, re-lubricating, and regulating for accuracy.',
      },
      {
        question: 'Are automatic watches more accurate than quartz?',
        answer:
          'No. Quartz watches are significantly more accurate (within seconds per month versus seconds per day). The appeal of automatic watches lies in mechanical craftsmanship, tradition, and the fact that they never need a battery replacement.',
      },
    ],
  },
  {
    slug: 'best-cosc-certified',
    label: 'Best COSC-Certified Watches',
    metaTitle: 'Best COSC-Certified Watches 2026 — Top 15 Chronometers',
    metaDescription:
      'The 15 best COSC-certified chronometer watches of 2026. Officially tested for precision, these timepieces represent the pinnacle of mechanical accuracy.',
    intro:
      'COSC (Controle Officiel Suisse des Chronometres) certification is the gold standard for mechanical watch accuracy. Each certified movement undergoes 15 days of testing across five positions and three temperatures, and must keep time within -4/+6 seconds per day. Here are the 15 finest COSC-certified watches of 2026, ranked by brand prestige.',
    prismaWhere: { cosc: true },
    orderBy: { brandTier: 'desc' },
    faq: [
      {
        question: 'What does COSC certification mean?',
        answer:
          'COSC certification means the movement has passed 15 days of precision testing by the official Swiss chronometer testing institute. The movement must maintain accuracy within -4 to +6 seconds per day across multiple positions and temperatures to earn the designation.',
      },
      {
        question: 'Is COSC certification worth the premium?',
        answer:
          'COSC certification provides an independent, objective guarantee of precision. For buyers who value accuracy, the certification offers peace of mind. However, many non-COSC watches also achieve excellent accuracy; the certification is about verified consistency.',
      },
      {
        question: 'Which brands have the most COSC-certified watches?',
        answer:
          'Rolex is by far the largest submitter to COSC, certifying virtually every movement it produces. Omega, Breitling, and Tudor also certify significant portions of their production. Some independent brands certify select high-end references.',
      },
    ],
  },
  {
    slug: 'best-investment-watches',
    label: 'Best Investment Watches',
    metaTitle: 'Best Investment Watches 2026 — Top 15 Watches That Hold Value',
    metaDescription:
      'The 15 best investment-grade watches of 2026. High-end timepieces from Rolex, Patek Philippe, and Audemars Piguet with the strongest value retention and appreciation potential.',
    intro:
      'While buying a watch solely as an investment is never guaranteed, certain timepieces from elite brands have demonstrated remarkable value retention and even appreciation over time. We selected watches in the highest price tiers and ranked them by brand prestige, focusing on the models most likely to hold or increase in value over the coming years.',
    prismaWhere: { priceRange: { gte: 4 } },
    orderBy: { brandTier: 'desc' },
    faq: [
      {
        question: 'Which watch brands hold their value best?',
        answer:
          'Rolex, Patek Philippe, and Audemars Piguet consistently lead in value retention. Specific models like the Rolex Submariner, Patek Philippe Nautilus, and AP Royal Oak have historically appreciated above retail price on the secondary market.',
      },
      {
        question: 'Should I buy a watch as an investment?',
        answer:
          'Watches should primarily be purchased for enjoyment. While certain models appreciate, the market is unpredictable and illiquid compared to traditional investments. If a watch happens to hold value, consider it a bonus rather than the primary motivation for purchase.',
      },
      {
        question: 'Does the box and papers matter for resale value?',
        answer:
          'Yes, significantly. A complete set with original box, papers, warranty card, and purchase receipt can add 10-20% to resale value. Always keep all original documentation and packaging in good condition.',
      },
    ],
  },
]

export function getCategoryBySlug(slug: string): TopCategory | undefined {
  return TOP_CATEGORIES.find((c) => c.slug === slug)
}
