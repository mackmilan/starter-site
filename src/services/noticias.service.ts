import { BffPublicService } from '../api'
import type { NoticiasData, NewsArticle } from '../models/noticias.model'
import { extractTagContent, getSectionValue } from '../utils/sectionParser'

const defaultNoticiasData: NoticiasData = {
  hero: {
    breadcrumb: 'NOTÍCIAS',
    title: 'Notícias',
    description: 'Publique atualizações, conquistas e histórias para manter seu público informado e próximo.',
    image: '/images/placeholder.svg'
  },
  filterSection: {
    searchPlaceholder: 'Buscar notícia...',
    emptyMessage: 'Nenhuma notícia encontrada para a categoria ou busca selecionada.',
    clearFiltersText: 'Limpar Filtros'
  },
  categories: [
    { id: 'todas', name: 'TODAS' },
    { id: 'atualizacoes', name: 'ATUALIZAÇÕES' },
    { id: 'resultados', name: 'RESULTADOS' },
    { id: 'eventos', name: 'EVENTOS' },
    { id: 'recursos', name: 'RECURSOS' },
    { id: 'parcerias', name: 'PARCERIAS' },
    { id: 'midia', name: 'MÍDIA' }
  ],
  featuredArticle: {
    id: 'feat-1',
    title: 'Organização compartilha resultados em encontro da área',
    category: 'ATUALIZAÇÕES',
    date: '20 MAI 2025',
    excerpt: 'Conheça os principais aprendizados e resultados apresentados pela equipe.',
    image: '/images/placeholder.svg',
    link: '#',
    isFeatured: true
  },
  articles: [
    {
      id: 'art-2',
      title: 'Nova etapa do projeto é apresentada à comunidade',
      category: 'RESULTADOS',
      date: '12 MAI 2025',
      image: '/images/placeholder.svg',
      link: '#'
    },
    {
      id: 'art-3',
      title: 'Nova parceria amplia as possibilidades de colaboração',
      category: 'PARCERIAS',
      date: '05 MAI 2025',
      image: '/images/placeholder.svg',
      link: '#'
    },
    {
      id: 'art-4',
      title: 'Treinamento da equipe marca uma nova etapa',
      category: 'EVENTOS',
      date: '28 ABR 2025',
      image: '/images/placeholder.svg',
      link: '#'
    },
    {
      id: 'art-5',
      title: 'Entrevista apresenta a iniciativa e seus próximos passos',
      category: 'MÍDIA',
      date: '18 ABR 2025',
      image: '/images/placeholder.svg',
      link: '#'
    },
    {
      id: 'art-6',
      title: 'Indicadores mostram a evolução do trabalho',
      category: 'ATUALIZAÇÕES',
      date: '10 ABR 2025',
      image: '/images/placeholder.svg',
      link: '#'
    },
    {
      id: 'art-7',
      title: 'Material de referência está disponível para consulta',
      category: 'RECURSOS',
      date: '02 ABR 2025',
      image: '/images/placeholder.svg',
      link: '#'
    }
  ],
  newsletter: {
    title: 'Receba as novidades',
    description: 'Inscreva-se e acompanhe atualizações, eventos e histórias da organização.',
    placeholder: 'Seu melhor e-mail',
    buttonText: 'INSCREVER',
    privacyNotice: 'Respeitamos sua privacidade. Você pode cancelar quando quiser.',
    image: '/images/placeholder.svg'
  }
}

class NoticiasService {
  getNoticiasData(): NoticiasData {
    return JSON.parse(JSON.stringify(defaultNoticiasData))
  }

  async fetchNoticiasData(): Promise<{ data: NoticiasData; metaTitle?: string; metaDescription?: string }> {
    try {
      const pageRes = await BffPublicService.getPageBySlug({ slug: 'noticias' })
      const result: NoticiasData = JSON.parse(JSON.stringify(defaultNoticiasData))
      let metaTitle = 'Notícias e atualizações | Site Starter'
      let metaDescription = defaultNoticiasData.hero.description

      if (pageRes.data) {
        const page = pageRes.data
        if (page.meta_title) metaTitle = page.meta_title
        if (page.meta_description) metaDescription = page.meta_description

        const heroSec = getSectionValue(page.sections, 'Hero Notícias')
        if (heroSec) {
          const breadcrumb = extractTagContent(heroSec, 'p', 'tagline')
          const title = extractTagContent(heroSec, 'h1', 'hero-title')
          const subtitle = extractTagContent(heroSec, 'p', 'hero-subtitle')
          if (breadcrumb) result.hero.breadcrumb = breadcrumb
          if (title) result.hero.title = title
          if (subtitle) result.hero.description = subtitle
        }

        const nlSec = getSectionValue(page.sections, 'Newsletter')
        if (nlSec) {
          const nlTitle = extractTagContent(nlSec, 'h3')
          const nlDesc = extractTagContent(nlSec, 'p')
          if (nlTitle) result.newsletter.title = nlTitle
          if (nlDesc) result.newsletter.description = nlDesc
        }
      }

      return { data: result, metaTitle, metaDescription }
    } catch (err) {
      console.warn('Falha ao obter dados da API para Notícias. Utilizando dados locais.', err)
      return { data: JSON.parse(JSON.stringify(defaultNoticiasData)) }
    }
  }

  filterArticles(articles: NewsArticle[], categoryId: string, searchQuery: string): NewsArticle[] {
    return articles.filter(article => {
      const matchCategory = categoryId === 'todas' || article.category.toLowerCase() === categoryId.toLowerCase()
      const matchSearch = !searchQuery || article.title.toLowerCase().includes(searchQuery.toLowerCase()) || (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCategory && matchSearch
    })
  }
}

export const noticiasService = new NoticiasService()
