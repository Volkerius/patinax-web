/** Slugify a string preserving Unicode letters (ö, ü, é, etc.) */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}
