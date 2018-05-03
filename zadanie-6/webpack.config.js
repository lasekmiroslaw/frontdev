const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const config = {
	'mode': 'none',
	'entry': './src/index.js',
	'output': {
		'path': Path.resolve(__dirname, 'dist'),
		'filename': 'bundle.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},	
	"module": {
		"rules": [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: false
						}
					}
				]
			}
		]
	},
	"plugins": [
		new HtmlWebpackPlugin({
			"template": './src/index-template.html',
			"filename": "index.html"
		}),
		new CleanWebpackPlugin(['dist']),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]


};

module.exports = config;