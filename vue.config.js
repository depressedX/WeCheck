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
        // host: "192.168.2.102", //本机的局域网ip
        https: true
    }
}