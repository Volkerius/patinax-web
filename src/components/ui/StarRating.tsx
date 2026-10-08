export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of ${max} price range`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`text-sm ${i < rating ? 'text-patina-gold' : 'text-patina-text3/30'}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}
