/**
 * Fix: strip duplicated brand prefix from model names in day-4 watches.
 * (The API returned model="Piaget Altiplano" so we stored model="Piaget Piaget Altiplano".)
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function toSlug(str) {
  return str.toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')
}

async function main() {
  const watches = await prisma.watch.findMany({ where: { apiId: { startsWith: 'watchapi4-' } } })
  let fixed = 0

  for (const w of watches) {
    // Strip brand prefix if duplicated at start of model name
    const brandLower = w.brand.toLowerCase()
    const modelLower = w.model.toLowerCase()
    if (!modelLower.startsWith(brandLower + ' ')) {
      console.log(`  skip (no dup): ${w.brand} | ${w.model}`)
      continue
    }
    const newModel = w.model.slice(w.brand.length + 1)
    const newSlug = `${toSlug(w.brand)}-${toSlug(newModel)}`

    try {
      await prisma.watch.update({
        where: { id: w.id },
        data: { model: newModel, slug: newSlug },
      })
      console.log(`  ✓ ${w.brand}: "${w.model}" → "${newModel}"`)
      fixed++
    } catch (err) {
      console.log(`  ✗ ${w.brand} ${newModel}: ${err.message.slice(0, 80)}`)
    }
  }

  console.log(`\n${fixed} watches fixed.`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1) })
