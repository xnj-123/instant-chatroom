<template>
    <div class="editor_container">
        <div class="toolsbar">
            <div>
                <el-icon size="25">
                    <HelpFilled />
                </el-icon>
            </div>
            <div>
                <el-icon size="25">
                    <FolderAdd />
                </el-icon>
            </div>
            <div>
                <el-icon size="25">
                    <Scissor />
                </el-icon>
            </div>
        </div>

        <div class="editor_content" tabindex="0" contenteditable="true" @input="updateContent" ref="editorDiv">

        </div>
        <div class="sendArea">
            <el-button class="sendBtn" color="#e9e9e9" @click="sendContent">发送</el-button>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { ref, inject } from 'vue';
import useUserStore from '@/stores/modules/user';
let socket: any = inject('socket')
let messages: any = inject('messages');
let friendInfo: any = inject('friendInfo')
let toDeep: any = inject('toDeep')
let userStore = useUserStore();
let content = ref<string>('');
const editorDiv = ref<HTMLElement | null>(null);

const updateContent = (event: Event) => {
    const target = event.target as HTMLDivElement;
    content.value = target.innerHTML;
};

const sendContent = () => {
    if (content.value !== '') {
        let message = {
            sendId: userStore.id,
            receiveID: friendInfo.value.id,
            content: content.value,
            Ctype: 0,
            Ctime: new Date()
        }
        socket.emit('sendM', message);
        messages.value.push(message);
        toDeep()
        if (editorDiv.value) {
            editorDiv.value.innerHTML = '';
        }
        content.value = '';
    }
};


</script>

<style scoped lang='scss'>
.editor_container {
    height: calc(100% - 2px);
    display: flex;
    flex-direction: column;

    .toolsbar {
        height: 40px;
        padding: 0 20px;
        display: flex;
        align-items: center;

        div {
            color: gray;
            margin-right: 20px;

            &:hover {
                color: black;
            }
        }
    }

    .editor_content {
        flex: 1;
        overflow-y: auto;
        padding: 5px 20px;
        word-break: break-all;
    }

    .sendArea {
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: right;

        .sendBtn {
            width: 120px;
            margin-right: 40px;
            color: $theme_color;
        }
    }
}
</style>