<template>
  <div class="listItem_container" @click="goRoom()">
    <div class="userAvatar">
      <img :src="chat.avatar" alt="">
      <div class="tips">{{ chat.message.unreadCount }}</div>
    </div>
    <div class="userChat">
      <div class="itemTitle">
        <span class="username">{{ chat.username }}</span><span class="time">
          {{ new Date(chat.message.Ctime).toLocaleDateString() }}</span>
      </div>
      <p class="news">{{ chat.message.content }}</p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
let $router = useRouter()
let $prop = defineProps(['chat'])
const goRoom = () => {
  $router.push({ name: 'Chat', params: { friendId: $prop.chat.id } })
}
</script>

<style scoped lang='scss'>
.listItem_container {
  width: 100%;
  height: 80px;
  padding: 15px;
  display: flex;

  &:hover {
    background-color: $theme_Listitem_hover;
  }

  .userAvatar {
    display: inline-block;
    position: relative;

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 5px;
    }

    .tips {
      background-color: red;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      text-align: center;
      font-size: 12px;
      line-height: 16px;
      position: absolute;
      top: -4px;
      left: 40px;
      color: white;
    }
  }

  .userChat {
    width: calc(100% - 50px);
    padding: 0 10px;
    display: flex;
    flex-direction: column;

    .itemTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .username {
        font-size: 18px;
      }

      .time {
        font-size: 12px;
      }
    }

    .news {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 2px;
      font-size: 14px;
      font-weight: 300;
    }

  }
}
</style>