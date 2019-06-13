'use strict'
const isProduction = process.env.NODE_ENV === 'production'
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const cdn = require('./config/cdn.js')

module.exports = {
    // 禁用eslint
    lintOnSave: false,
    // 打包时不生成.map文件
    productionSourceMap: false,
    // 项目部署的基础路径 默认/m，放在子目录时使用./或者加你的域名
    publicPath: isProduction ? './' : '/',
    // 扩展chain配置
    chainWebpack: config => {
        // 设置目录别名alias
        config.resolve.alias
            .set('assets', '@/assets')
            .set('components', '@/components')
            .set('view', '@/view')
            .set('api', '@/api')
            .set('common', '@/common')
    },
    // 扩展webpack配置
    configureWebpack: config => {
        // 生产环境配置
        if(isProduction){
            // 配置使用CDN
            config.plugins.push(
                new WebpackCdnPlugin({
                    modules: cdn,
                    prodUrl: ':path'
                })
            )

            // ...更多备注
        }
        else{
            // 开发环境配置
        }
    },
    // 开发服务环境配置
    devServer: {
        // 默认启动serve 打开index页面
        index: 'index.html', 
        // 默认打开页面
        // open: true,
        // 允许其他机器访问
        host: '0.0.0.0',
        // 默认打开8080端口
        port: 8080,
        // 不支持使用https
        https: false,
        hotOnly: false,
        // 设置跨域代理
        // proxy: {

        // },
    },
}