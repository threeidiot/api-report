const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var path = require('path')
var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')

module.exports = Merge(CommonConfig, {

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('./'),
      verbose: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        warnings: false
      },
      comments: false
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]

})
