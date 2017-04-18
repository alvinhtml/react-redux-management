var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: {
        init: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux', 'redux-thunk', 'isomorphic-fetch'],
        bundle: './src/index.jsx',
    },
    output: {
        path: '../laravel/public/js',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.css$/,
			loader: 'style!css!autoprefixer'
        }, {
            test: /\.less$/,
			loader: 'style!css?importLoaders=2!autoprefixer!less'
        }, {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.(png|jpg|gif|eot|woff|svg|ttf|woff2)$/,
			loader: 'url-loader?limit=30000'
        }]
    },
    plugins: [
        new CommonsChunkPlugin('init', 'init.js'),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ]
}

//importLoaders=2表明你在某个less文件中import进来的资源（其它的less文件）会被使用autoprefixer和less 这两个loader解析
