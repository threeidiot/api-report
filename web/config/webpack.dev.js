const Merge = require('webpack-merge')
const CommonConfig = require('./webpack.common.js')
var path = require('path')
var webpack = require('webpack')

module.exports = Merge(CommonConfig, {

  devtool: 'eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    port: 7600,
    host: '0.0.0.0',

    proxy: {
      '/v1/**': {
        target: 'http://127.0.0.1:7601',
        changeOrigin: true,
        pathRewrite: { '^/v1': '' }
      }
    }
  }

})
