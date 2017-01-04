const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const webpack = require('webpack');

const loaders = require('./webpack.loaders');
const {addHotMiddleware, merge} = require('./util');

const sourceMapQueryStr = '+sourceMap';

let webpackConfig = {
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
  },
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
    filename: 'js/[name].js',
    path: path.join(process.cwd(), 'assets/built'),
    publicPath: '/',
  },
  module: {
    rules: [
      loaders.jsLoader,
      loaders.sassLoader,
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      disable: argv.watch,
      filename: 'css/[name].css',
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
  webpackConfig.entry = addHotMiddleware(webpackConfig.entry);
  webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

module.exports = webpackConfig;
