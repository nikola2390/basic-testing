import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 0, action: Action.Add, expected: 5 },
  { a: -12, b: 8, action: Action.Add, expected: -4 },
  { a: -36, b: -74, action: Action.Add, expected: -110 },
  { a: 12, b: 3, action: Action.Subtract, expected: 9 },
  { a: 5, b: 15, action: Action.Subtract, expected: -10 },
  { a: -7, b: -3, action: Action.Subtract, expected: -4 },
  { a: 6, b: 9, action: Action.Multiply, expected: 54 },
  { a: 10, b: 0, action: Action.Multiply, expected: 0 },
  { a: -7, b: 2, action: Action.Multiply, expected: -14 },
  { a: -9, b: -11, action: Action.Multiply, expected: 99 },
  { a: 36, b: 9, action: Action.Divide, expected: 4 },
  { a: 0, b: 12, action: Action.Divide, expected: 0 },
  { a: -8, b: 2, action: Action.Divide, expected: -4 },
  { a: -18, b: -6, action: Action.Divide, expected: 3 },
  { a: 17, b: 0, action: Action.Divide, expected: Infinity },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 16, b: 0.5, action: Action.Exponentiate, expected: 4 },
  { a: -5, b: 3, action: Action.Exponentiate, expected: -125 },
  { a: -3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 7, b: 12, action: 'Action.Add', expected: null },
  { a: [], b: {}, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$action with $a and $b should be $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
