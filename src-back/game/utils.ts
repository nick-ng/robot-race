export const shuffle = <T>(inputArray: T[]): T[] =>
  [...inputArray]
    .map((data) => ({
      data,
      sortValue: Math.random(),
    }))
    .sort((a, b) => a.sortValue - b.sortValue)
    .map(({ data }) => data);
