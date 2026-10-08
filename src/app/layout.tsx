import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CompareProvider } from '@/context/CompareContext'
import { CompareBar } from '@/components/ui/CompareBar'
import { DEFAULT_SEO, BASE_URL } from '@/lib/seo'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = DEFAULT_SEO

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <head>
        {/* Speed up image loads — the Supabase CDN serves every watch photo. */}
        <link rel="preconnect" href="https://prsbjvgnxbrtrxtrncqt.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prsbjvgnxbrtrxtrncqt.supabase.co" />
        {/* Theme colour for mobile browsers — matches the patina-bg palette. */}
        <meta name="theme-color" content="#0a0a0a" />
        {/* AdSense + CMP DNS prefetch — saves ~100ms on first ad render */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://fundingchoicesmessages.google.com" />
        {/* Google Funding Choices CMP — IAB TCF v2.2.
            Required by AdSense policy for serving personalized ads to
            EEA / UK / Swiss users since January 2024. */}
        <script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-6685871080250476?ers=1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function s(){if(!window.frames['googlefcPresent']){if(document.body){var f=document.createElement('iframe');f.style='width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;display:none';f.name='googlefcPresent';document.body.appendChild(f);}else{setTimeout(s,0);}}}s();})();",
          }}
        />
        {/* AdSense ad serving script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6685871080250476"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-patina-bg text-patina-text">
        {/* Skip-to-content link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-patina-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-patina-bg focus:outline-none"
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Patinax',
            url: BASE_URL,
            logo: `${BASE_URL}/og-default.jpg`,
            sameAs: ['https://twitter.com/patinaxcom'],
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Patinax',
            url: BASE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
              'query-input': 'required name=search_term_string',
            },
          }) }}
        />
        <CompareProvider>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  )
}
