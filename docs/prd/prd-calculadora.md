# Product Requirements Document - Calculadora Web

## Overview

**Product:** Calculadora Web
**Version:** 1.0.0
**Author:** Morgan (@pm)
**Date:** 2026-05-07
**Status:** Draft
**Fonte:** `docs/brief.md` (Atlas @analyst, 2026-05-07)

---

## 1. Problem Statement

Times que aprendem o AIOX precisam de um projeto de referência concreto e completo para vivenciar o Story Development Cycle de 8 passos na prática. Uma calculadora web é o escopo ideal: simples o suficiente para ser concluída em uma sessão, mas rica o suficiente para exercitar testes, acessibilidade e tratamento de erros — todos os quality gates do framework.

---

## 2. Goals & Objectives

- G1: Demonstrar o SDC completo (8 passos) com um produto funcional
- G2: Entregar calculadora com as 4 operações básicas funcionando corretamente
- G3: Ter PR aberto no GitHub ao final da sessão (sem deploy)
- G4: Exercitar todos os agentes AIOX (@analyst → @pm → @architect → @sm → @po → @dev → @qa → @devops)
- G5: Documentar bloqueios encontrados para discussão no Encontro 05

---

## 3. User Stories

### US1: Operações Básicas

**As** um usuário da calculadora,
**I want** realizar soma, subtração, multiplicação e divisão,
**So that** eu possa efetuar cálculos matemáticos básicos diretamente no browser.

**Acceptance Criteria:**
- [ ] Pressionar dígitos e operadores exibe a expressão no display
- [ ] Pressionar = (ou Enter) calcula e exibe o resultado
- [ ] Divisão por zero exibe mensagem de erro "Erro: div/0" sem travar
- [ ] Operações encadeadas funcionam corretamente (ex: 2 + 3 × 4 = 14)

### US2: Entrada por Teclado

**As** um usuário da calculadora,
**I want** usar o teclado físico para inserir números e operadores,
**So that** eu possa calcular sem precisar usar o mouse.

**Acceptance Criteria:**
- [ ] Teclas 0–9 inserem dígitos
- [ ] Teclas + - * / inserem operadores
- [ ] Enter executa o cálculo (equivalente a =)
- [ ] Backspace apaga o último dígito
- [ ] Escape limpa o display (equivalente a C)

### US3: Display de Expressão Completa

**As** um usuário da calculadora,
**I want** ver a expressão completa que estou digitando,
**So that** eu possa verificar o que estou calculando antes de pressionar =.

**Acceptance Criteria:**
- [ ] Display superior mostra a expressão atual (ex: `12 × 3`)
- [ ] Display inferior (destaque) mostra o resultado atual ou o número sendo digitado
- [ ] Após pressionar =, display superior mostra `expressão = resultado`

### US4: Acessibilidade

**As** um usuário com deficiência visual,
**I want** usar a calculadora com screen reader e navegação por teclado,
**So that** eu possa acessar todas as funções sem depender do mouse ou visão.

**Acceptance Criteria:**
- [ ] Todos os botões têm `aria-label` descritivo
- [ ] Resultado é anunciado via `aria-live` region
- [ ] Navegação por Tab funciona em todos os botões
- [ ] Contraste de cores atende WCAG AA

---

## 4. Functional Requirements

### FR1: Operações Aritméticas

As quatro operações básicas devem ser implementadas: adição (+), subtração (−), multiplicação (×), divisão (÷).

**Priority:** P1

### FR2: Display Duplo

Interface com dois níveis de display: expressão em construção (topo) e resultado/número atual (destaque).

**Priority:** P1

### FR3: Suporte a Teclado Físico

Mapeamento completo de teclas físicas para ações da calculadora (dígitos, operadores, Enter, Backspace, Escape).

**Priority:** P1

### FR4: Tratamento de Erros

Divisão por zero exibe mensagem de erro clara. Estado de erro é limpo ao pressionar C ou Escape.

**Priority:** P1

### FR5: Botões C e ⌫

- **C (Clear):** Limpa toda a expressão e reinicia o estado
- **⌫ (Backspace):** Remove o último caractere da expressão

**Priority:** P1

### FR6: Testes Unitários

Funções de cálculo devem ter cobertura de testes: 4 operações básicas + divisão por zero + números decimais.

**Priority:** P1

---

## 5. Non-Functional Requirements

- **Performance:** Carrega em < 1 segundo (zero bundler, arquivos estáticos)
- **Compatibilidade:** Chrome, Firefox, Safari, Edge (últimas 2 versões)
- **Responsividade:** Funcional em telas a partir de 320px (mobile-first)
- **Acessibilidade:** Lighthouse Accessibility ≥ 90, WCAG 2.1 AA
- **Dependências:** Zero bibliotecas externas no produto final (HTML + CSS + JS puro)
- **Manutenibilidade:** Lógica de cálculo separada da UI (testável isoladamente)

---

## 6. UI/UX Requirements

### User Flows

1. **Cálculo simples:** Usuário clica/digita `2` `+` `3` `=` → resultado `5` exibido em destaque
2. **Erro e recuperação:** Usuário digita `5` `÷` `0` `=` → mensagem "Erro: div/0" → pressiona C → estado limpo
3. **Uso por teclado:** Usuário foca na página → digita `12` `*` `3` `Enter` → resultado `36`

### Design Considerations

- Layout centralizado, fundo escuro (dark por padrão), botões com boa área de toque (mín. 44×44px)
- Hierarquia visual clara: display no topo, grade de botões abaixo
- Botão `=` em destaque cromático (ex: laranja/azul)
- Botões de operador visualmente diferenciados dos dígitos

---

## 7. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Operações corretas | 0 bugs nas 4 operações | Testes unitários passando |
| Teclado funcional | 100% das teclas mapeadas | Teste manual |
| Acessibilidade | Lighthouse ≥ 90 | Lighthouse audit |
| Cobertura de testes | ≥ 80% das funções de cálculo | Relatório de coverage |
| PR aberto | PR criado no GitHub | Link do PR no canal |

---

## 8. Timeline & Milestones

- **M1 — Brief aprovado:** 2026-05-07 (concluído)
- **M2 — PRD e épico criados:** 2026-05-07
- **M3 — Arquitetura definida:** 2026-05-07
- **M4 — Story validada (Ready):** 2026-05-07
- **M5 — Código implementado e commitado:** 2026-05-07
- **M6 — QA PASS:** 2026-05-07
- **M7 — PR aberto no GitHub:** 2026-05-07 (meta final)

---

## 9. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Git não inicializado | Alto | Alta | Inicializar repositório antes do passo 06 |
| GitHub remote inexistente | Alto | Alta | Criar repo no GitHub antes do passo 08 |
| Testes sem runner configurado | Médio | Média | Usar Vitest com config mínima ou script standalone |
| Scope creep (histórico, dark mode) | Médio | Média | Manter MVP estrito conforme brief |

---

**Generated by:** Morgan (@pm) — AIOX SDC Passo 02
**Template Version:** prd-v2.0
