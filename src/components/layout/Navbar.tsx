import Link from 'next/link'
import { Logo } from './Logo'
import { SearchBar } from '../ui/SearchBar'
import { MobileNav } from './MobileNav'

export function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-patina-border bg-patina-bg/80 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina-gold/50 rounded"
          aria-label="Patinax — home"
        >
          <Logo />
        </Link>
        <div className="hidden md:block flex-1 max-w-md">
          <SearchBar />
        </div>
        <div className="hidden sm:flex items-center gap-6 shrink-0">
          <Link
            href="/watches"
            className="text-sm text-patina-text2 hover:text-patina-text transition-colors"
          >
            Watches
          </Link>
          <Link
            href="/brands"
            className="text-sm text-patina-text2 hover:text-patina-text transition-colors"
          >
            Brands
          </Link>
          <Link
            href="/find-your-watch"
            className="text-sm font-medium text-patina-gold hover:text-patina-gold2 transition-colors"
          >
            Find Your Watch
          </Link>
          <Link
            href="/search"
            className="text-sm text-patina-text2 hover:text-patina-text transition-colors"
          >
            Browse
          </Link>
        </div>
        <MobileNav />
      </div>
    </nav>
  )
}
