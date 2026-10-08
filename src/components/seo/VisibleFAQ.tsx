'use client'

interface FAQItem {
  question: string
  answer: string
}

interface VisibleFAQProps {
  items: FAQItem[]
  title?: string
}

export function VisibleFAQ({ items, title = 'Frequently Asked Questions' }: VisibleFAQProps) {
  if (items.length === 0) return null

  return (
    <section className="py-8">
      <h2 className="font-playfair text-xl font-semibold text-patina-text mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-patina-border bg-patina-bg2 overflow-hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-patina-text hover:text-patina-gold transition-colors select-none">
              <span>{item.question}</span>
              <span className="ml-3 shrink-0 text-patina-gold transition-transform group-open:rotate-45 text-lg leading-none">+</span>
            </summary>
            <div className="px-5 pb-4 text-sm text-patina-text2 leading-relaxed border-t border-patina-border pt-3">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
