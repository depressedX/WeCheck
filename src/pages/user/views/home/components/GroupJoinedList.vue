<template>
    <div class="group-joined-list">
        <h2>已加入的群组</h2>
        <ul>
            <li v-for="item in groupInfoList"><group-item :id="item.id"/></li>
        </ul>
    </div>
</template>

<script>
    import GroupItem from "./GroupItem";
    import {getGroupInfoList} from "../../../../../resource/group";
    export default {
        name: "GroupJoinedList",
        components: {GroupItem},
        created(){
            this.update()
        },
        data(){
            return{
                groupInfoList:[]
            }
        },
        methods:{
            update(){
                getGroupInfoList().then(list=>{
                    this.groupInfoList = list
                })
            }
        }
    }
</script>

<style scoped lang="scss">

</style>