const path = require('path');

module.exports = {
  target: 'node',
  entry: path.resolve('src', 'convert.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
