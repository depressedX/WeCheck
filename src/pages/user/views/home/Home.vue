<template>
    <div class="home">
        <el-form>
            <el-form-item>
                <el-input type="text" v-model="searchId" placeholder="输入群组口令">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'home',
        components: {
        },
        data(){
            return{
                BASE_URL:process.env.BASE_URL,
                
                searchId:undefined
            }
        }
    }
</script>
