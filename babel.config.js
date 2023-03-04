module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@model': './src/model',
          '@data': './src/data',
          '@home': './src/screens/Home',
          '@constants': './src/constants',
          '@fonts': './src/assets/fonts',
          '@icon': './src/assets/icon',
          '@hook': './src/hook',
          '@store': './src/store',
        },
      },
    ],
  ],
};
