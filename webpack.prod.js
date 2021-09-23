const lib = require('./webpack.lib');
const { merge } = require('webpack-merge');

module.exports = merge(lib, {
  mode: 'production'
});
