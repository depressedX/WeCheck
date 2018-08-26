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

                // 获取地理位置
                if (this.needLocation) {
                    this.message = '正在获取地理位置'
                    try {

                        point = await new Promise((resolve, reject) => {
                            var geolocation = new BMap.Geolocation();
                            geolocation.getCurrentPosition(function (r) {
                                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                                    resolve(r.point)
                                }
                                else {
                                    reject(new Error('请检查是否允许获取位置'))
                                }
                            });
                        })

                    } catch (e) {
                        this.failed(e)
                        return
                    }
                }
                try {
                    this.message = '正在连接服务器'
                    await check(this.groupId, point && {lng: point.lng, lat: point.lat})
                    this.success()
                }catch (e) {
                    this.failed(e)
                }
            },
            failed(error) {
                this.visible = false
                this.$message.error(`签到失败:${error.message}`)
            },
            success(){
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