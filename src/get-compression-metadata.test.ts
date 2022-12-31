import { assert, describe, it } from 'vitest';

import { getCompressionMetadata } from './get-compression-metadata';

describe('compressor', () => {
  it('works with sequential numbers', () => {
    assert.deepEqual(getCompressionMetadata([1, 2, 3, 4, 5, 6]), [1, 2, 3, 4, 5, 6]);
  });

  it('works with unique numbers', () => {
    assert.deepEqual(getCompressionMetadata([1, 2, 3, 3, 4, 5]), [1, 2, 3, 3, 4, 5]);
  });

  it('works with non-unique numbers', () => {
    assert.deepEqual(getCompressionMetadata([1, 2, 3, 1, 2, 4]), [
      1,
      2,
      3,
      { index: 0, size: 2, __isMetadata: true },
      4,
    ]);
  });

  it('works with bigger non-unique numbers', () => {
    assert.deepEqual(getCompressionMetadata([1, 2, 3, 4, 1, 2, 4, 4, 1, 2, 3, 4]), [
      1,
      2,
      3,
      4,
      { index: 0, size: 2, __isMetadata: true },
      4,
      4,
      { index: 0, size: 4, __isMetadata: true },
    ]);
  });
});
