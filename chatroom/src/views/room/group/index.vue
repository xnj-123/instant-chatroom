<template>
  <div class="group_container">
    <div class="ListTop_container">
      <div class="search_input">
        <el-input class="search" prefix-icon="Search" style="width:70%;background-color: #f0f0f0;"
          placeholder="搜索"></el-input>
        <el-button :icon="'Plus'" color="#e2e2e2"></el-button>
      </div>
    </div>

    <div class="group">
      <div class="addNews" @click="dialogVisible = true">
        <div class="icon">
          <el-icon size="40">
            <User color="white" />
          </el-icon>
          <div class="tips" v-show="friendNews.length">{{ friendNews.length }}</div>
        </div>
        <p>新的朋友</p>
      </div>

      <ListItem v-for="friend in FriendStore.friends" :chat="friend"></ListItem>

    </div>

    <div class="group2" v-show="false">
    </div>

    <el-dialog v-model="dialogVisible" title="新的朋友" width="500">
      <div class="dialog">
        <div class="friendNews_content" v-for="news in friendNews" :key="news.friend_id">
          <div class="avatar">
            <img :src="news.avatar" alt="">
          </div>
          <div class="friendInfo">
            <p class="name">{{ news.username }}</p>
            <p class="email">{{ news.email }}</p>
          </div>
          <div class="toolbar">
            <span v-if="news.state == 2">等待对方同意</span>
            <div v-else>
              <el-button icon="Check" plain color="green" @click="agreeFriend(news.friend_id.toString())"></el-button>
              <el-button icon="Close" plain color="red" @click="rejectFriend(news.friend_id.toString())"></el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>

</template>

<script setup lang='ts'>
import { reqAgreeFriend, reqGetFriendState, reqRejectFriend } from '@/api/friends';
import type { FriendNews } from '@/api/friends/type';

import { ElNotification } from 'element-plus';
import { ref, onMounted } from 'vue'
import useFriendStore from '@/stores/modules/friend';

let dialogVisible = ref(false)
let friendNews = ref<FriendNews>([])

let friends = ref<any>([])
let FriendStore = useFriendStore()

onMounted(() => {
  getFriendState();
})

async function getFriendState() {
  let result: any = await reqGetFriendState();
  if (result.code == 200) {
    friendNews.value = result.data
  } else {
    return Promise.reject(new Error('faile'))
  }
}


const agreeFriend = async (friendId: string) => {
  let result: any = await reqAgreeFriend(friendId);
  if (result.code == 200) {
    ElNotification({
      type: 'success',
      message: '添加成功'
    })
    getFriendState()
  } else {
    ElNotification({
      type: 'error',
      message: '添加失败'
    })
  }
}
const rejectFriend = async (friendId: string) => {
  let result: any = await reqRejectFriend(friendId);
  if (result.code == 200) {
    ElNotification({
      type: 'warning',
      message: '你拒绝添加好友'
    })
  }
}
</script>

<style scoped lang='scss'>
.group_container {
  width: 100%;
  height: 100vh;
  background-color: $layout_chats_background;
  position: relative;

  .ListTop_container {
    height: $theme_header_height;
    box-shadow: 1px 4px 4px $layout_seperate;
    background-color: $chat_theme_color;
    text-align: center;
    position: relative;

    .search_input {
      padding: 20px;

      .search {
        margin-right: 4%;
      }
    }

  }

  .group {
    width: 100%;
    height: calc(100vh - $theme_header_height - 2px);
    overflow-y: auto;

    .addNews {
      height: 80px;
      padding: 15px;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: $theme_Listitem_hover;
      }

      .icon {
        background-color: orange;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        position: relative;

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

      p {
        margin-left: 10px;
        font-size: 22px;
      }
    }
  }

  .group2 {
    width: 100%;
    height: calc(100vh - $theme_header_height - 2px);
    top: $theme_header_height;
    position: absolute;
    top: $theme_header_height + 2px;
    background-color: $chat_theme_color;
  }

  .dialog {
    width: 100%;
    height: 350px;
    padding: 0 20px;
    border-radius: 5px;
    overflow-y: auto;

    .friendNews_content {
      width: 100%;
      height: 80px;
      background-color: $chat_theme_color;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      margin-bottom: 10px;

      .avatar {
        img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 5px;
        }
      }

      .friendInfo {
        flex: 1;
        padding: 0 15px;

        .name {
          font-size: 22px;
        }

        .email {
          margin-top: 10px;
          font-size: 12px;
        }
      }

      .toolbar {
        width: 120px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

}
</style>