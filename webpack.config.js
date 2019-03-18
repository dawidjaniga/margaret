const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        loader: ['css-loader', 'sass-loader']
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'react-hot-loader/webpack']
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: './resources/assets/app/index.hbs'
    })
  ]
}
