module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['xo'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/dist/**/*.js'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['Error', 2],
    'object-curly-spacing': ['Error', 'always'],
    'new-cap': ['error', { capIsNewExceptions: ['express.Router'] }],
    'operator-linebreak': ['error', 'after'],
  },
};
