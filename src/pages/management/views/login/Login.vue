<template>
    <div>
        <el-card style="width: 380px;margin: auto">
            <login-form type="management"/>
            <p style="text-align: right"><a :href="`${BASE_URL}user.html`">切换至用户端页面</a></p>
        </el-card>
    </div>
</template>

<script>
    import LoginForm from "../../../../components/LoginForm";

    export default {
        name: "Login",
        components: {LoginForm},
        data() {
            return {
                BASE_URL: process.env.BASE_URL
            }
        }
    }
</script>

<style scoped lang="scss">

</style>