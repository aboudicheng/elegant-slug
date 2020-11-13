import deburr from 'lodash.deburr';
import uniqid from 'uniqid';
import { Options, SeparatorSymbol } from './types';
import { punctuationsReg, whiteSpaceReg } from './utils/regex';
import { cropString, hasDoubleSeparator, transformCase, trimSeparator } from './utils/string';

const defaultOptions: Options = {
  separator: 'hyphen',
  unique: false,
};

export default (str: string, options = defaultOptions): string => {
  const separator: SeparatorSymbol = options.separator === 'underscore' ? '_' : '-';

  let formattedString = str;

  if (options.charMap) {
    for (const [key, value] of Object.entries(options.charMap)) {
      formattedString = formattedString.replace(new RegExp(key, 'g'), value);
    }
  }

  // remove diactrics, normalize unicode, replace all punctuations with separator
  formattedString = deburr(formattedString)
    .normalize('NFKD')
    .replace(punctuationsReg, separator)
    .replace(whiteSpaceReg, separator);

  // combine consecutive separators into one
  while (hasDoubleSeparator(formattedString, separator)) {
    formattedString = formattedString.replace(
      new RegExp(`${separator}${separator}`, 'g'),
      separator
    );
  }

  // shorten the string if config contains maximum length restriction
  if (options.maxLength) {
    formattedString = cropString(formattedString, options.maxLength, separator);
  }

  if (options.letterCase) {
    formattedString = transformCase(formattedString, options.letterCase, separator);
  }

  // make sure the string does not start or end with a separator
  formattedString = trimSeparator(formattedString, separator);

  if (options.unique) {
    // appends a unique id at the end of the string
    formattedString += `${separator}${uniqid.process()}`;
  }

  return formattedString;
};
