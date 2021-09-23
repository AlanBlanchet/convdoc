const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        exclude: /noed_modules/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    roots: [path.resolve(__dirname, '../src')],
    extensions: ['.js', '.tsx', '.ts'],
    plugins: [
      new TsConfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json')
      })
    ]
  }
};
