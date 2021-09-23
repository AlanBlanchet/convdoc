const path = require('path');
const common = require('./webpack.config');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  entry: path.resolve('src', 'documentation.tsx'),
  output: {
    publicPath: '/'
  },
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'doc', 'template.html')
    })
  ]
});
