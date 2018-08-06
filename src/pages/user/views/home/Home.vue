<template>
    <div class="home">
        <a :href="`${BASE_URL}management.html`">切换至管理端应用</a>
    </div>
</template>

<script>

    export default {
        name: 'home',
        components: {
        },
        data(){
            return{
                BASE_URL:process.env.BASE_URL
            }
        }
    }
</script>
