<template>
    <div class="menu_container">
        <div class="userAvatar">
            <img :src="userStore.avatar" alt="">
        </div>
        <el-menu active-text-color="#07c160" router="true" background-color="transparent" class="el-menu-vertical-demo"
            :default-active="'/'+$router.path.split('/')[1]" text-color="white">
            <el-menu-item index="/room">
                <el-icon size="40">
                    <ChatSquare />
                </el-icon>
            </el-menu-item>
            <el-menu-item index="/friendsList">
                <el-icon size="40">
                    <User />
                </el-icon>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/stores/modules/user';
import { useRoute } from 'vue-router'
let $router = useRoute()
let userStore = useUserStore();

</script>

<style scoped lang='scss'>
.menu_container {
    height: 100vh;

    .userAvatar {
        height: 100px;

        img {
            width: 70px;
            height: 70px;
            display: cover;
            object-fit: cover;
            border-radius: 15px;
            margin: 15px;
        }
    }

    .el-menu {
        border-right: none;
    }

    .el-menu-item {
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color: transparent;
        }
    }

}
</style>