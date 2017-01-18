const mergeWith = require('lodash.mergewith');

/**
 * Loop through webpack entry
 * and add the hot middleware
 * @param  {Object} entry webpack entry
 * @return {Object} entry with hot middleware
 */
module.exports.addHotMiddleware = (entry) => {
  const results = {};
  const hotMiddlewareScript = 'webpack-hot-middleware/client?timeout=20000&reload=false';

  Object.keys(entry).forEach((name) => {
    results[name] = Array.isArray(entry[name]) ? entry[name].slice(0) : [entry[name]];
    results[name].push(hotMiddlewareScript);
  });
  return results;
};

/**
 * @export
 * @returns
 */
module.exports.merge = (...elements) => {
  elements.push((a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b);
    }
    return undefined;
  });
  return mergeWith.apply(this, elements);
};

/**
 * @export
 * @param {array} userArray
 * @returns
 */
module.exports.uniq = (userArray) => {
  const unique = {};
  userArray.forEach((unusedValue, index) => { unique[userArray[index]] = true; });
  return Object.keys(unique);
};

/**
 * @export
 * @param {string} dependency
 * @param {any} [fallback]
 * @return {any}
 */
module.exports.desire = (dependency, fallback) => {
  try { require.resolve(dependency); } catch (e) { return fallback; }
  return require(dependency);
};
