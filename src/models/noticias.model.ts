export interface NewsCategory {
  id: string
  name: string
}

export interface NewsArticle {
  id: string
  title: string
  category: string
  date: string
  excerpt?: string
  image: string
  link?: string
  isFeatured?: boolean
}

export interface NoticiasData {
  hero: {
    breadcrumb: string
    title: string
    description: string
    image: string
  }
  filterSection: {
    searchPlaceholder: string
    emptyMessage: string
    clearFiltersText: string
  }
  categories: NewsCategory[]
  featuredArticle: NewsArticle
  articles: NewsArticle[]
  newsletter: {
    title: string
    description: string
    placeholder: string
    buttonText: string
    privacyNotice: string
    image: string
  }
}
