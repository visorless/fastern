const webpack = require('webpack');
const resolve = require('path').resolve;

const config = {
    devtool: 'source-map',
    entry: __dirname + '/js/index.jsx',
    output:{
        path: resolve('../public'),
        filename: 'bundle.js',
        publicPath: resolve('../public')
    },
    resolve: {
        extensions: ['.js','.jsx','.css']
    },
    node: {fs: 'empty'},
    externals: [
        {'./cptable': 'var cptable'},
        {'./jszip': 'jszip'}
    ],
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],

};
module.exports = config;

//
// {
//     test: /\.css\.js$/,
//     loader: 'css-js-loader',
// },
