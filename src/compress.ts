const min = 2;

export const compress = (v: number[], size = Math.floor(v.length / 2)) => {
  if (size < min) {
    return v;
  }
  for (let baseIndex = 0; baseIndex <= v.length; baseIndex += 1) {
    for (let compareIndex = 0; compareIndex <= v.length; compareIndex += 1) {
      if (compareIndex === baseIndex) continue;
      const baseSlice = v.slice(baseIndex, baseIndex + size);
      const compareSlice = v.slice(compareIndex, compareIndex + size);
      if (
        compareSlice.length &&
        compareSlice.length === baseSlice.length &&
        compareSlice.length >= min
      ) {
        if (
          compareSlice.every((item, i) => {
            if (item === baseSlice[i]) return true;
            return false;
          })
        ) {
          v.splice(compareIndex, size, {
            index: baseIndex,
            size,
          } as never);
        }
      }
    }
  }
  return compress(v, size - 1);
};
