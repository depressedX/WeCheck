<template>
    <div class="home">
        <el-form>
            <el-form-item>
                <el-input type="text" v-model="searchId" placeholder="输入群组口令">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <today-schedule-table/>


    </div>
</template>

<script>
    import {addSchedule,updateSchedule,getAllSchedules,deleteSchedule} from "../../../../resource/schedule";

    import {joinGroup} from"../../../../resource/group"
    import TodayScheduleTable from "./components/TodayScheduleTable";
    export default {
        name: 'home',
        components: {
            TodayScheduleTable
        },
        created(){
            console.log('ok')
        },
        data(){
            return{
                BASE_URL:process.env.BASE_URL,
                searchId:undefined,
                id:'bWPNsU',

            }
        },
        methods:{
            // testF(){
            //     joinGroup(this.id).then(()=>{
            //         this.$message("进入成功")
            //     });
            //     this.list = getAllSchedules(this.id);
            // }
        }
    }
</script>
