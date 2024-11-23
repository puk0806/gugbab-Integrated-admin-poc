export function stringify(value: unknown): string {
  switch (typeof value) {
    case 'string': {
      return value;
    }
    case 'number':
    case 'boolean':
    case 'undefined': {
      return `${value}`;
    }
    default: {
      return JSON.stringify(value);
    }
  }
}

export const quoteRegexSpecialCharacters = (value: string) => value.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
