import { BffPublicService, BffSiteService } from '../api'
import type { BffMediaItemDto, BffPageDetailDto, BffPageSectionDto, BffSectionDto } from '../api'
import type { HomeData } from '../models/home.model'
import { extractTagContent, extractTagContents, getSectionByTags } from '../utils/sectionParser'

const HOME_SECTION_TAGS = {
  hero: ['home_hero', 'hero_banner'],
  declaration: ['home_declaration', 'home_statement', 'main_statement', 'declaracao_principal'],
  pillars: ['home_pillars', 'home_statements', 'pillars_site', 'pilares_site'],
  history: ['home_history', 'history'],
  impact: ['home_impact', 'impact_stats', 'estatisticas_impacto'],
  cta: ['home_cta', 'cta_banner'],
} as const

type HomeSection = (BffPageSectionDto | BffSectionDto) & {
  value?: string | null
  content?: string | null
  imageUrl?: string | null
  image_url?: string | null
}

type HomeSectionFolder = {
  media_files?: BffMediaItemDto[]
}

const defaultHomeData: HomeData = {
  hero: {
    tagline: 'SITE STARTER',
    title: 'Conteúdo claro.\nExperiências que\naproximam.',
    subtitle: 'Uma estrutura inicial para apresentar sua organização, seus projetos e seus resultados.',
    badge: '01',
    image: '/images/placeholder.svg',
    ctaText: 'CONHECER A ESTRUTURA',
    ctaLink: '/sobre'
  },
  statements: [
    {
      title: 'Uma boa presença digital começa com uma mensagem clara.',
      subtitle: 'Use esta base para organizar informações, apresentar iniciativas e criar caminhos simples para seu público.',
      image: '/images/placeholder.svg',
      layout: 'standard'
    },
    {
      title: 'Mostre o que\nvocê faz.',
      subtitle: '',
      image: '/images/placeholder.svg',
      alignRight: true,
      layout: 'dark'
    },
    {
      title: 'Conte sua\nhistória.',
      subtitle: '',
      image: '/images/placeholder.svg',
      alignRight: false,
      layout: 'light-split'
    },
    {
      title: 'Conecte pessoas\ne oportunidades.',
      subtitle: '',
      image: '/images/placeholder.svg',
      alignRight: true,
      layout: 'dark'
    }
  ],
  historySection: {
    tagline: 'CONHEÇA A ESTRUTURA',
    title: 'Uma base modular para construir sua presença.',
    buttonText: 'EXPLORAR PÁGINAS',
    buttonLink: '/sobre',
    image: '/images/placeholder.svg'
  },
  historyCards: [
    {
      id: '1',
      number: 'I',
      title: 'VISÃO GERAL',
      description: 'Apresente sua organização e sua proposta de valor.',
      image: '/images/placeholder.svg',
      link: '/sobre'
    },
    {
      id: '2',
      number: 'II',
      title: 'CONTEÚDO',
      description: 'Organize páginas, seções e informações relevantes.',
      image: '/images/placeholder.svg',
      link: '/fundamentacao'
    },
    {
      id: '3',
      number: 'III',
      title: 'RESULTADOS',
      description: 'Destaque números, histórias e evidências.',
      image: '/images/placeholder.svg',
      link: '/sobre'
    },
    {
      id: '4',
      number: 'IV',
      title: 'PARTICIPAÇÃO',
      description: 'Ofereça canais para contato e colaboração.',
      image: '/images/placeholder.svg',
      link: '/como-implantar'
    }
  ],
  impactSection: {
    tagline: 'RECURSOS DISPONÍVEIS'
  },
  impactStats: [
    { value: '01', label: 'ESTRUTURA MODULAR', iconName: 'Building2' },
    { value: '100%', label: 'RESPONSIVO', iconName: 'Heart' },
    { value: '∞', label: 'PÁGINAS POSSÍVEIS', iconName: 'Users' },
    { value: 'API', label: 'CONTEÚDO DINÂMICO', iconName: 'Globe' }
  ],
  ctaBanner: {
    tagline: 'PRÓXIMO PASSO',
    title: 'Personalize a base com a identidade da sua organização.',
    buttonText: 'ENTRAR EM CONTATO',
    buttonLink: '/apoie',
    image: '/images/placeholder.svg'
  }
}

function normalizeFilename(value: string | undefined): string {
  return value?.split(/[\\/]/).pop()?.trim().toLowerCase() ?? ''
}

function getPageMediaUrl(page: BffPageDetailDto, filename: string): string | undefined {
  const targetFilename = normalizeFilename(filename)
  const media = page.media_files?.find(file =>
    [file.filename, file.original_name].some(name => normalizeFilename(name) === targetFilename)
  )

  return media?.url
}

function getSectionMedia(section: HomeSection | undefined): BffMediaItemDto[] {
  if (!section) return []

  const directMedia = section.media_files ?? []
  const folderMedia = (section.media_folders as HomeSectionFolder[] | undefined)?.flatMap(folder => folder.media_files ?? []) ?? []
  const seen = new Set<number | string>()

  return [...directMedia, ...folderMedia]
    .filter(media => {
      const key = media.id ?? media.url ?? `${media.filename}:${media.display_order}`
      if (seen.has(key)) return false
      seen.add(key)
      return Boolean(media.url)
    })
    .sort((left, right) => (left.display_order ?? 0) - (right.display_order ?? 0))
}

function getSectionImageUrl(section: HomeSection | undefined, index = 0): string | undefined {
  if (!section) return undefined

  const configuredImage = section.imageUrl ?? section.image_url
  if (configuredImage && index === 0) return configuredImage

  return getSectionMedia(section)[index]?.url
}

function getSectionContent(section: HomeSection | undefined): string {
  return section?.value ?? section?.content ?? ''
}

function getHomeSection(
  pageSections: BffPageSectionDto[] | undefined,
  contentSections: HomeSection[] | undefined,
  tags: readonly string[],
  fallbackName: string,
): HomeSection | undefined {
  return (
    getSectionByTags(pageSections, tags, fallbackName)
    ?? getSectionByTags(contentSections, tags, fallbackName)
  ) as HomeSection | undefined
}

class HomeService {
  async fetchHomeData(): Promise<{ data: HomeData; metaTitle?: string; metaDescription?: string }> {
    try {
      const [pageRes, siteInfo, sectionsRes] = await Promise.allSettled([
        BffPublicService.getPageBySlug({ slug: 'home' }),
        BffSiteService.getSiteInfo(),
        BffPublicService.getSections(),
      ])

      const result: HomeData = JSON.parse(JSON.stringify(defaultHomeData))
      let metaTitle = 'Site Starter | Início'
      let metaDescription = 'Estrutura inicial para um site institucional'
      const page = pageRes.status === 'fulfilled' ? pageRes.value?.data : undefined
      const contentSections = [
        ...((page?.content_sections ?? []) as HomeSection[]),
        ...(sectionsRes.status === 'fulfilled' ? (sectionsRes.value?.data ?? []) : []),
      ]

      if (page) {
        if (page.meta_title) metaTitle = page.meta_title
        if (page.meta_description) metaDescription = page.meta_description

        const imageFromMedia = (filename: string, fallback: string): string =>
          getPageMediaUrl(page, filename) || fallback

        const pageSections = page.sections
        const heroSec = getHomeSection(pageSections, contentSections, HOME_SECTION_TAGS.hero, 'Hero Banner')
        const declarationSec = getHomeSection(pageSections, contentSections, HOME_SECTION_TAGS.declaration, 'Declaração Principal')
        const pillarsSec = getHomeSection(pageSections, contentSections, HOME_SECTION_TAGS.pillars, 'Pilares do site')
        const historySec = getHomeSection(pageSections, contentSections, HOME_SECTION_TAGS.history, 'História')
        const impactSec = getHomeSection(pageSections, contentSections, HOME_SECTION_TAGS.impact, 'Estatísticas de Impacto')
        const ctaSec = getHomeSection(pageSections, contentSections, HOME_SECTION_TAGS.cta, 'CTA Banner')

        result.hero.image = getSectionImageUrl(heroSec) || imageFromMedia('home_hero.jpg', result.hero.image)
        if (result.statements[0]) {
          result.statements[0].image = getSectionImageUrl(declarationSec) || imageFromMedia('home_hero.jpg', result.statements[0].image || '')
        }
        if (result.statements[1]) {
          result.statements[1].image = getSectionImageUrl(pillarsSec, 0) || imageFromMedia('placeholder.svg', result.statements[1].image || '')
        }
        if (result.statements[2]) {
          result.statements[2].image = getSectionImageUrl(pillarsSec, 1) || imageFromMedia('placeholder.svg', result.statements[2].image || '')
        }
        if (result.statements[3]) {
          result.statements[3].image = getSectionImageUrl(pillarsSec, 2) || imageFromMedia('placeholder.svg', result.statements[3].image || '')
        }
        result.historySection.image = getSectionImageUrl(historySec) || imageFromMedia('home_card1.jpg', result.historySection.image || '')
        result.historyCards.forEach((card, index) => {
          card.image = getSectionImageUrl(historySec, index) || imageFromMedia('home_card' + (index + 1) + '.jpg', card.image)
        })
        result.ctaBanner.image = getSectionImageUrl(ctaSec) || imageFromMedia('placeholder.svg', result.ctaBanner.image)

        const heroContent = getSectionContent(heroSec)
        if (heroContent) {
          const tagline = extractTagContent(heroContent, 'p', 'tagline')
          const title = extractTagContent(heroContent, 'h1', 'hero-title')
          const subtitle = extractTagContent(heroContent, 'p', 'hero-subtitle')
          const ctaBtn = extractTagContent(heroContent, 'a', 'hero-cta')
          if (tagline) result.hero.tagline = tagline
          if (title) result.hero.title = title
          if (subtitle) result.hero.subtitle = subtitle
          if (ctaBtn) result.hero.ctaText = ctaBtn
        }

        const declarationContent = getSectionContent(declarationSec)
        if (declarationContent) {
          const stmtTitle = extractTagContent(declarationContent, 'h2', 'statement-title')
          const stmtSubtitle = extractTagContent(declarationContent, 'p', 'statement-subtitle')
          if (stmtTitle && result.statements[0]) result.statements[0].title = stmtTitle
          if (stmtSubtitle && result.statements[0]) result.statements[0].subtitle = stmtSubtitle
        }

        const pillarsContent = getSectionContent(pillarsSec)
        const pillarTitles = extractTagContents(pillarsContent, 'h3')
        pillarTitles.forEach((title, index) => {
          if (title && result.statements[index + 1]) result.statements[index + 1].title = title
        })

        const impactContent = getSectionContent(impactSec)
        const impactTagline = extractTagContent(impactContent, 'p', 'tagline')
        if (impactTagline) result.impactSection.tagline = impactTagline
        const impactValues = extractTagContents(impactContent, 'span', 'stat-num')
        const impactLabels = extractTagContents(impactContent, 'span', 'stat-label')
        if (impactValues.length || impactLabels.length) {
          const statCount = Math.max(impactValues.length, impactLabels.length, result.impactStats.length)
          result.impactStats = Array.from({ length: statCount }, (_, index) => ({
            value: impactValues[index] || result.impactStats[index]?.value || '',
            label: impactLabels[index] || result.impactStats[index]?.label || '',
            iconName: result.impactStats[index]?.iconName || 'Users',
          }))
        }

        const historyContent = getSectionContent(historySec)
        if (historyContent) {
          const historyTagline = extractTagContent(historyContent, 'p', 'tagline')
          const historyTitle = extractTagContent(historyContent, 'h2', 'history-title')
          const historyButton = extractTagContent(historyContent, 'a', 'history-cta')
          if (historyTagline) result.historySection.tagline = historyTagline
          if (historyTitle) result.historySection.title = historyTitle
          if (historyButton) result.historySection.buttonText = historyButton

          const historyCardTitles = extractTagContents(historyContent, 'h3', 'history-card-title')
          const historyCardDescriptions = extractTagContents(historyContent, 'p', 'history-card-description')
          result.historyCards.forEach((card, index) => {
            if (historyCardTitles[index]) card.title = historyCardTitles[index]
            if (historyCardDescriptions[index]) card.description = historyCardDescriptions[index]
          })
        }

        const ctaContent = getSectionContent(ctaSec)
        if (ctaContent) {
          const ctaTagline = extractTagContent(ctaContent, 'p', 'cta-tagline')
          const ctaTitle = extractTagContent(ctaContent, 'h2', 'cta-title')
          const ctaBtn = extractTagContent(ctaContent, 'a', 'cta-btn')
          if (ctaTagline) result.ctaBanner.tagline = ctaTagline
          if (ctaTitle) result.ctaBanner.title = ctaTitle
          if (ctaBtn) result.ctaBanner.buttonText = ctaBtn
        }
      }

      if (siteInfo.status === 'fulfilled' && siteInfo.value?.data) {
        if (siteInfo.value.data.name) {
          result.hero.tagline = siteInfo.value.data.name
        }
      }

      return { data: result, metaTitle, metaDescription }
    } catch (err) {
      console.warn('Falha ao obter dados da API para a Home. Utilizando dados locais.', err)
      return { data: JSON.parse(JSON.stringify(defaultHomeData)) }
    }
  }
}

export const homeService = new HomeService()
