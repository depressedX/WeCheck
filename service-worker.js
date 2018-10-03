// 缓存静态文件
self.addEventListener('install', function(event) {
    event.waitUntil(
        // 缓存指定文件
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/app.js',
                '/image-list.js',
                '/star-wars-logo.jpg',
            ]);
        })
    );
});
// 缓存接口数据
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // 匹配到请求
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // 缓存响应数据
                let responseClone = response.clone();

                caches.open('v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return caches.match('/gallery/myLittleVader.jpg');
            });
        }
    }));
});
// 更新缓存
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // 如果有更新
                    if (cacheName !== 'v1') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
            .then(function(){
                return self.clients.claim()
            })
    );
});