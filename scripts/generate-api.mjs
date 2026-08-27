import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const execFileAsync = promisify(execFile)

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

const localOpenApiPath = resolve(projectRoot, 'openapi.json')
const outputDir = resolve(projectRoot, 'src/api/generated')
const openApiTsConfigPath = resolve(projectRoot, 'openapi-ts.config.mjs')
const openApiTsBinary = resolve(projectRoot, 'node_modules/.bin/openapi-ts')

async function syncOpenApiContract() {
  // 1. Try URL first
  try {
    console.log(`🌐 Tentando obter especificação da URL: ${openApiUrl}`)
    const res = await fetch(openApiUrl, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000)
    })
    if (res.ok) {
      const spec = await res.json()
      if (spec.openapi || spec.swagger) {
        writeFileSync(localOpenApiPath, JSON.stringify(spec, null, 2), 'utf8')
        console.log(`✅ Contrato atualizado com sucesso a partir da URL!`)
        return localOpenApiPath
      }
    }
  } catch (err) {
    console.warn(`⚠️  Não foi possível obter da URL (${err.message}). Tentando fontes locais...`)
  }

  // 2. Fallback to the checked-in sample contract
  if (existsSync(localOpenApiPath)) {
    console.log(`📄 Utilizando arquivo existente: ${localOpenApiPath}`)
    return localOpenApiPath
  }

  throw new Error('Nenhuma fonte OpenAPI disponível.')
}

async function run() {
  console.log('🚀 Iniciando pipeline de geração de Services e Models...')

  const specSource = await syncOpenApiContract()
  const spec = JSON.parse(readFileSync(specSource, 'utf8'))
  const endpointsCount = Object.keys(spec.paths || {}).length
  const schemasCount = Object.keys(spec.components?.schemas || spec.definitions || {}).length

  console.log(`📋 Especificação: "${spec.info?.title || 'OpenAPI'}" (v${spec.info?.version || '1.0.0'})`)
  console.log(`🔗 Endpoints encontrados: ${endpointsCount}`)
  console.log(`📦 Schemas / Modelos encontrados: ${schemasCount}`)

  console.log(`⚙️  Gerando código TypeScript em: ${outputDir}...`)

  const { stdout, stderr } = await execFileAsync(
    openApiTsBinary,
    ['--file', openApiTsConfigPath],
    {
      cwd: projectRoot,
      maxBuffer: 20 * 1024 * 1024,
    },
  )

  if (stdout.trim()) console.log(stdout.trim())
  if (stderr.trim()) console.error(stderr.trim())

  console.log(`✅ Cliente OpenAPI gerado com sucesso em ${outputDir}!`)
}

run().catch((err) => {
  console.error('❌ Erro na geração:', err)
  process.exit(1)
})
