const webpack = require('webpack');
const merge = require('webpack-merge');

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const settings = require('./settings');

// Configuration settings
const sourceMapQueryStr = (settings.env.production) ? '+sourceMap' : '-sourceMap';

let WEBPACK_CONFIG = {
  entry: {
    main: [
      './@src/main/main.js',
      './@src/main/main.scss',
    ],
    // search: [
    //   './@src/search/search.js',
    // ],
    vendor: [
      './@src/vendor/vendor.js',
      './@src/vendor/vendor.scss',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), '@dist'),
    publicPath: '/@dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          // publicPath: '../',
          loader: [
            `css?${sourceMapQueryStr}`,
            `resolve-url?${sourceMapQueryStr}`,
            `sass?${sourceMapQueryStr}`,
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
  ],

  // System settings
  context: process.cwd(),
  devtool: (settings.env.development ? '#source-map' : undefined),
  resolve: {
    enforceExtension: false,
    modules: [ path.resolve(process.cwd(), '@src'), 'node_modules' ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
};

// Add Bootstrap's dependencies
WEBPACK_CONFIG.plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery',
    Tether: 'tether', 'window.Tether': 'tether',
  })
);

// if (settings.env.development) {
//   WEBPACK_CONFIG.entry.runtime = [
//     './@src/config/env/dev.js',
//     './@src/config/env/dev.scss',
//   ];
// }

// if (settings.env.production) {
//   WEBPACK_CONFIG.entry.runtime = [
//     './@src/config/env/prod.js',
//     './@src/config/env/prod.scss',
//   ];
// }

if (settings.enabled.watcher) {
  WEBPACK_CONFIG.entry = require('./addons/addHotMiddleware')(WEBPACK_CONFIG.entry);
  // WEBPACK_CONFIG.entry.search.unshift('react-hot-loader/patch');
  WEBPACK_CONFIG = merge(WEBPACK_CONFIG, require('./webpack.config.watch'));
}

// console.log(WEBPACK_CONFIG);
module.exports = WEBPACK_CONFIG;
