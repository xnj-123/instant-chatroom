<template>
    <div v-if="user" class="UserItem_container" @click="goRouter"
        :style="{ borderBottom: email ? '2px solid #e2e2e2' : '0 solid red' }">
        <div class="userAvatar">
            <img :src="user.avatar" alt="">
        </div>
        <div class="userChat" :style="{ lineHeight: email ? '20px' : '50px' }">
            <span class="name">{{ user.username }}</span>
            <span class="email" v-show="email">( {{ user.email }} )</span>
        </div>
        <el-button class="add_Btn" v-if="email" icon="Plus" color="#e2e2e2" @click="addFrinend(user.id)">
        </el-button>
    </div>
</template>

<script setup lang='ts'>
import { reqADDFriend } from '@/api/friends';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
let $prop = defineProps(['email', 'user'])
let $router = useRouter()
function goRouter() {
    $router.push({ name: 'User', params: { userId: $prop.user.id } })
}
async function addFrinend(id: string) {
    let result: any = await reqADDFriend(id);
    if (result.code == 200) {
        ElNotification({
            type: 'success',
            message: '添加好友申请发送成功'
        })
    } else {
        ElNotification({
            type: 'warning',
            message: result.message
        })
    }
}
</script>

<style scoped lang='scss'>
.UserItem_container {
    width: 100%;
    height: 80px;
    padding: 15px;
    display: flex;
    align-items: center;
    text-align: left;

    &:hover {
        background-color: $theme_Listitem_hover;
    }

    .userAvatar {
        position: relative;

        img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 5px;
        }
    }

    .userChat {
        width: calc(100% - 50px);
        padding: 0 10px;
        display: flex;
        flex-direction: column;

        .name {
            font-size: 20px;
        }

        .email {
            margin-top: 5px;
            font-size: 12px;
        }
    }

    .addBtn {
        width: 20px;

    }
}
</style>