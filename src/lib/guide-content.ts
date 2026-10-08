// Long-form buying guides — the editorial layer that targets "best X" and
// "buyer's guide" queries. Each guide interleaves prose sections with live
// watch cards pulled from the DB by slug (missing slugs drop silently).

export interface GuideSection {
  heading: string
  /** Paragraphs separated by blank lines. */
  body: string
  /** Watch slugs to render as cards after this section's prose. */
  watchSlugs?: string[]
}

export interface GuideContent {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  updated: string
  intro: string
  sections: GuideSection[]
  faq: { question: string; answer: string }[]
  related: string[]
}

export const GUIDE_MAP: Record<string, GuideContent> = {
  'best-dive-watches-under-5000': {
    slug: 'best-dive-watches-under-5000',
    title: 'Best Dive Watches Under $5,000',
    metaTitle: 'Best Dive Watches Under $5,000 (2026) — Tested Picks Compared',
    metaDescription: 'The best dive watches under $5,000 in 2026: Tudor Black Bay 58, Pelagos 39, Longines Legend Diver, Doxa Sub 300, Sinn U1 and more — specs compared side by side.',
    updated: '2026-07-01',
    intro: `Under $5,000 is where the dive watch category is won and lost. Above this line you are paying for brand prestige; below it you are usually giving up movement quality or finishing. In between sits the densest concentration of genuinely excellent watches in the entire market — in-house chronometer movements, 200-500m ratings, ceramic and titanium, and designs with real heritage behind them.

This guide covers the references we would actually recommend after comparing their specs side by side on Patinax: case dimensions, movements, power reserves, and water resistance, weighted for daily wearability rather than spec-sheet bragging rights.`,
    sections: [
      {
        heading: 'The default answer: Tudor Black Bay 58',
        body: `If someone asks for one dive watch under $5,000 with no further context, the answer is the Black Bay 58. The 39mm case wears correctly on almost every wrist, the in-house MT5402 carries COSC certification and a 70-hour reserve, and the gilt-accented dial gives it more warmth than anything else in the segment. Resale is the strongest in its class, which effectively lowers the real cost of ownership.

Its stablemate, the titanium Pelagos 39, trades vintage charm for tool-watch function — ceramic bezel, full titanium construction, and a lighter wrist presence. Between the two Tudors you cover both halves of the dive-watch personality spectrum.`,
        watchSlugs: ['tudor-black-bay-58-79030n', 'tudor-pelagos-39-25407n'],
      },
      {
        heading: 'Heritage divers: Longines and Doxa',
        body: `The Longines Legend Diver reissues a 1960 Super Compressor with an internal rotating bezel operated by a second crown — a mechanism almost nobody else builds anymore. With the silicon-hairspring L888 and 300m rating, it is arguably the most faithful heritage diver in production.

The Doxa Sub 300 comes from the other side of dive history: Jacques Cousteau's team wore the 1967 original, and the modern reissue keeps the cushion case and the searchlight-orange Professional dial. Nothing else on this list is as instantly recognizable underwater or across a room.`,
        watchSlugs: ['longines-legend-diver-l3-774-4-50-9', 'doxa-sub-300-821-10-351-10'],
      },
      {
        heading: 'The overbuilt German option: Sinn U1',
        body: `The Sinn U1 is made from the same submarine steel German shipyards use, Tegimented for scratch resistance, and rated to 1,000m — quadruple most recreational needs. It is the least romantic watch here and the most engineered; buyers who think in terms of specification per dollar tend to end their search at Sinn.`,
        watchSlugs: ['sinn-u1-1010-020'],
      },
      {
        heading: 'Under $1,500: the value tier',
        body: `Three watches dominate the conversation below $1,500. The Christopher Ward C60 Trident Pro 600 delivers a 600m rating, ceramic bezel, and chronometer-grade Sellita for close to $1,000. The Tissot Seastar 1000 Powermatic 80 adds an 80-hour reserve and ISO-grade build under $1,000. And the Seiko Turtle SRP777 remains the most-loved cushion-case diver in the hobby — the reference that converts more people to mechanical watches than any marketing campaign ever has.

If the budget is genuinely tight, the Orient Kamasu embarrasses watches at twice its price: sapphire crystal, in-house movement with hacking and hand-winding, and a real 200m rating for under $300.`,
        watchSlugs: ['christopher-ward-c60-trident-pro-600-c60-43ada1-s0ha0-k', 'tissot-seastar-1000-powermatic-80-t120-407-11-041-00', 'seiko-prospex-turtle-srp777', 'orient-kamasu-ra-aa0002l19b'],
      },
    ],
    faq: [
      { question: 'What is the best dive watch under $5,000 overall?', answer: 'The Tudor Black Bay 58 is the consensus pick: 39mm proportions that fit most wrists, an in-house COSC-certified movement with 70-hour power reserve, 200m water resistance, and the strongest resale value in the segment. The titanium Tudor Pelagos 39 is the pick if you prefer a modern tool aesthetic over vintage warmth.' },
      { question: 'Do I really need 300m of water resistance?', answer: 'No. Recreational scuba rarely exceeds 40m; 200m (ISO 6425 certified) covers every realistic scenario including diving. Ratings beyond 300m — like the Sinn U1\'s 1,000m — are engineering statements rather than practical requirements, though the overbuilding usually brings real durability benefits.' },
      { question: 'Is an in-house movement worth paying for in a dive watch?', answer: 'Under $5,000, Tudor is the main brand offering true in-house chronometer movements (MT54xx series) — a genuine advantage in power reserve and warranty confidence. But well-regulated Sellita and ETA movements in watches from Christopher Ward, Longines, and Sinn are proven, cheap to service, and give up little in daily accuracy.' },
    ],
    related: ['best-first-luxury-watch', 'rolex-submariner-buyers-guide', 'best-gmt-watches'],
  },

  'best-first-luxury-watch': {
    slug: 'best-first-luxury-watch',
    title: 'The Best First Luxury Watch: A Buyer\'s Guide',
    metaTitle: 'Best First Luxury Watch (2026) — Where to Start, What to Buy',
    metaDescription: 'Buying your first luxury watch? This guide compares the best entry points from $400 to $4,000 — Tissot PRX, Hamilton Khaki, Tudor Black Bay 58, Cartier Tank and more.',
    updated: '2026-07-01',
    intro: `The first luxury watch is the hardest one to buy — not because the options are bad, but because the market spans two orders of magnitude in price and every forum gives contradictory advice. This guide takes a position: your first serious watch should be one you can wear daily without anxiety, from a brand whose name you won't have to explain, at a price that leaves room to discover what you actually like.

That framing eliminates fragile dress pieces, obscure microbrands (excellent, but for later), and stretch purchases that turn a hobby into a liability. What remains sorts cleanly into three budget bands.`,
    sections: [
      {
        heading: '$400–$1,000: real watchmaking, no compromises that matter',
        body: `The Tissot PRX Powermatic 80 is the phenomenon of this bracket — a 1978-derived integrated-bracelet design with an 80-hour automatic movement for under $700. It looks and wears like watches costing five times more, which is exactly what a first watch should do.

The Hamilton Khaki Field Mechanical takes the opposite route: a hand-wound 38mm field watch descended from actual military issue, with an 80-hour reserve and a winding ritual that teaches you what mechanical watches are about. Between these two you learn whether you are a bracelet person or a strap person — worth knowing before spending more.`,
        watchSlugs: ['tissot-prx-powermatic-80-t137-407-11-041-00', 'hamilton-khaki-field-mechanical-h69439931', 'orient-bambino-version-2-fac00009n0'],
      },
      {
        heading: '$1,000–$2,500: the German and Japanese alternatives',
        body: `Nomos Glashütte owns this bracket for design-minded buyers. The Club Campus is the entry point — a hand-wound in-house caliber, Bauhaus dial, and 100m water resistance in a 36mm case that works on any wrist. Nobody else offers an in-house movement with this level of finishing under $2,000.

From Japan, the Seiko King Seiko SPB283 revives a heritage line with Zaratsu-polished cases that catch light like watches costing far more. And the Cartier Tank Must deserves mention even in quartz form: no first watch carries more design history per dollar.`,
        watchSlugs: ['nomos-club-campus-703', 'seiko-king-seiko-ksk-spb283', 'cartier-tank-must-wsta0041'],
      },
      {
        heading: '$2,500–$4,500: buy once, cry once',
        body: `If the budget reaches this band, the argument for waiting ends. The Tudor Black Bay 58 is the most complete first luxury watch money can buy — in-house chronometer movement, 200m rating, proportions that fit everyone, and a resale market so strong that ownership is nearly free if you ever change your mind.

The Longines Spirit Zulu Time adds a true in-house GMT complication with ceramic bezel for under $3,500 — the cheapest serious travel watch from a major Swiss house. And the Omega Aqua Terra, slightly above this band on a bracelet, is the reference "one watch collection": Master Chronometer certification, 150m rating, and equally at home with a suit or swim shorts.`,
        watchSlugs: ['tudor-black-bay-58-79030n', 'longines-spirit-zulu-time-l3-812-4-53-6', 'omega-seamaster-aqua-terra-150m'],
      },
    ],
    faq: [
      { question: 'How much should I spend on my first luxury watch?', answer: 'Spend what you can lose interest in without regret. The practical sweet spots are ~$700 (Tissot PRX, Hamilton Khaki), ~$1,800 (Nomos Club Campus, King Seiko), and ~$4,000 (Tudor Black Bay 58). Buying at one of these plateaus gets maximum watch per dollar; the spaces between mostly buy marketing.' },
      { question: 'Should my first watch be automatic or quartz?', answer: 'Mechanical (automatic or hand-wound) — the ritual and engineering are most of what makes the hobby rewarding. The exception is the Cartier Tank Must: its design significance outweighs the quartz movement, and it remains the best-dressed first watch available.' },
      { question: 'Is buying pre-owned a good idea for a first luxury watch?', answer: 'Yes, with discipline: buy from dealers with return policies rather than private sellers, and stick to high-volume references (Black Bay, Speedmaster, Aqua Terra) where pricing is transparent and fakes are well-documented. Pre-owned typically saves 20-30% on the entry tier.' },
    ],
    related: ['best-dive-watches-under-5000', 'best-dress-watches-under-10000', 'integrated-bracelet-sport-watches-guide'],
  },

  'rolex-submariner-buyers-guide': {
    slug: 'rolex-submariner-buyers-guide',
    title: 'Rolex Submariner Buyer\'s Guide: Every Reference Explained',
    metaTitle: 'Rolex Submariner Buyer\'s Guide (2026) — References, Prices, Which to Buy',
    metaDescription: 'Complete Rolex Submariner buying guide: vintage 5513 and 1680, neo-vintage 14060 and 16610, modern 116610LN and 126610. Which Submariner reference to buy and why.',
    updated: '2026-07-01',
    intro: `The Submariner is the most consequential dive watch ever made and the most liquid asset in watches — but "buy a Submariner" spans seventy years of references at wildly different prices, risks, and ownership experiences. This guide maps the eras so you can decide which Submariner is actually yours.

The shorthand: vintage (pre-1980) is collecting, neo-vintage (1980s-2000s) is the value play, and modern (2010+) is buying a finished product. Each era rewards a different kind of buyer.`,
    sections: [
      {
        heading: 'Vintage: 5513 and the Red Sub 1680',
        body: `The 5513 (1962-1989) is where vintage Submariner collecting starts — the longest production run, the widest dial variety (gilt, matte, maxi), and the most forgiving prices of the true vintage refs. Condition and originality determine everything: an honest matte-dial example is a lifetime watch, while polished cases and service dials trade at heavy discounts for good reason.

The 1680 introduced the date in 1969, and early examples with the red "Submariner" dial line — the "Red Sub" — are the affordable icon of vintage Rolex collecting. Buy the seller as much as the watch at this level: paperwork, provenance, and specialist authentication are not optional.`,
        watchSlugs: ['rolex-submariner-5513', 'rolex-submariner-1680'],
      },
      {
        heading: 'Neo-vintage: the 14060 sweet spot',
        body: `The 16800 (1979) brought sapphire and 300m; the 14060 and 14060M (1989-2012) perfected the no-date formula with the last aluminum bezels and drilled-lug cases. These are the value Submariners: full modern usability, genuine vintage character on the wrist, and prices well under current retail.

Collectors increasingly treat the 14060 as the last "honest" Submariner — pre-ceramic, pre-maxi-case, no Cyclops. If that sentence resonates, this is your reference.`,
        watchSlugs: ['rolex-submariner-16800', 'rolex-submariner-14060'],
      },
      {
        heading: 'Modern: 116610 vs the current 41mm generation',
        body: `The 116610LN (2010-2020) introduced the ceramic Cerachrom bezel and maxi case — the Submariner as most people picture it today. The current 126610LN and no-date 124060 refined the case back toward slimmer lugs and added the 70-hour Caliber 32xx movements.

Choosing between them: the 124060 no-date is the purist's modern Sub; the 126610LV "Starbucks" adds the green bezel with black dial; and the discontinued 116610LV "Hulk" has already crossed into collectible territory. All modern Submariners share the same practical reality — waitlists at retail and premiums on the secondary market — so the real decision is usually between a neo-vintage at a discount or a modern at a premium.`,
        watchSlugs: ['rolex-submariner-116610ln', 'rolex-submariner-no-date-124060', 'rolex-submariner-date-41-126610lv'],
      },
    ],
    faq: [
      { question: 'Which Rolex Submariner is the best value?', answer: 'The 14060/14060M no-date (1989-2012) delivers the strongest value: sapphire crystal, 300m rating, and modern reliability at prices meaningfully below current retail — with the last of the aluminum bezels and classic case proportions that collectors increasingly prize.' },
      { question: 'Should I buy a Submariner Date or No-Date?', answer: 'The no-date has the symmetric dial purists prefer and historically the lower entry price; the Date adds the Cyclops magnifier, the most recognizable single detail in watches. Function is identical otherwise. Vintage collectors skew no-date; first-Rolex buyers skew Date.' },
      { question: 'How do I avoid a fake or Frankenwatch Submariner?', answer: 'Buy vintage only from specialist dealers with authentication and return rights; verify serial/reference engravings, movement numbers, and dial-era consistency. For modern refs, buy with full card and set, and have any private-sale watch verified by an independent watchmaker before funds clear. If a price is 20% below market, that is the warning.' },
    ],
    related: ['best-dive-watches-under-5000', 'vintage-watch-collecting-guide', 'best-gmt-watches'],
  },

  'best-dress-watches-under-10000': {
    slug: 'best-dress-watches-under-10000',
    title: 'Best Dress Watches Under $10,000',
    metaTitle: 'Best Dress Watches Under $10,000 (2026) — From Nomos to JLC',
    metaDescription: 'The best dress watches under $10,000: JLC Reverso, Grand Seiko Snowflake, Nomos Tangente, Cartier Tank, Omega Trésor and more, compared on finishing, thinness and value.',
    updated: '2026-07-01',
    intro: `A dress watch has one job: disappear under a cuff and reward a close look. That means thin cases, restrained dials, and finishing you can actually see — the qualities that separate watchmaking from watch marketing. Under $10,000, five houses do this at a level that once required twice the budget.

We weight this list toward hand-finishing, case thinness, and design permanence — the things that still matter in ten years — rather than complications for their own sake.`,
    sections: [
      {
        heading: 'The icons: Reverso and Tank',
        body: `The Jaeger-LeCoultre Reverso Tribute Small Seconds is the strongest pure-dress purchase under $10,000 — an Art Deco case that flips to a personalizable steel back, a hand-wound manufacture caliber, and proportions unchanged since 1931 because they were right the first time.

The Cartier Tank Louis is the other permanent answer. Rose gold, hand-wound, rail-track dial: it has outlasted every trend since 1922 and will outlast the next century's too. If gold stretches the budget, the Tank Must delivers the same design language in steel.`,
        watchSlugs: ['jaeger-lecoultre-reverso-tribute-q397848j', 'cartier-tank-louis-cartier-wgta0011', 'cartier-tank-must-wsta0041'],
      },
      {
        heading: 'Japan\'s counterargument: Grand Seiko',
        body: `The Grand Seiko Snowflake SBGA211 is the watch that converts skeptics — a textured dial modeled on Shinshu snowfields, a titanium case with mirror Zaratsu polishing, and the Spring Drive glide of a seconds hand that moves without ticking. At roughly $6,000 it competes with Swiss watches at twice the price on finishing alone.

For the mechanical purist, the hand-wound SBGW231 distills Grand Seiko to a 37mm case and a cream dial executed to standards Switzerland reserves for five figures.`,
        watchSlugs: ['grand-seiko-snowflake-sbga211', 'grand-seiko-heritage-sbgw231'],
      },
      {
        heading: 'The Bauhaus tier: Nomos and Junghans',
        body: `The Nomos Tangente is modern Germany's design classic — an in-house hand-wound caliber under a dial the Bauhaus would have approved of, from under $2,500. The Metro and Orion variations tune the same language toward playful or romantic without losing discipline.

The Junghans Max Bill Automatic offers the genuine article — a dial geometry drawn by the Bauhaus master himself in 1961 — for around $1,000. Between Nomos and Junghans, German minimalism is the strongest value corridor in dress watches.`,
        watchSlugs: ['nomos-tangente-139', 'nomos-orion-301', 'junghans-max-bill-automatic-027-3500-04'],
      },
      {
        heading: 'The complication picks',
        body: `If the dress watch needs to do more than tell time: the Omega De Ville Trésor pairs a Master Chronometer hand-wound caliber with a 40mm case under 10mm thick, and the Longines Master Collection Moonphase delivers a full triple calendar with moonphase for under $4,000 — complication density nothing else on this list approaches.`,
        watchSlugs: ['omega-de-ville-tresor-435-13-40-21-02-001', 'longines-master-collection-moonphase-l2-909-4-78-3', 'seiko-presage-sharp-edge-spb167'],
      },
    ],
    faq: [
      { question: 'What is the best dress watch under $10,000?', answer: 'The Jaeger-LeCoultre Reverso Tribute Small Seconds — a manufacture hand-wound movement, an unchanged 1931 Art Deco design, and haute-horlogerie credibility at roughly $9,000. The Grand Seiko Snowflake is the pick under $6,500, and the Nomos Tangente under $2,500.' },
      { question: 'How thin should a dress watch be?', answer: 'Under 10mm slips beneath any shirt cuff; under 8mm reads as genuinely elegant. Hand-wound movements make thinness easier — one reason classic dress watches skew manual. Anything over 12mm starts fighting the cuff and the category.' },
      { question: 'Can a dress watch be worn daily?', answer: 'Modern examples with 50m+ water resistance and sapphire crystals (Grand Seiko, Nomos, Omega Trésor) handle daily wear easily. Traditional 30m pieces on leather want more care — rain and hand-washing are fine, swimming is not.' },
    ],
    related: ['best-first-luxury-watch', 'integrated-bracelet-sport-watches-guide', 'vintage-watch-collecting-guide'],
  },

  'best-gmt-watches': {
    slug: 'best-gmt-watches',
    title: 'Best GMT Watches at Every Price',
    metaTitle: 'Best GMT Watches (2026) — From $500 Seiko to Rolex GMT-Master II',
    metaDescription: 'The best GMT and travel watches at every budget: Seiko 5 GMT, Longines Spirit Zulu Time, Tudor Black Bay GMT and Pro, Grand Seiko SBGJ201, Rolex GMT-Master II compared.',
    updated: '2026-07-01',
    intro: `A GMT hand is the most useful complication a watch can carry — one glance covers home and away time — and the category ranges from $475 to well past $10,000 with real differences in how the complication actually works.

The key distinction buyers miss: "flyer" GMTs (Rolex, Grand Seiko, Tudor, Longines Zulu Time) let you jump the local hour hand when you land, while "caller" GMTs (Seiko SSK, most affordable options) adjust the 24-hour hand instead — fine for tracking a second zone from home, clumsier for actual travel. Price largely follows this split.`,
    sections: [
      {
        heading: 'The benchmark: GMT-Master II',
        body: `The Rolex GMT-Master II 126710BLNR "Batman" defines the category it invented in 1955 for Pan Am crews — bidirectional two-color ceramic bezel, true flyer mechanism, 70-hour Caliber 3285. Every other GMT is measured against it, and its only real drawbacks are the waitlist and the premium that follows.

The vintage route into the same lineage is the 1675, two decades of production and the reference that made the Pepsi bezel an icon.`,
        watchSlugs: ['rolex-gmt-master-ii-126710blnr', 'rolex-gmt-master-1675'],
      },
      {
        heading: 'The value flyers: Tudor and Longines',
        body: `Tudor sells the strongest GMT value in Switzerland twice over: the Black Bay GMT brings a burgundy-blue "Pepsi" bezel and in-house flyer caliber under $4,500, while the Black Bay Pro fixes its 24-hour scale in steel for a tool-watch take on the same movement at 39mm.

The Longines Spirit Zulu Time undercuts both with a ceramic bezel, chronometer certification, and a true flyer in-house caliber around $3,100 — on paper the most watch per dollar in the entire GMT category.`,
        watchSlugs: ['tudor-black-bay-gmt-79830rb', 'tudor-black-bay-pro-79470', 'longines-spirit-zulu-time-l3-812-4-53-6'],
      },
      {
        heading: 'The connoisseur pick and the budget king',
        body: `The Grand Seiko SBGJ201 pairs the GMT complication with a 36,000vph Hi-Beat caliber and Zaratsu finishing — the travel watch for people who care what the movement is doing at 10 beats per second.

At the other end, the Seiko 5 Sports GMT SSK001 broke the price floor in 2022: a mechanical GMT under $500. It is a caller-type mechanism and the bracelet is basic, but nothing else makes the complication this accessible. The Montblanc Heritage GMT and Farer Cobb fill the stylish middle ground for buyers who want a GMT that doesn't look like a tool.`,
        watchSlugs: ['grand-seiko-hi-beat-36000-gmt-sbgj201', 'seiko-5-sports-gmt-ssk001', 'montblanc-heritage-gmt-mb119950', 'farer-gmt-cobb-gmt-cb-39'],
      },
    ],
    faq: [
      { question: 'What is the difference between a flyer and caller GMT?', answer: 'A flyer (or "true") GMT jumps the local 12-hour hand in one-hour steps — ideal when you land in a new time zone. A caller GMT adjusts the 24-hour hand instead, which suits tracking a second time zone from home. Flyer movements cost more to engineer, which is why they cluster above $3,000: Rolex, Grand Seiko, Tudor, and the Longines Zulu Time are flyers; the Seiko SSK001 is a caller.' },
      { question: 'What is the best GMT watch under $5,000?', answer: 'The Longines Spirit Zulu Time for pure value (true flyer, ceramic bezel, chronometer, ~$3,100) or the Tudor Black Bay GMT for the Pepsi-bezel look with in-house Tudor build (~$4,400). The Black Bay Pro splits the difference for smaller wrists at 39mm.' },
      { question: 'Is a GMT worth it if I don\'t travel?', answer: 'The 24-hour hand earns its keep tracking one other time zone — a family member abroad, a foreign market open, a remote team. If none of those apply, the same money buys more finishing or water resistance in a three-hand watch.' },
    ],
    related: ['best-dive-watches-under-5000', 'rolex-submariner-buyers-guide', 'best-first-luxury-watch'],
  },

  'integrated-bracelet-sport-watches-guide': {
    slug: 'integrated-bracelet-sport-watches-guide',
    title: 'Integrated-Bracelet Sport Watches: The Complete Guide',
    metaTitle: 'Integrated Bracelet Sport Watches Guide (2026) — Royal Oak to PRX',
    metaDescription: 'Every tier of the integrated-bracelet sport watch category: Royal Oak, Nautilus, Overseas, Laureato, Alpine Eagle, Defy Skyline, down to the Tissot PRX — compared honestly.',
    updated: '2026-07-01',
    intro: `Gérald Genta's 1972 Royal Oak invented a category that now dominates luxury watch demand: the steel sport watch with a bracelet flowing seamlessly from the case. Fifty years later the segment spans from $400 to $150,000, and — unusually for watches — the design language survives translation to every price point.

This guide organizes the category by tier, because the honest question isn't "which is best" (the Royal Oak, by acclaim) but "where does the value stop scaling with price."`,
    sections: [
      {
        heading: 'The holy trinity tier',
        body: `The Royal Oak "Jumbo" 16202 remains the reference — Genta's original 39mm proportions, the ultra-thin heritage of Caliber 7121, and the Tapisserie dial that started everything. The Patek Philippe Nautilus (now in 5811 form after the 5711's retirement) offers the softer porthole interpretation, and the Vacheron Constantin Overseas 4500V rounds out the trinity with the most under-appreciated execution: quick-change straps, 150m rating, and availability that doesn't require knowing someone.

All three trade far above retail. Whether that premium buys watchmaking or waiting-list psychology is the category's permanent debate.`,
        watchSlugs: ['audemars-piguet-royal-oak-jumbo-16202st', 'patek-philippe-nautilus-5711-1a', 'vacheron-constantin-overseas-4500v-110a-b128'],
      },
      {
        heading: 'The smart money tier: $5,000–$15,000',
        body: `This is where the category's real value lives. The Girard-Perregaux Laureato predates most rivals (1975) and delivers genuine haute-horlogerie finishing with an octagonal bezel that isn't borrowed from anyone. The Chopard Alpine Eagle brings a proprietary Lucent Steel and an in-house chronometer caliber. And the Zenith Defy Skyline puts a 5Hz El Primero-derived movement in an integrated case for around $9,000.

Each of these delivers 90% of the trinity experience at 20% of the street price — the strongest argument in the segment.`,
        watchSlugs: ['girard-perregaux-laureato-81010-11-431-11a', 'chopard-alpine-eagle-298600-3001', 'zenith-defy-skyline-03-9300-3620-01-i001'],
      },
      {
        heading: 'The accessible tier: $400–$4,000',
        body: `The Tissot PRX Powermatic 80 made the category democratic — a real 1978 design revived with an 80-hour automatic for under $700, and the reason a generation discovered integrated bracelets. The Christopher Ward Twelve adds COSC-grade movement options and sharper machining around $1,300, while the Citizen Series 8 and Maurice Lacroix Aikon fill the space between with in-house Japanese and Swiss takes respectively.

Tudor's Royal is the quiet pick here: integrated bracelet, mechanical movement, and Tudor build quality from about $2,400 — chronically overlooked because it lacks the Black Bay's marketing.`,
        watchSlugs: ['tissot-prx-powermatic-80-t137-407-11-041-00', 'christopher-ward-the-twelve-c12-40ada3-s0kk0-b0', 'citizen-series-8-880-nb6011-11a', 'maurice-lacroix-aikon-automatic-ai6008-ss002-330-1', 'tudor-royal-m28503-0006'],
      },
    ],
    faq: [
      { question: 'Which integrated bracelet watch is the best value?', answer: 'The Girard-Perregaux Laureato in the luxury tier — trinity-adjacent finishing and 1975 design legitimacy at a fraction of Royal Oak street pricing. In the accessible tier, the Tissot PRX Powermatic 80 is unmatched: genuine heritage design and an 80-hour automatic under $700.' },
      { question: 'Why are Royal Oak and Nautilus prices so high?', answer: 'Production scarcity meets category-defining status: AP and Patek deliberately restrict steel sport output while demand concentrated on exactly these models after 2016. The result is street prices at 2-3x retail. The watchmaking is exceptional, but the premium above a Laureato or Overseas is paying for the waiting list, not the movement.' },
      { question: 'Are integrated bracelet watches practical daily?', answer: 'Very — that was the original 1972 brief: a steel luxury watch for every day. The tradeoff is strap flexibility: most integrated designs take only their own bracelet or proprietary straps, so you are committing to one look. Models with quick-change systems (Overseas, Alpine Eagle, PRX) soften this.' },
    ],
    related: ['best-first-luxury-watch', 'best-dress-watches-under-10000', 'best-chronographs-under-10000'],
  },

  'best-chronographs-under-10000': {
    slug: 'best-chronographs-under-10000',
    title: 'Best Chronographs Under $10,000',
    metaTitle: 'Best Chronograph Watches Under $10,000 (2026) — Speedmaster to Speedtimer',
    metaDescription: 'The best mechanical chronographs under $10,000: Omega Speedmaster, Tudor Black Bay Chrono, TAG Heuer Monaco and Carrera, Zenith Chronomaster, Seiko Speedtimer compared.',
    updated: '2026-07-01',
    intro: `The chronograph is mechanical watchmaking at its most demonstrative — a stopwatch built from levers and wheels, and the complication most buyers actually use. Under $10,000 the field includes three of the most storied movements ever made: Omega's Moonwatch caliber, Zenith's El Primero, and the Breitling-derived engine in Tudor's Black Bay Chrono.

We rank on movement architecture (column wheel beats cam), wearability (chronographs run thick), and the intangible each icon carries — because in this category, history is a spec.`,
    sections: [
      {
        heading: 'The Moonwatch, still',
        body: `The Omega Speedmaster Professional remains the category answer. The current Caliber 3861 adds Master Chronometer accuracy and magnetic resistance to the hand-wound architecture that qualified for every Apollo mission, and the case still wears like the 1960s original. No other chronograph combines this history, this movement, and this price — roughly $7,000 on the bracelet.

The vintage path into the same story runs through the CK 2998 and the 105.012 — the reference actually worn on the Moon.`,
        watchSlugs: ['omega-speedmaster-moonwatch-310-30-42-50-01-001', 'omega-speedmaster-ck-2998'],
      },
      {
        heading: 'The high-frequency option: Zenith',
        body: `The El Primero was the first automatic chronograph (1969) and still runs at 5Hz, letting it time to tenths of a second. The Chronomaster Sport packages it with a ceramic bezel at just under $10,000, while the A384 Revival rebuilds the 1969 original to the exact millimeter for collectors who want the history in period form.`,
        watchSlugs: ['zenith-chronomaster-sport-03-3100-3600-69-m3100', 'zenith-el-primero-a384-revival-03-a384-400-21-m384'],
      },
      {
        heading: 'The racing icons: TAG Heuer',
        body: `The Monaco is the only square chronograph that matters — Steve McQueen's watch, now with an in-house column-wheel caliber and 80-hour reserve. The Carrera "Glassbox" is the better daily wearer: 39mm, a domed crystal quoting the 1960s originals, and the best Carrera execution in a decade. Both land around $7,000-$9,000.`,
        watchSlugs: ['tag-heuer-monaco-cbl2111-fc6453', 'tag-heuer-carrera-glassbox-cbs2210-fc6534'],
      },
      {
        heading: 'The value column-wheels',
        body: `The Tudor Black Bay Chrono runs a Breitling B01-derived column-wheel caliber with 70-hour reserve and — rare for a chronograph — 200m water resistance, under $6,000. The Breitling Premier B01 puts the same family of movement in dressier clothes.

Below $3,000, two picks stand out: the Seiko Speedtimer SRQ035 with an in-house column-wheel panda for around $2,800, and the Hamilton Intra-Matic Auto Chrono, the most faithful 1960s panda-dial revival in production.`,
        watchSlugs: ['tudor-black-bay-chrono-m79360n-0001', 'breitling-premier-b01-chronograph-42-ab0118a11g1a1', 'seiko-prospex-speedtimer-srq035', 'hamilton-intra-matic-auto-chrono-h38416541'],
      },
    ],
    faq: [
      { question: 'What is the best chronograph under $10,000?', answer: 'The Omega Speedmaster Professional — the Moonwatch\'s history, the hand-wound Caliber 3861 with Master Chronometer certification, and unmatched community and parts support at ~$7,000. The Zenith Chronomaster Sport is the pick if you want automatic winding and 1/10th-second timing.' },
      { question: 'Why does a column-wheel chronograph matter?', answer: 'The column wheel coordinates start/stop/reset with a crisp, light pusher feel and smooth engagement, versus the cheaper cam-actuated design\'s heavier action. It is the difference you feel every time you use the complication — and the marker separating movements built to a standard from movements built to a price.' },
      { question: 'Are chronographs too thick for daily wear?', answer: 'The complication adds 2-4mm over a three-hander, so case choice matters. The Speedmaster (13.2mm) and Carrera Glassbox wear flat for the category; anything past 15mm fights shirt cuffs. Hand-wound chronographs run thinner than automatics — one reason the Moonwatch stays wearable.' },
    ],
    related: ['best-gmt-watches', 'integrated-bracelet-sport-watches-guide', 'vintage-watch-collecting-guide'],
  },

  'vintage-watch-collecting-guide': {
    slug: 'vintage-watch-collecting-guide',
    title: 'Vintage Watch Collecting: How to Start Without Getting Burned',
    metaTitle: 'Vintage Watch Collecting Guide (2026) — How to Start, What to Buy',
    metaDescription: 'How to start collecting vintage watches: condition vs originality, the references worth buying (5513, 1675, CK 2998, Royal Oak 5402), and the mistakes that cost collectors most.',
    updated: '2026-07-01',
    intro: `Vintage watch collecting rewards knowledge more directly than almost any hobby — and punishes its absence just as directly. The same reference can be a five-figure treasure or a worthless Frankenwatch depending on details invisible to a beginner: a redialed face, a polished case, a swapped bezel insert.

This guide covers the principles that survive every market cycle, and the references that form the backbone of serious collections. The single most important sentence: buy the seller, then the condition, then the watch.`,
    sections: [
      {
        heading: 'The rules that protect you',
        body: `Originality beats condition, and condition beats rarity. An unpolished case with a spotted original dial is worth more than a gleaming case with a service dial — collectors pay for what survived, not what was restored. Learn to read case edges: sharp chamfers and crisp lug bevels mean metal nobody removed.

Provenance is a discount on risk. Papers, service records, and a documented ownership chain can add 20-40% to value — and their absence should subtract at least that from what you offer. And at every price above pocket money: independent authentication before funds clear, no exceptions for friendly sellers.`,
      },
      {
        heading: 'The blue-chip entry points',
        body: `Four references anchor most serious sport-watch collections. The Rolex Submariner 5513 offers the longest runway of dial variants at the most forgiving vintage-Rolex prices. The GMT-Master 1675 delivers the Pepsi bezel icon across two decades of production. The Explorer 1016 is the connoisseur's pick — one dial, one purpose, thirty years of production discipline. And the Datejust 1601 remains the cheapest way into pie-pan-dial vintage Rolex, often under five figures.`,
        watchSlugs: ['rolex-submariner-5513', 'rolex-gmt-master-1675', 'rolex-explorer-1016', 'rolex-datejust-1601'],
      },
      {
        heading: 'Beyond Rolex: the smarter money',
        body: `Vintage Omega offers more watch per dollar than any blue-chip category: the Speedmaster CK 2998 and 105.012 carry genuine space-program history at a fraction of comparable Rolex money. The Tudor Submariner 7928 delivers Oyster-case vintage diving with Marine Nationale credibility for a third of the 5513's price.

At the top of the market, the Royal Oak 5402 and Nautilus 3700 — the original Genta designs — have become the defining collectibles of the modern era. And the manual-wind Daytona 6263 sits in permanent grail territory, the reference the Paul Newman phenomenon is built on.`,
        watchSlugs: ['omega-speedmaster-ck-2998', 'tudor-submariner-7928', 'audemars-piguet-royal-oak-5402st', 'patek-philippe-nautilus-3700', 'rolex-daytona-6263'],
      },
      {
        heading: 'Where beginners lose money',
        body: `Three failure modes cover most losses. Polished cases: every polish removes metal and value, and most vintage watches have been polished; unpolished examples earn their premiums. Redials: a refinished dial can halve a watch's value, and good redials fool cameras — buy in person or through dealers who guarantee originality in writing. Franken-builds: period-correct parts from three donor watches make one "honest-looking" fake; serial and case-back date codes, movement numbers, and part-era consistency are the tells.

The defense against all three is the same: pay the specialist dealer's premium for your first several watches. Tuition is cheaper at a dealer than at an auction.`,
      },
    ],
    faq: [
      { question: 'What is the best vintage watch to start collecting with?', answer: 'The Tudor Submariner 7928 or a matte-dial Rolex Submariner 5513 for sport watches — liquid, well-documented, and hard to get catastrophically wrong through a reputable dealer. Vintage Omega Speedmasters and Seamasters offer the gentlest learning curve per dollar.' },
      { question: 'Should vintage watches be serviced immediately after buying?', answer: 'Have a watchmaker assess, but do not automatically service: original parts (crowns, crystals, dials) are irreplaceable value, and an aggressive service can destroy it. Find a vintage-literate watchmaker who preserves rather than renews, and insist original parts are returned to you if replaced.' },
      { question: 'Do vintage watches hold value better than modern?', answer: 'Blue-chip vintage (original-condition Submariners, GMTs, early Royal Oaks) has outperformed most modern references over long horizons because supply only shrinks. But condition risk means individual outcomes vary enormously — vintage rewards expertise with returns and punishes shortcuts with losses. Modern watches are the safer store of value; vintage is the better hunt.' },
    ],
    related: ['rolex-submariner-buyers-guide', 'best-chronographs-under-10000', 'best-dress-watches-under-10000'],
  },
}

export const ALL_GUIDES = Object.keys(GUIDE_MAP)
