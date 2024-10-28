/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'eslint-config-turbo',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'import', 'sort-destructure-keys'],
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
            pattern: '{react*, react*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@component/*/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['type', 'external', 'internal'],
      },
    ],
    'react/jsx-curly-brace-presence': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: false }],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: true,
        multiline: 'last',
        ignoreCase: true,
        noSortAlphabetically: false,
      },
    ],
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-prototype-builtins': 'warn',
    'no-return-await': 'warn',
    'react-hooks/rules-of-hooks': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-case-declarations': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'import/no-anonymous-default-export': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
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
