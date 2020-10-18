export const Mode = {
    Encode: 1,
    Decode: 2
};

const cipher = ({ string, offset = 0, dictionary = [], mode = Mode.Encode }) => {
    const chars = [...string].map(char => {
        const index = dictionary.indexOf(char.toUpperCase());

        if (index !== -1) {
            if (mode === Mode.Encode) {
                return dictionary[(index + (offset % dictionary.length)) % dictionary.length];
            } else if (mode === Mode.Decode) {
                return dictionary[(index - (offset % dictionary.length) + dictionary.length) % dictionary.length];
            }
        } else {
            return char.toUpperCase();
        }
    });

    return chars.join('');
};

export default cipher;
