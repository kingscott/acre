'use-strict'

const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: './src/dist/app.js',
    publicPath: '/',
    path: __dirname
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /build|lib|node_modules/
    }],
    preLoaders: [{
      test: /\.js?$/,
      loaders: ['standard'],
      exclude: /build|lib|node_modules/
    }],
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }
}
