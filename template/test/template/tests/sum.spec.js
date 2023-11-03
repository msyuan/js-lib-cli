const sum = require('@/index.js');

test('sum函数', () => {
  expect(sum(1, 2)).toBe(3);
});
