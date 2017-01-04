const webpack = require('webpack');
const BrowserSyncPlugin = require('./webpack.plugin.browsersync');

module.exports = {
  output: { 
    pathinfo: true, 
  },
  devtool: '#cheap-module-source-map',
  stats: false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BrowserSyncPlugin(),
  ],
};
