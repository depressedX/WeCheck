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
    // 使用googleFaceCapture

    import {FaceDetector} from "@/utils/FaceDetector";

    let initPromise = null

    export default {
        name: "FaceCapture2",

        created() {
            if (!FaceDetector.support()){
                throw new Error('当前浏览器不支持google face detector api')
            } 
        },
        data() {
            return {
                faceDetector: null,
                detectorTimeoutId: null,
                lastDetectingTime: 0
            }
        },
        mounted() {
            initPromise = new Promise(resolve => {
                this.faceDetector = new FaceDetector(this.$refs.videoDisplayer)
                resolve()
            })
        },
        methods: {

            async getNormalFrame() {

                await initPromise

                const stream = await navigator.mediaDevices.getUserMedia({video: true, audio:true})
                const video = this.$refs.videoDisplayer,
                    canvas = this.$refs.canvasDisplayer,
                    ctx = canvas.getContext('2d')


                video.srcObject = stream

                await new Promise(resolve => {
                    video.onloadedmetadata = () => resolve()
                    console.log('ok')
                })

                video.play()
                
                return new Promise(resolve => {
                    
                    let detectorTimeFunction = async () => {
                        try {
                            let faces = await this.faceDetector.detect()

                            // 画出轮廓
                            ctx.clearRect(0, 0, canvas.width, canvas.height)

                            ctx.lineWidth = 2;
                            ctx.strokeStyle = 'red';

                            for (let face of faces) {
                                let boundingBox = face.boundingBox

                                ctx.strokeRect(Math.floor(boundingBox.x),
                                    Math.floor(boundingBox.y),
                                    Math.floor(boundingBox.width),
                                    Math.floor(boundingBox.height));
                                ctx.stroke();
                            }

                            if (faces.length > 0) {
                                resolve(this.faceDetector.currentDetectingImageFile)
                            } else {

                                let now = this.lastDetectingTime = Date.now()
                                this.detectorTimeoutId = setTimeout(detectorTimeFunction, Math.max(0, 300 - now + this.lastDetectingTime))

                            }
                        } catch (e) {
                            throw e
                        }

                    }
                    
                    detectorTimeFunction()
                    
                    
                })



            },

        }
    }
</script>