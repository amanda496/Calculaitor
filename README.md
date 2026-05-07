# Calculadora Web

Calculadora web com design glassmorphism dourado, operações básicas, suporte a teclado e acessibilidade WCAG AA.

## Preview

> Abra o `index.html` no navegador ou acesse via GitHub Pages.

## Funcionalidades

- Operações básicas: adição, subtração, multiplicação e divisão
- Precedência matemática correta (`2 + 3 × 4 = 14`)
- Divisão por zero tratada com mensagem de erro
- Display duplo: expressão em construção + resultado em destaque
- Suporte a teclado físico (dígitos, operadores, Enter, Backspace, Escape)
- Acessibilidade: atributos ARIA, `aria-live`, navegação por Tab
- Design glassmorphism com tema dourado e orbs animados

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, custom properties, backdrop-filter, animações)
- JavaScript ES6 Modules (sem frameworks, sem `eval()`)
- [Vitest](https://vitest.dev/) para testes unitários

## Como usar

```bash
# Instalar dependências de desenvolvimento
npm install

# Rodar os testes
npm test

# Abrir no navegador
# Basta abrir o index.html diretamente, ou usar um servidor local:
npx vite
```

## Testes

11 testes unitários cobrindo:

- Soma, subtração, multiplicação e divisão
- Precedência de operadores
- Divisão por zero
- Números decimais
- Resultados negativos
- Encadeamento de operações
- Expressão vazia

## Estrutura

```
calculadora/
├── index.html          # Estrutura HTML semântica
├── style.css           # Layout e tema glassmorphism dourado
├── calculator.js       # Lógica pura + handlers de UI
├── calculator.test.js  # Testes unitários (Vitest)
└── package.json        # Configuração do projeto
```

## Desenvolvido com

[Synkra AIOX](https://github.com/amanda496/Calculaitor) — AI-Orchestrated Development System (SDC completo em 8 etapas)
