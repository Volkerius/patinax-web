import { Metadata } from 'next'
import Link from 'next/link'
import { BASE_URL } from '@/lib/seo'

export const revalidate = 604800

const LAST_UPDATED = 'May 1, 2026'
const CONTACT_EMAIL = 'oguzhanaygunpr@gmail.com'

export const metadata: Metadata = {
  title: 'Privacy Policy — Patinax',
  description: 'How Patinax collects, uses, and protects information. GDPR and CCPA compliant. AdSense disclosures, cookie practices, and your data rights.',
  alternates: { canonical: `${BASE_URL}/privacy-policy` },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${BASE_URL}/privacy-policy` },
  ],
}

export default function PrivacyPolicyPage() {
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
            <li className="text-patina-text2">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-patina-text mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-patina-text3 mb-8">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-6 text-patina-text2 leading-relaxed text-sm">
          <p>
            Patinax (&quot;we,&quot; &quot;us,&quot; the &quot;site&quot;) operates the watch comparison platform at <strong>{BASE_URL.replace(/^https?:\/\//, '')}</strong>. This policy explains what information we collect, how it&apos;s used, and what rights you have under GDPR (EU/UK), CCPA (California), and similar regimes.
          </p>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">1. Information We Collect</h2>
            <p>
              We collect minimal personal information. The site uses no account system, so we do not store names, emails, or passwords. We do collect:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
              <li><strong>Server access logs</strong> — IP address, user-agent, requested URL, timestamp, response status. Retained for 30 days for security and abuse-prevention purposes.</li>
              <li><strong>Comparison view counts</strong> — aggregate, non-identifying counters used to rank popular comparisons.</li>
              <li><strong>Local browser storage</strong> — your selected watches in the &quot;Compare&quot; tray persist in <code>localStorage</code> only on your own device. Patinax has no access to this data.</li>
              <li><strong>Advertising data via AdSense</strong> — see Section 4.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">2. How We Use Information</h2>
            <p>
              Server logs are used exclusively for security monitoring (rate limiting, abuse blocking) and operational debugging. Aggregate view counts inform editorial prioritization. We do not sell, rent, or share log data with third parties except as required by law.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">3. Legal Basis (GDPR Article 6)</h2>
            <p>
              For users in the European Economic Area, our processing relies on:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
              <li><strong>Legitimate interest</strong> (Art. 6(1)(f)) for server logs, security monitoring, and aggregate analytics.</li>
              <li><strong>Consent</strong> (Art. 6(1)(a)) for personalized advertising via Google AdSense, collected through a Funding Choices CMP banner.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">4. Third-Party Services</h2>
            <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
              <li><strong>Vercel</strong> — hosting and CDN. Vercel privacy: <a href="https://vercel.com/legal/privacy-policy" rel="noopener" className="text-patina-gold hover:underline">vercel.com/legal/privacy-policy</a></li>
              <li><strong>Supabase</strong> — database and image storage. Privacy: <a href="https://supabase.com/privacy" rel="noopener" className="text-patina-gold hover:underline">supabase.com/privacy</a></li>
              <li><strong>Google AdSense</strong> — display advertising. Google may use cookies and device identifiers to serve personalized ads. You can opt out via <a href="https://www.google.com/settings/ads" rel="noopener" className="text-patina-gold hover:underline">google.com/settings/ads</a> or learn more at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener" className="text-patina-gold hover:underline">policies.google.com/technologies/partner-sites</a>.</li>
              <li><strong>Google Funding Choices</strong> — Consent Management Platform that displays the EEA/UK/Swiss consent banner.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">5. Cookies</h2>
            <p>
              Patinax itself sets no first-party cookies. Google AdSense and Funding Choices may set cookies for advertising and consent management. EEA, UK, and Swiss users see a consent banner before non-essential cookies are set; users elsewhere can still manage cookies through browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">6. Your Rights (GDPR / CCPA)</h2>
            <p>
              EEA, UK, and Swiss residents have the rights to access, rectify, erase, restrict, port, and object to processing of their personal data. California residents have the right to know, delete, and opt out of the sale of personal information (Patinax does not sell personal information). To exercise any right, contact <a href={`mailto:${CONTACT_EMAIL}`} className="text-patina-gold hover:underline">{CONTACT_EMAIL}</a>. We respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">7. Children</h2>
            <p>
              Patinax is not directed at children under 13 (or 16 in EEA countries with stricter age limits). We do not knowingly collect personal information from children. If you believe a child has provided personal information, contact us for prompt deletion.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">8. International Transfers</h2>
            <p>
              Patinax is operated from outside the European Economic Area. By using the site, EEA visitors acknowledge that server logs may be processed in jurisdictions with different data protection standards. We rely on Vercel&apos;s and Supabase&apos;s standard contractual clauses for transfer safeguards.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">9. Security</h2>
            <p>
              We use industry-standard transport encryption (HTTPS), Vercel&apos;s edge security, and access controls on database systems. No method of transmission or storage is 100% secure; we encourage caution when sending sensitive information.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy as the site evolves. The &quot;Last updated&quot; date at the top reflects the most recent revision. Material changes will be noted prominently on the site.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-lg font-semibold text-patina-text mb-2">11. Contact</h2>
            <p>
              Questions, complaints, or rights requests: <a href={`mailto:${CONTACT_EMAIL}`} className="text-patina-gold hover:underline">{CONTACT_EMAIL}</a>. See also the <Link href="/contact" className="text-patina-gold hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
