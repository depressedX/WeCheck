<template>
    <div class="check-validator">
        <el-dialog
                :visible.sync="visible"
                width="100%">
            <i class="el-icon-loading"/>{{message}}
        </el-dialog>
    </div>
</template>

<script>
    // 签到地理信息人脸信息验证

    import {check} from "../../../../../resource/check";
    import {getCurrentPosition} from "../../../../../utils";

    export default {
        name: "CheckValidator",
        props: {
            groupId: {
                type: String,
                required: true
            },
            needLocation: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visible: false,
                message: ''
            }
        },
        methods: {
            async check() {
                this.visible = true

                this.message = '正在签到'

                let point = null

                try {
                    // 获取地理位置
                    if (this.needLocation) {
                        this.message = '正在获取地理位置'
                        point = await getCurrentPosition()
                    }
                    this.message = '正在连接服务器'
                    await check(this.groupId, point && {lng: point.lng, lat: point.lat})
                    this.success()
                } catch (e) {
                    this.failed(e)
                    return
                }
            },
            failed(error) {
                this.visible = false
                this.$message.error(`签到失败:${error}`)
            },
            success() {
                this.visible = false
                this.$message.success(`签到成功`)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
<style lang="scss">
    .check-validator {
        .el-dialog__header {
            display: none !important;
        }
    }
</style>