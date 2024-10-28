/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
  ],
  plugins: ['@typescript-eslint', 'import', 'sort-destructure-keys'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json', 'packages/*/tsconfig.json'],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: '@component/*/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['type', 'external', 'internal'],
      },
    ],
    'prefer-const': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: false }],
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-prototype-builtins': 'warn',
    'no-return-await': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    'no-case-declarations': 'off',
    'import/no-anonymous-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-restricted-globals': 'off',
    '@typescript-eslint/no-loss-of-precision': 'off',
    'import/no-unresolved': 'off',
    'import/default': 'off',
    'prettier/prettier': [
      'error',
      {
        parser: 'typescript',
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        trailingComma: 'all',
        bracketSpacing: true,
        semi: true,
        useTabs: false,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
  },
};
