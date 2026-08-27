import { BffPublicService } from '../api'
import type { NavigationData, NavItem } from '../models/navigation.model'

const defaultNavigationData: NavigationData = {
  headerCta: {
    text: 'ENTRE EM CONTATO',
    link: '/contato'
  },
  navItems: [
    { name: 'INÍCIO', path: '/' },
    { name: 'SOBRE', path: '/sobre' },
    { name: 'FUNDAMENTAÇÃO', path: '/fundamentacao' },
    { name: 'COMO IMPLEMENTAR', path: '/como-implantar' },
    { name: 'NOTÍCIAS', path: '/noticias' },
    { name: 'APOIE', path: '/apoie' },
    { name: 'CONTATO', path: '/contato' }
  ],
  socialLinks: [
    { platform: 'Instagram', icon: 'Instagram', url: '#' },
    { platform: 'YouTube', icon: 'Youtube', url: '#' },
    { platform: 'Facebook', icon: 'Facebook', url: '#' },
    { platform: 'LinkedIn', icon: 'Linkedin', url: '#' }
  ],
  knowMoreLinks: [
    { label: 'Nossa História', path: '/sobre' },
    { label: 'Equipe', path: '/sobre' },
    { label: 'Linha do Tempo', path: '/sobre' },
    { label: 'Resultados', path: '/noticias' },
    { label: 'Referências', path: '/fundamentacao' },
    { label: 'Processos', path: '/como-implantar' }
  ],
  transparencyLinks: [
    { label: 'Transparência', path: '/apoie' },
    { label: 'Atualizações', path: '/noticias' },
    { label: 'Metas', path: '/apoie' },
    { label: 'Documentos', path: '/fundamentacao' }
  ],
  contactInfo: {
    phone: '(00) 00000-0000',
    email: 'contato@example.com',
    address: 'Configure o endereço da organização',
    contactUrl: '/contato'
  },
  footerQuote: '"Clareza cria confiança."',
  footerDescription: 'Uma base modular para apresentar sua organização, seus projetos e seus resultados.',
  copyrightText: '© 2025 Site Starter. Todos os direitos reservados.'
}

class NavigationService {
  getNavigationData(): NavigationData {
    return JSON.parse(JSON.stringify(defaultNavigationData))
  }

  async fetchNavigationData(): Promise<NavigationData> {
    try {
      const menuRes = await BffPublicService.getMenu()
      const result: NavigationData = JSON.parse(JSON.stringify(defaultNavigationData))

      if (menuRes.data && Array.isArray(menuRes.data) && menuRes.data.length > 0) {
        const dynamicNav: NavItem[] = []
        for (const section of menuRes.data) {
          if (section.pages && Array.isArray(section.pages)) {
            for (const page of section.pages) {
              if (page.title && page.slug) {
                const cleanSlug = page.slug.replace(/^\/+/, '')
                dynamicNav.push({
                  name: page.title.toUpperCase(),
                  path: cleanSlug === 'home' ? '/' : `/${cleanSlug}`
                })
              }
            }
          }
        }
        if (dynamicNav.length > 0) {
          result.navItems = dynamicNav
        }
      }

      return result
    } catch (err) {
      console.warn('Falha ao obter menu via API. Utilizando navegação padrão.', err)
      return JSON.parse(JSON.stringify(defaultNavigationData))
    }
  }
}

export const navigationService = new NavigationService()
