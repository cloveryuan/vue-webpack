/**
 * sprite配置
 */

var PATHS = require('./PATHS'),
    SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    output: {
        path: PATHS.SRC.join('assets/img'),
        filename: 'a.js'
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: './src/assets/img/icons/',
                glob: '*.png'
            },
            target: {
                image: './src/assets/img/icons.png',
                css: './src/assets/_icons.scss'
            },
            apiOptions: {
                cssImageRef: '~img/icons.png'
            }
        })
    ]
}