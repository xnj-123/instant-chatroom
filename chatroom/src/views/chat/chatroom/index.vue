<template>
    <div class="chatroom_container" ref="chatroom">
        <Message></Message>
    </div>
</template>

<script setup lang='ts'>
import Message from './message/index.vue';

</script>

<style scoped lang='scss'>
.chatroom_container {
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    padding: 0 20px;
}
</style>