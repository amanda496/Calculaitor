# Architecture — Calculadora Web

**Autor:** Aria (@architect)
**Data:** 2026-05-07
**Epic:** EPIC-1
**Complexidade:** SIMPLE (score 7/25)
**Status:** Aprovado — pronto para @sm criar story

---

## 1. Visão Geral

Aplicação web **100% client-side**, sem backend, sem banco de dados, sem dependências de runtime. Três arquivos de produto + configuração de testes.

```
calculadora/
├── index.html          # Estrutura semântica da UI
├── style.css           # Estilos + custom properties
├── calculator.js       # Módulo de lógica + handlers de UI
├── calculator.test.js  # Testes unitários (Vitest)
├── package.json        # Apenas devDependencies (Vitest)
└── vite.config.js      # Config mínima para Vitest (opcional)
```

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Markup | HTML5 semântico | Nativo, sem transpilação |
| Estilos | CSS3 + custom properties | Sem preprocessador — mantém simplicidade |
| Lógica | JavaScript ES6+ (vanilla) | Zero dependências em runtime |
| Testes | Vitest 1.x | Suporta ES modules nativos; config mínima |
| Servidor dev | `npx serve` ou Live Server | Sem bundler necessário para o produto |

> **Decisão arquitetural:** Nenhuma lib de UI (React, Vue, etc.) — o exercício é sobre o processo AIOX, não a stack. Vanilla JS é suficiente e elimina complexidade de tooling.

---

## 3. Arquitetura de Módulos

### Separação de responsabilidades

```
calculator.js
├── [LÓGICA PURA — testável]
│   ├── calculate(expression: string): number | CalcError
│   ├── parseTokens(expression: string): Token[]
│   └── applyPrecedence(tokens: Token[]): number
│
└── [UI HANDLERS — não testada unitariamente]
    ├── handleButtonClick(value: string): void
    ├── handleKeyDown(event: KeyboardEvent): void
    ├── updateDisplay(expression: string, result: string): void
    └── init(): void  ← chamado no DOMContentLoaded
```

### Estado da calculadora

```javascript
const state = {
  expression: '',      // string visível no display superior
  result: '0',         // string no display principal
  hasError: false,     // flag de erro (div/0 etc.)
  justCalculated: false // flag para reiniciar após "="
}
```

---

## 4. Estrutura HTML

```html
<main class="calculator" role="main" aria-label="Calculadora">
  <output class="display__expression" aria-label="Expressão">0</output>
  <output class="display__result" aria-live="polite" aria-label="Resultado">0</output>

  <section class="buttons" role="group" aria-label="Botões da calculadora">
    <button aria-label="limpar tudo">C</button>
    <button aria-label="apagar dígito">⌫</button>
    <!-- ... demais botões com aria-label descritivo -->
    <button aria-label="igual" class="btn--equals">=</button>
  </section>
</main>
```

**Regras semânticas:**
- `<output>` ou `<div role="status">` para o display (anuncia ao screen reader)
- `aria-live="polite"` no resultado
- `aria-label` em cada `<button>` com nome por extenso (ex: "dividir", "multiplicar")
- Navegação por Tab em ordem lógica (C → ⌫ → 7 → 8 → 9 → ÷ → ...)

---

## 5. Layout CSS

```
.calculator                 → container central (max-width: 320px)
  .display                  → área de display (2 linhas)
    .display__expression    → expressão (fonte menor, cor secundária)
    .display__result        → resultado (fonte grande, cor primária)
  .buttons                  → grade CSS: grid-template-columns: repeat(4, 1fr)
    .btn--operator          → cor diferenciada (ex: laranja)
    .btn--equals            → destaque (maior, cor de ação)
    .btn--clear             → cor de aviso
```

**Custom properties:**
```css
:root {
  --color-bg: #1a1a2e;
  --color-surface: #16213e;
  --color-primary: #e94560;
  --color-operator: #0f3460;
  --color-text: #eaeaea;
  --color-text-secondary: #a0a0b0;
  --radius: 8px;
  --btn-size: 64px;
}
```

---

## 6. Fluxo de Dados

```
Evento (click / keydown)
        ↓
  handleInput(value)
        ↓
  updateState(state, value)   ← lógica pura
        ↓
  updateDisplay(state)        ← DOM update
        ↓
  [se "=" pressionado]
        ↓
  calculate(state.expression) ← lógica pura
        ↓
  state.result = resultado    ← sem efeitos colaterais
        ↓
  updateDisplay(state)
```

---

## 7. Estratégia de Testes

**Runner:** Vitest (suporta ES modules, jsdom environment)

**O que testar (unitário — `calculator.test.js`):**

```javascript
// Testa APENAS as funções puras
describe('calculate()', () => {
  test('soma', () => expect(calculate('2 + 3')).toBe(5))
  test('subtração', () => expect(calculate('10 - 4')).toBe(6))
  test('multiplicação', () => expect(calculate('6 * 7')).toBe(42))
  test('divisão', () => expect(calculate('15 / 3')).toBe(5))
  test('divisão por zero', () => expect(calculate('5 / 0')).toBeInstanceOf(CalcError))
  test('encadeamento com precedência', () => expect(calculate('2 + 3 * 4')).toBe(14))
  test('decimal', () => expect(calculate('1.5 + 2.5')).toBe(4))
})
```

**O que NÃO testar unitariamente:** manipulação do DOM, eventos de clique/teclado (cobertos por inspeção manual).

**package.json mínimo:**
```json
{
  "name": "calculadora",
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  },
  "devDependencies": {
    "vitest": "^1.6.0"
  }
}
```

---

## 8. Mapeamento de Teclas

| Tecla | Ação |
|-------|------|
| `0`–`9` | Inserir dígito |
| `+` `-` `*` `/` | Inserir operador |
| `Enter` | Calcular (=) |
| `Backspace` | Apagar último caractere |
| `Escape` | Limpar tudo (C) |
| `.` | Inserir decimal |

---

## 9. Requisitos Não-Funcionais — Decisões

| NFR | Decisão |
|-----|---------|
| Performance < 1s | Zero bundler — HTML/CSS/JS direto |
| Acessibilidade ≥ 90 | `aria-live`, `aria-label`, Tab order, contraste WCAG AA |
| Zero dependências runtime | Vitest apenas em `devDependencies` |
| Responsivo 320px+ | CSS Grid + unidades relativas |
| Testável isoladamente | Funções de cálculo exportadas como ES modules |

---

## 10. Handoff para @sm

**Story a criar:** `1.1.story.md`

**Escopo da story 1.1 (tudo em uma):**
- Estrutura HTML (`index.html`)
- Estilos CSS (`style.css`)
- Lógica JS + handlers (`calculator.js`)
- Testes unitários (`calculator.test.js`)
- Configuração Vitest (`package.json`)

**Pontos de atenção para o @dev:**
1. Exportar `calculate()` como função pura testável (ES module)
2. Usar `Function()` ou parser próprio — **NUNCA `eval()`** (segurança)
3. Implementar precedência de operadores (× ÷ antes de + −)
4. `aria-live="polite"` no display de resultado

---

*— Aria, arquitetando o futuro 🏗️*
