module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'max-len': 'off',
    'import/no-extraneous-dependencies': ['error', {'devDependencies': ['**/*.config.js']}],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
