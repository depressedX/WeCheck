<template>
    <div :style="note">
        <div style="height: 100% ;background-color: rgba(0,0,0,0.47);color: white">
            <card>
                <router-link :to="{path:'/login'}">登陆</router-link><br/>
                <router-link :to="{path:'/register'}">注册</router-link>
            </card>
        </div>

    </div>
</template>

<script>
    import {Card} from 'element-ui'
    console.log(Card)
    export default {
        name: "Home",
        components:{Card},
        data(){
            return{
                note: {
                    backgroundImage: "url(" + require("../../../../image/index.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    height:"100%",
                    backgroundSize: '100% 100%',

                },
            }
        }
    }
</script>

<style scoped lang="scss">


</style>