const argv = require('minimist')(process.argv.slice(2));
const isProduction = !!((argv.env && argv.env.production) || argv.p);

const root = process.cwd();

module.exports = {
  env: {
    development: !isProduction,
    production: !!isProduction,
  },
  root,
  enabled: {
    watcher: !!argv.watch,
  }
}
