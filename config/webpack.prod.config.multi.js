/**
 * 生成环境配置
 */

var webpack = require('webpack'),
    fs = require('fs'),
    config = require('./webpack.base.config'),
    PORTS = require('./PORTS'),
    PATHS = require('./PATHS'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var getEntry = config.methods.getEntry;

//config
config.output.publicPath = '/dist/'; // 资源路径
config.output.filename = 'js/[name].js'; // 入口js命名
config.output.chunkFilename = 'js/[id].chunk.js'; // 路由js命名
var chunks = Object.keys(config.entry);

//vue-loader
config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader"
        ),
        scss: ExtractTextPlugin.extract(
            'vue-style-loader',
            'css-loader!sass-loader'
        )
    }
}

//plugins
config.plugins = (config.plugins || []).concat([
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors' // 公共模块的名称
        // chunks: chunks, // chunks 是需要提取的模块
        // minChunks: chunks.length
    }),
    new ExtractTextPlugin("css/[name].css"), // 提取CSS
    new webpack.optimize.UglifyJsPlugin({ // 压缩文件
        compress: {
            warnings: false
        }
    }),
    new BrowserSyncPlugin({
        host: '127.0.0.1',
        port: PORTS.BROWSER_SYNC,
        proxy: 'http://127.0.0.1:' + PORTS.DEV_SERVER,
        notify: false
    }, {
        reload: false
    })
]);

//pages
var pages = getEntry('./src/views/**/*.html');
for (var pathname in pages) {
    // 配置生成的 html 文件，定义路径等
    var conf = {
        filename: PATHS.DIST.join('pages/') + pathname + '.html', // html 文件输出路径
        template: pages[pathname], // 模板路径
        inject: true, // js 插入位置
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    };
    if (pathname in config.entry) {
        conf.chunks = ['vendors', pathname];
        conf.hash = false;
    }
    // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
    config.plugins.push(new HtmlWebpackPlugin(conf));
}


// 写入环境变量
fs.open(PATHS.ROOT.join('/config/ENV.js'), 'w', function(err, fd) {
    var buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = config;