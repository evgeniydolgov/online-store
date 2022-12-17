/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslingWebpackPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.[name].[chunkhash].js',
      assetModuleFilename: 'assets/[hash][ext]',
      clean: true,
    },
    module: {
        rules: [
          {
            test: /\.(c|sa|sc)ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
          },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|jpg|jpeg|png|webp|svg)$/i,
                type: 'asset/resource', //asset/resource
                generator: {
                  filename: 'assets/images/[name][ext]',
                }
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/bundle.[name].css',
        }),
        new EslingWebpackPlugin({ extensions: 'ts' }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            // favicon: './src/favicon-32x32.png',
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'production';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};