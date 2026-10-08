import { toSlug } from '@/lib/slug'
import { BASE_URL } from '@/lib/seo'

const SITE_URL = BASE_URL

interface ComparisonJsonLdProps {
  watchA: { name: string; brand: string; image?: string | null; priceRange?: number | null }
  watchB: { name: string; brand: string; image?: string | null; priceRange?: number | null }
  url: string
  faq: { question: string; answer: string }[]
}

function buildOffers(priceRange?: number | null) {
  const priceInfo = priceRange ? PRICE_RANGE_MAP[priceRange] : null
  const nextYear = new Date().getFullYear() + 1
  return {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: priceInfo?.low ?? 1000,
    highPrice: priceInfo?.high ?? 50000,
    offerCount: 1,
    availability: 'https://schema.org/InStock',
    priceValidUntil: `${nextYear}-12-31`,
  }
}

export function ComparisonJsonLd({ watchA, watchB, url, faq }: ComparisonJsonLdProps) {
  const productA: Record<string, unknown> = {
    '@type': 'Product',
    name: `${watchA.brand} ${watchA.name}`,
    brand: { '@type': 'Brand', name: watchA.brand },
    offers: buildOffers(watchA.priceRange),
  }
  if (watchA.image) productA.image = watchA.image

  const productB: Record<string, unknown> = {
    '@type': 'Product',
    name: `${watchB.brand} ${watchB.name}`,
    brand: { '@type': 'Brand', name: watchB.brand },
    offers: buildOffers(watchB.priceRange),
  }
  if (watchB.image) productB.image = watchB.image

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${watchA.brand} ${watchA.name} vs ${watchB.brand} ${watchB.name}`,
    url,
    numberOfItems: 2,
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: productA },
      { '@type': 'ListItem', position: 2, item: productB },
    ],
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE_URL}/search` },
      { '@type': 'ListItem', position: 3, name: `${watchA.brand} ${watchA.name} vs ${watchB.brand} ${watchB.name}`, item: url },
    ]
  }

  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}

const PRICE_RANGE_MAP: Record<number, { low: number; high: number }> = {
  1: { low: 500, high: 2000 },
  2: { low: 2000, high: 5000 },
  3: { low: 5000, high: 15000 },
  4: { low: 15000, high: 50000 },
  5: { low: 50000, high: 500000 },
}

export function WatchJsonLd({ watch }: { watch: { brand: string; model: string; imageUrl?: string | null; movement?: string | null; reference?: string | null; caseDiameter?: number | null; waterResistance?: number | null; caseMaterial?: string | null; priceRange?: number | null } }) {
  const priceInfo = watch.priceRange ? PRICE_RANGE_MAP[watch.priceRange] : null
  const lowPrice = priceInfo?.low ?? 1000
  const highPrice = priceInfo?.high ?? 50000

  // Price valid until end of next year (for SEO freshness)
  const nextYear = new Date().getFullYear() + 1
  const priceValidUntil = `${nextYear}-12-31`

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${watch.brand} ${watch.model}`,
    brand: { '@type': 'Brand', name: watch.brand },
    description: `${watch.brand} ${watch.model} luxury watch${watch.movement ? ` with ${watch.movement} movement` : ''}${watch.caseDiameter ? `, ${watch.caseDiameter}mm case` : ''}${watch.waterResistance ? `, ${watch.waterResistance}m water resistance` : ''}.`,
    category: 'Luxury Watches',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice,
      highPrice,
      offerCount: 1,
      availability: 'https://schema.org/InStock',
      priceValidUntil,
      url: `${SITE_URL}/watch/${toSlug(watch.brand)}/${toSlug(watch.model)}`,
    },
  }
  if (watch.imageUrl) jsonLd.image = watch.imageUrl
  if (watch.reference) jsonLd.sku = watch.reference
  if (watch.caseMaterial) jsonLd.material = watch.caseMaterial

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: watch.brand, item: `${SITE_URL}/brand/${toSlug(watch.brand)}` },
      { '@type': 'ListItem', position: 3, name: `${watch.brand} ${watch.model}`, item: `${SITE_URL}/watch/${toSlug(watch.brand)}/${toSlug(watch.model)}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}

export function BrandJsonLd({ brand, watchCount }: { brand: string; watchCount: number }) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${brand} Watches`, item: `${SITE_URL}/brand/${toSlug(brand)}` },
    ],
  }

  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${brand} Watches`,
    description: `Browse all ${watchCount} ${brand} watch models with detailed specifications and comparisons.`,
    url: `${SITE_URL}/brand/${toSlug(brand)}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
    </>
  )
}

/* ── Style Page JSON-LD ── */

interface StylePageJsonLdProps {
  style: string
  label: string
  description: string
  watchCount: number
  faq: { question: string; answer: string }[]
}

export function StylePageJsonLd({ style, label, description, watchCount, faq }: StylePageJsonLdProps) {
  const url = `${SITE_URL}/style/${style}`

  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${label}`,
    description,
    url,
    numberOfItems: watchCount,
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: label, item: url },
    ],
  }

  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}

/* ── Tier Page JSON-LD ── */

interface TierPageJsonLdProps {
  tier: string
  label: string
  priceLabel: string
  description: string
  watchCount: number
  faq: { question: string; answer: string }[]
}

export function TierPageJsonLd({ tier, label, priceLabel, description, watchCount, faq }: TierPageJsonLdProps) {
  const url = `${SITE_URL}/tier/${tier}`

  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${label} Watches (${priceLabel})`,
    description,
    url,
    numberOfItems: watchCount,
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `${label} (${priceLabel})`, item: url },
    ],
  }

  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}

/* ── Top List JSON-LD ── */

interface TopListJsonLdProps {
  title: string
  slug: string
  description: string
  items: { name: string; brand: string; url: string }[]
  faq: { question: string; answer: string }[]
}

export function TopListJsonLd({ title, slug, description, items, faq }: TopListJsonLdProps) {
  const url = `${SITE_URL}/top/${slug}`

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        brand: { '@type': 'Brand', name: item.brand },
        url: item.url,
      },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Top Lists', item: `${SITE_URL}/top` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  }

  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}

/* ── Brand vs Brand JSON-LD ── */

interface BrandVsBrandJsonLdProps {
  brandA: string
  brandB: string
  slug: string
  comparisons: { name: string; url: string }[]
  faq: { question: string; answer: string }[]
}

export function BrandVsBrandJsonLd({ brandA, brandB, slug, comparisons, faq }: BrandVsBrandJsonLdProps) {
  const url = `${SITE_URL}/versus/${slug}`

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brandA} vs ${brandB} — Watch Comparisons`,
    url,
    numberOfItems: comparisons.length,
    itemListElement: comparisons.map((comp, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        name: comp.name,
        url: comp.url,
      },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Brand vs Brand', item: `${SITE_URL}/versus` },
      { '@type': 'ListItem', position: 3, name: `${brandA} vs ${brandB}`, item: url },
    ],
  }

  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
