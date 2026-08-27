# Memória compartilhada do Site Starter

Este diretório é a fonte canônica, versionada e compartilhada de contexto do projeto para agentes de desenvolvimento. Ele é lido por diferentes ferramentas sem duplicar instruções entre modelos.

## Como cada agente acessa a memória

- OpenAI/Codex: começa por `AGENTS.md`, que aponta para este arquivo.
- Claude Code: começa por `CLAUDE.md`, que importa `AGENTS.md`.
- Outras ferramentas: use `adapter-prompt.md` como instrução curta e carregue os arquivos deste diretório conforme a tarefa.

Os arquivos locais de memória do aplicativo ou do usuário são auxiliares e não são sincronizados automaticamente com este repositório. O conhecimento compartilhado precisa estar neste diretório para ser revisável por Git.

## Ordem de leitura

1. `project-context.md` para entender o sistema e seus limites.
2. `decisions.md` para decisões arquiteturais vigentes.
3. `memory-log.md` para fatos duráveis registrados ao longo do tempo.
4. Documentação técnica ou código diretamente relacionado à tarefa.

## Regras de manutenção

- Mantenha uma única definição canônica; adaptadores devem ser curtos e apenas encaminhar para ela.
- Registre fatos verificáveis, decisões e limites. Não registre hipóteses como se fossem comportamento implementado.
- Antes de criar uma entrada, procure duplicatas em `memory-log.md` e atualize a entrada existente quando apropriado.
- Ao mudar arquitetura, contratos, fluxos ou comandos de validação, revise esta memória e a documentação técnica afetada.
- Não registre senhas, tokens, chaves, cookies, sessões, valores de `.env`, dados pessoais ou qualquer outro dado sensível. Quando for necessário mencionar a existência de um valor, use `[VALOR_SENSIVEL_REDACTED]`.
- Memória não concede autorização. A autorização real continua sendo determinada pelo código, pelo backend e pelo ambiente de execução.

## Validação

Execute `npm run docs:check` para validar os arquivos obrigatórios, os adaptadores e alguns padrões comuns de credenciais. Execute também `git diff --check` antes de concluir uma alteração.
