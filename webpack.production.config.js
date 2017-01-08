var config = require('./webpack.config');
var webpack = require('webpack');

var uglifier = new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
});

config.output.filename = "[name]-bundle.min.js";
config.devtool = "";
config.plugins.push(uglifier);

module.exports = config;