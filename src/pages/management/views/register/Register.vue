<template>
    <el-card style="width: 400px; margin: auto">

        <register-form/>
        <p style="text-align: right"><a :href="`${BASE_URL}user.html`">切换至用户端页面</a></p>
    </el-card>

</template>

<script>
    import RegisterForm from "../../../../components/RegisterForm";
    export default {
        name: "Register",
        components: {RegisterForm},

        data(){
            return{
                BASE_URL: process.env.BASE_URL
            }
        }
    }
</script>

<style scoped lang="scss">

</style>