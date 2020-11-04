const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const mode = typeof process.env.NODE_ENV === 'undefined'
  ? 'production'
  : process.env.NODE_ENV.trim();

module.exports = {
    mode,

    devtool: mode === 'development' ? 'source-map' : '',

    entry: [
      './src/app',
      './src/sass/main.scss',
    ],

    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        chunkFilename: '[name].[contenthash:8].bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: mode === 'development',
                            publicPath: '/',
                            esModule: true
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                      loader: 'file-loader',
                      options: {
                          outputPath: 'images',
                      },
                  },
                ],
            },
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        watchContentBase: true,
        compress: true,
        hot: true,
        port: 80,
        historyApiFallback: true,
    },

    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        mergeDuplicateChunks: true,
        minimize: mode !== 'development',
        minimizer: [
            new TerserPlugin({
                extractComments: true
            }),
        ],
    },

    plugins: [
        //new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            'meta': {
                //'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                'theme-color': '#2ecc71'
            },
            title: 'Garden Planner | Stephen James',
            template: 'src/index.html',
            scriptLoading: 'defer',
            excludeChunks: [
                'pages/register',
                'pages/my-account',
                'pages/login',
                'pages/register',
                'pages/dashboard',
            ]
        }),
        new FaviconsWebpackPlugin('./src/images/favicon.png'),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[name].css'
        }),
    ]
};
