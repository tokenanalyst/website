module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'implicit-arrow-linebreak': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js'],
      },
    ],
    'no-restricted-imports': [
      2,
      {
        patterns: ['*.css', '!styles/main.css'],
        paths: ['lodash'],
      },
    ],
    'react/no-deprecated': 2,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
    react: {
      version: '16.7.0',
    },
  },
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    cy: true,
    before: true,
  },
};
