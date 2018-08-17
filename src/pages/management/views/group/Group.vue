<template>
    <el-container>
        <el-header>
            <AppBar>
                <template>{{this.name}}
                    <!--<div>saf{{$route.params.id}}</div>-->

                </template>

            </AppBar>
        </el-header>
        <el-main>
            <el-button-group>
                <el-button @click = 'imme_sign' :type="!state?'primary':'danger'" >{{!state?'开始签到':'结束签到'}}</el-button>
                <el-button @click="plan_sign" type="primary">计划签到</el-button>
                <el-button type="danger">删除群体</el-button>
            </el-button-group>

            <ul v-for="number in members">
                <li>
                    {{number.name}}
                </li>
            </ul>
        </el-main>
    </el-container>
</template>

<script>

    import AppBar from "../../../../components/AppBar";
    import {getGroupInfo} from "../../../../resource/group";
    import {deleteGroup} from "../../../../resource/group";
    import {enableCheck,disableCheck} from "../../../../resource/check";



    export default {
        name: "Group",
        components: {AppBar},

        data(){
            return{
                //当前群组名称
                name:'',
                owner:'',
                //当前群体是否正在签到  true 在签到中  false不在
                state:true,
                // id:this.$route.params.id,
                members:[

                ],

                //本群体的id
                id:null,
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.update();
        },
        watch:{
            '$route' (to, from) {
                // 对路由变化作出响应...
                // console.log("路由变化"+this.id)
                this.id  = this.$route.params.id;
                this.update();
            }
        },
        methods:{
            //对群体初始化
            update() {
                getGroupInfo(this.id).then(res => {
                    if (!res) {
                        // group不存在
                        this.$alert('该群组不存在！', '服务器消息', {
                            confirmButtonText: '确定'
                        }).then(() => {
                            this.$router.go(-1)
                        })
                        return
                    }

                    this.name = res.name;
                    this.owner = res.owner;
                    this.state = res.state
                    })
                },


            //计划签到方法
            plan_sign(){
                // console.log(123);
            },

            //即刻签到方法
            imme_sign(){
                // console.log(123);
                if (this.state===true){
                    //本群体正在签到状态 应该停止签到
                    disableCheck(this.id);
                }else {
                    //本群体没有签到  应该开启签到模式
                    enableCheck(this.id);
                }
                this.update();
            }


        }

    }
</script>

<style scoped>

</style>