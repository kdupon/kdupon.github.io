const webpack = require('webpack');
const merge = require('webpack-merge');

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const settings = require('./settings');

// Configuration settings
const sourceMapQueryStr = (settings.env.production) ? '+sourceMap' : '-sourceMap';

let WEBPACK_CONFIG = {
  // System settings
  context: process.cwd(),
  entry: {
    main: [
      './_theme/src/main/main.js',
      './_theme/src/main/main.scss',
    ],
    // search: [
    //   './@src/search/search.js',
    // ],
    vendor: [
      'bootstrap',
      'masonry-layout',
      './_theme/src/vendor/vendor.js',
      './_theme/src/vendor/vendor.scss',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'assets'),
    publicPath: '/assets/',
  },
  resolve: {
    enforceExtension: false,
    modules: [ 
      '_theme/src', 
      'node_modules', 
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  devtool: (settings.env.development ? '#source-map' : undefined),
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel' },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: `css?${sourceMapQueryStr}` },
            { loader: `resolve-url?${sourceMapQueryStr}` },
            { loader: `sass?${sourceMapQueryStr}` },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      disable: settings.enabled.watcher,
      filename: '[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery', jQuery: 'jquery', // 'window.jQuery': 'jquery',
      Tether: 'tether', 'window.Tether': 'tether',
      masonry: 'masonry-layout',
    })
  ],
};

if (settings.enabled.watcher) {
  WEBPACK_CONFIG.entry = require('./addons/addHotMiddleware')(WEBPACK_CONFIG.entry);
  WEBPACK_CONFIG = merge(WEBPACK_CONFIG, require('./webpack.config.watch'));
}

// console.log(WEBPACK_CONFIG);
module.exports = WEBPACK_CONFIG;
