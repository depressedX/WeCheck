<template>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="我创建的群体" name="1">

            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="群口令"
                        >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="群体名称"
                        >
                </el-table-column>

            </el-table>
        </el-collapse-item>

    </el-collapse>
</template>

<script>

    import {getGroupInfoList} from "../../../../../resource/group";

    export default {
        name: "MyGroupTable",

        created(){
            getGroupInfoList().then(res =>{
                this.tableData = res
                console.log(res)
            })

        },
        data(){
            return{

                tableData: [],
                activeNames: ['1'],
                myGroupList:[
                    {
                        id:'adf',
                        aname:'操作系统',
                        // role:1,

                    },
                    {
                        id:'asdf',
                        aname:'数据结构',
                        // role:2
                    }
                ],

            }
        },
        methods:{
            handleChange(val){
                console.log(val);
            }
        }
    }
</script>

<style scoped>

</style>