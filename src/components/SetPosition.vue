<template>
    <div>
        <div id='container' style="height: 250px"></div>
        <div id="tip" style="height: 100px"></div>
    </div>
</template>

<script>
    export default {
        name: "SetPosition",
        data(){
            return  {

            }
        },
        mounted(){
          this.update()
        },
        methods:{

             update(){
                var that =this


                var map, geolocation;
                //加载地图，调用浏览器定位服务
                map = new AMap.Map('container', {
                    resizeEnable: true
                });
                map.plugin('AMap.Geolocation', function() {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        buttonPosition:'RB',
                        GeoLocationFirst:true
                    });
                    setInterval(()=>{
                        geolocation.getCurrentLocation();
                    },1000)
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete',that.onComplete);//返回定位信息
                    AMap.event.addListener(geolocation, 'error',that.onError);      //返回定位出错信息

                });
            },
            onComplete(data) {
                var str=['定位成功'];
                str.push('经度：' + data.position.getLng());
                str.push('纬度：' + data.position.getLat());
                if(data.accuracy){
                    str.push('精度：' + data.accuracy + ' 米');
                }//如为IP精确定位结果则没有精度信息
                str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                document.getElementById('tip').innerHTML = str.join('<br>');
            },
    //解析定位错误信息
             onError(data) {
                 console.log(JSON.stringify(data));
                document.getElementById('tip').innerHTML = '定位失败';
            }
        }
    }

</script>

<style scoped>


</style>