<template>
    <button @click="down">下载表格</button>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                jsonData : [
                    {
                        name:'路人甲',
                        phone:'123456789',
                        email:'000@123456.com'
                    },
                    {
                        name:'炮灰乙',
                        phone:'123456789',
                        email:'000@123456.com'
                    },
                    {
                        name:'土匪丙',
                        phone:'123456789',
                        email:'000@123456.com'
                    },
                    {
                        name:'流氓丁',
                        phone:'123456789',
                        email:'000@123456.com'
                    },
                ]
            }
        },
        methods:{
            down(){
                console.log("123")
                let str = `姓名,电话,邮箱\n`;
                //增加\t为了不让表格显示科学计数法或者其他格式
                for(let i = 0 ; i < this.jsonData.length ; i++ ){
                    for(let item in this.jsonData[i]){
                        str+=`${this.jsonData[i][item] + '\t'},`;
                    }
                    str+='\n';
                }
                //encodeURIComponent解决中文乱码
                let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
                //通过创建a标签实现
                var link = document.createElement("a");
                link.href = uri;
                //对下载的文件命名
                link.download =  "json数据表.csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            }
        }
    }
</script>

<style scoped>

</style>