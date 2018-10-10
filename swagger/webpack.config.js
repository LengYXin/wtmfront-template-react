const path = require('path');
const outputPaht = path.resolve(__dirname, "dist");
const wtmfront = require('../wtmfront.json');
const basicConfig = require("../config/basics.confit");
const config = {
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
};
module.exports = basicConfig({
    output: {
        path: outputPaht,
    },
    devServer: {
        port: 8001,
        proxy: {
            /**
             * 脚手架服务器地址
             */
            '/server': {
                target: 'http://localhost:8765',
                pathRewrite: {
                    // "^/server": ""
                },
                ...config
            },
            /**
             * 
             */
            '/swaggerDoc': {
                target: wtmfront.swaggerDoc,
                pathRewrite: {
                    "^/swaggerDoc": ""
                },
                ...config
            }
        },
    }

})