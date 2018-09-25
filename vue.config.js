const StatsPlugin = require('stats-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');





module.exports = {
    pages: {
        index: {
            entry: 'src/pages/index/main.js',
            template: 'index.template.html',
            filename: 'index.html',
            title: 'Index'
        },
        user: {
            entry: 'src/pages/user/main.js',
            template: 'template.html',
            filename: 'user.html',
            title: 'User',

            // 当前版本暂不支持chunks  复议
            // chunks: ['chunk-common']
        },
        management: {
            entry: 'src/pages/management/main.js',
            template: 'template.html',
            filename: 'management.html',
            title: 'Management',
        },
    },
    devServer: {
        proxy: {
            '/api/v1': {
                target: 'http://39.106.131.88'
            }
        },
        https: true
    },
    configureWebpack: {
        plugins:[
            new StatsPlugin('stats.json',{
                chunkModules: true,
                chunks:true,
                assets:false,//html,css这些 
                modules:true,
                children:true,
                chunksSort:true,//排序这两个都要加上   
                assetsSort:true
            }),


            // service worker caching
            new SWPrecacheWebpackPlugin({
                cacheId: 'my-vue-app',
                filename: 'service-worker.js',
                staticFileGlobs: ['dist/**/*.{js,html,css}'],
                minify: true,
                stripPrefix: 'dist/'
            }),

        ],
    }
}
