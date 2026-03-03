// @ts-check
const base = require('./base');
const tseslint = require('typescript-eslint');

/** @type {import('typescript-eslint').Config} */
module.exports = tseslint.config(...base, {
  files: ['**/*.{ts,tsx}'],
  rules: {
    // React/Next specific relaxations
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
});
