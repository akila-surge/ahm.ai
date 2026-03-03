// @ts-check
const nest = require('@sears/eslint-config/nest');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(...nest, {
  ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
});
