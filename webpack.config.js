const path                    = require("path");
const TerserPlugin            = require('terser-webpack-plugin');
const webpack                 = require('webpack');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const ManifestPlugin          = require('webpack-manifest-plugin');
const WebpackChunkHash        = require('webpack-chunk-hash');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin}    = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';



module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        "main": "./src/index.js"
    },
    output: {
        filename: "[name].[hash:12].js",
        publicPath: '/dist/',
        path: path.resolve(__dirname, "dist"),
        chunkFilename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src', 'js'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets       : ['@babel/preset-env'],
                        plugins       : ['@babel/plugin-transform-runtime'],
                        cacheDirectory: true,
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use : [
                    {
                        loader : 'file-loader',
                        options: {
                            name: '[name]-[hash:12].[ext]',
                        }
                    }
                ],
            },
        ]
    },
    optimization: {
        namedModules: !isProduction,
        minimize    : isProduction,
        minimizer   : [
            new TerserPlugin({
                test     : /\.js(\?.*)?$/i,
                sourceMap: !isProduction,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose                : isProduction,
            cleanStaleWebpackAssets: true,
        }),
        new WebpackChunkHash(),
        new ManifestPlugin({
            basePath       : 'dist/',
            publicPath     : 'dist/',
            writeToFileEmit: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:12].css',
            chunkFilename: '[id].[hash].css',
        }),
        new webpack.DefinePlugin({
            "require.specified": "require.resolve",
        }),
        new webpack.IgnorePlugin(/^codemirror$/),
    ],
    performance: {
        hints: false,
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
};