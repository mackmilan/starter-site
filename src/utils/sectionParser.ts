import type { BffPageSectionDto } from '../api'

type SectionIdentity = {
  name?: string
  tag?: string | null
}

function normalizeSectionKey(value: string | null | undefined): string {
  return value?.trim().toLowerCase() ?? ''
}

export function getSection<T extends SectionIdentity>(sections: T[] | undefined, name: string): T | undefined {
  if (!sections) return undefined
  const target = normalizeSectionKey(name)
  return sections.find(s => normalizeSectionKey(s.name) === target)
}

export function getSectionByTags<T extends SectionIdentity>(
  sections: T[] | undefined,
  tags: readonly string[],
  fallbackName?: string,
): T | undefined {
  if (!sections) return undefined

  const targets = new Set(tags.map(normalizeSectionKey))
  const taggedSection = sections.find(section => targets.has(normalizeSectionKey(section.tag)))

  return taggedSection ?? (fallbackName ? getSection(sections, fallbackName) : undefined)
}

export function getSectionValue(sections: BffPageSectionDto[] | undefined, name: string, defaultValue = ''): string {
  const sec = getSection(sections, name)
  return sec?.value ?? defaultValue
}

export function stripHtml(html: string | undefined): string {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '').trim()
}

export function extractTagContent(html: string | undefined, tag: string, className?: string): string | null {
  if (!html) return null
  const regex = className
    ? new RegExp(`<${tag}[^>]*class=["\'][^"\']*${className}[^"\']*["\'][^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
    : new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const match = html.match(regex)
  return match ? stripHtml(match[1]) : null
}

export function extractTagContents(html: string | undefined, tag: string, className?: string): string[] {
  if (!html) return []

  const regex = className
    ? new RegExp(`<${tag}[^>]*class=["\\'][^"\\']*${className}[^"\\']*["\\'][^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi')
    : new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi')

  return [...html.matchAll(regex)].map(match => stripHtml(match[1]))
}
