const Dotenv = require('dotenv-webpack')
const path = require('path')
const publicPath = path.join(__dirname, 'public')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    './resources/assets/app/index.js'
  ],
  output: {
    path: publicPath,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
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
    new Dotenv()
  ]
}
