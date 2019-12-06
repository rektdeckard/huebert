const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  externals: nodeModules,
  entry: [
    './src/index.js'
  ],
  target: 'node',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      { use: 'babel-loader' },
      { exclude: /node_modules/ },
      { query: {
        presets: ['react', 'env', 'stage-0']
      }}
  ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 4172
  }
};
