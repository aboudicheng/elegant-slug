export type Separator = 'hyphen' | 'underscore';
export type SeparatorSymbol = '-' | '_';
export type LetterCase = 'lowercase' | 'uppercase' | 'capitalize';
export type CharMap = Record<string, string>;
export type Options = {
  separator?: Separator;
  maxLength?: number;
  letterCase?: LetterCase;
  unique?: boolean;
  charMap?: CharMap;
};
