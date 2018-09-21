<template>
    <div id="app">
        <QRCodeScanner @detected="alert"/>
        <router-view/>
    </div>
</template>


<script>
    import QRCodeScanner from "@/components/QRCodeScanner";
    export default {
        components: {QRCodeScanner},
        methods:{
            alert(c){
                alert(c)
            }
        }
    }
</script>
<style lang="scss">

</style>
