// Watch terminology glossary — targets high-volume informational queries
// ("what is COSC", "what is a tourbillon") with low competition. Each entry
// is a standalone indexable page with DefinedTerm JSON-LD.

export interface GlossaryEntry {
  slug: string
  term: string
  /** One-sentence definition (used in meta description + JSON-LD). */
  short: string
  /** Body paragraphs separated by blank lines. */
  body: string
  /** Slugs of related glossary entries. */
  related: string[]
  /** Optional internal hub link (href + label). */
  hubLink?: { href: string; label: string }
}

export const GLOSSARY_MAP: Record<string, GlossaryEntry> = {
  'cosc-chronometer': {
    slug: 'cosc-chronometer',
    term: 'COSC Chronometer',
    short: 'A COSC chronometer is a movement certified by the Swiss Official Chronometer Testing Institute to keep time within -4/+6 seconds per day.',
    body: `COSC (Contrôle Officiel Suisse des Chronomètres) tests uncased movements over 15 days in five positions and at three temperatures. Only movements holding an average daily rate between -4 and +6 seconds earn the "chronometer" designation — roughly 6% of Swiss mechanical production.

The word "chronometer" on a dial is legally protected in Switzerland and always indicates certification; "chronograph" (a stopwatch function) is routinely confused with it but unrelated. Rolex, Omega, Breitling, and Tudor certify most or all of their output; Rolex then re-tests cased watches to its stricter ±2 s/day "Superlative Chronometer" standard, and Omega layers METAS Master Chronometer testing (including 15,000-gauss magnetic resistance) on top of COSC.

In practice, certification matters less as a precision guarantee — many uncertified movements run as well — and more as evidence a manufacturer submits to independent verification.`,
    related: ['in-house-movement', 'hacking-seconds', 'power-reserve'],
    hubLink: { href: '/movement/automatic', label: 'Browse automatic watches' },
  },
  tourbillon: {
    slug: 'tourbillon',
    term: 'Tourbillon',
    short: 'A tourbillon is a rotating cage that carries the balance wheel and escapement, invented by Breguet in 1801 to average out gravity\'s effect on timekeeping.',
    body: `In a pocket watch stored vertically, gravity pulls unevenly on the balance spring, degrading accuracy. Abraham-Louis Breguet's solution was to mount the entire regulating organ inside a cage rotating once per minute, so positional errors cancel out over each revolution.

On the wrist, where the watch moves constantly, the tourbillon's practical benefit is negligible — modern flat-balance movements match or beat tourbillons in accuracy. Its survival is about demonstration: building one requires exceptional finishing and assembly skill, which is why it remains haute horlogerie's favorite complication, typically adding $40,000+ to a watch's price.

Variations include the flying tourbillon (cantilevered, no upper bridge), multi-axis tourbillons rotating in two or three planes, and high-frequency versions. Chinese manufactures now produce tourbillons under $1,000 — mechanically genuine, but without the finishing that justifies the complication's traditional status.`,
    related: ['minute-repeater', 'perpetual-calendar', 'in-house-movement'],
  },
  'automatic-movement': {
    slug: 'automatic-movement',
    term: 'Automatic Movement',
    short: 'An automatic (self-winding) movement winds its mainspring via a weighted rotor that spins with wrist motion, eliminating daily manual winding.',
    body: `A semicircular weight — the rotor — pivots freely as the wrist moves, and a reversing gear system converts that motion into mainspring tension. Worn daily, an automatic never needs winding; left off the wrist, it runs down over its power reserve (typically 38-80 hours) and needs a few crown turns to restart.

The architecture adds 1.5-3mm of thickness over a hand-wound equivalent, which is why ultra-thin dress watches often stay manual. Micro-rotor designs (Patek 240, Piaget 12P lineage) recess a smaller weight into the movement plane to keep automatics slim, trading some winding efficiency.

Modern automatics dominate luxury production: Rolex's Perpetual calibers, Omega's Co-Axial 8900 series, and Tudor's MT54xx family are all self-winding, with power reserves increasingly standardized around 70 hours — a full weekend off the wrist.`,
    related: ['manual-movement', 'power-reserve', 'spring-drive'],
    hubLink: { href: '/movement/automatic', label: 'Browse automatic watches' },
  },
  'manual-movement': {
    slug: 'manual-movement',
    term: 'Manual (Hand-Wound) Movement',
    short: 'A manual movement is wound by turning the crown, storing energy in the mainspring by hand — the original wristwatch architecture.',
    body: `Every watch was hand-wound until automatic winding matured in the 1920s-30s. Removing the rotor leaves a thinner movement with an unobstructed view of the bridges and balance through a display back — the two reasons manual winding survives at both the top (Lange, Patek dress watches) and heritage end (Omega Speedmaster Moonwatch) of the market.

Winding is a daily ritual: 20-40 crown turns to full tension, where a slipping clutch (in modern movements) prevents overwinding damage. Power reserves run from 40 hours to multi-day designs like IWC's 8-day Portugieser and Lange's 72-hour calibers.

Enthusiasts split on the ritual — some find daily winding the point of mechanical ownership, others an obligation. It is the single biggest practical difference to understand before choosing between otherwise similar watches.`,
    related: ['automatic-movement', 'power-reserve', 'hacking-seconds'],
    hubLink: { href: '/movement/manual', label: 'Browse manual wind watches' },
  },
  'quartz-movement': {
    slug: 'quartz-movement',
    term: 'Quartz Movement',
    short: 'A quartz movement keeps time by counting the 32,768 Hz vibrations of an electrically-charged quartz crystal — far more accurate than any mechanical watch.',
    body: `A battery drives a quartz crystal oscillating at exactly 32,768 times per second; a circuit divides that down to one pulse per second. Standard quartz holds ±15 seconds per month; thermocompensated high-accuracy quartz (Grand Seiko 9F, Citizen's Caliber 0100 at ±1 second per year) reaches precision no mechanical movement approaches.

The 1970s "quartz crisis" nearly destroyed Swiss watchmaking when cheap accurate quartz undercut mechanical watches' entire practical rationale. The industry survived by repositioning mechanics as craft rather than instrument — the framing that still defines luxury watches.

Luxury quartz persists in two forms: precision statements (Grand Seiko 9F, hand-assembled and sealed for decades) and design-first pieces where thinness and reliability matter more than romance (Cartier Tank Must). Batteries last 2-10 years; solar variants (Eco-Drive, Solargraph) eliminate even that.`,
    related: ['spring-drive', 'automatic-movement'],
    hubLink: { href: '/movement/quartz', label: 'Browse quartz watches' },
  },
  'spring-drive': {
    slug: 'spring-drive',
    term: 'Spring Drive',
    short: 'Spring Drive is Grand Seiko\'s hybrid movement: a mechanical mainspring regulated by a quartz reference, producing a perfectly smooth-gliding seconds hand.',
    body: `Spring Drive is powered entirely by a mainspring like any mechanical watch — there is no battery. The difference is regulation: instead of an escapement ticking 6-10 times per second, a "Tri-Synchro Regulator" uses a quartz crystal as reference and an electromagnetic brake to govern the gear train continuously. The seconds hand doesn't tick; it glides.

Accuracy is ±15 seconds per month (±1 second per day), roughly five times tighter than chronometer mechanicals. Development took Seiko engineer Yoshikazu Akahane over 20 years and 600 prototypes before the 1999 production debut.

The technology remains exclusive to Grand Seiko, Seiko's Credor line, and select Prospex models. The 9R65 (72-hour reserve) powers icons like the Snowflake; the newer 9RA2 extends reserve to five days. For buyers, Spring Drive is the only way to get quartz-adjacent precision with fully mechanical power and soul.`,
    related: ['quartz-movement', 'automatic-movement', 'zaratsu-polishing'],
    hubLink: { href: '/movement/spring-drive', label: 'Browse Spring Drive watches' },
  },
  'power-reserve': {
    slug: 'power-reserve',
    term: 'Power Reserve',
    short: 'Power reserve is how long a mechanical watch runs on a fully wound mainspring — typically 38 to 80 hours in modern movements.',
    body: `When you stop wearing (or winding) a mechanical watch, the mainspring's stored energy depletes at roughly one "charge" per gear-train cycle. Legacy movements like the ETA 2824 hold ~38 hours; the modern standard has shifted to ~70 hours (Rolex 32xx, Tudor MT54xx, Tissot's Powermatic 80) — enough to set a watch down Friday evening and pick it up running Monday morning.

Extended reserves use longer or multiple mainspring barrels: IWC's 8-day hand-wound calibers, Panerai's 3-day P.9000 family, Oris's 5-day Calibre 400, and exotica like Hublot's 50-day MP-05. A power reserve indicator — a fuel gauge on the dial — is its own minor complication, central to designs like the Nomos Metro and Orient Star.

Longer isn't automatically better: torque delivery should stay flat as the spring unwinds, or accuracy drifts late in the reserve. Well-engineered 70 hours beats poorly-managed 100.`,
    related: ['automatic-movement', 'manual-movement', 'in-house-movement'],
  },
  'water-resistance': {
    slug: 'water-resistance',
    term: 'Water Resistance',
    short: 'Water resistance ratings state the static pressure a watch case withstands — but the meters on the dial don\'t map to safe diving depths.',
    body: `Ratings are laboratory static-pressure figures: 30m survives splashes and rain, not swimming; 100m covers swimming and snorkeling; 200m with ISO 6425 certification means genuine scuba capability; 300m+ is professional territory. The gap between the number and real use exists because swimming adds dynamic pressure spikes and temperature swings that static tests don't capture.

The engineering lives in gaskets (crown, caseback, crystal seals) and construction: screw-down crowns and casebacks are why dive watches hold their ratings and dress watches don't. Gaskets age — pressure testing every 2-3 years (and after any battery change) is what actually maintains a rating.

Helium escape valves on saturation-diving watches (Sea-Dweller, Seamaster 300M) solve a problem only commercial divers living in pressurized habitats have — on a recreational wrist they are heritage decoration.`,
    related: ['iso-6425', 'helium-escape-valve', 'sapphire-crystal'],
    hubLink: { href: '/style/diver', label: 'Browse diving watches' },
  },
  'iso-6425': {
    slug: 'iso-6425',
    term: 'ISO 6425 (Dive Watch Standard)',
    short: 'ISO 6425 is the international standard a watch must meet to legally be marked "Diver\'s" — covering water resistance, legibility, and shock and magnetic resistance.',
    body: `The standard requires minimum 100m water resistance, a unidirectional rotating bezel with elapsed-time markings at least every 5 minutes, legibility at 25cm in total darkness, a running indicator (usually a lumed seconds hand), plus resistance to shock, magnetism, and salt water. Crucially, ISO 6425 watches are individually tested — not batch-sampled — with an overpressure margin of 25%.

"Diver's 200m" on a Seiko dial is a legal claim under this standard; a fashion watch's "200m" without certification is a case-design claim only. Brands like Seiko, Citizen, Tissot, and Christopher Ward certify; Rolex and Omega generally exceed the requirements but use their own language instead.

The unidirectional bezel is the standard's cleverest requirement: if knocked, it can only shorten the displayed remaining dive time, never dangerously extend it.`,
    related: ['water-resistance', 'helium-escape-valve', 'lume-super-luminova'],
    hubLink: { href: '/style/diver', label: 'Browse diving watches' },
  },
  'sapphire-crystal': {
    slug: 'sapphire-crystal',
    term: 'Sapphire Crystal',
    short: 'Sapphire crystal is synthetic corundum — 9 on the Mohs scale — making it virtually scratch-proof and the standard glass on modern luxury watches.',
    body: `Synthetic sapphire is grown from aluminum oxide, then cut and polished with diamond tooling. Only diamond (and a few exotic materials) can scratch it, which is why decade-old sapphire watches still read glass-clear. The tradeoff is brittleness: a hard point impact can chip or crack sapphire where acrylic would flex.

The alternatives define eras. Acrylic (hesalite) — warm, domed, scratch-prone but polishable — survives on the Omega Moonwatch because NASA preferred a crystal that scratches to one that shatters in zero gravity. Mineral glass, hardened but scratchable, occupies the budget tier; Seiko's Hardlex is the best-known example.

Anti-reflective coating determines how good sapphire looks: applied to both sides it makes the crystal vanish (and shows scratches in the coating itself); underside-only is the durable compromise most brands choose. "Boxed" sapphire — domed with vertical sides, quoting vintage acrylic shapes — has become the signature of the heritage-reissue era.`,
    related: ['water-resistance', 'cerachrom-ceramic-bezel', 'patina'],
  },
  'cerachrom-ceramic-bezel': {
    slug: 'cerachrom-ceramic-bezel',
    term: 'Ceramic Bezel (Cerachrom)',
    short: 'Ceramic bezels use sintered zirconium-oxide inserts that cannot fade or scratch in normal wear — Rolex\'s version is trademarked Cerachrom.',
    body: `Aluminum bezel inserts — standard until the mid-2000s — scratch easily and fade in sunlight, which is why vintage "ghost" bezels exist. Ceramic solved both: the color is fired through the material, UV-immune, and the surface sits near 9 on the Mohs scale.

Rolex's Cerachrom (2005 onward) set the benchmark, including the two-color single-piece bezels (Batman blue-black, Pepsi red-blue) whose halves are chemically altered rather than joined — a process competitors took years to answer. Omega, Tudor, and even sub-$1,000 brands (Tissot Seastar, Mido Ocean Star) now field ceramic bezels.

The tradeoffs: ceramic can shatter under sharp impact where aluminum dents, and the perfect surface reads "modern" — one reason heritage reissues (Black Bay 58, Legend Diver) deliberately retain aluminum for period-correct warmth, and why the vintage-vs-ceramic choice is really an aesthetics decision.`,
    related: ['sapphire-crystal', 'patina', 'oystersteel-904l'],
    hubLink: { href: '/material/ceramic', label: 'Browse ceramic watches' },
  },
  'gmt-complication': {
    slug: 'gmt-complication',
    term: 'GMT Complication',
    short: 'A GMT complication adds a 24-hour hand (and usually a rotating bezel) so a watch can display two or three time zones simultaneously.',
    body: `Developed for Pan Am pilots in the 1954 Rolex GMT-Master, the complication pairs a fourth hand completing one rotation per day with a 24-hour scale. Read the extra hand against the bezel for a second zone; offset the bezel for a third.

The critical buyer distinction is "flyer" versus "caller." Flyer (true) GMTs — Rolex, Grand Seiko 9S86, Tudor MT5652, Longines' Zulu Time caliber — jump the local hour hand in one-hour steps without stopping the watch: ideal on landing. Caller GMTs — most affordable implementations like Seiko's 4R34 — independently set the 24-hour hand instead: better for tracking a colleague's time zone from home. The engineering difference is why flyers cluster above $3,000.

A world timer is the complication's maximalist cousin, displaying all 24 zones at once via a city ring — more display, less everyday legibility.`,
    related: ['automatic-movement', 'cosc-chronometer'],
    hubLink: { href: '/style/pilot', label: 'Browse pilot watches' },
  },
  moonphase: {
    slug: 'moonphase',
    term: 'Moonphase Complication',
    short: 'A moonphase complication displays the moon\'s current phase through a rotating disc, traditionally driven by a 59-tooth wheel accurate to a day every 2.6 years.',
    body: `Two moons printed on a disc rotate behind an aperture shaped to mask the visible portion, tracking the 29.53-day lunar cycle. The classic 59-tooth gearing approximates that cycle at 29.5 days — drifting one day every 32 months and corrected with a pusher. "Astronomical" moonphases add gearing precision: Lange's calibers run 122 years between corrections; Andreas Strehler's record-holder is theoretically accurate for over two million.

Functionally obsolete, the moonphase endures because it is the most romantic display in watchmaking — the complication that puts the sky on your wrist. It anchors dress pieces (JLC Master Ultra Thin Moon, Longines Master Moonphase) and elevates calendar watches into "complete calendar" territory.

For buyers: it adds cost and setting fussiness, and it is the complication most often bought for beauty and never corrected — which its owners generally consider entirely acceptable.`,
    related: ['perpetual-calendar', 'annual-calendar', 'tourbillon'],
    hubLink: { href: '/style/dress', label: 'Browse dress watches' },
  },
  'perpetual-calendar': {
    slug: 'perpetual-calendar',
    term: 'Perpetual Calendar',
    short: 'A perpetual calendar mechanically tracks day, date, month, and leap years — displaying the correct date without correction until 2100.',
    body: `A mechanical memory of the civil calendar: a cam system encodes the 48-month cycle including 30- vs 31-day months, February, and the four-year leap cycle. Set correctly, it will not need adjustment until March 1, 2100, when the Gregorian calendar's century exception (2100 is not a leap year) defeats the four-year cam.

The complication is haute horlogerie's traditional summit alongside the minute repeater and tourbillon — Patek Philippe put it in a wristwatch first (1925), and the 1941 Patek 1518 combined it with a chronograph into the most collectible complication template ever. Modern engineering pushed usability: IWC's Kurt Klaus design sets everything through the crown; Lange's Lange 1 Perpetual jumps all displays instantaneously at midnight.

The annual calendar is its pragmatic sibling — one correction per year at a fraction of the price. The QP (quantième perpétuel) premium buys the century, and the statement.`,
    related: ['annual-calendar', 'moonphase', 'minute-repeater'],
  },
  'annual-calendar': {
    slug: 'annual-calendar',
    term: 'Annual Calendar',
    short: 'An annual calendar tracks day, date, and month correctly through 30- and 31-day months, needing adjustment only once a year at the end of February.',
    body: `Patek Philippe invented the complication surprisingly recently — 1996, reference 5035 — as a deliberate middle path: most of a perpetual calendar's convenience at a fraction of its mechanical complexity and price. The mechanism knows 30 from 31 days but not February, so each March 1 the owner advances the date once.

That single annual correction removes roughly two-thirds of the gear-and-cam complexity, which is why annual calendars start around $8,000 (Longines Master Collection, Omega Globemaster Annual) while perpetuals start north of $30,000.

For actual daily wear, many collectors argue the annual calendar is the better watch: the same at-a-glance calendar utility, less setting anxiety after a week off the wrist, and servicing costs closer to a standard movement. It has become the complication of choice in the "one good watch" upper-middle market.`,
    related: ['perpetual-calendar', 'moonphase'],
  },
  chronograph: {
    slug: 'chronograph',
    term: 'Chronograph',
    short: 'A chronograph is a watch with an integrated stopwatch — start, stop, and reset an independent timing hand via case pushers.',
    body: `Pushers at 2 and 4 o'clock control a seconds-timing hand and sub-registers accumulating elapsed minutes and hours. Under the dial, two architectures matter: column-wheel designs (Omega 9900, Tudor/Breitling B01, Zenith El Primero) deliver crisp, light pusher action; cam-actuated designs (the workhorse Valjoux 7750) are cheaper and equally durable with a heavier feel.

The coupling system splits similarly — vertical clutch engagement lets the chronograph run continuously without amplitude loss; horizontal coupling is traditional and visually appealing through a display back.

The complication carries the sport-watch canon: Speedmaster (NASA), Daytona (motorsport), Carrera and Monaco (racing), Navitimer (aviation, with slide-rule bezel). "Flyback" variants reset and restart with one press — a military navigation feature now a finishing flex. Perpetually confused with "chronometer" (an accuracy certification), the chronograph is a function; some watches, like the Daytona, are both.`,
    related: ['flyback-chronograph', 'cosc-chronometer', 'automatic-movement'],
    hubLink: { href: '/style/chrono', label: 'Browse chronographs' },
  },
  'flyback-chronograph': {
    slug: 'flyback-chronograph',
    term: 'Flyback Chronograph',
    short: 'A flyback chronograph resets and instantly restarts timing with a single press of the reset pusher — no stop-reset-start sequence required.',
    body: `On a standard chronograph, timing consecutive intervals takes three presses: stop, reset, start. The flyback (retour en vol) collapses this to one — press the reset pusher while running and the seconds hand snaps to zero and immediately continues. The feature was developed in the 1930s for pilots timing sequential navigation legs, where three presses cost seconds and accuracy.

Mechanically it demands a clutch that can disengage, reset, and re-engage the timing wheel in one motion without damage — extra levers, extra finishing, extra cost. It typically marks a movement designer showing off: Lange's Datograph, Breguet's Type XX (where the military specification required it), Zenith's El Primero-based flybacks, and Tudor's Pelagos FXD Chrono all wear it as a credential.

For most owners it is used rarely and valued daily as proof of mechanism quality — the chronograph world's equivalent of a car's launch control.`,
    related: ['chronograph', 'in-house-movement'],
    hubLink: { href: '/style/chrono', label: 'Browse chronographs' },
  },
  'helium-escape-valve': {
    slug: 'helium-escape-valve',
    term: 'Helium Escape Valve',
    short: 'A helium escape valve lets helium that infiltrated a dive watch in a pressurized habitat vent safely during decompression, preventing the crystal from blowing off.',
    body: `The problem is exotic: commercial saturation divers live for weeks in habitats breathing helium-rich gas. Helium atoms are small enough to seep past any gasket into the watch case. During slow decompression the trapped helium expands, and without an exit it pops the crystal off. The valve — automatic (Rolex Sea-Dweller, 1967) or manually opened (Omega Seamaster 300M's 10 o'clock crown) — vents the pressure differential.

If you don't live in a diving bell, the valve does nothing for you; recreational scuba never puts helium in the watch. Its persistence on desk-bound Seamasters and Sea-Dwellers is pure heritage — a badge of the professional tool lineage.

Collectors debate it accordingly: the extra crown gives the Seamaster its asymmetric identity, while purists prefer valve-free cases with one less hole to seal. Both camps agree on the engineering romance of a feature built for the bottom of the North Sea.`,
    related: ['water-resistance', 'iso-6425'],
    hubLink: { href: '/style/diver', label: 'Browse diving watches' },
  },
  'in-house-movement': {
    slug: 'in-house-movement',
    term: 'In-House Movement (Manufacture)',
    short: 'An in-house or manufacture movement is designed and produced by the watch brand itself, rather than bought from a supplier like ETA or Sellita.',
    body: `The Swiss industry historically ran on supplied movements: ETA (Swatch Group), Sellita, and Miyota (Citizen) power thousands of brands. "In-house" claims vertical integration — Rolex, Grand Seiko, Jaeger-LeCoultre, and Lange build essentially everything; Tudor, Breitling, and Omega blend manufacture calibers with supplied ones across their ranges.

What in-house actually buys varies. Genuine advantages: longer power reserves and modern engineering (silicon springs, better escapements), plus exclusivity. Genuine disadvantages: servicing locks you to the brand's network at the brand's prices, while an ETA 2824 can be serviced by any competent watchmaker cheaply, forever.

The term is also marketing-elastic — "manufacture" calibers built on supplied base architecture are common. The pragmatic buyer's rule: below $2,000, supplied movements are a feature, not a compromise; above $5,000, in-house engineering is reasonably expected; between, judge the specific caliber, not the label.`,
    related: ['cosc-chronometer', 'power-reserve', 'automatic-movement'],
  },
  'integrated-bracelet': {
    slug: 'integrated-bracelet',
    term: 'Integrated Bracelet',
    short: 'An integrated bracelet flows directly out of the watch case with no visible lugs — the design language of the Royal Oak, Nautilus, and the modern luxury sport watch.',
    body: `Conventional watches have lugs holding a spring-bar; straps swap freely. An integrated design makes the bracelet's first links part of the case geometry — visually seamless, structurally committed. Gérald Genta's 1972 Royal Oak defined the form, followed by his Nautilus (1976) and the IWC Ingenieur; Girard-Perregaux's Laureato (1975) arrived from a different designer into the same idea.

The look dominated the 1970s, faded, and returned around 2016 to become the single most demanded category in luxury watches — driving trinity waitlists and a wave of revivals (Alpine Eagle, Defy Skyline, Tissot PRX) at every price.

The practical tradeoff is commitment: most integrated watches accept only their own bracelet or proprietary straps, so one watch means one look. Modern quick-change systems (Overseas, Alpine Eagle, PRX) are the category's answer. On the wrist, case and bracelet wearing as one piece is the entire point.`,
    related: ['oystersteel-904l', 'in-house-movement'],
    hubLink: { href: '/guides/integrated-bracelet-sport-watches-guide', label: 'Read the integrated-bracelet guide' },
  },
  'lume-super-luminova': {
    slug: 'lume-super-luminova',
    term: 'Lume (Super-LumiNova)',
    short: 'Lume is the photoluminescent paint on hands and indices that glows in darkness — Super-LumiNova and Seiko\'s LumiBrite are the modern standards.',
    body: `Modern lume is a strontium-aluminate pigment that charges in light and releases it as a glow — brightest in the first hour, readable for six or more in quality applications. It replaced radioactive predecessors: radium (banned by the 1960s, responsible for the Radium Girls tragedy) and tritium paint (phased out in the 1990s), whose aged remnants now define vintage-watch "patina."

Grades and colors vary: C3 green glows brightest; BGW9 blue-white suits modern aesthetics; "Old Radium" tints fake vintage warmth on reissues. Rolex's Chromalight is a proprietary blue formulation with claimed 8-hour legibility. Seiko's LumiBrite on divers is legendarily generous.

An alternative technology persists: tritium gas tubes (Ball, Marathon) glow continuously for ~25 years without charging, at the cost of gradual dimming and a different aesthetic. ISO 6425 dive certification makes dark-legibility a formal requirement, which is why dive watches carry the biggest lume plots.`,
    related: ['iso-6425', 'patina', 'sapphire-crystal'],
    hubLink: { href: '/style/diver', label: 'Browse diving watches' },
  },
  'oystersteel-904l': {
    slug: 'oystersteel-904l',
    term: 'Oystersteel (904L Steel)',
    short: 'Oystersteel is Rolex\'s name for 904L stainless steel — a corrosion-resistant alloy that polishes brighter than the industry-standard 316L.',
    body: `Most watch cases use 316L surgical steel: tough, hypoallergenic, proven. Rolex moved its entire production to 904L (branded Oystersteel in 2018) — an alloy with more chromium, nickel, and copper originally specified for chemical-industry equipment. Its practical benefits are superior corrosion resistance (especially against chlorides/sweat) and a whiter, brighter polish; its drawback is cost, since 904L is harder to machine and demands dedicated tooling.

The scratch-resistance difference is marginal — both alloys scratch in daily wear and both polish out. The real-world case for 904L is longevity of finish and the subtle luster collectors recognize across a room.

Rivals answer with their own metallurgy: Omega's O-MEGASTEEL, Chopard's Lucent Steel A223, Sinn's submarine steel with Tegiment surface hardening — the last actually addressing scratches directly, which neither 316L nor 904L does.`,
    related: ['integrated-bracelet', 'cerachrom-ceramic-bezel'],
    hubLink: { href: '/material/steel', label: 'Browse steel watches' },
  },
  patina: {
    slug: 'patina',
    term: 'Patina',
    short: 'Patina is the aging of a watch\'s dial, lume, or case — from tritium turning cream to bronze developing its oxide layer — prized when even, penalized when damage.',
    body: `In vintage collecting, patina is the honest record of time: tritium lume ripening to custard, black dials fading "tropical" brown, gilt prints softening. Even, attractive aging adds substantial value — a genuinely tropical Submariner dial can multiply a watch's price — while moisture damage, spotting, and flaking are just deterioration. The line between the two is the vintage market's central judgment call.

Bronze watches made patina a living feature: the Panerai Bronzo and Tudor Black Bay Bronze oxidize uniquely to their owner's wear, chemistry, and climate, and can be polished back to bare metal at will. Modern "fauxtina" — vintage-tinted Super-LumiNova on reissues like the Black Bay 58 and Longines Legend Diver — manufactures the look from day one, to permanent enthusiast controversy.

The collecting rule: patina must be original and even. Bought, it cannot be faked convincingly; cleaned, it cannot be recovered.`,
    related: ['lume-super-luminova', 'sapphire-crystal'],
    hubLink: { href: '/material/bronze', label: 'Browse bronze watches' },
  },
  'zaratsu-polishing': {
    slug: 'zaratsu-polishing',
    term: 'Zaratsu Polishing',
    short: 'Zaratsu is Grand Seiko\'s hand polishing technique that produces perfectly flat, distortion-free mirror surfaces on watch cases.',
    body: `Zaratsu (a Japanization of the German "Sallaz" polishing machines Seiko imported mid-century) presses a case facet against the flat side of a spinning tin disc rather than its edge. Executed by craftsmen after years of training, it yields mirror surfaces with zero waviness — hold a Grand Seiko case to a straight edge's reflection and the line stays perfectly straight, where conventionally polished cases ripple.

The technique defines the "Grammar of Design" aesthetic Taro Tanaka codified for Seiko in 1962: wide, flat planes meeting at crisp ridgelines, alternating mirror and hairline-brushed finishes to catch light like faceted crystal. It is the single most cited reason Grand Seiko finishing embarrasses Swiss cases at twice the price.

Sword-edge hands and multi-faceted indices receive the same treatment under magnification. The catch: those flawless planes show scratches honestly, and refinishing to Zaratsu standard requires sending the watch back to Japan.`,
    related: ['spring-drive', 'oystersteel-904l'],
  },
  'minute-repeater': {
    slug: 'minute-repeater',
    term: 'Minute Repeater',
    short: 'A minute repeater chimes the current time on demand — hours, quarters, and minutes struck on tuned gongs inside the case.',
    body: `Slide the case lever and the watch strikes: a low tone per hour, a two-tone chime per quarter, a high tone per minute past the quarter. 10:47 sounds as ten lows, three double-chimes, two highs. Invented for reading time in darkness before electric light, the repeater is now watchmaking's most demanding traditional complication — hundreds of components governed by a tiny regulator so the strikes pace evenly.

Sound quality is the entire game and resists industrialization: gong alloys, case material (titanium and steel ring louder than gold; platinum dampens), and hand-tuning determine whether a repeater sings or clanks. Patek Philippe's repeaters are personally sound-approved before delivery; Minerva-era techniques live on in Montblanc's exotics; Christopher Ward's Bel Canto democratized a cousin complication (sonnerie au passage) at $4,000.

Prices for true repeaters start six figures. It is the complication least justified by function and most justified by wonder.`,
    related: ['tourbillon', 'perpetual-calendar'],
  },
  'hacking-seconds': {
    slug: 'hacking-seconds',
    term: 'Hacking Seconds',
    short: 'Hacking (stop-seconds) halts the seconds hand when the crown is pulled out, allowing the watch to be set to the exact second.',
    body: `Pull the crown to the time-setting position and a small lever brakes the balance: the seconds hand freezes. Sync it to a reference clock, push the crown home at the tone, and the watch is set to the second. The feature originated in military synchronization — "hack watches" let units coordinate operations precisely — and remains the quiet mark of a properly specified movement.

Almost all modern Swiss movements hack; the notable holdouts were budget Japanese workhorses. Seiko's 7S26 (the SKX007's engine) famously neither hacked nor hand-wound, which is why its 4R36 successor advertising both felt like an upgrade event. Vostok's Amphibia continues non-hacking to this day as part of its Soviet-spec charm.

A related trick for non-hacking movements: gentle back-pressure on the crown can slow the balance enough to approximate a hack. For anyone who cares about the seconds hand meaning something, the real feature is worth checking on the spec sheet.`,
    related: ['manual-movement', 'cosc-chronometer', 'automatic-movement'],
  },
}

export const ALL_GLOSSARY = Object.keys(GLOSSARY_MAP)
