import { sum } from '@/index.js';

describe('sum函数', () => {
  test('sum', () => {
    expect(sum(1, 2)).toEqual(3);
  })
})
