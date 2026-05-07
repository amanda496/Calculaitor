// Erro de cálculo tipado — testável e distinguível de número
export class CalcError {
  constructor(message) {
    this.message = message;
  }
  toString() {
    return this.message;
  }
}

// ── Lógica pura (sem acesso ao DOM) ────────────────────────────────────────

export function parseTokens(expression) {
  const tokens = [];
  let current = '';

  for (let i = 0; i < expression.length; i++) {
    const ch = expression[i];

    if (ch === ' ') continue;

    if ('+-*/'.includes(ch)) {
      if (current !== '') {
        tokens.push(current);
        current = '';
      }
      // Sinal negativo inicial ou após operador
      if (ch === '-' && (tokens.length === 0 || '+-*/'.includes(tokens[tokens.length - 1]))) {
        current = '-';
      } else {
        tokens.push(ch);
      }
    } else {
      current += ch;
    }
  }

  if (current !== '') tokens.push(current);
  return tokens;
}

export function applyPrecedence(tokens) {
  // Primeira passagem: resolve × e ÷
  let nums = [];
  let ops = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === '*' || t === '/') {
      const left = nums.pop();
      const right = parseFloat(tokens[++i]);
      if (isNaN(right)) return new CalcError('Expressão inválida');
      if (t === '/' && right === 0) return new CalcError('Erro: div/0');
      nums.push(t === '*' ? left * right : left / right);
    } else if (t === '+' || t === '-') {
      ops.push(t);
      nums.push(null); // placeholder — será resolvido abaixo
    } else {
      const n = parseFloat(t);
      if (isNaN(n)) return new CalcError('Expressão inválida');
      if (nums.length > 0 && nums[nums.length - 1] === null) {
        nums[nums.length - 1] = n;
      } else {
        nums.push(n);
      }
    }
  }

  // Segunda passagem: resolve + e −
  let result = nums[0];
  for (let i = 0; i < ops.length; i++) {
    const next = nums[i + 1];
    if (ops[i] === '+') result += next;
    else result -= next;
  }

  return result;
}

export function calculate(expression) {
  if (!expression || expression.trim() === '') return new CalcError('Expressão vazia');

  const tokens = parseTokens(expression);
  if (tokens.length === 0) return new CalcError('Expressão vazia');

  // Verificar divisão por zero antes de avaliar
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '/' && parseFloat(tokens[i + 1]) === 0) {
      return new CalcError('Erro: div/0');
    }
  }

  const result = applyPrecedence(tokens);
  if (result instanceof CalcError) return result;
  if (!isFinite(result)) return new CalcError('Erro: div/0');

  // Limitar casas decimais (evitar 0.1 + 0.2 = 0.30000000004)
  return parseFloat(result.toFixed(10));
}

// ── Estado da UI ─────────────────────────────────────────────────────────────

const state = {
  expression: '',
  result: '0',
  hasError: false,
  justCalculated: false,
};

// ── DOM helpers ───────────────────────────────────────────────────────────────

function updateDisplay() {
  const exprEl = document.querySelector('.display__expression');
  const resultEl = document.querySelector('.display__result');

  if (exprEl) exprEl.textContent = state.expression || '0';
  if (resultEl) resultEl.textContent = state.result;
}

// ── Handlers de entrada ───────────────────────────────────────────────────────

function handleInput(value) {
  if (state.hasError && value !== 'C') {
    // Qualquer tecla após erro reinicia
    state.expression = '';
    state.result = '0';
    state.hasError = false;
    state.justCalculated = false;
  }

  const isOperator = '+-*/'.includes(value);

  switch (value) {
    case 'C':
      state.expression = '';
      state.result = '0';
      state.hasError = false;
      state.justCalculated = false;
      break;

    case '⌫':
      if (state.expression.length > 0) {
        state.expression = state.expression.slice(0, -1);
        state.result = state.expression || '0';
      }
      state.justCalculated = false;
      break;

    case '=': {
      if (state.expression === '') break;
      const res = calculate(state.expression);
      if (res instanceof CalcError) {
        state.result = res.toString();
        state.hasError = true;
      } else {
        const exprSnap = state.expression;
        state.result = String(res);
        state.expression = `${exprSnap} = ${res}`;
        state.justCalculated = true;
      }
      break;
    }

    default:
      // Se acabou de calcular e usuário digita operador, continua com resultado
      if (state.justCalculated && isOperator) {
        state.expression = state.result + value;
        state.justCalculated = false;
      } else if (state.justCalculated && !isOperator) {
        // Novo número: reinicia expressão
        state.expression = value;
        state.justCalculated = false;
      } else {
        state.expression += value;
      }
      if (!isOperator) {
        state.result = state.expression.split(/[+\-*/]/).pop() || '0';
      }
      break;
  }

  updateDisplay();
}

// ── Mapeamento de teclado ────────────────────────────────────────────────────

const KEY_MAP = {
  Enter: '=',
  Backspace: '⌫',
  Escape: 'C',
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '.': '.',
};

function handleKeyDown(event) {
  const { key } = event;

  if (KEY_MAP[key]) {
    event.preventDefault();
    handleInput(KEY_MAP[key]);
    return;
  }

  if (key >= '0' && key <= '9') {
    handleInput(key);
  }
}

// ── Inicialização ─────────────────────────────────────────────────────────────

export function init() {
  const buttons = document.querySelectorAll('.buttons button');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.value;
      if (value !== undefined) handleInput(value);
    });
  });

  document.addEventListener('keydown', handleKeyDown);
  updateDisplay();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);
}
