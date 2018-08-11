<template>
    <div>
        <el-card style="width: 380px;margin: auto">
            <login-form/>
            <p style="text-align: right"><a :href="`${BASE_URL}management.html`">切换至管理端页面</a></p>
            <!--<router-link to="../register/Register">点我不会怀孕</router-link>-->
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