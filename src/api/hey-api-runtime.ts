import type { CreateClientConfig } from './generated/client.gen'

const apiBaseUrl = String(
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_API_BASE_URL) ||
  '',
).trim()

const tenantId = String(
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TENANT_ID) ||
  (typeof process !== 'undefined' && process.env?.VITE_TENANT_ID) ||
  'default',
).trim()

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: apiBaseUrl || config?.baseUrl || '/',
  headers: {
    ...config?.headers,
    'X-Tenant-Id': tenantId,
    Accept: 'application/json',
  },
  throwOnError: true,
})
