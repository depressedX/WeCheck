<template>
    <!--<el-collapse v-model="activeNames" @change="handleChange">-->
        <!--<el-collapse-item title="我创建的群体" name="1">-->

            <el-table
                    :data="myGroupList"
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

                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="JumpToGroup(scope.$index) "
                                   type="text"
                            >
                            进入群体
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>
        <!--</el-collapse-item>-->

    <!--</el-collapse>-->



</template>

<script>

    import {getGroupInfoList} from "../../../../../resource/group";

    export default {
        name: "MyGroupTable",

        created(){
            this.update();
        },
        data(){

            return{

                tableData: [],
                activeNames: ['1'],
                myGroupList:[

                ],

                dialogFormVisible:false,
                formLabelWidth: '100px',

            }
        },
        methods:{
            update(){
                getGroupInfoList().then(res =>{
                    this.myGroupList = res
                    // console.log(res)
                })
            },
            handleChange(val){
                // console.log(val);
            },
            JumpToGroup(index){
                //传入的是数组的下标
                // console.log(this.myGroupList[index].id);
                var id   = this.myGroupList[index].id
                this.$router.push('group/'+id)

            }



        }
    }
</script>

<style scoped>

</style>