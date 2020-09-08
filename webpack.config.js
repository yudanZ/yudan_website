const path= require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:{
        'main': './src/js/script.js',
        'blog': './src/js/getTumblr.js'
    }, 
   
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js', 
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HTMLWebpackPlugin({
            chunks: ['main'],
            inject: true,
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HTMLWebpackPlugin({  // Also generate a test.html
            chunks: ['blog'],
            inject: true,
            filename: 'blog.html',
            template: './src/blog.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                } 
            }
        ]
    },

    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    devtool: "inline-source-map"
};