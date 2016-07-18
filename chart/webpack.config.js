var path = require('path');
var version = require('./package.json').version;
var webpack = require('webpack');

var port = 8080;
var host = '192.168.0.178';

module.exports = {
    entry: {
        chart: [
            'webpack-dev-server/client?http://'+host+':' + port,
            'webpack/hot/dev-server',
            './src/chart'
        ]
    },
    output: {
        path: __dirname + '/build',
        publicPath: '/build/',
        filename: '[name].js',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: host,
        contentBase: 'test/',
        hot: true,
        port: port,
        publicPath: '/build/',
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(version)
        })
    ]
};
