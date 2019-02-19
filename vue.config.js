const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    baseUrl: '/', // base router 
    outputDir: 'dist', //  the directory when run 'vue-cli-service build'
    assetsDir: 'assets', 
    lintOnSave: 'error',
    runtimeCompiler: true, 
    transpileDependencies: [], 
    productionSourceMap: true, 
    
    parallel: require('os').cpus().length > 1,
   
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/api': {
                target: 'http://localhost:5000/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => { }
    }
}
