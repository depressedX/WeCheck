<template>
    <div class="today-schedule-table">
        <h2>今日签到</h2>
        <el-collapse v-model="activeNames" style="overflow: hidden">
            <el-collapse-item title="错过的签到" name="missed">
                <ul>
                    <li v-for="item in missedList" :key="item.groupId">
                        <schedule type="missed" group-id="sdfdsf" group-name="test"/>
                    </li>
                </ul>
            </el-collapse-item>
            <el-collapse-item title="已完成" name="done">
                <li v-for="item in doneList" :key="item.groupId">
                    <schedule type="done" group-id="sdfdsf" group-name="test"/>
                </li>
            </el-collapse-item>
            <el-collapse-item title="待签到" name="open">
                <li v-for="item in openList" :key="item.groupId">
                    <schedule type="open" group-id="sdfdsf" group-name="test"/>
                </li>
            </el-collapse-item>
            <el-collapse-item title="即将开启" name="future">
                <li v-for="item in futureList" :key="item.groupId">
                    <schedule type="future" group-id="sdfdsf" group-name="test"/>
                </li>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import {getCheckInfoToday} from "../../../../../resource/check";
    import Schedule from "./Schedule";

    export default {
        name: "TodayScheduleTable",
        components: {Schedule},
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
.today-schedule-table{
    padding: 1em;
}
</style>