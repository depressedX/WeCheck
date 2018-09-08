<template>
    <div class="home">


        <div id="headOut" :style="note" >
            <div style="height: 45px;width: 45px;background-color: aqua;
                    display: inline-block;
                    position: absolute;top: 50%;transform: translate(0, -50%);
                    border-radius: 25px;
                    margin-left: 5%;
                    "
                 @click="showEditPerInfo()"
                id="headphoto"
            >
            </div>
            <div id="headIn" style="right: 0; height: 60%; position: absolute;top: 50%;transform: translate(0, -50%);
                                            margin-right: 5%;">
                <el-button type="text" @click="logoutFunction" style="color: white">注销账户</el-button>
            </div>
        </div>


        <!--点击头像弹出框 修改个人信息-->
        <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="UserInfo" >
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="UserInfo.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="UserInfo.name" ></el-input>
                </el-form-item>
                <el-form-item label="人脸识别头像" :label-width="formLabelWidth">

                </el-form-item>
                <div id="perEditHead" style="width: 120px;height: 120px; ">
                    asf
                </div>
                <el-upload
                        prop="profile"
                        class="upload-demo"
                        action=""
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-change="getFile"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :auto-upload="false">
                    <el-button size="small" type="primary">更换头像</el-button>
                </el-upload>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editPerInfo()">确 定</el-button>
            </div>
        </el-dialog>


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
    import {getUserInfo,updateUserInfo} from "../../../../resource/user"
    export default {
        name: 'home',
        components: {MyGroupTable,},
        created(){
          // this.getposition()
            this.getPhoto()
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

                UserInfo:{},
                dialogFormVisible:false,
                formLabelWidth: '120px',
                submitUserInfo:{
                    profile:null,
                    name:null,
                }
            }
        },
        computed: {
            editPerInfoFormData() {
                this.submitUserInfo.name = this.UserInfo.name;
                let formData = new FormData()
                // console.log("你好");
                Object.keys(this.submitUserInfo).forEach(key => {
                    // if (key === 'profile' && this.submitUserInfo[key] === null){
                    //     alert(123)
                    //     return
                    // }
                    console.log(key, this.submitUserInfo[key]);
                    formData.append(key, this.submitUserInfo[key])
                })
                return formData
            }
        },

        methods:{

            getFile(file, filelist) {
                // console.log(file)
                this.submitUserInfo.profile = file.raw;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.fileList = [];
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning('当前限制选择 1 个文件');
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

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

            //设置头像
            getPhoto(){
                getUserInfo().then(res=>{
                    // console.log(res)
                    document.getElementById("headphoto").style.backgroundImage = 'url('+res.profile+')';
                    document.getElementById("headphoto").style.backgroundSize='45px 45px'
                    this.UserInfo = res;
                    console.log(res.name + " 123");

                })
            },
            update(){

                this.$refs.table.update()
            },

            //  getposition(){
            //      var map = new BMap.Map("allmap");
            //      var point = new BMap.Point(120.331398,39.897445);
            //      map.centerAndZoom(point,12);
            //
            //      var geolocation = new BMap.Geolocation();
            //      geolocation.getCurrentPosition(function(r){
            //          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //              var mk = new BMap.Marker(r.point);
            //              map.addOverlay(mk);
            //              map.panTo(r.point);
            //              alert('您的位置：'+r.point.lng+','+r.point.lat);
            //          }
            //          else {
            //              alert('failed'+this.getStatus());
            //          }
            //      },{enableHighAccuracy: true})
            //
            //      // var geolocation = new BMap.Geolocation();
            //      // geolocation.getCurrentPosition(function(r) {
            //      //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //      //         var myGeo = new BMap.Geocoder();
            //      //
            //      //         myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(rs) {
            //      //             var lbs_point = '';
            //      //             var address = '';
            //      //             if (rs.surroundingPois.length > 0) {
            //      //                 lbs_point = rs.surroundingPois[0].point.lng+","+rs.surroundingPois[0].point.lat;
            //      //                 address =  rs.surroundingPois[0].title;
            //      //             } else {
            //      //                 lbs_point = rs.point.lng+","+rs.point.lat;
            //      //                 address = rs.address;
            //      //             }
            //      //
            //      //             alert(JSON.stringify(rs, null, 4));
            //      //
            //      //         })
            //      //     }},{
            //      //         enableHighAccuracy : true
            //      //     });
            // },

            editPerInfo(){
                // console.log(this.editPerInfoFormData.key)
                console.log(this.editPerInfoFormData)
                updateUserInfo(this.editPerInfoFormData).then(()=>{
                    this.dialogFormVisible = false
                    this.$message("修改成功")
                    this.getPhoto();
                    console.log(this.UserInfo.profile)
                })
            },

            showEditPerInfo(){
                this.dialogFormVisible=true;
                getUserInfo().then(res=>{
                    // console.log(res)
                    document.getElementById("perEditHead").style.backgroundImage = 'url('+res.profile+')';
                    document.getElementById("perEditHead").style.backgroundSize='120px 120px'
                })
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