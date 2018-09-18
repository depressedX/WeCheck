// google face detector api的封装
import {captureImageFromVideo} from "@/utils/index";

export class FaceDetector {
    constructor(videoElement) {
        this.video = videoElement
        this.faceDetector = new window.FaceDetector
    }

    async detect() {

        const imageFile = this.currentDetectingImageFile = await captureImageFromVideo(this.video, {boxConstraint: true})

        const image = await new Promise(async resolve => {
            let image = new Image()
            image.src = URL.createObjectURL(imageFile)
            image.onload = function () {
                resolve(image)
            }
        })

        try {
            this.currentDetectingImageFile = imageFile
            return this.faceDetector.detect(image)
        } catch (e) {
            console.error(e);
        }

    }

    static support() {
        return !!window.FaceDetector
    }
}