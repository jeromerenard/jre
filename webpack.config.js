var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

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
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /(\.svg|\.png|\.jpeg|\.jpg|\.bmp|\.mp3|\.wav)$/,
        use: 'file-loader'
      },
      {
        test: /\.html/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src'],
            interpolate: true,
            root: '../assets'
          }
        },
        exclude: /index.html$/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',            
            {
              loader: 'postcss-loader',
              options: { 
                plugins: () => [autoprefixer]
              }
            },
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',            
            {
              loader: 'postcss-loader',
              options: { 
                plugins: () => [autoprefixer]
              }
            },
            'sass-loader'
          ]
        })        
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
