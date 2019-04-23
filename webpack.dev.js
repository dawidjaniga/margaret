require('dotenv').config()
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './resources/assets/app/index.hbs'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
