import { BffPublicService } from '../api'
import type { ContatoData, ContactFormInput } from '../models/contato.model'
import { extractTagContent, getSectionValue } from '../utils/sectionParser'

const defaultContatoData: ContatoData = {
  hero: {
    tagline: 'ENTRE EM CONTATO',
    title: 'Fale conosco.\nVamos construir\njuntos.',
    description: 'Use este espaço para explicar como as pessoas podem entrar em contato, tirar dúvidas e iniciar uma conversa.',
    image: '/images/placeholder.svg'
  },
  channelsSection: {
    tagline: 'CANAIS DE CONTATO'
  },
  channels: [
    {
      iconName: 'Phone',
      title: 'TELEFONE',
      detail: '(00) 00000-0000'
    },
    {
      iconName: 'Mail',
      title: 'E-MAIL',
      detail: 'contato@example.com'
    },
    {
      iconName: 'MapPin',
      title: 'ENDEREÇO',
      detail: 'Endereço da organização',
      subDetail: 'Rua, número e complemento\nCidade - UF\nCEP 00000-000'
    },
    {
      iconName: 'Clock',
      title: 'HORÁRIO DE ATENDIMENTO',
      detail: 'Segunda a Sexta-feira',
      subDetail: 'das 08h às 17h'
    },
    {
      iconName: 'Instagram',
      title: 'REDES SOCIAIS',
      detail: '@seuusuario'
    }
  ],
  formSection: {
    tagline: 'ENVIE SUA MENSAGEM',
    buttonText: 'ENVIAR MENSAGEM',
    loadingText: 'ENVIANDO...',
    privacyNotice: 'Seus dados estão protegidos e serão utilizados somente para contato.'
  },
  officeLocation: {
    tagline: 'ONDE ESTAMOS',
    title: 'Compartilhe onde\nvocê está.',
    description: 'Configure aqui um endereço, mapa ou instruções para que seu público encontre sua organização.',
    buttonText: 'ABRIR NO MAPA',
    buttonLink: '#',
    addressCard: {
      title: 'ENDEREÇO DA ORGANIZAÇÃO',
      address: 'Configure o endereço\nCidade - UF',
      zip: 'CEP 00000-000'
    },
    mapImage: '/images/placeholder.svg'
  },
  quoteBanner: {
    quote: 'Acolher é o primeiro passo para transformar histórias. Conte conosco para fazer a diferença.',
    authorText: '',
    image: '/images/placeholder.svg'
  }
}

class ContatoService {
  getContatoData(): ContatoData {
    return JSON.parse(JSON.stringify(defaultContatoData))
  }

  async fetchContatoData(): Promise<{ data: ContatoData; metaTitle?: string; metaDescription?: string }> {
    try {
      const pageRes = await BffPublicService.getPageBySlug({ slug: 'contato' })
      const result: ContatoData = JSON.parse(JSON.stringify(defaultContatoData))
      let metaTitle = 'Contato e localização | Site Starter'
      let metaDescription = defaultContatoData.hero.description

      if (pageRes.data) {
        const page = pageRes.data
        if (page.meta_title) metaTitle = page.meta_title
        if (page.meta_description) metaDescription = page.meta_description

        const heroSec = getSectionValue(page.sections, 'Hero Contato')
        if (heroSec) {
          const tagline = extractTagContent(heroSec, 'p', 'tagline')
          const title = extractTagContent(heroSec, 'h1', 'hero-title')
          const subtitle = extractTagContent(heroSec, 'p', 'hero-subtitle')
          if (tagline) result.hero.tagline = tagline
          if (title) result.hero.title = title
          if (subtitle) result.hero.description = subtitle
        }

        const ondeSec = getSectionValue(page.sections, 'Onde Estamos')
        if (ondeSec) {
          const oTagline = extractTagContent(ondeSec, 'p', 'tagline')
          const oTitle = extractTagContent(ondeSec, 'h2')
          const oDesc = extractTagContent(ondeSec, 'p')
          if (oTagline) result.officeLocation.tagline = oTagline
          if (oTitle) result.officeLocation.title = oTitle
          if (oDesc) result.officeLocation.description = oDesc
        }
      }

      return { data: result, metaTitle, metaDescription }
    } catch (err) {
      console.warn('Falha ao obter dados da API para Contato. Utilizando dados locais.', err)
      return { data: JSON.parse(JSON.stringify(defaultContatoData)) }
    }
  }

  async submitContactForm(data: ContactFormInput): Promise<{ success: boolean; message: string }> {
    try {
      const res = await BffPublicService.createLead({
        requestBody: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message
        }
      })

      return {
        success: true,
        message: res.message || 'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.'
      }
    } catch (err: any) {
      console.error('Erro ao enviar mensagem de contato via API:', err)
      const errorMsg = err?.body?.message || err?.message || 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.'
      return {
        success: false,
        message: errorMsg
      }
    }
  }
}

export const contatoService = new ContatoService()
