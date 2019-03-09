<template>
    <el-card
            :style="'background-color: #909399'"
            >
        <h4>{{groupName}}</h4>
    </el-card>
</template>

<script>
    import {Card} from "element-ui";

    export default {
        name: "SingleGroupItem",
        components:{ElCard:Card},
        props:{
            groupId:{
                type:String,
                required:true
            },
            groupName:{
                type:String,
                required:true
            },
        },
        data(){
            return
            {

            }
        }
    }
</script>

<style scoped>

</style>