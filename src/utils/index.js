// 工具类

export const toFirstUpperCase = s => s.slice(0, 1).toUpperCase().concat(s.slice(1))
export const toFirstLowerCase = s => s.slice(0, 1).toLowerCase().concat(s.slice(1))

// 按指定格式解析date
export function parseDate(str, fmt) {
    fmt = fmt || 'yyyy-MM-dd';
    var obj = {y: 0, M: 1, d: 0, H: 0, h: 0, m: 0, s: 0, S: 0};
    fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function (m, $1, $2, $3, $4, idx, old) {
        str = str.replace(new RegExp($1 + '(\\d{' + $2.length + '})' + $4), function (_m, _$1) {
            obj[$3] = parseInt(_$1);
            return '';
        });
        return '';
    });
    obj.M--; // 月份是从0开始的，所以要减去1
    var date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
    if (obj.S !== 0) date.setMilliseconds(obj.S); // 如果设置了毫秒
    return date;
}

// time ms之后resolve的Promise
export function timeout(data, time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {

        AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete)
            AMap.event.addListener(geolocation, 'error', onError)

            function onComplete(data) {
                // data是具体的定位信息
                resolve({lng: data.position.lng, lat: data.position.lat})
            }

            function onError(data) {
                // 定位出错
                reject(data)
            }
        })
    })
}

export function captureImageFromVideo(video) {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    var img = new Image()
    img.src = canvas.toDataURL("image/jpeg");
    return img
};