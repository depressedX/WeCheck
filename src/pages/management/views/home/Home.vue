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

        <el-button @click="ChuangJianGroup">创建群体</el-button>
        <MyGroupTable></MyGroupTable>
    </div>
</template>

<script>
    import MyGroupTable from "./component/MyGroupTable"
    import {createGroup} from "../../../../resource/group"
    export default {
        name: 'home',
        components: {MyGroupTable},
        data() {
            return {
                BASE_URL: process.env.BASE_URL
            }
        },
        methods:{
            ChuangJianGroup() {
                this.$prompt('请输入群体名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',

                }).then(({ value }) => {
                    console.log(value)
                    createGroup(value).then(()=>{
                        console.log(value)
                        this.$message({
                            type: 'success',
                            message: '成功创建群体：: ' + value
                        });
                    })
                    // alert(value);

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        }
    }
</script>
