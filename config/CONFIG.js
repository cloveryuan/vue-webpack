/*
    代理配置更改后，需要重启服务器才能生效
 */

module.exports = {
    //环境切换
    env: 'local',        //local:本地数据|prox:代理数据请求(代理服务会默认启动)
    //代理配置-不同域名(预发|线上)
    proxy: {
        '/prices/**': {
            target: 'http://p.3.cn',
            changeOrigin: true,
            secure: false   //https
        },
        '/api/**': {
            target: 'http://news-at.zhihu.com/',
            changeOrigin: true,
            secure: false   //https  
        }
    }
}