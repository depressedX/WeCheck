<template>
    <div class="home">
        <!--<ul>-->
            <!--<li>-->
                <!--<router-link to="/login">登陆</router-link>-->
            <!--</li>-->
            <!--<li>-->
                <!--<router-link to="/register">注册</router-link>-->
            <!--</li>-->
        <!--</ul>-->

        <el-button>创建群体</el-button>
        <MyGroupTable></MyGroupTable>
    </div>
</template>

<script>
    import MyGroupTable from "./component/MyGroupTable"
    export default {
        name: 'home',
        components: {MyGroupTable},
        data() {
            return {
                BASE_URL: process.env.BASE_URL
            }
        }
    }
</script>
