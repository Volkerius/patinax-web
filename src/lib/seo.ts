import { Metadata } from 'next'
import { toSlug } from './slug'
import { STYLE_MAP } from './style-content'
import { TIER_MAP } from './tier-content'

export const BASE_URL = 'https://patinax.com'

export const DEFAULT_SEO: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Patinax — Compare Luxury Watches Side by Side',
    template: '%s | Patinax'
  },
  description: 'Compare luxury watches side-by-side with specs, radar analysis, and expert verdicts. Rolex, Omega, Patek Philippe and 150+ brands.',
  keywords: [
    'watch comparison', 'luxury watch comparison', 'luxury watches',
    'rolex vs omega', 'patek philippe vs audemars piguet', 'watch specs comparison',
    'best luxury watches', 'watch buying guide', 'watch price comparison',
    'dive watch comparison', 'dress watch comparison', 'mechanical watch comparison',
    'horology', 'watch movement comparison', 'watch size comparison',
    'rolex submariner vs omega seamaster', 'nautilus vs royal oak',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  authors: [{ name: 'Patinax' }],
  creator: 'Patinax',
  publisher: 'Patinax',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Patinax',
    title: 'Patinax — Compare Luxury Watches Side by Side',
    description: 'Compare luxury watches side-by-side with specs, radar analysis, and expert verdicts. Rolex, Omega, Patek Philippe and 150+ brands.',
    images: [{
      url: `${BASE_URL}/og-default.jpg`,
      width: 1200,
      height: 630,
      alt: 'Patinax — Luxury Watch Comparison Platform'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@patinaxcom',
    creator: '@patinaxcom',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    'google-site-verification': 'google560e1eff916b5c15',
    'google-adsense-account': 'ca-pub-6685871080250476',
  },
}

export function generateComparisonMetadata(
  watchA: string,
  watchB: string,
  brandA: string,
  brandB: string,
  slug: string
): Metadata {
  const title = `${brandA} ${watchA} vs ${brandB} ${watchB} — Comparison`
  const description = `${brandA} ${watchA} vs ${brandB} ${watchB}: side-by-side specs, radar analysis, and expert verdict. Compare movement, size, and price.`

  return {
    title,
    description,
    keywords: [
      `${brandA.toLowerCase()} ${watchA.toLowerCase()} vs ${brandB.toLowerCase()} ${watchB.toLowerCase()}`,
      `${brandA.toLowerCase()} vs ${brandB.toLowerCase()}`,
      `${watchA.toLowerCase()} vs ${watchB.toLowerCase()}`,
      `${brandA.toLowerCase()} ${watchA.toLowerCase()} review`,
      `${brandB.toLowerCase()} ${watchB.toLowerCase()} review`,
      'luxury watch comparison', 'watch specs comparison',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${BASE_URL}/compare/${slug}`,
      siteName: 'Patinax',
      images: [{
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${brandA} ${watchA} vs ${brandB} ${watchB} Comparison`,
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/compare/${slug}`
    }
  }
}

export function generateWatchMetadata(brand: string, model: string, slug?: string): Metadata {
  const title = `${brand} ${model} — Specs, Price & Comparisons`
  const description = `${brand} ${model} specs: case size, movement, water resistance, and price. Compare with similar luxury watches side-by-side.`
  const url = slug
    ? `${BASE_URL}/watch/${slug.split('-').slice(0, brand.split(' ').length).join('-')}/${slug.split('-').slice(brand.split(' ').length).join('-')}`
    : `${BASE_URL}/watch/${toSlug(brand)}/${toSlug(model)}`

  return {
    title,
    description,
    keywords: [
      `${brand.toLowerCase()} ${model.toLowerCase()}`,
      `${brand.toLowerCase()} ${model.toLowerCase()} specs`,
      `${brand.toLowerCase()} ${model.toLowerCase()} price`,
      `${brand.toLowerCase()} ${model.toLowerCase()} review`,
      `${brand.toLowerCase()} watches`,
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Patinax',
      images: [{
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${brand} ${model} Luxury Watch`,
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url
    }
  }
}

export function generateBrandMetadata(brand: string, count?: number): Metadata {
  const title = count
    ? `${brand} Watches — All ${count} Models Compared`
    : `${brand} Watches — All Models Compared`
  const description = `Browse all ${brand} watch models with specs and comparisons. Find the perfect ${brand} timepiece.`
  const url = `${BASE_URL}/brand/${toSlug(brand)}`

  return {
    title,
    description,
    keywords: [
      `${brand.toLowerCase()} watches`,
      `${brand.toLowerCase()} watch models`,
      `${brand.toLowerCase()} watch prices`,
      `${brand.toLowerCase()} watch comparison`,
      `best ${brand.toLowerCase()} watch`,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'Patinax',
      images: [{
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${brand} Watches Collection`,
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url
    }
  }
}

export function generateStyleMetadata(style: string): Metadata {
  const content = STYLE_MAP[style]
  if (!content) {
    return {
      title: 'Watch Style',
      description: 'Explore watches by style on Patinax.',
    }
  }

  const url = `${BASE_URL}/style/${content.slug}`

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: [
      `${content.label.toLowerCase()}`,
      `best ${content.label.toLowerCase()}`,
      `${content.label.toLowerCase()} comparison`,
      `luxury ${content.label.toLowerCase()}`,
      `${content.label.toLowerCase()} 2026`,
    ],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: 'website',
      url,
      siteName: 'Patinax',
      images: [{
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${content.label} — Patinax`,
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
    },
    alternates: {
      canonical: url
    }
  }
}

export function generateTierMetadata(tier: string): Metadata {
  const content = TIER_MAP[tier]
  if (!content) {
    return {
      title: 'Watch Price Range',
      description: 'Explore watches by price range on Patinax.',
    }
  }

  const url = `${BASE_URL}/tier/${content.slug}`

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: [
      `${content.label.toLowerCase()} watches`,
      `best watches ${content.priceLabel.toLowerCase()}`,
      `luxury watches ${content.priceLabel.toLowerCase()}`,
      `${content.label.toLowerCase()} watch comparison`,
      `${content.label.toLowerCase()} watches 2026`,
    ],
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: 'website',
      url,
      siteName: 'Patinax',
      images: [{
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${content.label} Watches — Patinax`,
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
    },
    alternates: {
      canonical: url
    }
  }
}
