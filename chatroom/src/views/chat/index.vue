<template>
  <div class="chat_container">
    <div class="chatroom_top">
      <span>{{ friendInfo.username }}</span>
    </div>
    <div class="chatroom" ref="chatroom">
      <Chatroom></Chatroom>
    </div>
    <div class="editor" ref='editor'>
      <div class="seperate"></div>
      <Editor></Editor>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useResize } from '@/hooks/useResize';
import Chatroom from './chatroom/index.vue'
import Editor from './editor/index.vue'
import { reqGetMessages } from '@/api/messages';
import { onMounted, ref, provide, nextTick, watch, inject } from 'vue';
import { useRoute } from 'vue-router';
let socket: any = inject('socket')
let $route = useRoute()

let editor = ref();
useResize(editor, 'row');
let messages = ref<any>([])
let friendInfo = ref<any>({})
let chatroom = ref()

provide('messages', messages)
provide('friendInfo', friendInfo)
provide('toDeep', toDeep)

onMounted(() => {
  getSingleMessage().then(data => {
    setTimeout(() => {
      nextTick(() => {
        chatroom.value.scrollTop = chatroom.value.scrollHeight;
      })
    }, 0)
  });
  socket.on('getM', () => {
    alert('adwd')
    getSingleMessage().then(data => {
      setTimeout(() => {
        nextTick(() => {
          chatroom.value.scrollTop = chatroom.value.scrollHeight;
        })
      }, 0)
    })
  })
})

async function getSingleMessage() {
  let result: any = await reqGetMessages({ friendId: $route.params.friendId });
  if (result.code == 200) {
    messages.value = result.data.message;
    friendInfo.value = result.data.friendInfo;
    return 'ok'
  } else {
    return Promise.reject(new Error('faile'))
  }
}

function toDeep() {
  // setTimeout(() => {
  nextTick(() => {
    chatroom.value.scrollTop = chatroom.value.scrollHeight;
  })
  // }, 0)
}



</script>

<style scoped lang='scss'>
.chat_container {
  height: 100vh;
  background-color: aqua;
  background-color: $chat_theme_color;
  display: flex;
  flex-direction: column;

  .chatroom_top {
    height: $theme_header_height;
    border-bottom: 2px solid $layout_seperate;
    line-height: $theme_header_height;
    padding: 0 20px;
    font-weight: 600;

    span {
      font-size: 24px;
    }
  }

  .chatroom {
    flex: 1;
    width: 100%;
    overflow-y: auto;
  }

  .editor {
    min-height: 200px;
    max-height: 400px;
    height: 300px;
    position: relative;

    .seperate {
      background-color: $layout_seperate;
      height: 2px;
      cursor: row-resize;
    }
  }
}
</style>