<template>
    <div class="layout_container">
        <div class="app_container">
            <div class="app_menu">
                <Menu></Menu>
            </div>
            <div class="app_content">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, provide } from 'vue';
import Menu from './menu/index.vue'
import useUserStore from '@/stores/modules/user';
import useFriendStore from '@/stores/modules/friend';
import { io } from 'socket.io-client'
const socket = io('http://localhost:8000');

provide('socket', socket)

let userStore = useUserStore()
let friendStore = useFriendStore()


onMounted(async () => {
    try {
        await userStore.getUserInfo().then(data => {
            friendStore.getFriendList()
            getSocket(userStore.id)
        })
    } catch (error) {

    }
})

function getSocket(id: any) {
    socket.emit('login', id)
}
</script>

<style scoped lang='scss'>
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: $base_background_color;

    .app_container {
        width: 1320px;
        height: 100vh;
        margin: 0 auto;
        display: flex;

        .app_menu {
            width: 100px;
            height: 100vh;
            background-color: $layout_menu_backgroundColor;
        }

        .app_content {
            width: 1220px;
            height: 100vh;
        }
    }
}
</style>