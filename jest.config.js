module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],
  coverageDirectory: '<rootDir>/tests/coverage/unit',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/assets/**',
    '!src/main.js',
    '!src/router.js',
    '!src/store.js',
    '!src/registerServiceWorker.js',
    '!src/i18n.js',
    '!**/node_modules/**',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
  ],
};
