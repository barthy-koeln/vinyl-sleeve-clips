const Encore = require('@symfony/webpack-encore')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const fs = require('fs')
const buildType = process.env.BROWSERSLIST_ENV
const isModern = buildType === 'modern'
const publicPath = `/build/${buildType}`

Encore
  .disableSingleRuntimeChunk()
  .splitEntryChunks()

  .setOutputPath(`public/build/${buildType}/`)
  .setPublicPath(publicPath)
  .setManifestKeyPrefix(`build/${buildType}`)

  .cleanupOutputBeforeBuild()

  .addEntry('app', './assets/app.js')
  .addEntry('header', './assets/header.js')

  .enableSassLoader((options) => {
    options.sassOptions = {
      quietDeps: true // disable warnings for dependencies
    }
  })

  .configureDefinePlugin(options => {
    options.PUBLIC_PATH = JSON.stringify(publicPath)
  })

  .configureImageRule({
    type: isModern ? 'asset' : 'asset/resource',
    maxSize: isModern ? 8 * 1024 : undefined,
    filename: 'images/[name].[contenthash][ext]',
  })

  .configureFontRule({
    type: 'asset',
    filename: 'fonts/[name].[contenthash][ext]'
  })

  .addRule({
    resourceQuery: /raw/,
    type: 'asset/source'
  })

  .configureLoaderRule('css', config => {
    config.resourceQuery = { not: [/raw/] }
  })

  .copyFiles([
    {
      from: './node_modules/three/examples/js/libs/draco/gltf',
      pattern: /draco_(decoder|wasm_wrapper)\.(js|wasm)/,
      to: '[path][name].[ext]'
    }
  ])

const twigDirectory = path.resolve(__dirname, 'assets/components/Page')
const pages = fs.readdirSync(twigDirectory)

for (const page of pages) {
  Encore.addEntry(page, `${twigDirectory}/${page}/${page}.js`)
}

if (Encore.isProduction()) {
  Encore
    .enablePostCssLoader()
    .enableVersioning()
    .configureTerserPlugin(function (options) {
      options.extractComments = false
      options.parallel = true
      options.terserOptions = {
        keep_classnames: false,
        mangle: true,
        compress: false,
        keep_fnames: false,
        output: {
          comments: false
        }
      }
    })
    .configureFilenames({
      js: '[name].[contenthash].js',
      css: '[name].[contenthash].css'
    })
}

if (process.env.ANALYZE) {
  Encore.addPlugin(new BundleAnalyzerPlugin())
}

if (Encore.isDevServer()) {
  Encore
    .disableCssExtraction()
    .enableSourceMaps()
    .configureDevServerOptions(options => {
      options.devMiddleware = {
        writeToDisk: true
      }
    })
}

const config = Encore.getWebpackConfig()

config.optimization = {
  minimize: Encore.isProduction()
}

if (Encore.isDevServer()) {
  config.devtool = 'eval-source-map'
}

module.exports = config
