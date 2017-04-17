var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: {
		init: ['react', 'react-dom', 'react-router', 'redux', 'react-redux'],
		bundle: './src/index.jsx',
	},
	output: {
		path: './src',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader?modules'
		}, {
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, ]
	},
	plugins: [
		new CommonsChunkPlugin('init', 'init.js'),
		new OpenBrowserPlugin({ url: 'http://localhost:8080' })
	]
}
