const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new HtmlWebpackPlugin({
      template: './resources/assets/app/index.hbs',
      filename: 'app.html'
    })
  ]
})
