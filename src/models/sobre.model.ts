export interface MissionVisionValue {
  iconName: string
  title: string
  description: string
  items?: string[]
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  image: string
}

export interface TeamMember {
  id: string
  role: string
  description: string
  image: string
}

export interface SobreData {
  hero: {
    tagline: string
    title: string
    subtitle: string
    description: string
    image: string
  }
  essence: {
    tagline?: string
    title: string
    description: string
    pillars: MissionVisionValue[]
  }
  timeline: {
    tagline: string
    title: string
    description: string
    events: TimelineEvent[]
  }
  team: {
    tagline: string
    title: string
    description: string
    members: TeamMember[]
  }
  commitment: {
    tagline: string
    title: string
    description: string
    image: string
  }
  joinUsBanner: {
    tagline: string
    title: string
    description: string
    buttonText: string
    buttonLink: string
    image: string
  }
}
