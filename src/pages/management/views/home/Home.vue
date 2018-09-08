<template>
    <div class="home">


        <div id="headOut" :style="note">
            <div style="height: 45px;width: 45px;background-color: aqua;
                    display: inline-block;
                    position: absolute;top: 50%;transform: translate(0, -50%);
                    border-radius: 25px;
                    margin-left: 5%;
                    "
                id="headphoto"
            >
            </div>
            <div id="headIn" style="right: 0; height: 60%; position: absolute;top: 50%;transform: translate(0, -50%);
                                            margin-right: 5%;">
                <el-button type="text" @click="logoutFunction" style="color: white">注销账户</el-button>
            </div>
        </div>


        <MyGroupTable ref="table"></MyGroupTable>
        <!--<div id="allmap"></div>-->
        <div class="footer">
            <el-button @click="ChuangJianGroup">
                <span class="letter_footer">创</span>
                <span class="letter_footer">建</span>
                <span class="letter_footer">群</span>
                <span class="letter_footer">体</span>
            </el-button>
        </div>
    </div>

</template>

<script>
    import MyGroupTable from "./component/MyGroupTable"
    import {createGroup} from "../../../../resource/group"
    import{logout}from "../../../../resource/authorization"
    import {getUserInfo} from "../../../../resource/user"
    export default {
        name: 'home',
        components: {MyGroupTable,},
        created(){
          // this.getposition()
            getUserInfo().then(res=>{
                document.getElementById("headphoto").style.backgroundImage = res.profile;
            })
        },
        data() {
            return {
                BASE_URL: process.env.BASE_URL,
                headPhoto:null,

                note: {
                    backgroundImage: "url(" + require("../../../../image/head3.png") + ")",
                    backgroundRepeat: "no-repeat",
                    height: '60px',
                    width: "100%",
                    backgroundSize: '100% 100%',
                    position: "relative",
                },

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

<style scoped lang="scss">

    .footer .el-button {
        width: 100%;
        height: 100%;
        background-color: #409EFF;
    }

    .footer .letter_footer{
        padding: 0 10px;
        font-size: 20px;
        font-weight: inherit;
        color: white;
    }
</style>
<style lang="scss">
    .footer{
        position: fixed;
        bottom: 0;
        /*background-color: beige;*/
        width: 100%;
        padding: 0;
        margin: 0;
        z-index: 100;
        height: 50px;
    }
</style>