# Contexto do projeto

## Escopo

O Site Starter neste repositório é um frontend público de referência para sites institucionais. O backend/CMS e o armazenamento do tenant ficam fora deste repositório; portanto, mudanças de persistência, autorização ou contrato no backend precisam ser coordenadas com o serviço que publica o BFF.

## Stack e execução

- Vue 3 com TypeScript e Vite.
- Tailwind CSS 4 e `lucide-vue-next` para estilos e ícones.
- SPA com `vue-router` e histórico baseado em navegador.
- Build de produção: `npm run build`.
- Desenvolvimento: `npm run dev`.
- Containerização: `Dockerfile`, `docker-compose.yml` e `nginx.conf`.

As variáveis `VITE_*` são incorporadas ao bundle durante o build. Elas devem conter apenas configuração pública, nunca credenciais. `.env` é ignorado pelo Git; use `.env.example` para documentar nomes e valores de exemplo não sensíveis.

## Fluxo da aplicação

1. `src/main.ts` cria a aplicação Vue, importa os estilos e registra o router.
2. `src/App.vue` coordena navegação, rodapé, carregamento inicial e a tela de site em construção.
3. `src/router/index.ts` define as rotas públicas: início, sobre, fundamentação, como implantar, notícias, contato e apoio.
4. Os componentes das views consomem os serviços em `src/services/`.
5. Os serviços usam dados locais de fallback e tentam obter conteúdo dinâmico pelo BFF.

## Limites de integração

- `src/api/index.ts` é a fachada compatível consumida pelos serviços.
- `src/api/generated/` é gerado por `@hey-api/openapi-ts`; não edite esses arquivos manualmente.
- O contrato é obtido por `scripts/fetch-openapi.mjs`/`scripts/generate-api.mjs` a partir de uma URL, de um arquivo local do CMS ou do `openapi.json` existente.
- Depois de uma mudança de contrato, atualize a fonte OpenAPI disponível e execute `npm run generate:api`; revise o diff gerado junto com a fachada e os serviços.
- `BffPublicService` concentra as operações públicas do BFF, incluindo páginas, menu, seções, configurações, leads e validação do site em construção.
- `BffSiteService` concentra a consulta opcional de informações específicas da organização.

O frontend não deve acessar diretamente bancos, segredos do CMS ou APIs administrativas. Um valor sensível necessário para uma decisão de backend deve ser resolvido no servidor e nunca enviado como configuração `VITE_*`.

## Organização de conteúdo

- `src/models/` contém os modelos de apresentação usados pelas views.
- `src/services/` traduz payloads do BFF para esses modelos e mantém fallbacks locais quando a API não está disponível.
- `src/utils/sectionParser.ts` auxilia na leitura de conteúdo HTML/section retornado pelo BFF.
- `public/images/` contém os assets estáticos do site.
- `src/config/site.ts` mantém estado/configuração pública carregada do BFF e o fluxo do site em construção.

## Validação mínima

Para uma mudança de frontend, execute `npm run docs:check`, `npx vue-tsc -b`, `npm run build` e `git diff --check`, conforme o escopo. A geração do cliente e a validação contra um serviço BFF ativo só podem ser afirmadas quando forem realmente executadas; um build local não comprova a disponibilidade ou o comportamento do backend.
