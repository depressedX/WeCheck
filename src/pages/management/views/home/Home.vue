<template>
    <div class="home">
        <el-button @click="ChuangJianGroup">创建群体</el-button>
        <el-button type="text" @click="logoutFunction">注销账户</el-button>

        <MyGroupTable ref="table"></MyGroupTable>
        <!--<div id="allmap"></div>-->

    </div>

</template>

<script>
    import MyGroupTable from "./component/MyGroupTable"
    import {createGroup} from "../../../../resource/group"
    import{logout}from "../../../../resource/authorization"

    export default {
        name: 'home',
        components: {MyGroupTable,},
        created(){
          // this.getposition()
        },
        data() {
            return {
                BASE_URL: process.env.BASE_URL,


            }
        },

        methods:{
            logoutFunction(){
                logout().then(()=>{
                    this.$message({
                        message: '账户注销成功  正在跳转',
                        type: 'success'

                    })

                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 2000)
                })
            },
            update(){
                this.$refs.table.update()
            },

             getposition(){
                 var map = new BMap.Map("allmap");
                 var point = new BMap.Point(120.331398,39.897445);
                 map.centerAndZoom(point,12);

                 var geolocation = new BMap.Geolocation();
                 geolocation.getCurrentPosition(function(r){
                     if(this.getStatus() == BMAP_STATUS_SUCCESS){
                         var mk = new BMap.Marker(r.point);
                         map.addOverlay(mk);
                         map.panTo(r.point);
                         alert('您的位置：'+r.point.lng+','+r.point.lat);
                     }
                     else {
                         alert('failed'+this.getStatus());
                     }
                 },{enableHighAccuracy: true})

                 // var geolocation = new BMap.Geolocation();
                 // geolocation.getCurrentPosition(function(r) {
                 //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                 //         var myGeo = new BMap.Geocoder();
                 //
                 //         myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(rs) {
                 //             var lbs_point = '';
                 //             var address = '';
                 //             if (rs.surroundingPois.length > 0) {
                 //                 lbs_point = rs.surroundingPois[0].point.lng+","+rs.surroundingPois[0].point.lat;
                 //                 address =  rs.surroundingPois[0].title;
                 //             } else {
                 //                 lbs_point = rs.point.lng+","+rs.point.lat;
                 //                 address = rs.address;
                 //             }
                 //
                 //             alert(JSON.stringify(rs, null, 4));
                 //
                 //         })
                 //     }},{
                 //         enableHighAccuracy : true
                 //     });
            },

            ChuangJianGroup() {
                this.$prompt('请输入群体名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',

                }).then(({ value }) => {
                    console.log(value)
                    createGroup(value).then(()=>{
                        console.log(value)
                        this.$message({
                            type: 'success',
                            message: '成功创建群体：: ' + value
                        });
                        this.update();
                    })
                    // alert(value);

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        }
    }
</script>
