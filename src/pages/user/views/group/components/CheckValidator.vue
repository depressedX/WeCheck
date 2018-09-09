<template>
    <div class="check-validator">
        <el-dialog
                :visible.sync="visible"
                width="100%">
            <i class="el-icon-loading"/>{{message}}
        </el-dialog>
        <face-capture v-if="faceCaptureVisible" ref="faceCapture"/>
    </div>
</template>

<script>
    // 签到地理信息人脸信息验证

    import {check} from "../../../../../resource/check";
    import {getCurrentPosition, wait} from "../../../../../utils";
    import FaceCapture from "./FaceCapture";

    export default {
        name: "CheckValidator",
        components: {FaceCapture},
        props: {
            groupId: {
                type: String,
                required: true
            },
            // needLocation: {
            //     type: Boolean,
            //     default: false
            // },
            // needFace: {
            //     type: Boolean,
            //     default: false
            // }
        },
        data() {
            return {
                visible: false,
                faceCaptureVisible: false,
                message: ''
            }
        },
        methods: {
            async check(needLocation = false, needFace = false) {
                this.visible = true

                this.message = '正在签到'

                let point = null
                let face = null


                if (needLocation) {

                    // 获取地理位置
                    try {
                        this.message = '正在获取地理位置'
                        point = await getCurrentPosition()
                        this.message = '成功获取位置信息'
                        wait(1000)
                    } catch (e) {
                        if (e.info === 'NOT_SUPPORTED') {
                            this.$message.error('获取地理位置失败：当前浏览器不支持定位功能')
                        } else {
                            this.$message.error('获取地理位置失败：' + e.message)
                        }
                        throw e
                    }
                }

                if (needFace) {

                    //检测人脸
                    this.message = '正在获取人脸信息'
                    this.faceCaptureVisible = true
                    this.visible = false
                    await new Promise(resolve => {
                        this.$nextTick(() => {
                            resolve()
                        })
                    })
                    face = await this.$refs.faceCapture.getNormalFrame()
                    this.message = '成功获取人脸信息'
                    wait(1000)
                    this.faceCaptureVisible = false
                    this.visible = true
                }


                try {
                    this.message = '正在连接服务器'
                    let form = new FormData()

                    if (point) {
                        form.append('lng', point.lng)
                        form.append('lat', point.lat)
                    }
                    if (face) {
                        form.append('face', face)
                    }
                    await check(this.groupId, form)
                    return true
                } catch (e) {
                    console.log(e)
                    this.$message.error(e.message)
                    throw e
                } finally {
                    this.visible = false
                }

            },
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