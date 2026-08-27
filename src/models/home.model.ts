export interface HomeHero {
  tagline: string
  title: string
  subtitle: string
  badge: string
  image: string
  ctaText?: string
  ctaLink?: string
}

export interface StatementBanner {
  title: string
  subtitle?: string
  image?: string
  alignRight?: boolean
  layout?: 'dark' | 'light-split' | 'standard'
}

export interface HistoryCard {
  id: string
  number: string
  title: string
  description: string
  image: string
  link: string
}

export interface HistorySection {
  tagline: string
  title: string
  buttonText: string
  buttonLink: string
  image?: string
}

export interface ImpactStat {
  value: string
  label: string
  iconName: string
}

export interface ImpactSection {
  tagline: string
}

export interface HomeCtaBanner {
  tagline: string
  title: string
  buttonText: string
  buttonLink: string
  image: string
}

export interface HomeData {
  hero: HomeHero
  statements: StatementBanner[]
  historySection: HistorySection
  historyCards: HistoryCard[]
  impactSection: ImpactSection
  impactStats: ImpactStat[]
  ctaBanner: HomeCtaBanner
}
