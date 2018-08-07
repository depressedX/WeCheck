<template>
    <div class="home">
        <router-link to="/login">登陆</router-link>
    </div>
</template>

<script>

    export default {
        name: 'home',
        components: {},
        data() {
            return {
                BASE_URL: process.env.BASE_URL
            }
        }
    }
</script>
