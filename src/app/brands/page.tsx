export const revalidate = 86400 // ISR: revalidate daily

import type { Metadata } from 'next'
import Link from 'next/link'
import { toSlug } from '@/lib/slug'
import { BrandsGrid } from '@/components/brands/BrandsGrid'
import { BASE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'All Watch Brands — Patinax',
  description:
    'Browse all luxury watch brands on Patinax. From Rolex and Omega to Patek Philippe and Audemars Piguet — explore 150+ premium watch brands with detailed comparisons.',
  keywords: [
    'luxury watch brands', 'watch brands list', 'all watch brands',
    'rolex', 'omega', 'patek philippe', 'audemars piguet', 'cartier',
    'best luxury watch brands', 'swiss watch brands', 'premium watch brands',
    'watch brand comparison', 'top watch brands', 'high end watches',
  ],
  alternates: { canonical: `${BASE_URL}/brands` },
  openGraph: {
    title: 'All Watch Brands — Patinax',
    description: 'Browse all luxury watch brands on Patinax. From Rolex and Omega to Patek Philippe — explore 150+ premium watch brands.',
    type: 'website',
    url: `${BASE_URL}/brands`,
    siteName: 'Patinax',
    images: [{ url: `${BASE_URL}/og-default.jpg`, width: 1200, height: 630, alt: 'All Luxury Watch Brands on Patinax' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Watch Brands — Patinax',
    description: 'Browse all luxury watch brands on Patinax. From Rolex to Patek Philippe — 150+ premium brands.',
  },
}

export default async function BrandsPage() {
  const { prisma } = await import('@/lib/prisma')
  const grouped = await prisma.watch.groupBy({
    by: ['brand'],
    _count: true,
    orderBy: { brand: 'asc' },
  })

  const brands = grouped.map((g) => ({
    name: g.brand,
    slug: toSlug(g.brand),
    count: g._count,
  }))

  const totalWatches = brands.reduce((sum, b) => sum + b.count, 0)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${BASE_URL}/brands` },
    ],
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Watch Brands',
    description: 'All luxury watch brands on Patinax.',
    url: `${BASE_URL}/brands`,
    numberOfItems: brands.length,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-patina-text2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-patina-text transition-colors">
                Home
              </Link>
            </li>
            <li className="text-patina-text2/50" aria-hidden="true">/</li>
            <li className="text-patina-text">Brands</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="font-playfair text-2xl sm:text-4xl font-bold tracking-tight md:text-5xl">
            All Watch Brands
          </h1>
          <p className="mt-3 text-patina-text2 leading-relaxed">
            Explore every luxury watch brand on Patinax. The catalogue covers
            {' '}<span className="text-patina-text font-medium">{brands.length}</span>{' '}brands and
            {' '}<span className="text-patina-text font-medium">{totalWatches.toLocaleString()}</span>{' '}individual
            watch models — from mainstream Swiss houses like Rolex, Omega, and Tudor to haute
            horlogerie manufactures like Patek Philippe, A. Lange &amp; Söhne, and F.P. Journe.
            Select any brand to see its full model list, heritage overview, and popular comparisons.
          </p>
        </header>

        {/* Client component for interactive grid */}
        <div className="mt-10">
          <BrandsGrid brands={brands} />
        </div>
      </div>
    </>
  )
}
