import type { Watch } from '@/types/watch'

interface SpecRow {
  label: string
  fullLabel: string
  valueA: string | null
  valueB: string | null
  winner?: 'a' | 'b' | 'tie' | null
}

function fmt(val: string | number | null | undefined, unit?: string): string | null {
  if (val === null || val === undefined || val === '') return null
  if (unit) return `${val} ${unit}`
  return String(val)
}

function fmtFrequency(hz: number | null | undefined): string | null {
  if (!hz) return null
  // Convert Hz to vph: 1 Hz = 3600 vph
  const vph = hz * 3600
  return `${vph.toLocaleString('en-US')} vph`
}

function getSpecs(watchA: Watch, watchB: Watch): SpecRow[] {
  return [
    {
      label: 'Brand', fullLabel: 'Brand',
      valueA: fmt(watchA.brand), valueB: fmt(watchB.brand),
    },
    {
      label: 'Model', fullLabel: 'Model',
      valueA: fmt(watchA.model), valueB: fmt(watchB.model),
    },
    {
      label: 'Reference', fullLabel: 'Reference Number',
      valueA: watchA.reference ?? null, valueB: watchB.reference ?? null,
    },
    {
      label: 'Year', fullLabel: 'Year Introduced',
      valueA: watchA.year ? String(watchA.year) : null,
      valueB: watchB.year ? String(watchB.year) : null,
    },
    {
      label: 'Diameter', fullLabel: 'Case Diameter',
      valueA: fmt(watchA.caseDiameter, 'mm'), valueB: fmt(watchB.caseDiameter, 'mm'),
      winner: (watchA.caseDiameter ?? 0) === (watchB.caseDiameter ?? 0) ? 'tie' : null,
    },
    {
      label: 'Thickness', fullLabel: 'Case Thickness',
      valueA: fmt(watchA.caseThickness, 'mm'), valueB: fmt(watchB.caseThickness, 'mm'),
    },
    {
      label: 'Water Resist.', fullLabel: 'Water Resistance',
      valueA: fmt(watchA.waterResistance, 'm'), valueB: fmt(watchB.waterResistance, 'm'),
      winner: (watchA.waterResistance ?? 0) > (watchB.waterResistance ?? 0) ? 'a'
            : (watchB.waterResistance ?? 0) > (watchA.waterResistance ?? 0) ? 'b' : 'tie',
    },
    {
      label: 'Movement', fullLabel: 'Movement Type',
      valueA: fmt(watchA.movement), valueB: fmt(watchB.movement),
    },
    {
      label: 'Caliber', fullLabel: 'Caliber',
      valueA: fmt(watchA.caliber), valueB: fmt(watchB.caliber),
    },
    {
      label: 'Power Reserve', fullLabel: 'Power Reserve',
      valueA: fmt(watchA.powerReserve, 'h'), valueB: fmt(watchB.powerReserve, 'h'),
      winner: (watchA.powerReserve ?? 0) > (watchB.powerReserve ?? 0) ? 'a'
            : (watchB.powerReserve ?? 0) > (watchA.powerReserve ?? 0) ? 'b' : 'tie',
    },
    {
      label: 'Case Material', fullLabel: 'Case Material',
      valueA: fmt(watchA.caseMaterial), valueB: fmt(watchB.caseMaterial),
    },
    {
      label: 'Bezel', fullLabel: 'Bezel Material',
      valueA: fmt(watchA.bezelMaterial), valueB: fmt(watchB.bezelMaterial),
    },
    {
      label: 'Crystal', fullLabel: 'Crystal',
      valueA: fmt(watchA.crystal), valueB: fmt(watchB.crystal),
    },
    {
      label: 'Frequency', fullLabel: 'Beat Frequency',
      valueA: fmtFrequency(watchA.frequency), valueB: fmtFrequency(watchB.frequency),
    },
    {
      label: 'Jewels', fullLabel: 'Jewel Count',
      valueA: fmt(watchA.jewels), valueB: fmt(watchB.jewels),
      winner: (watchA.jewels ?? 0) > (watchB.jewels ?? 0) ? 'a'
            : (watchB.jewels ?? 0) > (watchA.jewels ?? 0) ? 'b' : 'tie',
    },
    {
      label: 'COSC', fullLabel: 'COSC Certified',
      valueA: watchA.cosc ? 'Yes' : 'No', valueB: watchB.cosc ? 'Yes' : 'No',
    },
  ]
}

export function SpecTable({ watchA, watchB }: { watchA: Watch; watchB: Watch }) {
  const specs = getSpecs(watchA, watchB)

  return (
    <section className="py-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-patina-text2 mb-6">
        Full Specifications
      </h2>
      <div className="overflow-x-auto rounded-xl border border-patina-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-patina-border bg-patina-bg2">
              <th className="px-4 py-3 text-left text-patina-text3 font-medium text-xs uppercase tracking-wider w-32">
                Spec
              </th>
              <th className="px-4 py-3 text-center text-patina-gold font-medium">
                <span className="text-xs uppercase tracking-wider">{watchA.brand}</span>
                <br />
                <span className="font-playfair text-sm normal-case tracking-normal">{watchA.model}</span>
              </th>
              <th className="px-4 py-3 text-center text-patina-text2 font-medium">
                <span className="text-xs uppercase tracking-wider">{watchB.brand}</span>
                <br />
                <span className="font-playfair text-sm normal-case tracking-normal">{watchB.model}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, i) => (
              <tr
                key={spec.label}
                className={`border-b border-patina-border ${i % 2 === 0 ? 'bg-patina-bg' : 'bg-patina-bg2/50'}`}
              >
                <td
                  className="px-4 py-3 text-patina-text2 font-medium whitespace-nowrap"
                  title={spec.fullLabel}
                >
                  {spec.label}
                </td>
                <td
                  className={`px-4 py-3 text-center font-mono whitespace-nowrap ${
                    spec.winner === 'a' ? 'text-green-400' : 'text-patina-text'
                  }`}
                >
                  {spec.valueA ?? '—'}
                </td>
                <td
                  className={`px-4 py-3 text-center font-mono whitespace-nowrap ${
                    spec.winner === 'b' ? 'text-green-400' : 'text-patina-text'
                  }`}
                >
                  {spec.valueB ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
