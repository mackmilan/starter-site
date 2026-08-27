import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const requiredFiles = [
  'AGENTS.md',
  'CLAUDE.md',
  'docs/ai/README.md',
  'docs/ai/project-context.md',
  'docs/ai/decisions.md',
  'docs/ai/memory-log.md',
  'docs/ai/adapter-prompt.md',
]

const failures = []

for (const relativePath of requiredFiles) {
  if (!existsSync(resolve(projectRoot, relativePath))) {
    failures.push(`arquivo obrigatório ausente: ${relativePath}`)
  }
}

function read(relativePath) {
  return readFileSync(resolve(projectRoot, relativePath), 'utf8')
}

if (existsSync(resolve(projectRoot, 'AGENTS.md')) && !read('AGENTS.md').includes('docs/ai/README.md')) {
  failures.push('AGENTS.md deve apontar para docs/ai/README.md')
}

if (existsSync(resolve(projectRoot, 'CLAUDE.md')) && read('CLAUDE.md').trim() !== '@AGENTS.md') {
  failures.push('CLAUDE.md deve permanecer como adaptador mínimo para AGENTS.md')
}

const memoryFiles = requiredFiles
  .filter((relativePath) => relativePath.endsWith('.md'))
  .filter((relativePath) => existsSync(resolve(projectRoot, relativePath)))

const credentialPatterns = [
  /\bsk-[A-Za-z0-9]{20,}\b/,
  /\bAIza[A-Za-z0-9_-]{30,}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/,
]

for (const relativePath of memoryFiles) {
  const contents = read(relativePath)
  for (const pattern of credentialPatterns) {
    if (pattern.test(contents)) {
      failures.push(`possível credencial encontrada em ${relativePath}`)
    }
  }
}

if (failures.length > 0) {
  console.error('Validação da memória do projeto falhou:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`Memória do projeto válida: ${requiredFiles.length} arquivos verificados.`)
}
