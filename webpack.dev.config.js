// const path = require('path');
module.exports = {
    mode: 'development',
    output: {
        publicPath: 'http://127.0.0.1:3000/',
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        open: true,
        port: 3000,
        hot: false,
        liveReload: true,
    },
};