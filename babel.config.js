module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        alias: {
          constants: './src/constants',
          features: './src/features',
          images: './src/assets/images',
          schema: './src/schema',
          screens: './src/screens',
          services: './src/services',
          store: './src/store',
          theme: './src/theme',
          utils: './src/utils'
        }
      }],
      'react-native-reanimated/plugin'
    ]
  }
}
