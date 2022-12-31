import { assert, describe, it } from 'vitest';

import { compress } from '../src/compress';

describe('compressor', () => {
  it('works with sequential numbers', () => {
    assert.deepEqual(compress([1, 2, 3, 4, 5, 6]), [1, 2, 3, 4, 5, 6]);
  });

  it('works with unique numbers', () => {
    assert.deepEqual(compress([1, 2, 3, 3, 4, 5]), [1, 2, 3, 3, 4, 5]);
  });

  it('works with non-unique numbers', () => {
    assert.deepEqual(compress([1, 2, 3, 1, 2, 4]), [
      1,
      2,
      3,
      { index: 0, size: 2 },
      4,
    ]);
  });

  it('works with bigger non-unique numbers', () => {
    assert.deepEqual(compress([1, 2, 3, 4, 1, 2, 4, 4, 1, 2, 3, 4]), [
      1,
      2,
      3,
      4,
      { index: 0, size: 2 },
      4,
      4,
      { index: 0, size: 4 },
    ]);
  });
});
