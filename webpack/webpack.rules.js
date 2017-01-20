const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));

const sourceMapQueryStr = (argv.p) ? '+sourceMap' : '-sourceMap';

const jsLoader = {
  test: /\.js$/,
  //include: config.paths.assets,
  exclude: /node_modules/,
  use: [{
    loader: 'babel',
    options: {
      presets: ['es2015', 'stage-0'],
    },
  }],
};

if (argv.watch) {
  jsLoader.use.unshift('monkey-hot?sourceType=module');
}

const sassLoader = {
  test: /\.scss$/,
  //include: config.paths.assets,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style',
    loader: [
      `css?${sourceMapQueryStr}`,
      `resolve-url?${sourceMapQueryStr}`,
      `sass?${sourceMapQueryStr}`,
    ],
  }),
};

exports.jsLoader = jsLoader;
exports.sassLoader = sassLoader;
