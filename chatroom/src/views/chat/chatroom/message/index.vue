<template>
    <div class="message_container" v-for="message in messages">
        <div class="public_message lay">
            <p>{{ new Date(message.Ctime).toLocaleTimeString() }}</p>
        </div>
        <div class="message lay" :style="{ flexDirection: message.receiveID == UserStore.id ? 'row' : 'row-reverse' }">
            <div class="user">
                <img class="user_avatar"
                    :src="message.receiveID == UserStore.id ? friendInfo.avatar : UserStore.avatar">
            </div>
            <div class="space">
                <div :class="message.receiveID == UserStore.id ? 'lefttriangle' : 'righttriangle'"></div>
            </div>
            <div class="message_content">
                <p :style="{ textAlign: message.receiveID == UserStore.id ? 'left' : 'right' }">{{
                    message.receiveID == UserStore.id ? friendInfo.username : UserStore.username }}</p>
                <div class="message_main"
                    :style="{ backgroundColor: message.receiveID == UserStore.id ? 'white' : '#95ec69' }">
                    <p>{{ message.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { inject,watch } from 'vue'
import useUserStore from '@/stores/modules/user';
let messages: any = inject('messages');
let friendInfo: any = inject('friendInfo')


let UserStore = useUserStore()


</script>

<style scoped lang='scss'>
.message_container {
    width: 100%;

    .message {
        display: flex;

        .user {
            flex-direction: column;

            .user_avatar {
                object-fit: cover;
                width: 50px;
                height: 50px;
                border-radius: 15%;
            }
        }


        .space {
            width: 15px;
            position: relative;

            .lefttriangle {
                position: absolute;
                top: 30px;
                right: 0;
                border-right: 5px solid white;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
            }

            .righttriangle {
                position: absolute;
                top: 30px;
                left: 0;
                border-left: 5px solid #95ec69;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
            }
        }

        .message_content {
            max-width: 80%;
            line-height: 1.4;
            word-break: break-all;

            .message_main {
                padding: 10px;
                border-radius: 5px;
                background-color: white;
            }
        }

    }

    .public_message {
        color: gray;
        text-align: center;
    }
}

.lay {
    margin: 10px 0;
}
</style>