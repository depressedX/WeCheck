<template>
    <div class="group">
        <app-bar>
            <template>{{name}}</template>
        </app-bar>
        <section class="content">
            <p v-if="ownerName">创建者：{{ownerName}}</p>
            <div class="group-operation" v-if="!loading">
                <el-button :type="checked?'success':'primary'" :disabled="!state||checked">
                    {{state?(checked?'已完成签到':'签到'):'未开启签到'}}
                </el-button><br/>
                <el-button type="danger" @click="quitGroup">退出群组</el-button>
                <have-not-joined v-if="!hasJoined" :id="id" @hasJoined="hasJoinedHandler"/>
            </div>
            <i class="el-icon-loading" v-else/>
        </section>
    </div>
</template>

<script>
    import {getGroupInfo} from "../../../../resource/group";
    import AppBar from "../../../../components/AppBar";
    import HaveNotJoined from "./components/HaveNotJoined";
    import {getUserInfo} from "../../../../resource/user";
    import Icon from "../../../../components/Icon";
    import ButtonMore from "../../../../components/ButtonMore";

    export default {
        name: "Group",
        components: {ButtonMore, Icon, HaveNotJoined, AppBar},
        props: {
            id: {
                required: true,
                type: String
            }
        },
        created() {
            this.update()
        },
        data() {
            return {
                ownerId: undefined,
                ownerName: undefined,

                // 群组名称
                name: '',

                hasJoined: false,
                // 是否开启签到
                state: false,
                // 是否完成签到
                checked: false,

                loading: false,
            }
        },
        watch: {
            id() {
                this.update()
            },
            ownerId() {
                getUserInfo(this.ownerId).then(info => {
                    this.ownerName = info.name
                })
            }
        },
        methods: {
            update() {

                let onSucceedFunc = () => {
                    this.loading = false
                }

                this.loading = true

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

                    this.name = res.name
                    this.ownerId = res.owner
                    this.hasJoined = res.role === 1
                    this.state = res.state
                    this.checked = res.checked
                })
                    .then(onSucceedFunc, onSucceedFunc)
            },
            hasJoinedHandler() {
                this.update()
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/variables";

    .group {
        & > .content {
            position: relative;
            overflow: hidden;
            min-height: calc(100vh - #{$top-bar-height});
        }

        .group-operation {
            position: relative;
            padding: 1em .5em;
        }
    }
</style>