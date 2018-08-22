<template>
    <div class="home">
        <el-button @click="ChuangJianGroup">创建群体</el-button>
        <el-button type="text" @click="logoutFunction">注销账户</el-button>
        <MyGroupTable ref="table"></MyGroupTable>
    </div>
</template>

<script>
    import MyGroupTable from "./component/MyGroupTable"
    import {createGroup} from "../../../../resource/group"
    import{logout}from "../../../../resource/authorization"
    export default {
        name: 'home',
        components: {MyGroupTable},
        data() {
            return {
                BASE_URL: process.env.BASE_URL,


            }
        },
        methods:{
            logoutFunction(){
                logout().then(()=>{
                    this.$message({
                        message: '账户注销成功  正在跳转',
                        type: 'success'

                    })

                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 2000)
                })
            },
            update(){
                this.$refs.table.update()
            },

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
                        this.update();
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
