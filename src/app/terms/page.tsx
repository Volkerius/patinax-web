import { Metadata } from 'next'
import Link from 'next/link'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 604800

const LAST_UPDATED = 'May 1, 2026'
const CONTACT_EMAIL = 'oguzhanaygunpr@gmail.com'
const GOVERNING_LAW = 'the Republic of Türkiye'

export const metadata: Metadata = {
  title: 'Terms of Service — Patinax',
  description: 'Terms governing use of Patinax. No professional advice, acceptable use policy, IP rights, takedown process, and limitation of liability.',
  alternates: { canonical: `${BASE_URL}/terms` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Terms', item: `${BASE_URL}/terms` },
  ],
}

export default function TermsPage() {
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
            <li className="text-patina-text2">Terms</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-patina-text mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-patina-text3 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-6 text-patina-text2 leading-relaxed text-sm">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of Patinax (the &quot;Service&quot;), operated at <strong>{BASE_URL.replace(/^https?:\/\//, '')}</strong>. By using the Service, you agree to these Terms. If you don&apos;t agree, please don&apos;t use the Service.
          </p>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">1. The Service</h2>
            <p>
              Patinax is a free, ad-supported watch comparison platform. We aggregate publicly available technical specifications and present them in side-by-side comparison form alongside editorial commentary. The Service is provided &quot;as is&quot; for informational and educational purposes.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">2. No Professional Advice — Informational Only</h2>
            <p>
              Patinax is not a financial, investment, or purchasing advisor. Watch values, market prices, and performance commentary on the site are informational. Do not rely on Patinax content as the sole basis for buying, selling, or insuring a watch. Authenticate any watch through proper channels (manufacturer, authorized service center, or qualified appraiser) before transacting.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">3. Intellectual Property</h2>
            <p>
              All Patinax editorial content, comparison logic, page layouts, and original imagery are © Patinax. Technical specifications themselves are factual and not subject to copyright. Watch images sourced from manufacturers and Wikimedia are used under fair use or applicable licenses; image rights remain with their owners. Brand names and trademarks are used for identification and remain the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
              <li>Scrape, crawl, or harvest content from the Service in bulk, programmatically or otherwise, except via our published sitemap and standard search-engine indexing.</li>
              <li>Attempt to bypass rate limits, security controls, or access restrictions.</li>
              <li>Use the Service to mount denial-of-service attacks, spam, or any automated abuse.</li>
              <li>Reverse engineer, decompile, or attempt to extract source code from the Service beyond what&apos;s permitted by law.</li>
              <li>Use Patinax content to train machine learning models without explicit prior written permission.</li>
              <li>Frame, mirror, or redistribute substantial portions of the Service without permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">5. Third-Party Links and Content</h2>
            <p>
              The Service may include links to third-party sites and embedded third-party content (e.g., images from manufacturer CDNs, Wikimedia Commons). We don&apos;t control and aren&apos;t responsible for the content, privacy practices, or accuracy of third-party sites. Following such links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">6. Disclaimer and Limitation of Liability</h2>
            <p>
              The Service is provided <strong>&quot;as is&quot; and &quot;as available&quot;</strong>, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, accuracy, or non-infringement. To the maximum extent permitted by law, Patinax and its operators are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, even if advised of the possibility of such damages. Total liability, if any, is limited to the amount you paid for the Service in the past twelve months — which, for a free service, is zero.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">7. Takedown / DMCA</h2>
            <p>
              If you believe content on Patinax infringes your copyright, send a written notice to <a href={`mailto:${CONTACT_EMAIL}`} className="text-patina-gold hover:underline">{CONTACT_EMAIL}</a> with: identification of the copyrighted work; identification of the allegedly infringing material on Patinax (URL); your contact information; a statement of good-faith belief that the use is not authorized; a statement under penalty of perjury that the information is accurate and that you are authorized to act on behalf of the copyright owner; and your physical or electronic signature. Verified takedowns are processed within five business days.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">8. Changes to the Service</h2>
            <p>
              Patinax is under active development. We may modify, suspend, or discontinue any feature at any time without notice. We&apos;re not liable for any modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">9. Governing Law</h2>
            <p>
              These Terms are governed by the laws of {GOVERNING_LAW}, without regard to conflict-of-law principles. Disputes will be resolved in the courts of {GOVERNING_LAW}, and you consent to their jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">10. Contact</h2>
            <p>
              For questions about these Terms: <a href={`mailto:${CONTACT_EMAIL}`} className="text-patina-gold hover:underline">{CONTACT_EMAIL}</a>. Privacy practices are documented in the <Link href="/privacy-policy" className="text-patina-gold hover:underline">Privacy Policy</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
