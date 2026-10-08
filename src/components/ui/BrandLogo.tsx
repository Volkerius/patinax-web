export function BrandLogo({ brand, size = 'md' }: { brand: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-6 w-6 text-[10px]', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-lg' }

  return (
    <div className={`flex items-center justify-center rounded-full bg-patina-bg3 border border-patina-border ${sizes[size]}`}>
      <span className="font-playfair font-bold text-patina-gold uppercase">
        {brand.charAt(0)}
      </span>
    </div>
  )
}
