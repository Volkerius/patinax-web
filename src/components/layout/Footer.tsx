import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-patina-border bg-patina-bg mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
          {/* Popular Brands */}
          <div>
            <h3 className="text-sm font-medium text-patina-text mb-3">Popular Brands</h3>
            <ul className="space-y-2 text-sm text-patina-text2">
              <li><Link href="/brand/rolex" className="hover:text-patina-gold transition-colors">Rolex</Link></li>
              <li><Link href="/brand/omega" className="hover:text-patina-gold transition-colors">Omega</Link></li>
              <li><Link href="/brand/patek-philippe" className="hover:text-patina-gold transition-colors">Patek Philippe</Link></li>
              <li><Link href="/brand/audemars-piguet" className="hover:text-patina-gold transition-colors">Audemars Piguet</Link></li>
              <li><Link href="/brand/vacheron-constantin" className="hover:text-patina-gold transition-colors">Vacheron Constantin</Link></li>
              <li><Link href="/brand/tudor" className="hover:text-patina-gold transition-colors">Tudor</Link></li>
              <li><Link href="/brand/cartier" className="hover:text-patina-gold transition-colors">Cartier</Link></li>
              <li><Link href="/brand/iwc" className="hover:text-patina-gold transition-colors">IWC</Link></li>
              <li><Link href="/brand/jaeger-lecoultre" className="hover:text-patina-gold transition-colors">Jaeger-LeCoultre</Link></li>
              <li><Link href="/brands" className="hover:text-patina-gold transition-colors text-patina-gold/80">View all brands &rarr;</Link></li>
            </ul>
          </div>

          {/* More Brands */}
          <div>
            <h3 className="text-sm font-medium text-patina-text mb-3">More Brands</h3>
            <ul className="space-y-2 text-sm text-patina-text2">
              <li><Link href="/brand/breitling" className="hover:text-patina-gold transition-colors">Breitling</Link></li>
              <li><Link href="/brand/tag-heuer" className="hover:text-patina-gold transition-colors">TAG Heuer</Link></li>
              <li><Link href="/brand/zenith" className="hover:text-patina-gold transition-colors">Zenith</Link></li>
              <li><Link href="/brand/grand-seiko" className="hover:text-patina-gold transition-colors">Grand Seiko</Link></li>
              <li><Link href="/brand/panerai" className="hover:text-patina-gold transition-colors">Panerai</Link></li>
              <li><Link href="/brand/hublot" className="hover:text-patina-gold transition-colors">Hublot</Link></li>
              <li><Link href="/brand/longines" className="hover:text-patina-gold transition-colors">Longines</Link></li>
              <li><Link href="/brand/tissot" className="hover:text-patina-gold transition-colors">Tissot</Link></li>
              <li><Link href="/brand/hamilton" className="hover:text-patina-gold transition-colors">Hamilton</Link></li>
              <li><Link href="/brand/oris" className="hover:text-patina-gold transition-colors">Oris</Link></li>
            </ul>
          </div>

          {/* Watch Categories */}
          <div>
            <h3 className="text-sm font-medium text-patina-text mb-3">Watch Categories</h3>
            <ul className="space-y-2 text-sm text-patina-text2">
              <li><Link href="/style/diver" className="hover:text-patina-gold transition-colors">Diving Watches</Link></li>
              <li><Link href="/style/dress" className="hover:text-patina-gold transition-colors">Dress Watches</Link></li>
              <li><Link href="/style/sport" className="hover:text-patina-gold transition-colors">Sport Watches</Link></li>
              <li><Link href="/style/pilot" className="hover:text-patina-gold transition-colors">Pilot Watches</Link></li>
              <li><Link href="/style/field" className="hover:text-patina-gold transition-colors">Field Watches</Link></li>
              <li><Link href="/style/chrono" className="hover:text-patina-gold transition-colors">Chronograph Watches</Link></li>
            </ul>
          </div>

          {/* Price Ranges */}
          <div>
            <h3 className="text-sm font-medium text-patina-text mb-3">Price Ranges</h3>
            <ul className="space-y-2 text-sm text-patina-text2">
              <li><Link href="/tier/entry-luxury" className="hover:text-patina-gold transition-colors">Under $2,000</Link></li>
              <li><Link href="/tier/accessible-luxury" className="hover:text-patina-gold transition-colors">$2,000 – $5,000</Link></li>
              <li><Link href="/tier/mid-luxury" className="hover:text-patina-gold transition-colors">$5,000 – $15,000</Link></li>
              <li><Link href="/tier/high-luxury" className="hover:text-patina-gold transition-colors">$15,000 – $50,000</Link></li>
              <li><Link href="/tier/ultra-luxury" className="hover:text-patina-gold transition-colors">$50,000+</Link></li>
            </ul>
          </div>

          {/* By Material / Size / Movement */}
          <div>
            <h3 className="text-sm font-medium text-patina-text mb-3">By Case Material</h3>
            <ul className="space-y-2 text-sm text-patina-text2 mb-5">
              <li><Link href="/material/steel" className="hover:text-patina-gold transition-colors">Stainless Steel</Link></li>
              <li><Link href="/material/gold" className="hover:text-patina-gold transition-colors">Gold</Link></li>
              <li><Link href="/material/titanium" className="hover:text-patina-gold transition-colors">Titanium</Link></li>
              <li><Link href="/material/ceramic" className="hover:text-patina-gold transition-colors">Ceramic</Link></li>
              <li><Link href="/material/bronze" className="hover:text-patina-gold transition-colors">Bronze</Link></li>
            </ul>
            <h3 className="text-sm font-medium text-patina-text mb-3">By Movement</h3>
            <ul className="space-y-2 text-sm text-patina-text2">
              <li><Link href="/movement/automatic" className="hover:text-patina-gold transition-colors">Automatic</Link></li>
              <li><Link href="/movement/manual" className="hover:text-patina-gold transition-colors">Manual Wind</Link></li>
              <li><Link href="/movement/quartz" className="hover:text-patina-gold transition-colors">Quartz</Link></li>
              <li><Link href="/movement/spring-drive" className="hover:text-patina-gold transition-colors">Spring Drive</Link></li>
            </ul>
          </div>

          {/* Top Comparisons */}
          <div>
            <h3 className="text-sm font-medium text-patina-text mb-3">Top Comparisons</h3>
            <ul className="space-y-2 text-sm text-patina-text2">
              <li><Link href="/compare/rolex-submariner-vs-omega-seamaster" className="hover:text-patina-gold transition-colors">Submariner vs Seamaster</Link></li>
              <li><Link href="/compare/rolex-datejust-vs-omega-aqua-terra" className="hover:text-patina-gold transition-colors">Datejust vs Aqua Terra</Link></li>
              <li><Link href="/compare/rolex-submariner-vs-tudor-black-bay" className="hover:text-patina-gold transition-colors">Submariner vs Black Bay</Link></li>
              <li><Link href="/compare/patek-philippe-nautilus-vs-audemars-piguet-royal-oak" className="hover:text-patina-gold transition-colors">Nautilus vs Royal Oak</Link></li>
              <li><Link href="/compare/omega-speedmaster-vs-rolex-daytona" className="hover:text-patina-gold transition-colors">Speedmaster vs Daytona</Link></li>
              <li><Link href="/compare/cartier-santos-vs-cartier-tank" className="hover:text-patina-gold transition-colors">Santos vs Tank</Link></li>
            </ul>
          </div>

          {/* Explore + Company */}
          <div>
            <h3 className="text-sm font-medium text-patina-text mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-patina-text2">
              <li><Link href="/watches" className="hover:text-patina-gold transition-colors">All Watches</Link></li>
              <li><Link href="/brands" className="hover:text-patina-gold transition-colors">All Brands</Link></li>
              <li><Link href="/find-your-watch" className="hover:text-patina-gold transition-colors text-patina-gold/90">Find Your Watch Quiz</Link></li>
              <li><Link href="/guides" className="hover:text-patina-gold transition-colors">Buying Guides</Link></li>
              <li><Link href="/glossary" className="hover:text-patina-gold transition-colors">Watch Glossary</Link></li>
              <li><Link href="/search" className="hover:text-patina-gold transition-colors">Search</Link></li>
              <li><Link href="/top/best-diving-watches" className="hover:text-patina-gold transition-colors">Best Diving Watches</Link></li>
              <li><Link href="/top/best-dress-watches" className="hover:text-patina-gold transition-colors">Best Dress Watches</Link></li>
              <li><Link href="/top/best-chronograph-watches" className="hover:text-patina-gold transition-colors">Best Chronographs</Link></li>
              <li><Link href="/top/best-pilot-watches" className="hover:text-patina-gold transition-colors">Best Pilot Watches</Link></li>
              <li><Link href="/top/best-affordable-luxury" className="hover:text-patina-gold transition-colors">Best Affordable Luxury</Link></li>
              <li><Link href="/top/best-investment-watches" className="hover:text-patina-gold transition-colors">Best Investment Watches</Link></li>
            </ul>
            <div className="mt-6">
              <Logo size="sm" />
              <p className="mt-3 text-sm text-patina-text2">
                The definitive luxury watch comparison platform.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-patina-border pt-6 flex flex-col items-center gap-3 text-xs text-patina-text3">
          <nav aria-label="Legal and company" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {[
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
              { href: '/privacy-policy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-patina-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <p>&copy; {new Date().getFullYear()} Patinax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
