<template>
    <div class="container">
        <video width="320" height="240" ref="videoDisplayer"></video>
        <canvas width="320" height="240" ref="canvasDisplayer"></canvas>
    </div>
</template>

<style scoped lang="scss">
    .container {

        video, canvas {
            width: 100%;
            height: 100%;
            object-fit: contain;
            position: absolute;
            left: 0;
            top: 0;
        }

        position: relative;
        width: 320px;
        height: 240px;
    }
</style>

<script>
    import '../../../../../lib/tracking'
    import '../../../../../lib/data/face'
    import {captureImageFromVideo} from "../../../../../utils";


    // 利用clmtrackr和百度ai人脸识别来识别一张高质量的照片
    export default {
        name: "FaceCapture",
        data() {

            return {
                stream: null,
                tracker: null,
                trackerTask: null
            }

        },
        mounted() {
            let video = this.$refs.videoDisplayer

            let tracker = this.tracker = new tracking.ObjectTracker('face')
            tracker.setInitialScale(4);
            tracker.setStepSize(2);
            tracker.setEdgesDensity(0.1);

            let trackerTask = this.trackerTask = tracking.track(video, tracker, {camera: true});
            trackerTask.stop()
        },
        methods: {


            async getNormalFrame() {

                this.openVideo()
                this.startTracking()
                return await new Promise(resolve => {
                    // 获取一张图像

                    let handler = event => {
                        if (event.data.length !== 0) {
                            let img = captureImageFromVideo(this.$refs.videoDisplayer)
                            this.closeVideo()
                            this.stopTracking()
                            resolve(img)
                            this.tracker.removeListener('track', handler)
                        }
                    }

                    this.tracker.on('track', handler)
                })
            },

            async getHighQualityFrame() {

                this.openVideo()
                this.startTracking()


                return await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        this.closeVideo()
                        this.stopTracking()
                        resolve(null)

                    }, 5000)
                })


            },

            async openVideo() {
                let video = this.$refs.videoDisplayer
                let stream = await this.getMediaStream()
                video.srcObject = stream
                video.onloadedmetadata = function () {
                    video.play();
                }
            },
            closeVideo() {
                if (!this.stream) return
                this.stream.getVideoTracks().forEach(t => t.stop())
                this.stream.getAudioTracks().forEach(t => t.stop())
                this.stream = null
                this.$refs.videoDisplayer.srcObject = null
            },

            startTracking() {
                this.tracker && this.tracker.on('track', this.paintingFunc);
                this.trackerTask.run()
            },
            stopTracking() {
                this.tracker && this.tracker.removeListener('track', this.paintingFunc);
                this.trackerTask.stop()
            },

            // return a MediaStream
            async getMediaStream() {
                if (this.stream) return this.stream

                try {

                    let stream = this.stream = await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false
                    })

                    return stream

                }
                catch (err) {

                    switch (err.name) {

                        case 'NotAllowedError':

                            this.$message.error('请检查浏览器相机权限是否开启')
                            break

                        default:

                            this.$message.error('未知错误:' + err)
                            break

                    }

                    throw false

                }
            },

            paintingFunc(event) {
                let canvas = this.$refs.canvasDisplayer,
                    cc = canvas.getContext('2d');
                cc.clearRect(0, 0, canvas.width, canvas.height);
                event.data.forEach(function (rect) {
                    cc.strokeStyle = '#a64ceb';
                    cc.strokeRect(rect.x, rect.y, rect.width, rect.height);
                    cc.font = '11px Helvetica';
                    cc.fillStyle = "#fff";
                    cc.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                    cc.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                });
            }
        }
    }
</script>