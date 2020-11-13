# elegant-slug

[![npm version](https://badge.fury.io/js/elegant-slug.svg)](https://www.npmjs.com/package/elegant-slug) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/elegant-slug) ![https://github.com/aboudicheng/elegant-slug/workflows/Build/badge.svg](https://github.com/aboudicheng/elegant-slug/workflows/Build/badge.svg)

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

[Live Demo](https://codesandbox.io/s/elegant-slug-example-w7i21)

```javascript
import slug from 'elegant-slug';

slug('déjà vu');
// 'deja-vu'

slug('some title', { separator: 'underscore' });
// 'some_title'

slug('this is a really long title and it should not exceed 30 characters', {
  maxLength: 30,
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
| unique | `false` | boolean | If set to `true`, a unique id generated using [`uniqid`](https://github.com/adamhalasz/uniqid/) will be appended to the end of the slug. |
| charMap | | Record<string, string> | A map of key-value pairs that are used to replace occurrences with the given values. |

