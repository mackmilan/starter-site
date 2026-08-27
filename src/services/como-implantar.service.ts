import { BffPublicService } from '../api'
import type { ComoImplantarData } from '../models/como-implantar.model'
import { extractTagContent, getSectionValue } from '../utils/sectionParser'

const defaultComoImplantarData: ComoImplantarData = {
  hero: {
    tagline: 'COMO IMPLEMENTAR',
    title: 'Transforme sua ideia.\nImplemente com clareza.',
    description: 'Um guia prático para transformar uma proposta em processos, páginas e experiências consistentes.',
    pillars: [
      { iconName: 'Award', title: 'Metodologia clara' },
      { iconName: 'HeartHandshake', title: 'Acompanhamento próximo' },
      { iconName: 'Target', title: 'Objetivos mensuráveis' },
      { iconName: 'Shield', title: 'Experiência confiável' }
    ],
    image: '/images/placeholder.svg'
  },
  bookSection: {
    tagline: 'NOSSO MANUAL',
    title: 'Um guia para\nreplicar boas práticas.',
    subtitle: 'Centralize materiais e orientações para que sua equipe consiga implementar a proposta com autonomia.',
    description: 'Use este espaço para apresentar fundamentos, processos e exemplos que ajudam parceiros e equipes a colocar o plano em prática.',
    topics: [
      { text: 'Contexto e objetivos' },
      { text: 'Metodologia passo a passo' },
      { text: 'Processos e boas práticas' },
      { text: 'Resultados e indicadores' },
      { text: 'Relatos e aprendizados' }
    ],
    buttonText: 'QUERO RECEBER NOVIDADES DO LIVRO',
    buttonLink: '/contato',
    bookCoverImage: '/images/placeholder.svg',
    roomImage: '/images/placeholder.svg',
    writingImage: '/images/placeholder.svg',
    galleryStripImages: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ]
  },
  stepsSection: {
    tagline: 'ETAPAS PARA IMPLANTAÇÃO',
    title: 'Um caminho possível.\nEstamos aqui para caminhar com você.',
    subtitle: 'Estamos aqui para caminhar com você.',
    description: 'A implementação segue etapas estruturadas para garantir consistência, eficiência e evolução contínua.',
    steps: [
      {
        number: '01',
        title: 'Diagnóstico',
        description: 'Análise do contexto, necessidades e recursos disponíveis.',
        iconName: 'Search'
      },
      {
        number: '02',
        title: 'Planejamento',
        description: 'Definição de objetivos, responsáveis, recursos e cronograma.',
        iconName: 'ClipboardList'
      },
      {
        number: '03',
        title: 'Configuração e treinamento',
        description: 'Preparação da equipe, conteúdo e ferramentas para a operação.',
        iconName: 'Target'
      },
      {
        number: '04',
        title: 'Alinhamento da equipe',
        description: 'Distribuição de responsabilidades e alinhamento de protocolos.',
        iconName: 'Users'
      },
      {
        number: '05',
        title: 'Implementação',
        description: 'Início das atividades com acompanhamento e registro de aprendizados.',
        iconName: 'Building'
      },
      {
        number: '06',
        title: 'Avaliação e Aperfeiçoamento',
        description: 'Monitoramento contínuo e aprimoramento do processo e dos resultados.',
        iconName: 'TrendingUp'
      }
    ],
    buttonText: 'FALE CONOSCO E SAIBA COMO IMPLANTAR',
    buttonLink: '/contato'
  },
  ctaBanner: {
    quote: 'Quando uma organização comunica melhor, ela cria caminhos mais simples para participar.',
    cardTitle: 'Leve esta estrutura para a realidade da sua organização.',
    cardButtonText: 'QUERO IMPLEMENTAR',
    cardButtonLink: '/contato',
    backgroundImage: '/images/placeholder.svg'
  }
}

class ComoImplantarService {
  getComoImplantarData(): ComoImplantarData {
    return JSON.parse(JSON.stringify(defaultComoImplantarData))
  }

  async fetchComoImplantarData(): Promise<{ data: ComoImplantarData; metaTitle?: string; metaDescription?: string }> {
    try {
      const pageRes = await BffPublicService.getPageBySlug({ slug: 'como-implantar' })
      const result: ComoImplantarData = JSON.parse(JSON.stringify(defaultComoImplantarData))
      let metaTitle = 'Como implementar | Guia prático'
      let metaDescription = defaultComoImplantarData.hero.description

      if (pageRes.data) {
        const page = pageRes.data
        if (page.meta_title) metaTitle = page.meta_title
        if (page.meta_description) metaDescription = page.meta_description

        const heroSec = getSectionValue(page.sections, 'Hero Como Implantar')
        if (heroSec) {
          const tagline = extractTagContent(heroSec, 'p', 'tagline')
          const title = extractTagContent(heroSec, 'h1', 'hero-title')
          const subtitle = extractTagContent(heroSec, 'p', 'hero-subtitle')
          if (tagline) result.hero.tagline = tagline
          if (title) result.hero.title = title
          if (subtitle) result.hero.description = subtitle
        }
      }

      return { data: result, metaTitle, metaDescription }
    } catch (err) {
      console.warn('Falha ao obter dados da API para Como Implantar. Utilizando dados locais.', err)
      return { data: JSON.parse(JSON.stringify(defaultComoImplantarData)) }
    }
  }
}

export const comoImplantarService = new ComoImplantarService()
