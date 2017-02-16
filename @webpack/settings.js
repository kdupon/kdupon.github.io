const argv = require('minimist')(process.argv.slice(2));
const isProduction = !!((argv.env && argv.env.production) || argv.p);

const root = process.cwd();

module.exports = {
  env: {
    development: !((argv.env && argv.env.production) || argv.p),
    production: !!((argv.env && argv.env.production) || argv.p),
  },
  root,
  enabled: {
    watcher: !!argv.watch,
  }
}
