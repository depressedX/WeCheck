<template>
    <div id="app">
        <!--<QRCodeScanner @detected="alert"/>-->
        <!--<img v-if="imgUrl" :src="imgUrl"/>-->
        <router-view/>
    </div>
</template>


<script>
    import QRCodeScanner from "@/components/QRCodeScanner";
    import QRCode from 'qrcode'


    export default {
        components: {QRCodeScanner},
        created(){
        },
        data(){
            return{
                imgUrl:null
            }
        },
        methods:{
            alert(t){
                QRCode.toDataURL(t, { errorCorrectionLevel: 'H' }, (err, url) =>{
                    this.imgUrl = url
                })
            }
        }
    }
</script>
<style lang="scss">

</style>
