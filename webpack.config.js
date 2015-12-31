'use strict'

var path = require('path');

module.exports = {
	entry: [
		"./src/js/app.js"
	],
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: './dist/js/',
		filename: 'app.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	watch: true,
	// don't bundle the 'jquery' npm package with our bundle.js
	// but get it from a global '$' variable
	// and you must load jquery.js in index.html
	externals: {
		'jquery': '$'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components|libs)/,
				loader: "babel-loader",
				query: {
					presets: ['es2015']
				}
			}
		]
	}
}