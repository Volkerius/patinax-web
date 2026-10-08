import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const watches = [
  {"id":"cmn9fv7mq0000yqcjubui9kmq","apiId":"rolex-submariner-date-126610ln","brand":"Rolex","model":"Submariner Date","reference":"126610LN","year":2020,"caseDiameter":41.0,"caseThickness":12.5,"waterResistance":300,"movement":"Automatic","caliber":"Cal. 3235","powerReserve":70,"caseMaterial":"Oystersteel","bezelMaterial":"Cerachrom ceramic","crystal":"Sapphire","frequency":4.0,"jewels":31,"cosc":true,"priceRange":4,"brandTier":4,"style":"diver","imageUrl":null,"slug":"rolex-submariner-date"},
  {"id":"cmn9fv7mt0001yqcjphn93h6w","apiId":"omega-seamaster-diver-300m-8800","brand":"Omega","model":"Seamaster Diver 300M","reference":"210.30.42.20.01.001","year":2018,"caseDiameter":42.0,"caseThickness":13.1,"waterResistance":300,"movement":"Automatic","caliber":"Co-Axial Master Chronometer 8800","powerReserve":55,"caseMaterial":"Stainless steel","bezelMaterial":"Ceramic","crystal":"Sapphire","frequency":3.5,"jewels":39,"cosc":true,"priceRange":3,"brandTier":3,"style":"diver","imageUrl":null,"slug":"omega-seamaster-diver-300m"},
  {"id":"cmn9fv7mw0004yqcj6xmeatj1","apiId":"patek-nautilus-5711-1a","brand":"Patek Philippe","model":"Nautilus 5711/1A","reference":"5711/1A-010","year":2021,"caseDiameter":40.0,"caseThickness":8.3,"waterResistance":120,"movement":"Automatic","caliber":"Cal. 26-330 S C","powerReserve":45,"caseMaterial":"Stainless steel","bezelMaterial":"Stainless steel","crystal":"Sapphire","frequency":4.0,"jewels":29,"cosc":false,"priceRange":5,"brandTier":5,"style":"sport","imageUrl":null,"slug":"patek-philippe-nautilus-5711"},
  {"id":"cmn9fv7mx0005yqcj1oqda8rx","apiId":"ap-royal-oak-15500st","brand":"Audemars Piguet","model":"Royal Oak 15500ST","reference":"15500ST.OO.1220ST.01","year":2022,"caseDiameter":41.0,"caseThickness":9.8,"waterResistance":50,"movement":"Automatic","caliber":"Cal. 4302","powerReserve":60,"caseMaterial":"Stainless steel","bezelMaterial":"Stainless steel","crystal":"Sapphire","frequency":4.0,"jewels":40,"cosc":false,"priceRange":5,"brandTier":5,"style":"sport","imageUrl":null,"slug":"audemars-piguet-royal-oak-15500"},
]

const comparisons = [
  {"id":"cmn9fv7mu0003yqcjubvcu4dl","watchAId":"cmn9fv7mq0000yqcjubui9kmq","watchBId":"cmn9fv7mt0001yqcjphn93h6w","slug":"rolex-submariner-vs-omega-seamaster","viewCount":70},
  {"id":"cmn9fv7mx0007yqcj264tnju4","watchAId":"cmn9fv7mw0004yqcj6xmeatj1","watchBId":"cmn9fv7mx0005yqcj1oqda8rx","slug":"patek-philippe-nautilus-vs-audemars-piguet-royal-oak","viewCount":0},
]

async function main() {
  console.log('Migrating watches...')
  for (const w of watches) {
    await prisma.watch.upsert({
      where: { id: w.id },
      update: {},
      create: w,
    })
    console.log(`  ✓ ${w.brand} ${w.model}`)
  }

  console.log('Migrating comparisons...')
  for (const c of comparisons) {
    await prisma.comparison.upsert({
      where: { id: c.id },
      update: {},
      create: c,
    })
    console.log(`  ✓ ${c.slug}`)
  }

  console.log('Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
