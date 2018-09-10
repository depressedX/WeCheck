<template>
    
    <div :style="note" id="test" style="height: 100%">
        <div style="height: 100% ;background-color: rgba(0,0,0,0.47);color: white">

            <div style="width: 80% ;margin: 0 auto; padding-top: 25%">

                <h2 style="margin: 0;margin-bottom: 20%;">Hello，<br>
                    <h2 style="margin: 0">欢迎回来!</h2></h2>

                <el-card style=" margin:0 auto;color: white ">

                    <login-form :type="type" :redirect="redirect"/>
                    <p style=" float: left">
                        <router-link to="/register" style="color: white;
                                            margin: 0;text-decoration: none;">
                            新用户注册</router-link>
                    </p>
                </el-card>
            </div>


        </div>

    </div>
</template>

<script>
    import LoginForm from "../../../../components/LoginForm";
    import {userType} from "../../../../metaInfo";

    export default {
        name: "Login",
        components: {LoginForm},
        props: {
            type: {
                type: String,
                validator: val => Object.keys(userType).map(k => userType[k]).indexOf(val) !== -1
            },
            redirect:{
                type:String
            }
        },
        data() {
            return {
                note: {
                    backgroundImage: "url(" + require("../../../../image/login_back.png") + ")",
                    backgroundRepeat: "no-repeat",
                    height: '100%',
                    backgroundSize: '100% 100%'
                },
                BASE_URL: process.env.BASE_URL
            }
        },
        computed: {}
    }
</script>
<style scoped lang="scss">
    #test {
        height: 100%;
    }

</style>
<style lang="scss">

    html {
        height: 100%;
    }

    body {
        height: 100%;
        margin: 0;
    }

    #test .el-card {
        background-color: #fff0;
        border: none;
    }

    #test .el-form-item__label {
        color: aliceblue;
        font-size: medium;
    }

    #test .el-card__body {
        padding: 0;
        /*max-width: 300px;*/
    }

    #app {
        height: 100%;
    }
</style>