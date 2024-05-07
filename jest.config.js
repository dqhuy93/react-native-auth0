module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/react-native/dont-cleanup-after-each',
    './jest/setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|react-redux|@react-native-community|@react-navigation/(.*))',
  ],
};
