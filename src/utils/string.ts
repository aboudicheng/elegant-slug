import { LetterCase, SeparatorSymbol } from '../types';

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

/**
 * Detects whether a given string contains double dash (-)
 */
export const hasDoubleSeparator = (str: string, separator: SeparatorSymbol): boolean =>
  new RegExp(`${separator}${separator}`, 'g').test(str);

/**
 * Trims separators that appear either at the start or at the end of a string
 */
export const trimSeparator = (str: string, separator: string): string => {
  const separatorRegStr = new RegExp(`^\\${separator}+|\\${separator}+$`, 'g');
  return str.replace(separatorRegStr, '');
};

export const transformCase = (
  str: string,
  letterCase: LetterCase,
  separator: SeparatorSymbol
): string =>
  str
    .split(separator)
    .map((s) => {
      switch (letterCase) {
        case 'lowercase':
          return s.toLowerCase();
        case 'uppercase':
          return s.toUpperCase();
        case 'capitalize':
          return capitalize(s);
      }
    })
    .join(separator);

/**
 * Shortens the formatted url to not exceed the specified maximum length
 */
export const cropString = (str: string, maxLength: number, separator: SeparatorSymbol): string => {
  // split the url by separator, joins until it reaches maximum length
  const splittedString = str.split(separator);
  let joinedString = '';

  for (let i = 0; i < splittedString.length; i++) {
    if (joinedString.length + splittedString[i].length <= maxLength) {
      joinedString += `${splittedString[i]}${separator}`;
    } else break;
  }

  return joinedString;
};
