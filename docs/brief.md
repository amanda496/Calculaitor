# Project Brief: Calculadora Web

**Data:** 2026-05-07
**Autor:** Atlas (@analyst)
**Status:** Completo — pronto para handoff ao @pm

---

## Executive Summary

Uma calculadora web simples, acessível e sem dependências externas, construída com HTML + CSS + JavaScript puro. Serve como exercício ponta a ponta do Story Development Cycle no AIOX — do brief ao PR aberto no GitHub.

**Problema:** Não existe um projeto de referência completo no AIOX demonstrando o SDC de 8 passos em um produto real e funcional.

**Valor:** Ao final do exercício, o time terá: código funcional, story validada, QA aprovado e PR aberto — além de ter vivenciado cada agente do framework.

---

## Problem Statement

- Estudantes e times novos no AIOX precisam de um exemplo concreto para entender o fluxo completo do SDC
- Calculadoras web são simples o suficiente para não obscurecer o processo, mas complexas o suficiente para exercitar testes, acessibilidade e tratamento de erros
- O exercício deve ser completável em uma sessão (≤ 4 horas)

---

## Proposed Solution

Calculadora web single-page:
- Stack: **HTML5 + CSS3 + JavaScript ES6+** (zero dependências)
- Interface com teclado e mouse
- Expressão completa visível no display (ex: `12 × 3 = 36`)
- Histórico de cálculos persistido no `localStorage`
- Tema claro/escuro via toggle
- Cobertura de testes unitários (Vitest ou Jest standalone)

---

## Target Users

### Primário: Estudantes do AIOX (encontros semanais)
- Estão aprendendo o framework AIOX na prática
- Conhecimento técnico variado (iniciantes a intermediários)
- Precisam ver o SDC completo funcionando de ponta a ponta

### Secundário: Qualquer usuário final que precise de uma calculadora web
- Acesso via browser, sem instalação
- Usa mouse ou teclado

---

## Goals & Success Metrics

### Objetivos do exercício AIOX
- [ ] Atravessar os 8 passos do SDC com todos os agentes
- [ ] Ter PR aberto no GitHub ao final da sessão
- [ ] Documentar onde o time travou (para discussão no Encontro 05)

### Métricas de sucesso do produto
- Calculadora realiza as 4 operações corretamente (0 bugs reportados)
- Teclado físico funciona (digits + operadores + Enter + Backspace)
- Divisão por zero exibe mensagem de erro (não quebra)
- Histórico persiste após reload da página
- Lighthouse Accessibility ≥ 90

---

## MVP Scope

### Core Features (Must Have)
- **Operações básicas:** Soma (+), subtração (−), multiplicação (×), divisão (÷)
- **Display duplo:** Expressão completa no topo + resultado corrente em destaque
- **Teclado físico:** Suporte a dígitos 0–9, operadores, Enter (=), Backspace (⌫), Escape (C)
- **Erros tratados:** Divisão por zero → exibe "Erro: div/0", não crasha
- **Acessibilidade:** ARIA labels em todos os botões, navegação por Tab, anúncio de resultado para screen readers
- **Limpar/Apagar:** Botão C (limpa tudo) e ⌫ (apaga último dígito)
- **Testes unitários:** Cobertura das 4 operações + edge cases (div/0, overflow)

### Out of Scope para MVP
- Modo científico (sqrt, %, pow, sin, cos)
- Histórico com persistência (pós-MVP)
- Tema claro/escuro (pós-MVP)
- Animações / sons
- Backend / API

### MVP Success Criteria
Calculadora abre no browser, executa 2 + 3 × 4 = 14 corretamente, teclado funciona, divisão por zero exibe erro, testes passam.

---

## Post-MVP Vision

### Fase 2
- Histórico de cálculos com `localStorage` (últimas 20 operações)
- Botão "copiar resultado" para clipboard
- Tema claro/escuro com preferência persistida

### Fase 3 (longo prazo)
- Modo científico básico (sqrt, %, pow)
- Calculadora de porcentagem inline (`200 + 15%`)
- PWA instalável (offline-first)

---

## Technical Considerations

### Plataforma
- **Target:** Web browser (Chrome, Firefox, Safari, Edge — versões recentes)
- **Performance:** Carrega em < 1 segundo (sem bundler necessário)
- **Responsivo:** Mobile-first, funciona em 320px+

### Stack preferida
- **Frontend:** HTML5 semântico + CSS custom properties + JavaScript ES6 modules
- **Testes:** Vitest (ou Jest com jsdom) — sem framework de UI
- **Bundler:** Nenhum para MVP; opcionalmente Vite para facilitar testes

### Arquitetura
- Single file ou 3 arquivos: `index.html`, `style.css`, `calculator.js`
- Lógica de cálculo separada da UI (testável de forma isolada)
- Estado local simples (objeto JS, sem store externo)

---

## Constraints & Assumptions

### Constraints
- **Timeline:** Sessão única (encontro AIOX, ~4h)
- **Deploy:** Fora do escopo — entrega é PR aberto
- **Dependências:** Zero libs externas no produto final
- **Git:** Repositório precisa ser inicializado antes do passo 06

### Key Assumptions
- A usuária (Amanda) tem Node.js instalado para rodar testes
- GitHub CLI (`gh`) está autenticado para o passo 08
- O foco é no **processo AIOX**, não na perfeição do produto

---

## Risks & Open Questions

### Riscos
- **Git não inicializado:** O diretório atual não tem repositório — precisará ser criado antes do @devops fazer push
- **GitHub remote:** Repositório no GitHub precisa existir antes do `gh pr create`

### Perguntas em aberto
- Usar Vite para testes (mais simples) ou Jest standalone?
- Histórico entra no MVP ou fica pra Fase 2?
- O PR vai para qual organização/usuário no GitHub?

---

## Next Steps

1. Handoff para **@pm** → criar PRD (`*create-prd`) e épico (`*create-epic`)
2. @pm sharda o PRD por features para a calculadora
3. @architect avalia complexidade e define stack final
4. @sm cria a primeira story (1.1 — calculadora básica)

---

*— Atlas, investigando a verdade 🔎*
