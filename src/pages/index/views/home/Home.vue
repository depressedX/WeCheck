<template>
    <div>
        <router-link :to="{path:'/login',query:{type:'user'}}">用户端登陆</router-link><br/>
        <router-link :to="{path:'/login',query:{type:'management'}}">管理端登陆</router-link><br/>
        <router-link :to="{path:'/register'}">注册</router-link>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped lang="scss">

</style>