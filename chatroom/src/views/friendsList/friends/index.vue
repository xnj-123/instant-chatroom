<template>
  <div class="friends_container" tabindex="0" ref="friends">
    <div class="ListTop_container">
      <div class="search_input">
        <el-input class="search" prefix-icon="Search" style="width:70%;background-color: #f0f0f0;" placeholder="用户名搜索"
          @focus="onFocus" v-model="username" @input="users = []" @keydown.enter="SearchUser"></el-input>
        <el-button icon="User" color="#e2e2e2" @click="SearchUser"></el-button>
      </div>
    </div>
    <div class="friends_content">
      <p>群聊</p>
      <UserItem :email="false"></UserItem>
      <p>好友</p>
      <UserItem :email="false" v-for="friend in friendStore.friends" :user="friend"></UserItem>
    </div>
    <div class="search_friend" v-show="isSearch">
      <UserItem :email="true" v-for="user in users" :user="user"></UserItem>
      <p>总共查询到&nbsp;{{ users.length }}&nbsp;个用户</p>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reqSearchUser } from '@/api/friends';
import { ref, onMounted, onUnmounted } from 'vue';
import type { people } from '@/api/friends/type';
import useFriendStore from '@/stores/modules/friend';
let isSearch = ref(false);
let friends = ref();
let username = ref('')
let users = ref<people>([])
let friendStore = useFriendStore()
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
function handleClickOutside(event: any) {
  if (
    friends.value &&
    !friends.value.contains(event.target)
  ) {
    isSearch.value = false;
    username.value = '';
    users.value = []
  }
};
const SearchUser = async () => {
  if (username.value != '') {
    let result: any = await reqSearchUser(username.value);
    console.log(result)
    if (result.code == 200) {
      users.value = result.data;
    } else { }
  }

}


const onFocus = () => {
  isSearch.value = true;
}

</script>

<style scoped lang='scss'>
.friends_container {
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

  .friends_content {
    p {
      padding: 10px 20px;
    }
  }

  .search_friend {
    text-align: center;
    width: 100%;
    background-color: $chat_theme_color;
    height: calc(100vh - $theme_header_height - 2px);
    top: $theme_header_height + 2px;
    position: absolute;

    p {
      margin-top: 10px;
      font-size: 12px;
    }
  }

}
</style>
