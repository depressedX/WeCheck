<template>


    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >

        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="用户类型" prop="userType">
            <el-select v-model="ruleForm.userType" placeholder="请选择用户类型">
                <el-option label="签到端用户" value="0"></el-option>
                <el-option label="管理端用户" value="1"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>


        <el-form-item label="本人正脸照片" prop="profile">
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    onchange="beforeUpload()"
                    id="aaa"
                    >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>


    </el-form>








</template>

<script>

    import {register} from "../resource/authorization";


    export default {
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    name: '',
                    userType: null,
                    profile: false,

                },
                rules: {
                    username: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ],
                    name: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    userType: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    profile: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            getFile(){
                var file = document.getElementById("aaa").files[0];
                console.log(file);
                console.log(file['name']);

            }

        }
    }


</script>

<style scoped lang="scss">

</style>