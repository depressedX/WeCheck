<template>
    <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="submitting" @click="submit" style="width: 100%">
                <i :class="[submitting?'el-icon-loading':'']"/>{{submitting?'':'登录'}}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {login} from "../resource/authorization";

    export default {
        name: "LoginForm",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{required: true, message: '请输入用户名'}],
                    password: [{required: true, message: '请输入密码'}]
                },
                submitting: false
            }
        },
        methods: {
            submit() {
                this.submitting = true

                login(this.form.username, this.form.password)
                    .then(() => {
                            this.$message({
                                message: '登陆成功  正在跳转',
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
                    .then(() => {
                            this.submitting = false
                        },
                        () => {
                            this.submitting = false
                        },)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>