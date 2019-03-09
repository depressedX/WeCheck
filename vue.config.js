const OfflinePlugin = require('offline-plugin')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
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
            template: 'user.template.html',
            filename: 'user.html',
            title: 'User',

            // 当前版本暂不支持chunks  复议
            // chunks: ['chunk-common']
        },
        management: {
            entry: 'src/pages/management/main.js',
            template: 'management.template.html',
            filename: 'management.html',
            title: 'Management',
        },
    },
    devServer: {
        proxy: {
            '/api/v1': {
                target: 'https://39.106.131.88'
            },
        },
        // https: true
    },
    configureWebpack: {
        plugins: [
            // new OfflinePlugin({
            //     caches: {
            //         main: [],
            //         additional: [],
            //         optional: []
            //     }
            // }),

            // new BundleAnalyzerPlugin(),
            // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    },
    chainWebpack: config => {
        config
            .plugin('offline-plugin')
            .use(OfflinePlugin,[{
                caches: {
                    main: [],
                    additional: [],
                    optional: []
                }
            }])
            .end()
            
            .plugin('ignore-plugin')
            .use(webpack.IgnorePlugin,[/^\.\/locale$/, /moment$/])
        
        // 修改splitChunks配置
        
        
        if (process.env.NODE_ENV === 'production') {
            config.plugin('bundle-analyzer-plugin')
                .use(BundleAnalyzerPlugin,[])
        }
    }
}
