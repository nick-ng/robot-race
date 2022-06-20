import { randomUUID } from "crypto";

export const shuffle = <T>(inputArray: T[]): T[] =>
  [...inputArray]
    .map((data) => ({
      data,
      sortValue: randomUUID(),
    }))
    .sort((a, b) => a.sortValue.localeCompare(b.sortValue))
    .map(({ data }) => data);
