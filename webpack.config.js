const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry       :"./src/index.js",
	output      :{
		path    :path.join(__dirname, "/dist"),
		filename:"bundle.js"
	},
	devServer   :{
		historyApiFallback:true,
		host              :'localhost',
		allowedHosts      :['shadowbox-utils.local'],
		contentBase       :path.join(__dirname, "dist"),
		compress          :true,
		port              :8001,
		watchContentBase  :true,
		progress          :true,
		stats             :'minimal',
		inline            :true,
	},
	watchOptions:{
		aggregateTimeout:300,
		poll            :1000
	},
	module      :{
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
			},
			{
				test:/\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				use :['file-loader']
			}
		]
	},
	plugins     :[
		new HtmlWebpackPlugin({
			template:"./src/index.html"
		})
	],
	resolve     :{
		alias:{
			'@':path.resolve('./src')
		}
	},
};
