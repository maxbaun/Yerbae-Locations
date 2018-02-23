const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

let browserConfig = {
	devtool: isDev ? 'eval' : false,
	cache: true,
	stats: 'errors-only',
	entry: {
		vendor: [
			'babel-polyfill',
			'axios',
			'immutable',
			'react',
			'react-dom',
			'redux',
			'redux-immutable',
			'redux-saga',
			'reselect',
			'react-redux',
			'react-router',
			'react-router-redux',
			'react-addons-css-transition-group',
			'react-immutable-proptypes',
			'react-motion',
			'lodash',
			'lodash-decorators'
		],
		scripts: [
			'./src/index.js'
		]
	},
	output: {
		path: path.resolve(__dirname, './public'),
		filename: isDev ? '[name].js' : '[name].[chunkhash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				include: path.join(__dirname, './src'),
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: !isDev,
							removeComments: !isDev,
							collapseWhitespace: !isDev
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(css$)/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								sourceMap: isDev,
								camelCase: true,
								minimize: !isDev,
								importLoaders: 1,
								localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
								discardComments: {
									removeAll: true
								}
							}
						},
						{
							loader: 'postcss-loader'
						}
					]
				})
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: isDev ? 'fonts/[name].[ext]?[hash:8]' : 'fonts/[hash:8].[ext]'
						}
					}
				],
				include: path.resolve(__dirname, '../app'),
				exclude: /img/
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: isDev ? 'images/[name].[ext]?[hash:8]' : 'images/[hash:8].[ext]'
						}
					}
				],
				include: path.resolve(__dirname, '../app'),
				exclude: /css/
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? JSON.stringify('development') : JSON.stringify('production')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			async: true,
			minChunks: Infinity
		}),
		new ExtractTextPlugin({
			filename: isDev ? 'styles.css' : 'styles.[contenthash].css',
			allChunks: true,
			ignoreOrder: true
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			title: 'Webpack Boilerplate',
			cache: !isDev,
			hash: false,
			filename: 'index.html',
			inject: true,
			minify: {
				collapseWhitespace: !isDev
			}
		})
	]
};

if (isDev) {
	browserConfig.devServer = {
		contentBase: path.resolve(__dirname, './public'),
		historyApiFallback: true,
		inline: true,
		open: false,
		port: 3000
	};

	browserConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = browserConfig;
