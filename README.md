# elegant-slug

🧹 Elegant & SEO-friendly slugger for URLs

## Installation

Using npm:
```
npm install elegant-slug
```

Using yarn:
```
yarn add elegant-slug
```

## Usage

```javascript
import slug from 'elegant-slug';

slug('déjà vu');
// 'deja-vu'

slug('some title', { separator: 'underscore' });
// 'some_title'

slug('this is a really long title and it should not exceed 50 characters', {
  maxLength: 50,
});
// 'this-is-a-really-long-title'

slug('LOWERCASE---PLEASE!', {
  letterCase: 'lowercase',
});
// 'lowercase-please'

slug('مرحبا مرحبا', {
  charMap: {
    ا: 'a',
    ب: 'b',
    ح: 'h',
    ر: 'r',
    م: 'm',
  },
});
// mrhba-mrhba

slug('this is the title', { unique: true });
// this-is-the-title-fqgkhg5dra2

```

## API Documentation

`slug(str: string, options?: Options)`

**`str`**

String to be converted into a slug

**`options` (optional)**

Additional options to format the slug. See below for the available options.

### Options

| Name                      | Default | Type | Description |
| ------------------------- | ------- | ---- | ------------|
| separator | 'hyphen'  | 'hyphen' \| 'underscore' | The separator symbol that will be used in between the concatenated strings. `hyphen` uses the `-` symbol while `underscore` uses the `_` symbol. |
| maxLength | | number | The maximum length of the converted slug. Once exceeding the specified length, the words get cropped out. |
| letterCase |  | 'lowercase' \| 'uppercase' \| 'capitalize' | The letter case the slug should be transformed into. If nothing is provided, the original casing will be used. |
| unique | | boolean | If set to `true`, a unique id generated using [`uniqid`](https://github.com/adamhalasz/uniqid/) will be appended to the end of the slug. |
| charMap | | Record<string, string> | A map of key-value pairs that are used to replace occurrences with the given values. |

