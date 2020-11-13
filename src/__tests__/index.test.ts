import slug from '../index';

describe('slug function', () => {
  it('converts diactrics correctly', () => {
    const french = slug('déjà vu');
    const turkish = slug('dürüm çok lezzetli');

    expect(french).toBe('deja-vu');
    expect(turkish).toBe('durum-cok-lezzetli');
  });

  it('combines consecutive separators into one', () => {
    const result = slug('name---of-----the-url');

    expect(result).toBe('name-of-the-url');
  });

  it('allows using different separators', () => {
    const result = slug('some title', { separator: 'underscore' });

    expect(result).toBe('some_title');
  });

  it('gives the correct output under maximum length restriction', () => {
    const result = slug('this is a really long title and it should not exceed 30 characters', {
      maxLength: 30,
    });

    expect(result).toBe('this-is-a-really-long-title');
    expect(result.length).toBeLessThanOrEqual(30);
  });

  it('removes punctuations', () => {
    const result = slug('Hoho! Mukatte kuru no ka?');

    expect(result).toBe('Hoho-Mukatte-kuru-no-ka');
  });

  it('trims separators located at the start and at the end', () => {
    const result = slug('--title--');

    expect(result).toBe('title');
  });

  it('transforms letter case correctly', () => {
    const lowerCased = slug('LOWERCASE---PLEASE!', {
      letterCase: 'lowercase',
    });
    const upperCased = slug('uppercase please', {
      letterCase: 'uppercase',
    });
    const capitalized = slug('capitalized please', {
      letterCase: 'capitalize',
    });

    expect(lowerCased).toBe('lowercase-please');
    expect(upperCased).toBe('UPPERCASE-PLEASE');
    expect(capitalized).toBe('Capitalized-Please');
  });

  it('does not ignore foreign language characters', () => {
    const result = slug('我　愛　珍　珠　奶　茶');

    expect(result).toBe('我-愛-珍-珠-奶-茶');
  });

  it('can append a unique ID', () => {
    const result = slug('this is the title', { unique: true });

    expect(result).toMatch(/this-is-the-title-[a-zA-Z0-9]\w+/);
  });

  it('allows custom character mapping', () => {
    const result = slug('مرحبا مرحبا', {
      charMap: {
        ا: 'a',
        ب: 'b',
        ح: 'h',
        ر: 'r',
        م: 'm',
      },
    });

    expect(result).toBe('mrhba-mrhba');
  });

  it('works with multiple options', () => {
    const result = slug('...köno ジョルノジョバーナには夢がある！無駄無駄無駄', {
      separator: 'underscore',
      letterCase: 'uppercase',
      maxLength: 50,
      unique: true,
      charMap: {
        ジ: 'Gi',
        ョ: 'o',
        ル: 'ru',
        ノ: 'no',
        バ: 'ba',
        ー: '',
        ナ: 'na',
      },
    });

    expect(result).toMatch(/KONO_GIORUNOGIOBANAには夢がある_無駄無駄無駄_[a-zA-Z0-9]\w+/);
  });
});
