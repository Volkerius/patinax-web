import Image from 'next/image'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: { width: 100, height: 25 },
    md: { width: 140, height: 35 },
    lg: { width: 200, height: 50 },
  }
  const { width, height } = dimensions[size]

  return (
    <Image
      src="/logo.svg"
      alt="Patinax"
      width={width}
      height={height}
      priority
    />
  )
}
