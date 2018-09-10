<template>
    <el-card
            class="schedule"
            :style="`background-color: ${scheduleColor}`"
            :shadow="type===scheduleTypes.open?'hover':'never'">
        <h4>{{startUpTime}}</h4><span>{{groupName}}</span>
    </el-card>
</template>

<script>


    const scheduleTypes = {
        missed: 'missed',
        done: 'done',
        open: 'open',
        future: 'future',
    }

    export default {
        name: "Schedule",
        props: {
            type: {
                type: String,
                required: true,
                validator: value => Object.keys(scheduleTypes).find(key => scheduleTypes[key] === value)
            },
            groupId: {
                type: String,
                required: true
            },
            groupName: {
                type: String,
                required: true
            },
            startUpTime: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                scheduleTypes
            }
        },
        computed: {
            scheduleColor() {
                switch (this.type) {
                    case scheduleTypes.missed:
                        return '#909399'
                    case scheduleTypes.done:
                        return '#67C23A'
                    case scheduleTypes.open:
                        return '#E6A23C'
                    case scheduleTypes.future:
                        return '#909399'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .schedule {
        h4{
            display: inline-block;
            font-size: 1.4em;
            padding: 0 1em 0 0;
        }
    }
</style>
<style lang="scss">
    .schedule .el-card__body{
        padding: 10px 20px;
    }
</style>