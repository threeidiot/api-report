var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],

  resolve: {
    // import 模块路径
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },

  // 外部库
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: ['file-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.template.html'
    })
  ],

  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve('./dist'),
    publicPath: '/'
  }

}
