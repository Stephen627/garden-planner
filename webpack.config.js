const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
        path: path.resolve(__dirname, 'public', 'assets'),
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
                            hmr: mode === 'development'
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
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

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/assets/',
        watchContentBase: true,
        compress: true,
        hot: true,
        port: 9000,
        historyApiFallback: {
          index: 'index.html'
        }
    },

    optimization: {
        mergeDuplicateChunks: true,
        minimize: mode !== 'development',
        minimizer: [
            new TerserPlugin({
                extractComments: true
            }),
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css'
        })
    ]
};
