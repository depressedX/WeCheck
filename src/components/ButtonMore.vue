<template>
    <el-button class="icon-more button-more" type="text" icon="el-icon-more"/>
</template>

<script>
    import {Button} from "element-ui";

    export default {
        name: "ButtonMore",
        components:{
            ElButton:Button
        }
    }
</script>

<style scoped lang="scss">
    .button-more {
        padding-right: .5em;
        padding-left: .5em;
        color: inherit;
    }
</style>