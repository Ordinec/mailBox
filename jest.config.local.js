module.exports = {
  testEnvironment: 'node',
  reporters: ['default', 'jest-stare', ['jest-html-reporters', {
    publicPath: './html-report',
    filename: 'reportQA.html',
    expand: true,
    openReport: true,
  }]],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/specs/*.spec.*'],
  globals: {
    testTimeout: 50000,
  },
  verbose: true,
};
