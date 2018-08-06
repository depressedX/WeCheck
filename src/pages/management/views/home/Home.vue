<template>
    <div class="home">
        <a :href="`${BASE_URL}user.html`">切换至用户端应用</a>
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
