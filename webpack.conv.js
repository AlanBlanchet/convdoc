const { exec } = require('child_process');
const lib = require('./webpack.lib');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(lib, {
  mode: 'development',
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          exec(
            `node ${path.resolve(__dirname, 'dist', 'main.js')}`,
            (err, stdout, stderr) => {
              console.log('\nRunning main.js:\n');
              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            }
          );
        });
      }
    }
  ]
});
