module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react-native/no-inline-styles': 0,
        'react-hooks/exhaustive-deps': 'off',
        'prettier/prettier': [
          'error',
          {
            'no-inline-styles': false,
          },
        ],
      },
    },
  ],
};
