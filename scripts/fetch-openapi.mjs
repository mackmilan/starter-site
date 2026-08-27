import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')

function loadEnv() {
  const envPath = resolve(projectRoot, '.env')
  const env = {}

  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const equalsIdx = trimmed.indexOf('=')
      if (equalsIdx !== -1) {
        const key = trimmed.slice(0, equalsIdx).trim()
        let value = trimmed.slice(equalsIdx + 1).trim()
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        env[key] = value
      }
    }
  }

  return env
}

const env = loadEnv()
const defaultUrl = 'http://localhost:8000/api/docs/bff-site?bff-site-api-docs.json'
let openApiUrl = (process.env.OPENAPI_URL || process.env.VITE_OPENAPI_URL || env.OPENAPI_URL || env.VITE_OPENAPI_URL || defaultUrl).trim()
if ((openApiUrl.startsWith('"') && openApiUrl.endsWith('"')) || (openApiUrl.startsWith("'") && openApiUrl.endsWith("'"))) {
  openApiUrl = openApiUrl.slice(1, -1)
}
const targetFile = resolve(projectRoot, 'openapi.json')

async function fetchOpenApi() {
  console.log(`🌐 Buscando contrato OpenAPI em: ${openApiUrl}`)

  try {
    const response = await fetch(openApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Site-Frontend-OpenApi-Fetcher/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type') || ''
    const rawText = await response.text()

    let spec
    try {
      spec = JSON.parse(rawText)
    } catch (e) {
      throw new Error(`A resposta não é um JSON válido. (Content-Type: ${contentType})`)
    }

    if (!spec.openapi && !spec.swagger) {
      throw new Error('O JSON retornado não parece ser uma especificação OpenAPI/Swagger válida.')
    }

    writeFileSync(targetFile, JSON.stringify(spec, null, 2), 'utf8')

    const endpointsCount = Object.keys(spec.paths || {}).length
    const schemasCount = Object.keys(spec.components?.schemas || spec.definitions || {}).length

    console.log(`✅ Contrato OpenAPI obtido com sucesso!`)
    console.log(`📋 Título: "${spec.info?.title || 'API'}" (v${spec.info?.version || '1.0.0'})`)
    console.log(`🔗 Endpoints: ${endpointsCount}`)
    console.log(`📦 Schemas: ${schemasCount}`)
    console.log(`💾 Salvo em: ${targetFile}`)
  } catch (error) {
    console.error(`❌ Falha ao obter contrato OpenAPI de "${openApiUrl}":`, error.message)
    process.exit(1)
  }
}

fetchOpenApi()
