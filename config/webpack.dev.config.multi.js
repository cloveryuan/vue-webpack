/**
 * 开发环境配置
 */

var webpack = require('webpack'),
    fs = require('fs'),
    config = require('./webpack.base.config'),
    CONF = require('./CONFIG'),
    PATHS = require('./PATHS'),
    PORTS = require('./PORTS'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var getEntry = config.methods.getEntry;

//config
config.devtool = 'source-map'; // source-map
config.output.publicPath = 'http://localhost:'+PORTS.BROWSER_SYNC+'/views/'; // 资源路径

//plugins
config.plugins = (config.plugins || []).concat([
    // 提取CSS
    new ExtractTextPlugin(PATHS.SRC.join('css/[name].css'), {
        disable: true
    }),
    // 提取第三方库
    new webpack.optimize.CommonsChunkPlugin('vendors'),
    new BrowserSyncPlugin({
        host: '127.0.0.1',
        port: PORTS.BROWSER_SYNC,
        proxy: 'http://127.0.0.1:' + PORTS.DEV_SERVER,
        notify: false,
        startPath: '/views/'
    }, {
        reload: false
    }),
]);

// webpack-dev-sever config
config.devServer = {
    port: PORTS.DEV_SERVER,
    noInfo: true,
    proxy: CONF.proxy
}

//html files
config.methods.generateHtml(config);


// 写入环境变量
fs.open(PATHS.ROOT.join('/config/ENV.js'), 'w', function(err, fd) {
    var buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = config;