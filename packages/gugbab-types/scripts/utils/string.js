/**
 *
 * @param {unknown} value
 * @returns {string}
 */
function stringify(value) {
  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
function toPascalCase(string) {
  return string.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2);
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
function toCamelCase(string) {
  return string
    .replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toLowerCase() + g2)
    .replace(/\.(\w)/g, (_, g1) => g1.toUpperCase());
}

/**
 *
 * @param {string} string
 * @param {boolean} usePascal
 * @returns {string}
 */
function toValidName(string = '') {
  if (string.includes('.')) {
    return `'${string}'`;
  }

  if (string.includes(' ')) {
    return string.replaceAll(' ', '_');
  }

  return string;
}

/**
 *
 * @param {string} string
 * @param {boolean} usePascal
 * @returns {(string?: string) => string}
 */
function toValidFormattedName(usePascal = true) {
  const formatter = value => {
    if (usePascal) {
      return toPascalCase(value);
    }

    return value;
  };

  return (string = '') => {
    if (string.includes('.')) {
      return `'${formatter(string)}'`;
    }

    if (string.includes(' ')) {
      return formatter(string.replaceAll(' ', '_'));
    }

    return formatter(string);
  };
}

function formatName(text) {
  const formatter = toValidFormattedName(true);
  return formatter(text).replace(/(-|'|\.)/g, '');
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
function toValidComment(string) {
  if (!string) {
    return string;
  }

  return `${string}`
    .replace(/ /g, ' ')
    .replace(/ {2}/g, '  ')
    .replace(/\n\n/g, '\n')
    .replace(/\n/g, '\n* ')
    .replace(/\n([a-zA-Z가-힣])/gim, '* $1')
    .replace(/\*\//g, '*')
    .replace(/\n\n/g, '\n');
}

export { stringify, toPascalCase, toCamelCase, toValidName, toValidFormattedName, formatName, toValidComment };
