<template>
    <div class="today-schedule-table">
        <my-title class="title">今日签到</my-title>
        <el-collapse v-model="activeNames" style="overflow: hidden">
            <el-collapse-item title="错过的签到" name="missed">
                <ul v-if="missedList.length!==0">
                    <li v-for="item in missedList" :key="item.groupId">
                        <schedule type="missed" :group-id="item.groupId" :group-name="item.groupName"/>
                    </li>
                </ul>
                <div v-else class="no-data">暂无数据</div>
            </el-collapse-item>
            <el-collapse-item title="已完成" name="done">
                <ul v-if="doneList.length!==0">
                    <li v-for="item in doneList" :key="item.groupId">
                        <schedule type="done" :group-id="item.groupId" :group-name="item.groupName"/>
                    </li>
                </ul>
                <div v-else class="no-data">暂无数据</div>
            </el-collapse-item>
            <el-collapse-item title="待签到" name="open">
                <ul v-if="openList.length!==0">
                    <li v-for="item in openList" :key="item.groupId">
                        <schedule type="open" :group-id="item.groupId" :group-name="item.groupName"/>
                    </li>
                </ul>
                <div v-else class="no-data">暂无数据</div>
            </el-collapse-item>
            <el-collapse-item title="即将开启" name="future">
                <ul v-if="futureList.length!==0">
                    <li v-for="item in futureList" :key="item.groupId">
                        <schedule type="future" :group-id="item.groupId" :group-name="item.groupName"/>
                    </li>
                </ul>
                <div v-else class="no-data">暂无数据</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import {getCheckInfoToday} from "../../../../../resource/check";
    import Schedule from "./Schedule";
    import MyTitle from "./MyTitle";

    export default {
        name: "TodayScheduleList",
        components: {MyTitle, Schedule},
        created() {
            getCheckInfoToday().then(res => {
                this.doneList = res.done
                this.missedList = res.missed
                this.openList = res.open
                this.futureList = res.future
            })
        },
        data() {
            return {
                doneList: [],
                missedList: [],
                openList: [],
                futureList: [],

                activeNames: ['done']
            }
        }
    }
</script>

<style scoped lang="scss">
    .today-schedule-table {
        .no-data {
            text-align: center;
            color: gray;
        }
    }
</style>