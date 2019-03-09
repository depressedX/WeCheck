<template>
    <card style="; margin: auto ">
        <h2 style="font-weight: initial">用户注册</h2>
        <register-form/>
    </card>
</template>

<script>
    import RegisterForm from "../../../../components/RegisterForm";
    import {Card} from 'element-ui'

    export default {
        name: "Register",
        components: {RegisterForm,Card}
    }
</script>

<style scoped lang="scss">

</style>