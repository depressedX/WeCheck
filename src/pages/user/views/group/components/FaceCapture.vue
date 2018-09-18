<template>
    <div class="face-capture container">
        <video width="320" height="240" ref="videoDisplayer"></video>
        <canvas width="320" height="240" ref="canvasDisplayer"></canvas>
    </div>
</template>

<style scoped lang="scss">

    .face-capture {
    }

    .container {

        video, canvas {
            width: 100%;
            height: 100%;
            object-fit: contain;
            position: absolute;
            left: 0;
            top: 0;
        }

        /*position: relative;*/
        /*width: 320px;*/
        /*height: 240px;*/
        position: fixed;
        left: 0;
        width: 100%;
        height: 50%;
        top: 25%;
    }
</style>

<script>
    import {captureImageFromVideo} from "../../../../../utils";
    
    
    // 用于初始化的promise
    let initPromise = null

    // 利用clmtrackr和百度ai人脸识别来识别一张高质量的照片
    export default {
        name: "FaceCapture",
        data() {

            return {
                // stream: null,
                tracker: null,
                trackerTask: null
            }

        },
        mounted() {
            
            initPromise = new Promise(async resolve => {

                let video = this.$refs.videoDisplayer

                await import(/*webpackChunkName:"chunk_tracking"*/'@/lib/tracking.js')
                await import(/*webpackChunkName:"chunk_tracking2"*/'@/lib/data/face.js')
                
                let tracker = this.tracker = new tracking.ObjectTracker('face')
                tracker.setInitialScale(4);
                tracker.setStepSize(2);
                tracker.setEdgesDensity(0.1);
                
                let trackerTask = this.trackerTask = tracking.track(video, tracker, {camera: true});
                console.log('mounted ', this.trackerTask)
                trackerTask.stop()
                
                resolve()
            })
            

        },
        beforeDestroy() {
            this.trackerTask.stop()
            let video = this.$refs.videoDisplayer
            if (video.srcObject) {
                video.srcObject.getTracks().forEach(t => t.stop())
                video.srcObject = null
            }
        },
        methods: {


            async getNormalFrame() {
                
                // 等待初始化完成 否则会导致trackerTask未初始化  而失败
                await initPromise

                this.startTracking()
                return await new Promise(resolve => {
                    // 获取一张图像

                    let hasPicture = false

                    let handler = async event => {
                        if (event.data.length !== 0 && !hasPicture) {
                            hasPicture = true
                            let img = await captureImageFromVideo(this.$refs.videoDisplayer)
                            this.stopTracking()
                            this.tracker.removeListener('track', handler)
                            resolve(img)
                        }
                    }

                    this.tracker.on('track', handler)
                })
            },

            startTracking() {
                if (this.tracker) this.tracker.on('track', this.paintingFunc)
                this.trackerTask.run()
                this.$refs.videoDisplayer.play()
            },
            stopTracking() {
                console.log(this.$refs)
                this.tracker && this.tracker.removeListener('track', this.paintingFunc);
                this.trackerTask.stop()
                this.$refs.videoDisplayer.pause()
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