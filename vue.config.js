module.exports = {
    pages: {
        user: {
            entry: 'src/pages/user/main.js',
            template: 'public/template.html',
            filename: 'user.html',
            title: 'User',
            
            // 当前版本暂不支持chunks  复议
            // chunks: ['chunk-common']
        },
        management: {
            entry: 'src/pages/management/main.js',
            template: 'public/template.html',
            filename: 'management.html',
            title: 'Management',
        },
    },
    devServer:{
        proxy: {
            '/api/v1': {
                target:'http://39.106.131.88'
            }
        }
    }
}