<template>
    <div class="home">
        <my-header/>
        <el-form>
            <el-form-item>
                <el-input type="text" v-model="searchId" placeholder="输入群组口令">
                    <el-button slot="append" icon="el-icon-search" @click="searchButtonHandler"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <section class="main">
            <today-schedule-table/>
            <group-joined-list/>
        </section>
    </div>
</template>

<script>
    import TodayScheduleTable from "./components/TodayScheduleList";
    import GroupJoinedList from "./components/GroupJoinedList";
    import MyHeader from "../../../../components/MyHeader";

    export default {
        name: 'home',
        components: {
            MyHeader,
            GroupJoinedList,
            TodayScheduleTable
        },
        created() {
        },
        data() {
            return {
                BASE_URL: process.env.BASE_URL,
                searchId: ''
            }
        },
        methods: {
            searchButtonHandler() {
                if (!this.searchId || this.searchId && this.searchId.length === 0) {
                    this.$alert('群组ID不可为空')
                    return
                }
                this.$router.push(`/group/${this.searchId}`)
            },

        }
    }
</script>
<style lang="scss" scoped>
    .home {
        section.main {
            padding: 0 1em;
        }
    }
</style>
<style lang="scss">
    .el-dialog {
        width: 100% !important;
        max-width: 450px;
    }
</style>