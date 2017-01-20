const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

// Plugins
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Configuration settings
const sourceMapQueryStr = (argv.p) ? '+sourceMap' : '-sourceMap';

// Common Webpack configuration
let webpackConfig = {
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
  },
  // Only run webpack with the `npm run` commands from `~/package.json`
  context: process.cwd(),
  entry: {
    atomic: [
      './assets/src/atomic/index.js',
      './assets/src/atomic/index.scss',
    ],
    vendor: [
      './assets/src/vendor/index.js',
      './assets/src/vendor/index.scss',
    ],
  },
  devtool: '#source-map',
  output: {
    filename: 'assets/built/js/[name].js',
    path: process.cwd(),
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: [
            `css?${sourceMapQueryStr}`,
            `resolve-url?${sourceMapQueryStr}`,
            `sass?${sourceMapQueryStr}`,
          ],
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      disable: argv.watch,
      filename: 'assets/built/css/[name].css',
    }),
  ],
  resolve: {
    enforceExtension: false,
    modules: [
      'node_modules',
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
}

if (argv.watch) {
  console.log('[ADDING WATCH CONFIGURATIONS]')
  webpackConfig.entry = require('./addons/addHotMiddleware')(webpackConfig.entry);
  webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

module.exports = webpackConfig;
