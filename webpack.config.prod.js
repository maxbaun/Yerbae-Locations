process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const Compress = require('compression-webpack-plugin');

const config = require('./webpack.config');

config.plugins.push(
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production')
		}
	}),
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: false,
		comments: false,
		compress: {
			screw_ie8: true, // eslint-disable-line
			warnings: false,
			unused: true,
			dead_code: true // eslint-disable-line
		},
		mangle: {
			screw_ie8: true // eslint-disable-line
		},
		output: {
			comments: false,
			screw_ie8: true // eslint-disable-line
		}
	}),
	new webpack.optimize.AggressiveMergingPlugin(),
	new Compress({
		asset: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0.8
	})
);

module.exports = config;
