'use client'

import { useCompare } from '@/context/CompareContext'

interface CompareButtonProps {
  watch: { brand: string; model: string; slug: string }
}

export function CompareButton({ watch }: CompareButtonProps) {
  const { addWatch, removeWatch, isSelected } = useCompare()
  const selected = isSelected(watch.slug)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (selected) {
      removeWatch(watch.slug)
    } else {
      addWatch(watch)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={selected ? 'Remove from compare' : 'Add to compare'}
      className={`absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition-all ${
        selected
          ? 'border-[#c9a84c] bg-[#c9a84c] text-[#0a0a0a]'
          : 'border-[#c9a84c]/50 bg-[#0a0a0a]/70 text-[#c9a84c] hover:border-[#c9a84c] hover:bg-[#c9a84c]/20'
      }`}
    >
      {selected ? '✓' : '+'}
    </button>
  )
}
