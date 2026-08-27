import { BffPublicService } from '../api'
import type { SobreData } from '../models/sobre.model'
import { extractTagContent, getSectionValue } from '../utils/sectionParser'

const defaultSobreData: SobreData = {
  hero: {
    tagline: 'SOBRE A ORGANIZAÇÃO',
    title: 'Mais que uma página.\nUma presença.',
    subtitle: 'Apresente a origem, a proposta e as pessoas que tornam sua organização única.',
    description: 'Use esta página para construir confiança, compartilhar contexto e aproximar seu público.',
    image: '/images/placeholder.svg'
  },
  essence: {
    tagline: 'NOSSA',
    title: 'ESSÊNCIA',
    description: 'Defina os princípios que orientam sua organização e mostre como eles aparecem no trabalho diário.',
    pillars: [
      {
        iconName: 'Heart',
        title: 'NOSSA MISSÃO',
        description: 'Explique o problema que sua organização resolve e o valor que entrega para a comunidade.'
      },
      {
        iconName: 'Eye',
        title: 'NOSSA VISÃO',
        description: 'Descreva o futuro que sua organização deseja construir e como pretende chegar lá.'
      },
      {
        iconName: 'Star',
        title: 'NOSSOS VALORES',
        description: 'Escolha os valores que devem orientar cada decisão e relacionamento.',
        items: [
          'Clareza',
          'Respeito',
          'Colaboração',
          'Qualidade',
          'Acessibilidade',
          'Transparência'
        ]
      }
    ]
  },
  timeline: {
    tagline: 'NOSSA HISTÓRIA',
    title: 'De uma ideia, nasceu\num caminho.',
    description: 'Registre os marcos que ajudam seu público a entender sua evolução.',
    events: [
      {
        year: '01',
        title: 'A ideia',
        description: 'O ponto de partida e a necessidade que deram origem à organização.',
        image: '/images/placeholder.svg'
      },
      {
        year: '02',
        title: 'Planejamento',
        description: 'A proposta ganha forma, objetivos e um plano de ação.',
        image: '/images/placeholder.svg'
      },
      {
        year: '03',
        title: 'Primeiras entregas',
        description: 'Os primeiros resultados mostram o potencial da iniciativa.',
        image: '/images/placeholder.svg'
      },
      {
        year: '04',
        title: 'Expansão',
        description: 'Novas parcerias e públicos ampliam o alcance do trabalho.',
        image: '/images/placeholder.svg'
      },
      {
        year: '05',
        title: 'Próximos passos',
        description: 'O próximo ciclo mantém a organização em movimento e aprendizado.',
        image: '/images/placeholder.svg'
      }
    ]
  },
  team: {
    tagline: 'QUEM FAZ ACONTECER',
    title: 'Nossa equipe',
    description: 'Apresente as pessoas, áreas e parceiros responsáveis por transformar a proposta em entregas concretas.',
    members: [
      {
        id: '1',
        role: 'COORDENAÇÃO',
        description: 'Organiza prioridades, decisões e próximos passos do trabalho.',
        image: '/images/placeholder.svg'
      },
      {
        id: '2',
        role: 'ATENDIMENTO',
        description: 'Cuida da relação com pessoas usuárias, clientes e comunidades.',
        image: '/images/placeholder.svg'
      },
      {
        id: '3',
        role: 'OPERAÇÕES',
        description: 'Transforma processos, recursos e parcerias em entregas consistentes.',
        image: '/images/placeholder.svg'
      },
      {
        id: '4',
        role: 'ESPECIALISTAS',
        description: 'Contribuem com conhecimento técnico e melhoria contínua.',
        image: '/images/placeholder.svg'
      },
      {
        id: '5',
        role: 'COMUNICAÇÃO',
        description: 'Torna a proposta, os resultados e as oportunidades mais acessíveis.',
        image: '/images/placeholder.svg'
      },
      {
        id: '6',
        role: 'PARCEIROS',
        description: 'Pessoas e organizações que ajudam a ampliar o impacto da iniciativa.',
        image: '/images/placeholder.svg'
      }
    ]
  },
  commitment: {
    tagline: 'NOSSO COMPROMISSO',
    title: 'Construir hoje para\ntransformar o amanhã.',
    description: 'Mostre o compromisso que orienta suas escolhas e a experiência que deseja oferecer ao público.',
    image: '/images/placeholder.svg'
  },
  joinUsBanner: {
    tagline: 'JUNTOS, PODEMOS IR MAIS LONGE.',
    title: 'Faça parte desta história.',
    description: 'Convide seu público a acompanhar, colaborar ou entrar em contato com sua organização.',
    buttonText: 'ENTRE EM CONTATO',
    buttonLink: '/apoie',
    image: '/images/placeholder.svg'
  }
}

class SobreService {
  getSobreData(): SobreData {
    return JSON.parse(JSON.stringify(defaultSobreData))
  }

  async fetchSobreData(): Promise<{ data: SobreData; metaTitle?: string; metaDescription?: string }> {
    try {
      const pageRes = await BffPublicService.getPageBySlug({ slug: 'sobre' })
      const result: SobreData = JSON.parse(JSON.stringify(defaultSobreData))
      let metaTitle = 'Sobre a organização | Missão e história'
      let metaDescription = defaultSobreData.hero.subtitle

      if (pageRes.data) {
        const page = pageRes.data
        if (page.meta_title) metaTitle = page.meta_title
        if (page.meta_description) metaDescription = page.meta_description

        const heroSec = getSectionValue(page.sections, 'Hero Sobre')
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

        const compromissoSec = getSectionValue(page.sections, 'Nosso Compromisso')
        if (compromissoSec) {
          const cTagline = extractTagContent(compromissoSec, 'p', 'tagline')
          const cTitle = extractTagContent(compromissoSec, 'h2')
          const cDesc = extractTagContent(compromissoSec, 'p')
          if (cTagline) result.commitment.tagline = cTagline
          if (cTitle) result.commitment.title = cTitle
          if (cDesc) result.commitment.description = cDesc
        }
      }

      return { data: result, metaTitle, metaDescription }
    } catch (err) {
      console.warn('Falha ao obter dados da API para Sobre. Utilizando dados locais.', err)
      return { data: JSON.parse(JSON.stringify(defaultSobreData)) }
    }
  }
}

export const sobreService = new SobreService()
