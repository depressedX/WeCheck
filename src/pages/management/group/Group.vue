<template>
    <el-container>
        <AppBar>
            <template>{{groupname}}</template>
        </AppBar>
        <el-main>
            <el-button-group>
                <el-button :type="up_state?'primary':'danger'" icon="el-icon-arrow-left">{{up_state?'开始签到':'结束签到'}}</el-button>
                <el-button type="primary">计划签到</el-button>
            </el-button-group>

        </el-main>
    </el-container>
</template>

<script>

    import AppBar from "../../../components/AppBar";



    export default {
        name: "Group",
        components: {AppBar},

        data:{
            //当前群组名称
            groupname:'',

            //当前群体是否正在签到  1 在签到中  0不在
            up_state:0,
        },
        methods:{
        }

    }
</script>

<style scoped>

</style>