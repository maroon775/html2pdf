const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry    :"./src/index.js",
	output   :{
		path    :path.join(__dirname, "/dist"),
		filename:"bundle.js"
	},
	devServer:{
		contentBase     :path.join(__dirname, "dist"),
		compress        :true,
		port            :9000,
		watchContentBase:true,
		progress        :true,
		stats           :'minimal',
		inline          :true,
	},
	module   :{
		rules:[
			{
				test   :/\.js$/,
				exclude:/node_modules/,
				use    :{
					loader:"babel-loader"
				}
			},
			{
				test:/\.css$/,
				use :["style-loader", "css-loader"]
			},
			{
				test:/\.less$/,
				use :[
					{
						loader:'style-loader', // creates style nodes from JS strings
					},
					{
						loader :'css-loader', // translates CSS into CommonJS
						options:{
							modules      :true,
							importLoaders:1,
// 							localIdentName:'[name]__[local]__[hash:base64:5]'
						}
					},
					{
						loader :'less-loader', // compiles Less to CSS
						options:{
							strictMath:true,
							noIeCompat:true,
						},
					},
				],
			},
			{
				test:/\.(png|svg|jpg|gif)$/,
				use :["file-loader"]
			}
		]
	},
	plugins  :[
		new HtmlWebpackPlugin({
			template:"./src/index.html"
		})
	]
};
