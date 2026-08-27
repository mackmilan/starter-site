import { computed, ref } from 'vue'
import { BffPublicService, type BffSiteSettingsDto } from '../api'

export const constructionTokenStorageKey = 'starter-construction-token'

export const siteSettings = ref<BffSiteSettingsDto | null>(null)
export const isLoadingSettings = ref(true)
export const settingsError = ref<string | null>(null)

export const isUnderConstruction = computed(() => {
  return Boolean(siteSettings.value?.under_construction)
})

export async function fetchSiteSettings(): Promise<BffSiteSettingsDto | null> {
  isLoadingSettings.value = true
  settingsError.value = null

  try {
    const res = await BffPublicService.getBffSettings()
    siteSettings.value = res.data ?? null
    return siteSettings.value
  } catch (err: any) {
    console.error('Falha ao obter configurações do site via BFF OpenAPI:', err)
    settingsError.value = err?.message || 'Erro ao carregar configurações'
    siteSettings.value = null
    return null
  } finally {
    isLoadingSettings.value = false
  }
}

export async function validateConstructionToken(token: string): Promise<boolean> {
  const normalizedToken = token.trim()
  if (!normalizedToken || typeof window === 'undefined') {
    return false
  }

  try {
    const response = await BffPublicService.validateUnderConstructionToken({
      requestBody: { token: normalizedToken },
    })

    return response.data?.valid === true
  } catch {
    return false
  }
}

export async function activateConstructionAccess(token: string): Promise<boolean> {
  const normalizedToken = token.trim()
  if (!normalizedToken || typeof window === 'undefined') {
    return false
  }

  const validToken = await validateConstructionToken(normalizedToken)
  if (!validToken) {
    return false
  }

  window.localStorage.setItem(constructionTokenStorageKey, normalizedToken)
  return true
}

export async function restoreConstructionAccess(): Promise<boolean> {
  if (!isUnderConstruction.value || typeof window === 'undefined') {
    return false
  }

  const queryToken = new URLSearchParams(window.location.search).get('token')?.trim()
  const savedToken = window.localStorage.getItem(constructionTokenStorageKey)?.trim()
  const candidateTokens = [...new Set(
    [queryToken, savedToken].filter((token): token is string => Boolean(token)),
  )]

  if (!candidateTokens.length) {
    return false
  }

  let validToken: string | null = null
  for (const candidateToken of candidateTokens) {
    if (await validateConstructionToken(candidateToken)) {
      validToken = candidateToken
      break
    }
  }

  if (!validToken) {
    if (savedToken) {
      window.localStorage.removeItem(constructionTokenStorageKey)
    }
    return false
  }

  window.localStorage.setItem(constructionTokenStorageKey, validToken)

  if (queryToken) {
    const cleanUrl = `${window.location.pathname}${window.location.hash}`
    window.history.replaceState({}, document.title, cleanUrl)
  }

  return true
}
