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
                <el-button @click= 'imme_sign' :type="!state?'primary':'danger'" >{{!state?'开始签到':'结束签到'}}</el-button>
                <!--<el-button @click="plan_sign" type="primary">计划签到</el-button>-->
                <el-button @click="deleGroup_open" type="danger">删除群体</el-button>
            </el-button-group>

            <el-tabs v-model="activeName" @tab-click="handleListClick">
                <el-tab-pane label="群体成员" name="first">
                    <ul v-for="number in members">
                        <li>
                            {{number.name}}
                        </li>
                    </ul>
                </el-tab-pane>

                <el-tab-pane label="计划列表" name="second">
                    <el-button @click = "plan_sign">添加计划</el-button>
                    <el-table
                            :data="mySchList"
                            stripe
                            height="600"
                            style="width: 100%">
                        <el-table-column
                                prop="startUpTime"
                                label="起始时间"

                        >
                        </el-table-column>
                        <el-table-column
                                prop="duration"
                                label="持续时间"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="repeat"
                                label="重复"
                        >
                        </el-table-column>
                        <!--<el-table-column-->
                                <!--prop="enable"-->
                                <!--label="开启"-->
                        <!--&gt;-->
                            <!--<el-switch active-value="1" ></el-switch>-->
                        <!--</el-table-column>-->
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">
                            <template slot-scope="scope">
                                <el-button @click="deleteScheduleClick(scope.$index)" type="text" size="small">删除</el-button>
                                <el-button type="text" size="small" @click.native.prevent = "change_Schedule(scope.$index)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>





            <!--//以下为弹出框 新建签到计划-->
            <el-dialog title="设置签到计划" :visible.sync="dialogFormVisible" width="80%">

                <el-form :model="schedule_form">
                    <el-form-item label="开启时间" :label-width="formLabelWidth">
                        <el-time-picker type="fixed-time" format="HH:mm" value-format="HH:mm" placeholder="选择时间" v-model="schedule_form.startUpTime" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                    <el-form-item label="持续时间" :label-width="formLabelWidth">
                        <el-col :span="8" >
                            <el-input v-model="schedule_form.duration" ></el-input>
                        </el-col>

                        <el-col :span="2" >
                            分
                        </el-col>
                    </el-form-item>

                    <el-form-item label="重复" :label-width="formLabelWidth">
                        <el-select v-model="rep" multiple placeholder="请选择"   >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                            {{rep}}
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否启用" :label-width="formLabelWidth">
                        <el-switch
                                v-model="schedule_form.enable"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit_schedule">确 定</el-button>
                </div>
            </el-dialog>



            <!--弹出框  修改签到计划-->
            <el-dialog title="修改签到计划" :visible.sync="dialogChangeFormVisible" width="80%">

                <el-form :model="schedule_change_form">
                    <el-form-item label="开启时间" :label-width="formLabelWidth">
                        <el-time-picker type="fixed-time" format="HH:mm" value-format="HH:mm" placeholder="选择时间" v-model="schedule_change_form.startUpTime" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                    <el-form-item label="持续时间" :label-width="formLabelWidth">
                        <el-col :span="8" >
                            <el-input v-model="schedule_change_form.duration" ></el-input>
                        </el-col>

                        <el-col :span="2" >
                            分
                        </el-col>
                    </el-form-item>

                    <el-form-item label="重复" :label-width="formLabelWidth">
                        <el-select v-model="change_arr_repeat" multiple placeholder="请选择"   >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                            {{change_arr_repeat}}
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否启用" :label-width="formLabelWidth">
                        <el-switch
                                v-model="schedule_change_form.enable"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogChangeFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit_Changeschedule">确 定</el-button>
                </div>
            </el-dialog>

        </el-main>
    </el-container>
</template>

<script>

    import AppBar from "../../../../components/AppBar";
    import {getGroupInfo} from "../../../../resource/group";
    import {deleteGroup} from "../../../../resource/group";
    import {enableCheck,disableCheck} from "../../../../resource/check";
    import {addSchedule,updateSchedule,getAllSchedules,deleteSchedule} from "../../../../resource/schedule";


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

                dialogFormVisible:false,
                formLabelWidth: '100px',


                dialogChangeFormVisible:false,
                options: [{
                    value: '1',
                    label: '周一'
                }, {
                    value: '2',
                    label: '周二'
                }, {
                    value: '3',
                    label: '周三'
                }, {
                    value: '4',
                    label: '周四'
                }, {
                    value: '5',
                    label: '周五'
                }, {
                    value: '6',
                    label: '周六'
                }, {
                    value: '7',
                    label: '周七'
                }
                ],
                rep:[],
                schedule_form:{
                    //关联弹出创建签到计划表格
                    startUpTime: '',
                    dura_hour:null,
                    dura_min:null,
                    // duration:(this.schedule_form.dura_hour*60+this.schedule_form.dura_min),
                    repeat: '',
                    enable: true,
                },
                schedule_change_form:{
                    //关联弹出修改签到计划表格
                    startUpTime: '',

                    duration:null,
                    repeat: '',
                    enable: true,

                },
                schedule_final:{
                    //上传的最终计划
                    startUpTime: '',
                    duration: null,
                    repeat: '',
                    enable: false,
                },
                changeSchedule_final:{
                    //上传的  修改计划的数据
                    startUpTime: '',
                    duration: null,
                    repeat: '',
                    enable: false,
                },
                //标签栏的绑定元素
                activeName: 'second',

                mySchList:[
                    {
                        scheduleId:'0dsfwefsd',
                        startUpTime:'03:15',
                        duration:30,
                        enable:true,
                        repeat:'1,3,5',
                    },
                    {
                        scheduleId:'adfafd',
                        startUpTime:'04:15',
                        duration:20,
                        enable:true,
                        repeat:'1,3,5',
                    },
                    {
                        scheduleId:'asd',
                        startUpTime:'06:15',
                        duration:203,
                        enable:true,
                        repeat:'1,3,5',
                    }
                ],


                //临时存放对应修改计划的数据
                change_arr_repeat:[],
            }
        },
        created(){
            this.id = this.$route.params.id;
            console.log(this.id)
            this.update();

            //
        },
        watch:{
            '$route' (to, from) {
                // 对路由变化作出响应...
                // console.log("路由变化"+this.id)
                this.id  = this.$route.params.id;
                 // console.log("路由变化"+this.id)
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
                    this.state = res.state;
                    this.members = res.members;
                    // console.log(this.id+'asdf')
                     getAllSchedules(this.id).then(res =>{
                         console.log("成功获取");
                         this.mySchList = res;
                    });      //获取当前群体计划列表
                    })
                },


            //计划签到方法
            plan_sign(){
                // console.log(123);

                this.dialogFormVisible = true

            },

            //即刻签到方法
            imme_sign(){
                // console.log(123);
                if (this.state===true){
                    //本群体正在签到状态 应该停止签到
                    disableCheck(this.id).then(()=>{
                        this.$message("已关闭签到");
                        this.update();
                    });
                }else {
                    //本群体没有签到  应该开启签到模式
                    enableCheck(this.id).then(()=>{
                        this.$message("开启签到成功");
                        this.update();

                    });
                }

            },


            //删除群体
            deleGroup_open() {
                this.$confirm('此操作将永久删除'+this.name+', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log("删除")
                    deleteGroup(this.id).then(()=>
                        {
                            this.$message({
                                message:"删除成功，正在跳转到主页面",
                                type:"success"
                            });
                            setTimeout(()=>{
                                this.$router.go(-1);
                            },2000)
                            //后退一步
                        }
                        ,()=>{
                            console.log(this.id)
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },


            //提交签到计划
            submit_schedule(){


                this.schedule_final.duration = this.schedule_form.duration;
                console.log("持续时间为"+this.schedule_final.duration);
                this.schedule_final.enable = this.schedule_form.enable;
                this.schedule_final.repeat = '';

                if (this.rep.length != 0){
                    this.schedule_final.repeat = this.rep[0];

                    for(var a = 1;a<this.rep.length;a++){
                        this.schedule_final.repeat = this.schedule_final.repeat+','+this.rep[a];
                    }
                }

                // console.log(this.schedule_final.repeat);
                this.schedule_final.startUpTime = this.schedule_form.startUpTime;

                addSchedule(this.id,this.schedule_final).then(()=>{
                    this.$message("创建计划成功")
                });

                this.dialogFormVisible = false

            },
            submit_Changeschedule(){

                var sched_Id = this.schedule_change_form.scheduleId;
                this.changeSchedule_final.startUpTime = this.schedule_change_form.startUpTime;
                this.changeSchedule_final.duration = this.schedule_change_form.duration;
                this.changeSchedule_final.enable = this.schedule_change_form.enable;
                // startUpTime: '',
                //     duration: null,
                //     repeat: '',
                //     enable: false,
                this.changeSchedule_final.repeat = '';
                if (this.change_arr_repeat.length!=0){
                    this.changeSchedule_final.repeat = this.change_arr_repeat[0];
                    for(var a = 1;a<this.change_arr_repeat.length;a++){
                        this.changeSchedule_final.repeat = this.changeSchedule_final.repeat+','+this.change_arr_repeat[a];
                    }
                }

                updateSchedule(sched_Id,this.changeSchedule_final).then(()=>{
                    this.$message({
                        message:"修改成功",
                        type   :"success"
                    })
                    this.update();
                    this.dialogChangeFormVisible =false;
                })



            },


            handleListClick(tab, event) {
                console.log(tab, event);
            },


            //删除签到计划
            deleteScheduleClick(index) {
                // console.log(row);
                deleteSchedule(this.mySchList[index].scheduleId).then(()=>{
                    this.$message({
                        type:"success",
                        message:"成功删除计划"
                    })
                })
            },

            change_Schedule(index){

                // index是用户要编辑的计划数组下标
                this.dialogChangeFormVisible = true;
                this.schedule_change_form = this.mySchList[index];

                var tempstr = this.schedule_change_form.repeat;
                // change_schedule_temp.scheduleId = temp
                this.change_arr_repeat = tempstr.split(',');

            },



        }

    }
</script>

<style scoped>

</style>