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
        <group-joined-list/>
    </div>
</template>

<script>
    import {addSchedule,updateSchedule,getAllSchedules,deleteSchedule} from "../../../../resource/schedule";

    import {joinGroup} from"../../../../resource/group"
    import TodayScheduleTable from "./components/TodayScheduleList";
    import {getGroupInfo} from "../../../../resource/group";
    import GroupJoinedList from "./components/GroupJoinedList";
    export default {
        name: 'home',
        components: {
            GroupJoinedList,
            TodayScheduleTable
        },
        created(){
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
            },

        }
    }
</script>
