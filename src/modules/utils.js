export const countChars = string => {
    const store = new Map();
    const chars = [...string];

    for (const char of chars) {
        store.set(char, (store.get(char) || 0) + 1);
    }

    return store;
};

export const round = (number, precision = 0) => {
    const multiplier = Math.pow(10, precision);

    return Math.round(number * multiplier) / multiplier;
};

export const wrapBy = (collection = [], count = 1) => {
    const amount = Math.ceil(collection.length / count);

    return collection.reduce(
        (accumulator, entry, index) => {
            accumulator[Math.floor(index / amount)].push(entry);

            return accumulator;
        },
        new Array(count).fill(null).map(() => [])
    );
};
