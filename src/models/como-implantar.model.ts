export interface ImplementationPillar {
  iconName: string
  title: string
}

export interface ImplementationStep {
  number: string
  title: string
  description: string
  iconName: string
}

export interface BookTopic {
  text: string
}

export interface ComoImplantarData {
  hero: {
    tagline: string
    title: string
    description: string
    pillars: ImplementationPillar[]
    image: string
  }
  bookSection: {
    tagline: string
    title: string
    subtitle: string
    description: string
    topics: BookTopic[]
    buttonText: string
    buttonLink: string
    bookCoverImage: string
    roomImage: string
    writingImage: string
    galleryStripImages: string[]
  }
  stepsSection: {
    tagline: string
    title: string
    subtitle?: string
    description: string
    steps: ImplementationStep[]
    buttonText: string
    buttonLink: string
  }
  ctaBanner: {
    quote: string
    cardTitle: string
    cardButtonText: string
    cardButtonLink: string
    backgroundImage: string
  }
}
