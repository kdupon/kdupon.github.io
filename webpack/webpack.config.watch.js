const webpack = require('webpack');
const BrowserSyncPlugin = require('browsersync-webpack-plugin');

const BSYNC_PROXY_URL = 'http://localhost:3000/';
const JEKYLL_TARGET_URL = 'http://127.0.0.1:4000/';

module.exports = {
  output: { 
    pathinfo: true, 
    publicPath: BSYNC_PROXY_URL,
  },
  devtool: '#cheap-module-source-map',
  // stats: false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BrowserSyncPlugin({
      target: JEKYLL_TARGET_URL,
      proxyUrl: BSYNC_PROXY_URL, 
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
