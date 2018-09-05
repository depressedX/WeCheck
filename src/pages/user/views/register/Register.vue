<template>
    <el-card style="; margin: auto ">
        <h2 style="font-weight: initial">用户注册</h2>
        <register-form/>
        <p style="text-align: right"><a :href="`${BASE_URL}user.html/#/management/#/register`">切换至管理端注册</a></p>
    </el-card>
</template>

<script>
    import RegisterForm from "../../../../components/RegisterForm";
    export default {
        name: "Register",
        components: {RegisterForm}
    }
</script>

<style scoped lang="scss">

</style>