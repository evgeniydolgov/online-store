// const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        open: true,
        port: 3000,
        hot: false,
        liveReload: true,
    },
};