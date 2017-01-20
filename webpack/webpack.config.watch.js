const webpack = require('webpack');
const BrowserSyncPlugin = require('browsersync-webpack-plugin');

module.exports = {
  output: { 
    pathinfo: true, 
    publicPath: 'https://localhost:3000/',
  },
  devtool: '#cheap-module-source-map',
  stats: false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BrowserSyncPlugin({
      target: 'http://127.0.0.1:4000/',
      proxyUrl: 'http://localhost:3000/',
      watch: [
        '_site/**/*.html',
      ],
      advanced: {
        browserSync: {
          browser: 'Google Chrome',
        },
      },
    }),
  ],
};
