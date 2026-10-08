/**
 * One-off: write human-authored descriptions for the 4 watches Google
 * flagged as "Crawled - currently not indexed" (thin content).
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const descriptions = {
  'omega-de-ville': `Part of Omega's long-running dress collection, the De Ville sits at the quieter end of the brand's catalog — a restrained 33mm steel dress watch that prioritizes proportion over presence. The modest case diameter places it firmly in mid-size territory, paired with an 11mm profile that slides easily under a cuff. The scratch-resistant sapphire crystal keeps the dial clean through decades of wear.

Under the caseback, the automatic Caliber 8500 delivers a generous 60-hour power reserve and carries COSC chronometer certification, meaning this watch is independently tested to run within -4/+6 seconds per day. Water resistance is rated at a conservative 30 meters — splash-proof rather than swim-ready, consistent with the watch's dress-first mission.

Best suited to formal occasions, office wear, and anyone who prefers traditional watchmaking sensibility over sports-watch bulk, the De Ville offers Swiss mechanical watchmaking at an entry price point. At this tier it competes with similarly sized dress watches from Longines, Tissot, and Hamilton, distinguished mainly by Omega's in-house movement and chronometer certification.`,

  'zenith-el-primero': `The El Primero name refers to Zenith's pioneering high-beat chronograph caliber — the same movement family that powered some of the most important chronograph wristwatches of the last half-century. This 40mm iteration carries that heritage with a balanced, contemporary profile, measuring 12.6mm thick and wearing comfortably across a wide range of wrist sizes.

The Caliber El Primero 400 inside beats at a high frequency, offering a 50-hour power reserve and COSC chronometer certification for verified accuracy. 100 meters of water resistance means this watch handles swimming and active daily use without concern — unusual for a chronograph in this segment. A sapphire crystal protects the dial from everyday abrasion.

The El Primero sits in a specific sweet spot: it's a chronograph collector's piece with genuine horological credentials, not a fashion chronograph with a quartz module. Ideal for enthusiasts who want an automatic chrono with serious movement heritage, it competes with offerings from TAG Heuer, Breitling, and Tudor at this price range, differentiated primarily by Zenith's in-house high-beat caliber.`,

  'bell-ross-br-03-92-diver': `Drawn directly from Bell & Ross's aviation-inspired instrument vocabulary, the BR 03-92 Diver (reference BR0392-D-BU-ST/SRB) adapts the brand's signature square 42mm case to genuine dive duty. The stainless-steel case measures 12mm thick and carries a rotating ceramic bezel — scratch-resistant and far more durable than the aluminum bezels found on lower-tier divers.

Water resistance is rated to 300 meters, well beyond the ISO 6425 threshold for a proper dive watch. The Caliber BR-CAL.302 is an automatic movement running at 4Hz with 25 jewels and a 38-hour power reserve. A sapphire crystal protects the dial. The power reserve is on the shorter side for this category, meaning weekend-off wearers will find the watch stopped on Monday unless worn regularly or wound.

This is a 2019-generation tool watch designed for buyers who want dive-watch capability without the cushion or traditional round-case aesthetic. It competes against divers from Tudor, Longines, and Oris in the same price tier — the case shape and aviation-brand DNA being the key points of differentiation.`,

  'iwc-da-vinci-chronograph': `IWC's Da Vinci line has been the brand's more design-forward collection since its debut, and the Chronograph version expresses that through a 44mm case paired with a complicated multi-register dial. At 12mm thick the proportions feel substantial but not ungainly, suited to buyers who want visible watch presence and a working chronograph function for timing.

The automatic movement offers a long 60-hour power reserve — enough to survive a weekend off-wrist without resetting — and is protected by sapphire crystal above the dial. Water resistance is rated at 60 meters, appropriate for daily wear, hand-washing, and rain but not for swimming or watersports. The dial layout is optimized for reading elapsed time at a glance, the core purpose of a chronograph.

This is a watch aimed at buyers who want mid-tier Swiss chronograph watchmaking with recognizable haute-horlogerie design cues, sitting in the mid-luxury price range. Natural alternatives include the IWC Portugieser Chronograph, the Omega Speedmaster Reduced, and similar Swiss-made chronographs — the Da Vinci distinguishing itself mainly through its rounded-case design language and IWC branding.`,
}

async function main() {
  for (const [slug, description] of Object.entries(descriptions)) {
    const result = await prisma.watch.update({
      where: { slug },
      data: { description },
    })
    console.log(`✅ ${result.brand} ${result.model}`)
  }
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1) })
