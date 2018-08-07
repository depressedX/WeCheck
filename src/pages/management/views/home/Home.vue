<template>
    <div class="home">
        <ul>
            <li>
                <router-link to="/login">登陆</router-link>
            </li>
            <li>
                <router-link to="/register">注册</router-link>
            </li>
        </ul>
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
