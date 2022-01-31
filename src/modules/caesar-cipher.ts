export const enum Mode {
  Encode,
  Decode,
}
const cipher = ({
  string,
  offset = 0,
  dictionary = [],
  mode = Mode.Encode,
}: {
  string: string;
  offset?: number;
  dictionary?: string | string[];
  mode?: Mode;
}): string => {
  const chars = [...string].map((char) => {
    const index = dictionary.indexOf(char.toUpperCase());

    if (index !== -1) {
      const size = dictionary.length;
      const remainder = (offset < 0 ? offset + size : offset) % size;

      if (mode === Mode.Encode) {
        return dictionary[(index + remainder) % size];
      } else if (mode === Mode.Decode) {
        return dictionary[(index - remainder + size) % size];
      }
    } else {
      return char.toUpperCase();
    }
  });

  return chars.join('');
};

export default cipher;
