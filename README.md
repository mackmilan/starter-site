# Site Starter

Frontend institucional reutilizável, baseado em Vue 3, TypeScript, Vite e Tailwind CSS. O projeto mantém as funcionalidades de navegação, páginas de conteúdo, notícias, contato, apoio, tela de manutenção e integração opcional com um BFF público multi-tenant, sem depender de uma marca ou organização específica.

## O que está incluído

- SPA responsiva com `vue-router`.
- Dados locais de fallback para executar a interface sem backend.
- Camada de serviços para transformar payloads do BFF em modelos de apresentação.
- Cliente TypeScript gerado a partir de OpenAPI com `@hey-api/openapi-ts`.
- Conteúdo e imagens de exemplo genéricos, prontos para substituição.
- Dockerfile, `docker-compose.yml` e workflow de CI/CD para GitHub Actions.
- Documentação de contexto em `docs/ai/` para facilitar a manutenção por agentes.

## Requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.
- Um BFF compatível apenas se o conteúdo dinâmico for necessário.

## Desenvolvimento

```bash
npm install
cp .env.example .env
npm run dev
```

Por padrão, a aplicação usa os fallbacks locais e aponta a API para `http://localhost:8000`. Ajuste `.env` conforme o backend que será conectado. O arquivo `.env` é ignorado pelo Git.

## Comandos úteis

```bash
npm run build          # type-check e build de produção
npm run docs:check     # valida a documentação de agentes
npm run generate:api   # atualiza o cliente TypeScript a partir do OpenAPI
npm run fetch:openapi  # baixa apenas o contrato OpenAPI
npm run preview        # serve o build localmente
```

`openapi.json` é um contrato de referência versionado no repositório. Quando existir um BFF real, defina `OPENAPI_URL` ou `VITE_OPENAPI_URL` para apontar para sua especificação e execute `npm run generate:api`. Os arquivos em `src/api/generated/` são derivados: não os edite manualmente.

## Personalização

1. Substitua os fallbacks em `src/services/` pelos conteúdos iniciais da sua organização.
2. Configure o nome visual em `src/components/SiteLogo.vue` e os dados de navegação em `src/services/navigation.service.ts`.
3. Troque `public/images/placeholder.svg` pelos assets do projeto ou faça o BFF fornecer URLs de mídia.
4. Revise as rotas em `src/router/index.ts` e os modelos em `src/models/` conforme o escopo do site.
5. Atualize `.env.example`, `openapi.json` e `docs/ai/` quando a integração mudar.

## GitHub

O diretório não contém histórico Git, credenciais ou assets da aplicação de origem. Para publicar em um repositório novo:

```bash
git init
git add .
git commit -m "chore: initial site starter"
git branch -M main
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

Antes do primeiro push, revise os valores de ambiente e execute `npm run docs:check`, `npx vue-tsc -b`, `npm run build` e `git diff --check`.

## Licença

Consulte [LICENSE](LICENSE).
