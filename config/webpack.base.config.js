/**
 * 基础配置
 */

var path = require('path'),
    webpack = require('webpack'),
    glob = require('glob'),
    PATHS = require('./PATHS'),
    PORTS = require('./PORTS'),
    VENDORS = require('./VENDORS'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer');

//过滤views目录
var filterFolder = 'views';

//utils-function 根据项目具体需求，输出正确的 js 和 html 路径
function getEntry(globPath) {
  var entries = {},
    startIndex = 1, deletNum = 1,
    basename, tmp, pathname;
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    if(tmp[1] == filterFolder){//root-index
      pathname = basename;
    }else{//normal files
        pathname = tmp.splice(startIndex, deletNum) + '/' + basename; // 正确输出 js 和 html 的路径    
    }
    entries[pathname] = entry;
  });
  return entries;
}
//utils-function 生成html页面
function generateHtml(config, htmlPath){
    var pages = getEntry('./src/views/**/*.html');
    var filepath = htmlPath ? htmlPath : '';
    for (var pathname in pages) {
        // 配置生成的 html 文件，定义路径等
        var conf = {
            filename: filepath + pathname + '.html', // html 文件输出路径
            template: pages[pathname], // 模板路径
            inject: true, // js 插入位置
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        };
        if (pathname in config.entry) {
            conf.chunks = ['vendors', pathname];
            conf.hash = true;
        }
        // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
}

//配置开始
var baseConfig = {
    // 入口
    entry: {
        vendors: VENDORS
    },
    // 输出
    output: {
        path: PATHS.DIST,
        filename: 'js/[name].js',   // 入口js命名
        chunkFilename: 'js/[id].[name].chunk.js'    // 路由js命名
    },
    // 加载器 // { test: /\.css$/, loader: 'style!css!autoprefixer'},
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            // { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap!autoprefixer-loader'},
            {
                test: /\.css$/,
                // 使用提取 css 文件的插件，能帮我们提取 webpack 中引用的和 vue 组件中使用的样式
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    "css-loader?sourceMap!postcss-loader"
                )
            },
            // { test: /\.scss$/, loader: 'style!css?sourceMap!sass?sourceMap'},
            {
                test: /\.scss$/,
                // 使用提取 css 文件的插件，能帮我们提取 webpack 中引用的和 vue 组件中使用的样式
                loader: ExtractTextPlugin.extract(
                    'vue-style-loader',
                    'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap'
                )
            },
            { test: /\.(gif|jpg|png)\??.*$/, loader: 'url-loader?limit=3072&name=img/[name].[ext]'},
            { test: /\.(woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=3072&name=fonts/[hash].[ext]'},
            { test: /\.(html|tpl)$/, loader: 'html-loader?minimize=false' }
        ]
    },
    //vue-loader
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader?sourceMap!postcss-loader"
            ),
            scss: ExtractTextPlugin.extract(
                'vue-style-loader',
                'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap'
            )
        }
    },
    //postcss
    postcss: [autoprefixer()],
    // 转es5
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        modulesDirectories: ['node_modules', "src/assets"],
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            ROOT: PATHS.ROOT,
            // 自定义路径别名
            MOCK: PATHS.MOCK,
            ASSETS: PATHS.SRC.join('assets'),
            COMPONENTS: PATHS.SRC.join('components'),
            FILTERS: PATHS.SRC.join('filters'),
            SERVICES: PATHS.SRC.join('services'),
            UTILS: PATHS.SRC.join('utils'),
            VIEWS: PATHS.SRC.join('views')
        },

    },
    plugins: [

    ],
    //公开方法
    methods: {
        getEntry :getEntry,
        generateHtml: generateHtml
    }
};

//多入口文件
var entries = getEntry('./src/views/**/*.js');
Object.assign(baseConfig.entry,entries);

//exports
module.exports = baseConfig;