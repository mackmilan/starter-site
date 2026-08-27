export interface SupportOption {
  id: string
  iconName: string
  title: string
  subtitle: string
  buttonText: string
  primary?: boolean
  extraDetails?: {
    pixKey?: string
    bankName?: string
    agency?: string
    account?: string
  }
}

export interface ActiveProject {
  id: string
  number: string
  title: string
  description: string
  progressPercent: number
  goalText: string
  image: string
}

export interface ApoieImpactStat {
  value: string
  label: string
  iconName: string
}

export interface ApoieData {
  hero: {
    tagline: string
    title: string
    description: string
    ctaText: string
    scrollText: string
    image: string
  }
  supportSection: {
    title: string
  }
  supportOptions: SupportOption[]
  projectsSection: {
    tagline: string
    title: string
  }
  activeProjects: ActiveProject[]
  impactSection: {
    tagline: string
    title: string
  }
  impactStats: ApoieImpactStat[]
  transparency: {
    tagline: string
    title: string
    description: string
    buttonText: string
    handsImage: string
    badgeText: string
  }
  quoteBanner: {
    quote: string
    image: string
  }
}
