var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './src/main.ts',
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['',
      '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { 
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'        
      },
      {
        test: /\.html/,
        loader: 'html',
        exclude: /index.html$/
      },
      {
        test: /\.css$/,        
        loader: ExtractTextPlugin.extract('style-loader', 'css?-autoprefixer!postcss-loader') 
      },
      {
        test: /\.scss$/,        
        loader: ExtractTextPlugin.extract('style-loader', 'css!sass?-autoprefixer!postcss-loader') 
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new HtmlWebpackPlugin({
      title: 'Jerome Renard',
      filename: 'index.html',
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPlugin("[name].css")
  ]
}
