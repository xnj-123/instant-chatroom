<template>
    <div class="group_container">
        <div class="groupName">
            <p>hahdkadawd({{ 5 }})</p>
        </div>
        <div class="groupMember">
            <ListItem v-for="i in 15"></ListItem>
        </div>
        <el-button class="sendM" color="#07c160">发消息</el-button>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.group_container {
    height: 100vh;
    position: relative;

    .groupName {
        height: $theme_header_height;
        border-bottom: 2px solid $layout_seperate;
        line-height: 70px;

        p {
            font-size: 20px;
            padding: 0 20px;
        }
    }

    .groupMember {
        height: calc(100vh - 200px);
        padding:0 100px;
        overflow-y: auto;
    }

    .sendM {
        color: white;
        width: 200px;
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>