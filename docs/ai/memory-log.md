# Registro de memória do projeto

Este arquivo é append-only. Quando um fato mudar, preserve o registro histórico e acrescente uma entrada que indique a substituição ou a nova condição.

## M-2026-08-26-001 — Estrutura de memória multi-modelo

- Tipo: arquitetura e processo
- Evidência: `AGENTS.md`, `CLAUDE.md`, `docs/ai/README.md`, `project-context.md` e `decisions.md` versionados neste repositório.
- Fato: a memória compartilhada do Site Starter usa uma fonte canônica em `docs/ai/`, com adaptadores mínimos para OpenAI/Codex e Claude.
- Limite: arquivos locais de memória não são sincronizados automaticamente; esta estrutura não armazena credenciais, tokens, sessões, valores de `.env` ou dados pessoais.
- Confiança: alta
- Revisar quando: a ferramenta de agente, a organização do frontend ou a política de armazenamento de contexto mudar.
