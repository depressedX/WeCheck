<template>
    <div class="home">
        <el-form>
            <el-form-item>
                <el-input type="text" v-model="searchId" placeholder="输入群组口令">
                    <el-button slot="append" icon="el-icon-search" @click="searchButtonHandler"></el-button>
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
    import {getGroupInfo} from "../../../../resource/group";
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
                searchId:''
            }
        },
        methods:{
            searchButtonHandler(){
                if (!this.searchId || this.searchId&&this.searchId.length===0){
                    this.$alert('群组ID不可为空')
                    return
                } 
                this.$router.push(`/group/${this.searchId}`)
            }
        }
    }
</script>
