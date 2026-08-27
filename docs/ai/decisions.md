# Decisões arquiteturais

## D-001 — Fonte única de memória compartilhada

- Status: vigente
- Decisão: manter o contexto durável em `docs/ai/` e usar `AGENTS.md` e `CLAUDE.md` como adaptadores mínimos.
- Motivo: OpenAI/Codex e Claude conseguem iniciar por arquivos diferentes, mas devem receber as mesmas regras e fatos.
- Consequência: alterações de contexto devem ser feitas na fonte canônica, não copiadas para cada modelo.

## D-002 — Cliente OpenAPI gerado como fronteira HTTP

- Status: vigente
- Decisão: os serviços da aplicação chamam `BffPublicService`/`BffSiteService`; a fachada chama o cliente gerado em `src/api/generated/`.
- Motivo: preserva uma API interna estável e mantém tipos, operações e contrato alinhados.
- Consequência: mudanças no contrato exigem regeneração; arquivos gerados não devem receber correções manuais.

## D-003 — Segredos permanecem fora do frontend e da memória

- Status: vigente
- Decisão: nenhuma credencial, token, cookie, sessão, valor de `.env` ou dado pessoal entra no bundle, no repositório ou nesta memória.
- Motivo: variáveis `VITE_*` são públicas após o build e a memória é versionada.
- Consequência: qualquer validação que dependa de segredo deve ser feita pelo BFF/backend, retornando apenas o resultado necessário para a interface.

## D-004 — Memória registra conhecimento durável, não todo o histórico

- Status: vigente
- Decisão: `memory-log.md` recebe fatos ou decisões novas e verificáveis; mudanças sem conhecimento durável não geram entradas artificiais.
- Motivo: evitar duplicação, ruído e instruções conflitantes.
- Consequência: ao final de uma alteração, revise a necessidade de atualizar a memória e a documentação técnica afetada.
