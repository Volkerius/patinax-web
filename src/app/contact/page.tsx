import { Metadata } from 'next'
import Link from 'next/link'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 604800

const CONTACT_EMAIL = 'oguzhanaygunpr@gmail.com'

export const metadata: Metadata = {
  title: 'Contact Patinax — Corrections, DMCA, Editorial & Partnerships',
  description: 'Contact Patinax for spec corrections, DMCA / takedown requests, editorial feedback, or partnership inquiries. Five business day response commitment.',
  alternates: { canonical: `${BASE_URL}/contact` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
  ],
}

const contactCategories = [
  {
    title: 'Corrections',
    description: 'Spotted a wrong spec, an outdated reference, or a factual mistake in a watch entry or comparison? Send the URL, the field that\'s wrong, and the correct value — citation appreciated. We respond within five business days.',
  },
  {
    title: 'DMCA / Takedown Requests',
    description: 'For copyright concerns or content takedown requests under DMCA or equivalent, include the original work, the allegedly infringing URL on Patinax, your contact information, and a good-faith statement. Verified takedowns are processed within five business days.',
  },
  {
    title: 'Editorial Feedback',
    description: 'Suggestions for new comparisons, brand coverage gaps, or feedback on the comparison logic and verdict generation. We read everything but reply selectively to substantive editorial input.',
  },
  {
    title: 'Partnerships and Press',
    description: 'For press inquiries, manufacturer outreach, or partnership discussions, include your organization, role, and the nature of the proposal. Note that Patinax does not accept paid placement or sponsored verdicts — see the About page for editorial policy.',
  },
]

export default function ContactPage() {
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
            <li className="text-patina-text2">Contact</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-patina-text mb-4">
          Contact Patinax
        </h1>

        <p className="text-patina-text2 leading-relaxed mb-8">
          One inbox covers everything. Pick the category that fits your message so we can route it correctly. We reply to legitimate inquiries within <strong>five business days</strong>.
        </p>

        <div className="rounded-xl border border-patina-border bg-patina-bg2 p-6 mb-10">
          <p className="text-xs uppercase tracking-widest text-patina-text3 mb-2">Email</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-mono text-lg text-patina-gold hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <h2 className="font-playfair text-xl font-semibold text-patina-text mb-4">
          What to include in your message
        </h2>

        <div className="space-y-5">
          {contactCategories.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-patina-border bg-patina-bg2 p-5">
              <h3 className="font-playfair text-lg font-semibold text-patina-text mb-2">
                {cat.title}
              </h3>
              <p className="text-sm text-patina-text2 leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-sm text-patina-text2 space-y-2">
          <p>
            For legal terms of use, see the <Link href="/terms" className="text-patina-gold hover:underline">Terms of Service</Link>. For data handling and cookies, see the <Link href="/privacy-policy" className="text-patina-gold hover:underline">Privacy Policy</Link>.
          </p>
          <p>
            Patinax does not have a phone line. Email is the only supported channel.
          </p>
        </div>
      </div>
    </>
  )
}
