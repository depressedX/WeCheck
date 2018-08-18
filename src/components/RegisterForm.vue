<template>


    <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkpassword">
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
                                    // 2s后跳转到首页
                                    setTimeout(() => {
                                        this.$router.push('/')
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
            }
        }


    }


</script>

<style scoped lang="scss">

</style>