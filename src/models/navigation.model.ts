export interface NavItem {
  name: string
  path: string
  activeExact?: boolean
}

export interface FooterLink {
  label: string
  path: string
  external?: boolean
}

export interface SocialLink {
  platform: string
  icon: string
  url: string
}

export interface SiteContactInfo {
  phone: string
  email: string
  address: string
  contactUrl: string
}

export interface NavigationData {
  headerCta: {
    text: string
    link: string
  }
  navItems: NavItem[]
  socialLinks: SocialLink[]
  knowMoreLinks: FooterLink[]
  transparencyLinks: FooterLink[]
  contactInfo: SiteContactInfo
  footerQuote: string
  footerDescription: string
  copyrightText: string
}
