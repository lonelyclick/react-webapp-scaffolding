'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pathMap = {
	local: {
		dev: 'dev',
		prod: 'dist',
	},
	server: {
		dev: '../platform/frontend/',
		prod: '../platform/frontend/',
	},
}
const cssPath = 'styles.css'

let defaultConfig = {
	location: 'local',
	mode: 'dev',
}

const args = process.argv

for (const location of ['local', 'server']) {
	locationPoint:
		for (const mode of ['dev', 'prod']) {
			if (args.indexOf(`--${location}-${mode}`) !== -1) {
				defaultConfig = Object.assign(defaultConfig, {
					location: location,
					mode: mode,
				})
				break locationPoint
			}
		}
}

const pluginList = [
	new ExtractTextPlugin(cssPath),
	new HtmlWebpackPlugin({
		template: './src/index.html',
		inject: 'body',
	}),
]


if (defaultConfig.mode === 'prod') {
	pluginList.push(new webpack.optimize.UglifyJsPlugin({
		compress: {},
	}))
}

const deployPath = pathMap[defaultConfig.location][defaultConfig.mode]

module.exports = {
	entry: {
		index: './src/index.js',
	},
	// watch: ,
	colors: true,
	progress: true,
	output: {
		filename: '[name].js',
		path: `${deployPath}`,
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
		],
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					optional: ['es7.decorators', 'es7.classProperties'],
				},
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'file?name=static/[name].[ext]',
			},
			{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
		],
	},
	plugins: pluginList,
	eslint: {
		configFile: '.eslintrc',
		plugins: [
			'react',
		],
	},
}
