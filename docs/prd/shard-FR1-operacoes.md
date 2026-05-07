# Shard PRD — FR1: Operações Aritméticas

**Epic:** EPIC-1
**PRD fonte:** docs/prd/prd-calculadora.md
**Shard:** FR1 + US1

---

## Feature: Operações Básicas

Implementar as 4 operações aritméticas (+ − × ÷) com suporte a operações encadeadas.

## Requisitos Funcionais

- FR1: Adição, subtração, multiplicação e divisão
- FR4: Divisão por zero → exibe "Erro: div/0", não crasha
- FR5: Botão C (limpar tudo) e ⌫ (apagar último dígito)

## User Story de referência

US1 — Operações Básicas

## Acceptance Criteria

- [ ] `2 + 3 = 5` ✓
- [ ] `10 - 4 = 6` ✓
- [ ] `6 × 7 = 42` ✓
- [ ] `15 ÷ 3 = 5` ✓
- [ ] `5 ÷ 0` → "Erro: div/0" ✓
- [ ] C limpa estado → display volta a `0` ✓
- [ ] ⌫ remove último caractere da expressão ✓

## Lógica de negócio

```
evaluate(expression: string): number | Error
  - Parse tokens: dígitos, operadores, decimais
  - Aplicar precedência: × ÷ antes de + −
  - Retornar resultado numérico ou objeto de erro
```

## Testes obrigatórios

| Caso | Entrada | Esperado |
|------|---------|----------|
| Soma simples | `2 + 3` | `5` |
| Subtração | `10 - 4` | `6` |
| Multiplicação | `6 * 7` | `42` |
| Divisão | `15 / 3` | `5` |
| Divisão por zero | `5 / 0` | `Error` |
| Encadeamento | `2 + 3 * 4` | `14` |
| Decimal | `1.5 + 2.5` | `4` |
