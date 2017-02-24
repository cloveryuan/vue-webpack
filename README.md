# mc-fe

---
提报系统-前端

---
技术栈:

* 整体：webpack1.x + vue1.x
* UI库：iview
* service层：superagent
* 多页面多入口方式开发，暂不使用vue-router
* 其他

---
目录结构:

* src：页面源码
* dist：编译后的js、css等资源文件
* config: webpack等配置文件
* config/VENDORS：公共js/css文件路径

PS: VENDORS中如果增加公共js/css文件，需要重启服务器才能生效

---
环境切换:

* 相关配置：config/CONFIG.JS中更改
* local: 本地数据请求，需要在data文件夹中创建本地数据，另外services中配置localUrl才能生效
* proxy：代理数据请求，可以在本地服务访问预发接口，不会跨域

PS: proxy中如果增加配置项，需要重启服务器才能生效

---
项目命令:

* 启动开发：npm run dev
* 编译-预发：npm run build   (config/webpack.beta.config.multi.js中配置预发接口域名)
* 编译-线上：npm run online  (config/webpack.online.config.multi.js中配置线上接口域名)
* 编译-精灵图：npm run sprite

---
分支说明:
* 生产环境：master
* 预发环境：beta
* 开发版: dev
* 预发版: devbeta
* 线上版: devmaster

---
其他