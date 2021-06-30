//const path = require('path')
module.exports = {
    //打包配置
    publicPath: './',        // ./
    outputDir: 'dist',
    assetsDir: 'assets',
    lintOnSave: false,
    runtimeCompiler: false,
    productionSourceMap: true,
    //服务配置
    devServer: {
        port: 8080, // 端口号
        host: '0.0.0.0',//同局域网下调试
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://192.168.1.217:9090/',
                // target: 'http://portraits.ontheway168.cn/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }, // 配置多个代理
    },
    // chainWebpack: config => {
    //     config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    //     // const svgRule = config.module.rule('svg')
    //     // svgRule.uses.clear()
    //     config.module
    //       .rule('svg-sprite-loader')
    //       .test(/\.svg$/)
    //       .include
    //       .add(resolve('src/icons')) // 处理svg目录
    //       .end()
    //       .use('svg-sprite-loader')
    //       .loader('svg-sprite-loader')
    //       .options({
    //         symbolId: 'icon-[name]'
    //       })
    //   },
}