import { BffPublicService } from '../api'
import type { FundamentacaoData, SciencePillar, StudyCard, EvidenceStat } from '../models/fundamentacao.model'
import { extractTagContent, getSectionValue } from '../utils/sectionParser'

const whyMethodPillarsList: SciencePillar[] = [
  {
    iconName: 'Brain',
    title: 'Dados',
    description: 'Use dados e referências para contextualizar decisões e comunicar resultados com clareza.'
  },
  {
    iconName: 'Heart',
    title: 'Experiência',
    description: 'Explique como a solução melhora a experiência de pessoas, clientes ou comunidades.'
  },
  {
    iconName: 'Shield',
    title: 'Processos',
    description: 'Mostre os métodos e padrões que tornam a operação consistente.'
  },
  {
    iconName: 'Users',
    title: 'Aprendizado',
    description: 'Registre aprendizados e evidências que orientam a melhoria contínua.'
  }
]

const studyCardsList: StudyCard[] = [
  {
    id: '1',
    number: '01',
    category: 'CONTEXTO',
    description: 'Apresente o contexto, o problema e as pessoas envolvidas.',
    image: '/images/placeholder.svg'
  },
  {
    id: '2',
    number: '02',
    category: 'MÉTODO',
    description: 'Descreva a abordagem e as escolhas que sustentam a iniciativa.',
    image: '/images/placeholder.svg'
  },
  {
    id: '3',
    number: '03',
    category: 'PROCESSOS',
    description: 'Documente fluxos, protocolos e boas práticas de execução.',
    image: '/images/placeholder.svg'
  },
  {
    id: '4',
    number: '04',
    category: 'PESSOAS',
    description: 'Mostre como a iniciativa cria valor para seu público.',
    image: '/images/placeholder.svg'
  },
  {
    id: '5',
    number: '05',
    category: 'REFERÊNCIAS',
    description: 'Reúna estudos, fontes e experiências que merecem ser consultados.',
    image: '/images/placeholder.svg'
  },
  {
    id: '6',
    number: '06',
    category: 'RECURSOS',
    description: 'Organize documentos, normas e materiais de apoio.',
    image: '/images/placeholder.svg'
  }
]

const evidenceStatsList: EvidenceStat[] = [
  { value: '01', label: 'método documentado', iconName: 'FileText' },
  { value: '04', label: 'pilares de conteúdo', iconName: 'Building2' },
  { value: '∞', label: 'referências possíveis', iconName: 'Globe' },
  { value: '100%', label: 'estrutura editável', iconName: 'Users' }
]

const defaultFundamentacaoData: FundamentacaoData = {
  hero: {
    tagline: 'FUNDAMENTAÇÃO',
    title: 'Informação que orienta.\nClareza que aproxima.',
    subtitle: 'Use esta página para explicar o contexto, o método e as referências que sustentam seu trabalho.',
    description: 'Apresente argumentos, materiais e evidências sem perder a linguagem acessível.',
    image: '/images/placeholder.svg'
  },
  whyMethodSection: {
    title: 'O que sustenta uma boa iniciativa?',
    description: 'Uma comunicação confiável conecta contexto, método, experiência e resultados. Preencha esta seção com as referências da sua organização.',
    pillars: whyMethodPillarsList
  },
  studiesSection: {
    tagline: 'PILARES DA FUNDAMENTAÇÃO',
    title: 'Conhecimento que guia\ncada passo.',
    cards: studyCardsList
  },
  evidenceSection: {
    tagline: 'EVIDÊNCIAS QUE TRANSFORMAM',
    title: 'A ciência comprova.\nA prática confirma.',
    stats: evidenceStatsList
  },
  whyMethodPillars: whyMethodPillarsList,
  studyCards: studyCardsList,
  evidenceStats: evidenceStatsList,
  quoteSection: {
    quote: 'Conhecimento é o que torna o acolhimento possível.',
    image: '/images/placeholder.svg'
  },
  trustBanner: {
    tagline: 'FUNDAMENTAÇÃO QUE GERA CONFIANÇA.',
    title: 'Base sólida para uma\nexperiência mais clara e eficaz.',
    description: 'Atualize esta área com pesquisas, experiências e evidências que ajudam seu público a tomar decisões.',
    image: '/images/placeholder.svg'
  }
}

class FundamentacaoService {
  getFundamentacaoData(): FundamentacaoData {
    return JSON.parse(JSON.stringify(defaultFundamentacaoData))
  }

  async fetchFundamentacaoData(): Promise<{ data: FundamentacaoData; metaTitle?: string; metaDescription?: string }> {
    try {
      const pageRes = await BffPublicService.getPageBySlug({ slug: 'fundamentacao' })
      const result: FundamentacaoData = JSON.parse(JSON.stringify(defaultFundamentacaoData))
      let metaTitle = 'Fundamentação | Site Starter'
      let metaDescription = defaultFundamentacaoData.hero.subtitle

      if (pageRes.data) {
        const page = pageRes.data
        if (page.meta_title) metaTitle = page.meta_title
        if (page.meta_description) metaDescription = page.meta_description

        const heroSec = getSectionValue(page.sections, 'Hero Fundamentação')
        if (heroSec) {
          const tagline = extractTagContent(heroSec, 'p', 'tagline')
          const title = extractTagContent(heroSec, 'h1', 'hero-title')
          const subtitle = extractTagContent(heroSec, 'p', 'hero-subtitle')
          const desc = extractTagContent(heroSec, 'p', 'hero-description')
          if (tagline) result.hero.tagline = tagline
          if (title) result.hero.title = title
          if (subtitle) result.hero.subtitle = subtitle
          if (desc) result.hero.description = desc
        }
      }

      return { data: result, metaTitle, metaDescription }
    } catch (err) {
      console.warn('Falha ao obter dados da API para Fundamentação. Utilizando dados locais.', err)
      return { data: JSON.parse(JSON.stringify(defaultFundamentacaoData)) }
    }
  }
}

export const fundamentacaoService = new FundamentacaoService()
