export interface SciencePillar {
  iconName: string
  title: string
  description: string
}

export interface StudyCard {
  id: string
  number: string
  category: string
  description: string
  image: string
}

export interface EvidenceStat {
  value: string
  label: string
  iconName: string
}

export interface FundamentacaoData {
  hero: {
    tagline: string
    title: string
    subtitle: string
    description: string
    image: string
  }
  whyMethodSection: {
    title: string
    description: string
    pillars: SciencePillar[]
  }
  studiesSection: {
    tagline: string
    title: string
    cards: StudyCard[]
  }
  evidenceSection: {
    tagline: string
    title: string
    stats: EvidenceStat[]
  }
  whyMethodPillars: SciencePillar[]
  studyCards: StudyCard[]
  evidenceStats: EvidenceStat[]
  quoteSection: {
    quote: string
    image: string
  }
  trustBanner: {
    tagline: string
    title: string
    description: string
    image: string
  }
}
