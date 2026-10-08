import { Metadata } from 'next'
import Link from 'next/link'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 604800

export const metadata: Metadata = {
  title: 'About Patinax — The Luxury Watch Comparison Platform',
  description: 'Patinax compares 1,170+ luxury watches across 70+ brands with detailed specs, radar analysis, and editorial verdicts. Independent, ad-supported, no paid placements.',
  alternates: { canonical: `${BASE_URL}/about` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE_URL}/about` },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <nav className="py-4 text-xs text-patina-text3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-patina-gold transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-patina-text2">About</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-patina-text mb-6">
          About Patinax
        </h1>

        <div className="space-y-5 text-patina-text2 leading-relaxed">
          <p>
            Patinax is a luxury watch comparison platform built for collectors, prospective buyers, and horology enthusiasts who want objective, data-driven side-by-side analysis of fine timepieces. The catalog covers <strong>1,170+ watches across 70+ brands</strong>, from haute horlogerie maisons like Patek Philippe, A. Lange &amp; Söhne, and Vacheron Constantin down through accessible luxury references from Tudor, Tissot, and Hamilton.
          </p>

          <h2 className="font-playfair text-xl font-semibold text-patina-text pt-4">What We Do</h2>
          <p>
            Every watch on Patinax is presented with full specifications: case diameter, thickness, water resistance, movement type, caliber reference, power reserve, frequency, jewel count, COSC certification status, case and bezel materials, crystal type, and more. Comparison pages place any two watches side-by-side with a six-axis radar visualization across legibility, durability, precision, finishing, value retention, and rarity. Each comparison includes an automatically-generated advantage list and verdict drawn from the underlying spec data.
          </p>

          <h2 className="font-playfair text-xl font-semibold text-patina-text pt-4">Editorial Standards</h2>
          <p>
            Watch data is sourced from manufacturer technical documentation, public references, and curated historical archives — including vintage references from collector-grade sources. Where descriptions reference Wikipedia content, we extract structured facts and rewrite into our own voice, never copying verbatim. Our verdicts are derived from objective spec deltas rather than subjective preference, though we acknowledge horology is ultimately personal.
          </p>

          <h2 className="font-playfair text-xl font-semibold text-patina-text pt-4">No Paid Placement</h2>
          <p>
            Patinax accepts no payment from watchmakers, retailers, or distributors in exchange for inclusion, ranking, or favorable verdict. Comparison results are deterministic outputs of spec data — they do not change based on commercial relationships. Display advertising via Google AdSense is the only revenue source, and ad placements never influence which watches appear or how they are described.
          </p>

          <h2 className="font-playfair text-xl font-semibold text-patina-text pt-4">Our Values</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Objectivity:</strong> Spec-based comparisons, not opinion-driven rankings.</li>
            <li><strong>Transparency:</strong> Every spec field shows its source where applicable; comparison logic is the same for every pair.</li>
            <li><strong>Accessibility:</strong> Free for all readers, no paywalls, no email walls.</li>
            <li><strong>Accuracy:</strong> If you find a spec error, the Contact page accepts corrections within 5 business days.</li>
          </ul>

          <h2 className="font-playfair text-xl font-semibold text-patina-text pt-4">Contact</h2>
          <p>
            For corrections, takedown requests, editorial feedback, or partnership inquiries, see the <Link href="/contact" className="text-patina-gold hover:underline">Contact page</Link>. Privacy and terms of use are documented on <Link href="/privacy-policy" className="text-patina-gold hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-patina-gold hover:underline">Terms</Link> pages.
          </p>
        </div>
      </div>
    </>
  )
}
