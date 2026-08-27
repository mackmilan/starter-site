import { BffPublicService } from '../api'
import type { ApoieData } from '../models/apoie.model'
import { extractTagContent, getSectionValue } from '../utils/sectionParser'

const defaultApoieData: ApoieData = {
  hero: {
    tagline: 'APOIE A INICIATIVA',
    title: 'Seu apoio hoje,\ntransforma o amanhã\nda organização.',
    description: 'Apresente as formas de contribuir, os projetos em andamento e a transparência necessária para criar confiança.',
    ctaText: 'VER FORMAS DE APOIAR',
    scrollText: 'VEJA COMO PARTICIPAR',
    image: '/images/placeholder.svg'
  },
  supportSection: {
    title: 'Formas de apoiar'
  },
  supportOptions: [
    {
      id: 'pix',
      iconName: 'QrCode',
      title: 'APOIO DIRETO',
      subtitle: 'Configure aqui a forma mais rápida e segura de contribuir.',
      buttonText: 'CONFIGURAR APOIO',
      primary: true,
    },
    {
      id: 'transfer',
      iconName: 'Building',
      title: 'RECURSOS',
      subtitle: 'Defina os recursos e instruções que seu público precisa conhecer.',
      buttonText: 'CONFIGURAR RECURSOS',
      primary: false
    },
    {
      id: 'sponsor',
      iconName: 'Building2',
      title: 'PARCERIAS',
      subtitle: 'Apresente oportunidades para empresas e instituições colaborarem.',
      buttonText: 'SEJA UM PARCEIRO',
      primary: false
    },
    {
      id: 'monthly',
      iconName: 'HeartHandshake',
      title: 'APOIO CONTÍNUO',
      subtitle: 'Crie uma relação de longo prazo com sua comunidade.',
      buttonText: 'QUERO PARTICIPAR',
      primary: false
    }
  ],
  projectsSection: {
    tagline: 'PROJETOS EM ANDAMENTO',
    title: 'Mostre como a organização\nse transforma com o tempo.'
  },
  activeProjects: [
    {
      id: 'proj-1',
      number: '01',
      title: 'PROJETO PRINCIPAL',
      description: 'Descreva a iniciativa prioritária, suas etapas e os recursos necessários.',
      progressPercent: 64,
      goalText: 'Meta: Defina o objetivo e os recursos necessários',
      image: '/images/placeholder.svg'
    },
    {
      id: 'proj-2',
      number: '02',
      title: 'CAPACITAÇÃO',
      description: 'Apresente treinamentos, melhorias e ações que fortalecem a equipe.',
      progressPercent: 42,
      goalText: 'Meta: Defina as etapas de preparação',
      image: '/images/placeholder.svg'
    },
    {
      id: 'proj-3',
      number: '03',
      title: 'EXPANSÃO',
      description: 'Mostre novos públicos, lugares ou frentes que podem ser alcançados.',
      progressPercent: 18,
      goalText: 'Meta: Defina o alcance e os próximos passos',
      image: '/images/placeholder.svg'
    }
  ],
  impactSection: {
    tagline: 'NOSSO IMPACTO',
    title: 'Cada número\nconta parte da\nsua história.'
  },
  impactStats: [
    { value: '00+', label: 'Pessoas alcançadas', iconName: 'Users' },
    { value: '100%', label: 'Compromisso com a qualidade', iconName: 'Heart' },
    { value: '00+', label: 'Parcerias construídas', iconName: 'Building2' },
    { value: '00', label: 'Regiões atendidas', iconName: 'Globe' }
  ],
  transparency: {
    tagline: 'TRANSPARÊNCIA',
    title: 'Transparência clara e responsável.',
    description: 'Use esta seção para publicar documentos, indicadores e informações que fortalecem a confiança.',
    buttonText: 'VER DOCUMENTOS',
    handsImage: '/images/placeholder.svg',
    badgeText: 'Configure aqui como recursos e resultados serão apresentados.'
  },
  quoteBanner: {
    quote: 'Uma organização clara cria confiança, participação e impacto.',
    image: '/images/placeholder.svg'
  }
}

class ApoieService {
  getApoieData(): ApoieData {
    return JSON.parse(JSON.stringify(defaultApoieData))
  }

  async fetchApoieData(): Promise<{ data: ApoieData; metaTitle?: string; metaDescription?: string }> {
    try {
      const pageRes = await BffPublicService.getPageBySlug({ slug: 'apoie' })
      const result: ApoieData = JSON.parse(JSON.stringify(defaultApoieData))
      let metaTitle = 'Apoie a iniciativa | Site Starter'
      let metaDescription = defaultApoieData.hero.description

      if (pageRes.data) {
        const page = pageRes.data
        if (page.meta_title) metaTitle = page.meta_title
        if (page.meta_description) metaDescription = page.meta_description

        const heroSec = getSectionValue(page.sections, 'Hero Apoie')
        if (heroSec) {
          const tagline = extractTagContent(heroSec, 'p', 'tagline')
          const title = extractTagContent(heroSec, 'h1', 'hero-title')
          const subtitle = extractTagContent(heroSec, 'p', 'hero-subtitle')
          if (tagline) result.hero.tagline = tagline
          if (title) result.hero.title = title
          if (subtitle) result.hero.description = subtitle
        }

        const transpSec = getSectionValue(page.sections, 'Transparência')
        if (transpSec) {
          const tTitle = extractTagContent(transpSec, 'h2')
          const tDesc = extractTagContent(transpSec, 'p')
          if (tTitle) result.transparency.title = tTitle
          if (tDesc) result.transparency.description = tDesc
        }
      }

      return { data: result, metaTitle, metaDescription }
    } catch (err) {
      console.warn('Falha ao obter dados da API para Apoie. Utilizando dados locais.', err)
      return { data: JSON.parse(JSON.stringify(defaultApoieData)) }
    }
  }

  copyPixKey(pixKey: string): Promise<boolean> {
    return navigator.clipboard.writeText(pixKey)
      .then(() => true)
      .catch(() => false)
  }
}

export const apoieService = new ApoieService()
