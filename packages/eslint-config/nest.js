// @ts-check
const base = require('./base');
const tseslint = require('typescript-eslint');

/** @type {import('typescript-eslint').Config} */
module.exports = tseslint.config(...base, {
  files: ['**/*.{ts}'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
  },
});
