<template>


    <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
            <el-input type="password" v-model="ruleForm.checkpassword"></el-input>
        </el-form-item>

        <el-form-item label="用户类型" prop="userType">
            <el-select v-model="ruleForm.userType" placeholder="请选择用户类型">
                <el-option label="签到端用户" :value="0"></el-option>
                <el-option label="管理端用户" :value="1"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>


        <el-form-item label="本人正脸照片" prop="profile">
            <el-upload
                    class="upload-demo"
                    drag
                    action=""
                    :on-change="getFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-exceed="handleExceed"
                    :auto-upload="false"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
        </el-form-item>

        <el-form-item v-if="pcOrPhone"  label="人脸识别" prop="photo_PC">
            <el-button-group>
                <el-button id="start" type="primary" round>打开相机</el-button>
                <el-button id="stop" style="display:block" >停止</el-button>
                <el-button id="picture" style="display:block" >拍照</el-button>
                <el-button id="down">下载</el-button>
            </el-button-group>

            <video id="video" width="320" height="320" autoplay></video>
            <canvas style="display:block" id="canvas" width="320" height="320"></canvas>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm') ">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>


    </el-form>


</template>

<script>

    import {register} from "../resource/authorization";


    export default {

        name: 'RegisterForm',

        created(){

            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                this.pcOrPhone = false
            } else {
                this.pcOrPhone = true
            }
        },

        mounted(){
            if (this.pcOrPhone==true){
                // true代表pc  false代表移动端


                //以下为调出相机的一些监听器
                var mediaStreamTrack;
                var that = this;
                console.log(document.getElementById("down"))
                document.getElementById("down").addEventListener("click",function (ev) {
                    var can = document.getElementById("canvas");
                    var name = "abc"
                    that.downLoadImage(can, name)
                })
                document.getElementById("start").addEventListener("click", function () {
                    navigator.getUserMedia = navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia;
                    if (navigator.getUserMedia) {
                        navigator.getUserMedia({ audio:true, video: { width: 320, height: 320 } },
                            function(stream) {
                                mediaStreamTrack = typeof (stream.stop === 'function' ? stream : stream.getTracks()[1]);
                                console.log(mediaStreamTrack)
                                video.src = (window.URL || window.webkitURL).createObjectURL(stream);
                                video.play();
                                /*  var video = document.getElementById("video");
                                 video.src = window.URL.createObjectURL(stream);
                                 video.onloadedmetadata = function(e) {
                                     console.log('nihao44eee4aaaaddda');
                                     video.play();
                                 }; */
                            },
                            function(err) {
                                console.log("The following error occurred: " + err.name);
                            }
                        );
                    } else {
                        console.log("getUserMedia not supported");
                    }
                });
                document.getElementById("stop").addEventListener("click", function () {
                    console.log(mediaStreamTrack)
                    mediaStreamTrack && mediaStreamTrack.stop();
                });
                document.getElementById("picture").addEventListener("click", function () {
                    console.log(video)
                    var image = new Image();
                    var context = document.getElementById("canvas").getContext("2d");
                    context.drawImage(video, 0, 0, 320, 320);
                    image.src = context
                    console.log(image)

                    // console.log(context.drawImage(video, 0, 0, 320, 320))
                    // console.log(document.getElementById("canvas").toDataURL("image/png"))
                });

            }
        },
        data() {


            var checkusername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
                setTimeout(() => {

                    //以下if 条件 将来改成验证是否重复
                    // if (!Number.isInteger(value)) {
                    //     callback(new Error('请输入数字值'));
                    // } else {
                    //     callback();
                    // }

                    callback();
                }, 100);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkpassword !== '') {
                        this.$refs.ruleForm.validateField('checkpassword');
                    }
                    callback();
                }
            };
            var validatecheckpass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            var checkname = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('姓名不能为空'));
                }
                setTimeout(() => {

                    //以下if 条件 将来改成验证是否重复
                    // if (!Number.isInteger(value)) {
                    //     callback(new Error('请输入数字值'));
                    // } else {
                    //     callback();
                    // }

                    callback();
                }, 100);
            };


            var checkfile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请上传正脸照片'));
                }
                setTimeout(() => {

                    //以下if 条件 将来改成验证是否重复
                    // if (!Number.isInteger(value)) {
                    //     callback(new Error('请输入数字值'));
                    // } else {
                    //     callback();
                    // }

                    callback();
                }, 100);
            };




            return {
                ruleForm: {
                    username: '',
                    password: '',
                    checkpassword: '',
                    name: '',
                    userType: null,
                    profile: false,
                    pcOrPhone:true,
                    photo_PC:null,

                },


                rules: {
                    username: [
                        {required: true, validator: checkusername, trigger: 'blur'},
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'blur'},
                    ],
                    checkpassword: [
                        {required: true, validator: validatecheckpass, trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    userType: [
                        {required: true, message: '请选择用户类型', trigger: 'blur'},
                    ],
                    profile: [
                        {required: true, validator: checkfile, trigger: 'blur'},
                    ],

                }
            };
        },
        computed: {
            ruleFormData() {
                let formData = new FormData()
                Object.keys(this.ruleForm).forEach(key => {
                    if (key === 'checkpassword') return
                    formData.append(key, this.ruleForm[key])
                })
                return formData
            }
        },
        methods: {

            getFile(file, filelist) {
                this.ruleForm.profile = file.raw;

            },


            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        register(this.ruleFormData)
                            .then(() => {
                                    this.$message({
                                        message: '注册成功  正在跳转',
                                        type: 'success'
                                    });
                                    // 2s后跳转到登录页面
                                    setTimeout(() => {
                                        this.$router.push('/login')
                                    }, 2000)
                                },
                                e => {
                                    this.$message.error(`出错：${e.message}`);
                                })


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();

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


            downLoadImage(canvas,name) {
                var a = document.createElement("a");
                a.href = canvas.toDataURL();
                a.download = name;
                a.click();
            }
        }


    }


</script>

<style scoped lang="scss">

</style>