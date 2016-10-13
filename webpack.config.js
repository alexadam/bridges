var path = require("path");

var app_dir = __dirname + '/client/app';
var node_dir = __dirname + '/node_modules';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/client/index.html',
    filename: 'index.html',
    inject: 'body'
});

var config = {
    entry: './client/app/AppCore.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.sass$/,
            loader: 'style!css!sass'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/,
            query: {
                presets: ["es2015", "stage-0", "react"]
            }
        }]
    },
    plugins: [HTMLWebpackPluginConfig]
};
module.exports = config;
