const webpack = require('webpack');
const path = require('path');
const moment = require('moment');
const HtmlWebpackPlugin = require('html-webpack-plugin');//模板
const CleanWebpackPlugin = require('clean-webpack-plugin');//清理
const CopyWebpackPlugin = require('copy-webpack-plugin');//拷贝
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css
const tsImportPluginFactory = require('ts-import-plugin');//按需导入
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const rootDir = path.dirname(__dirname);
const outputPaht = path.resolve(rootDir, "build");
const basicConfig = require("./basics.confit");
module.exports = (params) => {
    const { deployWrite = "", DefinePlugin } = params;
    console.log(`-------------------------------------- 'deploy' --------------------------------------`);
    return [basicConfig({
        output: {
            path: outputPaht,
        },
        plugins: [
            // 图片压缩
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
            // 清理目录
            new CleanWebpackPlugin([outputPaht], { root: rootDir }),
            // gzip 压缩
            new CompressionPlugin({
                test: [/css\/.*css/, /js\/.*js/]
                // deleteOriginalAssets: true
            }),
        ],
        mode: 'production',
        devtool: false,
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    parallel: true,
                    uglifyOptions: {
                        compress: {
                            drop_console: true
                        }
                    }
                })
            ]
        },
        deployWrite: deployWrite,
        DefinePlugin: {
            PRODUCTION: true,
            ...DefinePlugin
        }
    })]
}