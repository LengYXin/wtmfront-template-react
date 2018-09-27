const webpack = require('webpack');
const path = require('path');
const rootDir = path.dirname(__dirname);
const basicConfig = require("./basics.confit");
module.exports = (params) => {
    const { port = 8000, proxy = {}, deployWrite = "", DefinePlugin } = params;
    const outputPaht = path.resolve(rootDir, "build");
    console.log(`-------------------------------------- 'devServer' --------------------------------------`);
    return [basicConfig({
        output: {
            path: outputPaht,
        },
        plugins: [

        ],
        devServer: {
            port: port,
            proxy: proxy,
        },
        deployWrite: deployWrite,
        DefinePlugin: {
            ...DefinePlugin
        }
    })]
}