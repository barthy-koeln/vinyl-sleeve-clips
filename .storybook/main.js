const fs = require('fs')
const webpack = require('webpack')

module.exports = {

  stories: [
    '../assets/*/@(Atom|Molecule|Organism|Quark)/**/*.stories.js'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
    '@storybook/addon-postcss',
    'storybook-addon-designs',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass')
        }
      }
    }
  ],

  core: {
    builder: 'webpack5'
  },

  features: {
    babelModeV7: true
  },

  webpackFinal: async (config, { configType }) => {
    let icons = fs.readdirSync('public/icons/')
    icons.forEach((icon, index) => icons[index] = icon.replace('.svg', ''))

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ICON_LIB': JSON.stringify(icons)
      })
    )

    const scss_regex = '/\\.s[ca]ss$/'
    const scssRule = config.module.rules.find(_ => _ && _.test && _.test.toString() === scss_regex)

    config.module.rules = [
      ...config.module.rules.filter(_ => _ && _.test && _.test.toString() !== scss_regex),
      {
        ...scssRule,
        exclude: /\.module\.s[ca]ss$/
      },
      {
        ...scssRule,
        test: /\.module\.s[ca]ss$/,
        use: scssRule.use.map(_ => {
          if (_ && _.loader && _.loader.match(/[\/\\]css-loader/g)) {
            return {
              ..._,
              options: {
                ..._.options,
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]'
                }
              }
            }
          }

          return _
        })
      }
    ]

    // Return the altered config
    return config
  }
}