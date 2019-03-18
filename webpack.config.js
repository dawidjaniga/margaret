const path = require('path')
const webpack = require('webpack')

const publicPath = path.join(__dirname, 'public')

module.exports = {
  entry: [
    './resources/assets/app/app.js'
  ],
  output: {
    path: publicPath,
    filename: 'app.js'
  },
  devServer: {
    contentBase: publicPath,
    compress: true,
    port: 9000

  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        loader: ['css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'react-hot-loader/webpack']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
