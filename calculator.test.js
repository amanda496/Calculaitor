import { describe, test, expect } from 'vitest';
import { calculate, CalcError } from './calculator.js';

describe('calculate()', () => {
  test('T-01: soma simples', () => {
    expect(calculate('2 + 3')).toBe(5);
  });

  test('T-02: subtração', () => {
    expect(calculate('10 - 4')).toBe(6);
  });

  test('T-03: multiplicação', () => {
    expect(calculate('6 * 7')).toBe(42);
  });

  test('T-04: divisão', () => {
    expect(calculate('15 / 3')).toBe(5);
  });

  test('T-05: divisão por zero retorna CalcError', () => {
    expect(calculate('5 / 0')).toBeInstanceOf(CalcError);
  });

  test('T-05b: mensagem de erro de divisão por zero', () => {
    const err = calculate('5 / 0');
    expect(err.message).toBe('Erro: div/0');
  });

  test('T-06: precedência — multiplicação antes de adição', () => {
    expect(calculate('2 + 3 * 4')).toBe(14);
  });

  test('T-07: números decimais', () => {
    expect(calculate('1.5 + 2.5')).toBe(4);
  });

  test('T-08: subtração com resultado negativo', () => {
    expect(calculate('3 - 10')).toBe(-7);
  });

  test('T-09: expressão encadeada com divisão', () => {
    expect(calculate('20 / 4 + 1')).toBe(6);
  });

  test('T-10: expressão vazia retorna CalcError', () => {
    expect(calculate('')).toBeInstanceOf(CalcError);
  });
});
