/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  plugins: ['jest', 'testing-library', 'jest-dom'],
  env: {
    jest: true,
    node: true,
  },
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'testing-library/no-dom-import': ['error', 'react'],
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-enabled-disabled': 'warn',
    'jest-dom/prefer-required': 'warn',
  },
};
