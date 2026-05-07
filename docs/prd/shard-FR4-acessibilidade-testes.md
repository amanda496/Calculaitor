# Shard PRD — FR4 + FR6: Acessibilidade e Testes

**Epic:** EPIC-1
**PRD fonte:** docs/prd/prd-calculadora.md
**Shard:** FR4 (acessibilidade) + FR6 (testes) + US4

---

## Feature: Acessibilidade + Cobertura de Testes

## Requisitos Funcionais

- FR4 (AIOX): Acessibilidade ARIA e navegação por teclado
- FR6: Testes unitários das funções de cálculo

## User Story de referência

US4 — Acessibilidade

## Acceptance Criteria — Acessibilidade

- [ ] Todos os `<button>` têm `aria-label` descritivo (ex: `aria-label="somar"`)
- [ ] Resultado é anunciado via `aria-live="polite"` region
- [ ] Navegação por Tab cobre todos os botões em ordem lógica
- [ ] Contraste de cores ≥ 4.5:1 (WCAG AA)
- [ ] `<title>` da página: "Calculadora Web"
- [ ] Lighthouse Accessibility ≥ 90

## Acceptance Criteria — Testes

- [ ] Função `calculate()` tem testes para soma, subtração, multiplicação, divisão
- [ ] Caso de divisão por zero testado e retorna objeto de erro
- [ ] Números decimais testados (ex: 1.5 + 2.5 = 4)
- [ ] Testes executam com `npm test` sem erro
- [ ] Coverage report gerado

## Configuração de testes sugerida

```json
// package.json
{
  "scripts": {
    "test": "vitest run",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "vitest": "^1.0.0"
  }
}
```
