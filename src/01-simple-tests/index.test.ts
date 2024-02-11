import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Add })).toBe(5);
    expect(simpleCalculator({ a: -12, b: 8, action: Action.Add })).toBe(-4);
    expect(simpleCalculator({ a: -36, b: -74, action: Action.Add })).toBe(-110);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 3, action: Action.Subtract })).toBe(9);
    expect(simpleCalculator({ a: 5, b: 15, action: Action.Subtract })).toBe(
      -10,
    );
    expect(simpleCalculator({ a: -7, b: -3, action: Action.Subtract })).toBe(
      -4,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 9, action: Action.Multiply })).toBe(54);
    expect(simpleCalculator({ a: 10, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: -7, b: 2, action: Action.Multiply })).toBe(
      -14,
    );
    expect(simpleCalculator({ a: -9, b: -11, action: Action.Multiply })).toBe(
      99,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 36, b: 9, action: Action.Divide })).toBe(4);
    expect(simpleCalculator({ a: 0, b: 12, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: -8, b: 2, action: Action.Divide })).toBe(-4);
    expect(simpleCalculator({ a: -18, b: -6, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: 17, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 5, action: Action.Exponentiate })).toBe(
      32,
    );
    expect(
      simpleCalculator({ a: 16, b: 0.5, action: Action.Exponentiate }),
    ).toBe(4);
    expect(simpleCalculator({ a: -5, b: 3, action: Action.Exponentiate })).toBe(
      -125,
    );
    expect(simpleCalculator({ a: -3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 7, b: 12, action: 'Action.Add' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: [], b: {}, action: Action.Add })).toBeNull();
  });
});
