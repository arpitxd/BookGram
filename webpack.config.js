var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/index",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html" //source html
        }),
    ],
    resolve: {
        alias: {
            basePath: path.resolve('./src/js'),
        },
        //extensions that should be used to resolve modules
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        //tells webpack where to look for modules
        modules: ['node_modules' /*, "spritesmith-generated"*/]
    }
}