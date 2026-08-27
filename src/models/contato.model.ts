export interface ContactChannel {
  iconName: string
  title: string
  detail: string
  subDetail?: string
}

export interface ContactFormInput {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface ContatoData {
  hero: {
    tagline: string
    title: string
    description: string
    image: string
  }
  channelsSection: {
    tagline: string
  }
  channels: ContactChannel[]
  formSection: {
    tagline: string
    buttonText: string
    loadingText: string
    privacyNotice: string
  }
  officeLocation: {
    tagline: string
    title: string
    description: string
    buttonText: string
    buttonLink: string
    addressCard: {
      title: string
      address: string
      zip: string
    }
    mapImage: string
  }
  quoteBanner: {
    quote: string
    authorText?: string
    image: string
  }
}
