type KeyType = 'upper' | 'lower' | 'number' | 'symbol';

type KeyGroupType<T> = {
  [key in KeyType]?: T;
};

type OptionsType = KeyGroupType<boolean>;

const charactersGroups: KeyGroupType<string> = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  number: '0123456789',
  symbol: '+-_*$',
};

const defaultOptions: OptionsType = {
  upper: true,
  lower: true,
  number: true,
  symbol: false,
};

const getPossibleCharacters = (options: OptionsType): string => {
  const characters = Object.keys(options).reduce((acc, optionName) => {
    const option = optionName as keyof OptionsType;
    if (options[option]) {
      acc += charactersGroups[option];
    }

    return acc;
  }, '');

  // in case of all fields are passed as false.
  if ('' == characters) {
    return getPossibleCharacters(defaultOptions);
  }

  return characters;
};

function generateToken(length: number, options: OptionsType = defaultOptions) {
  const chars = getPossibleCharacters(options);

  return Array(length)
    .fill(null)
    .reduce(acc => {
      const charIndex = Math.floor(Math.random() * chars.length);
      return acc + chars.charAt(charIndex);
    }, '');
}

export default generateToken;
