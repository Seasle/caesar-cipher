export const countChars = (string: string): Map<string, number> => {
  const store = new Map();
  const chars = [...string];

  for (const char of chars) {
    store.set(char, (store.get(char) || 0) + 1);
  }

  return store;
};

export const round = (number: number, precision = 0): number => {
  const multiplier = Math.pow(10, precision);

  return Math.round(number * multiplier) / multiplier;
};

export const wrapBy = <T>(collection: T[] = [], count = 1): T[][] => {
  const amount = Math.ceil(collection.length / count);

  return collection.reduce<T[][]>(
    (accumulator, entry, index) => {
      accumulator[Math.floor(index / amount)].push(entry);

      return accumulator;
    },
    new Array(count).fill(null).map(() => [])
  );
};
