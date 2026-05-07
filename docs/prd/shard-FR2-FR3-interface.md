# Shard PRD — FR2 + FR3: Display e Teclado

**Epic:** EPIC-1
**PRD fonte:** docs/prd/prd-calculadora.md
**Shard:** FR2 + FR3 + US2 + US3

---

## Feature: Interface — Display Duplo + Teclado Físico

## Requisitos Funcionais

- FR2: Display duplo — expressão (topo) + resultado/número atual (destaque)
- FR3: Suporte completo a teclado físico

## User Stories de referência

- US2 — Entrada por Teclado
- US3 — Display de Expressão Completa

## Acceptance Criteria — Display

- [ ] Display superior mostra a expressão em construção (ex: `12 × 3`)
- [ ] Display inferior (maior, em destaque) mostra número atual ou resultado
- [ ] Após `=`, display superior mostra `12 × 3 = 36`
- [ ] Display atualiza em tempo real a cada tecla pressionada

## Acceptance Criteria — Teclado

- [ ] Dígitos 0–9 (teclado principal e numpad)
- [ ] Operadores: `+` `-` `*` `/`
- [ ] `Enter` = pressionar `=`
- [ ] `Backspace` = pressionar `⌫`
- [ ] `Escape` = pressionar `C`
- [ ] `.` (ponto) insere separador decimal

## Mapeamento de teclas

| Tecla | Ação |
|-------|------|
| 0–9 | Inserir dígito |
| + | Operador adição |
| - | Operador subtração |
| * | Operador multiplicação |
| / | Operador divisão |
| Enter | Calcular (=) |
| Backspace | Apagar último |
| Escape | Limpar tudo (C) |
| . | Decimal |
