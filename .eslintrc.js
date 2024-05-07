module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    'space-in-brackets': 'always',
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
