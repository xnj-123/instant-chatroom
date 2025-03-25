<template>
    <div class="rich-text-editor">
        <div class="editor-toolbar">
            <button @click="addFile">上传文件</button>
            <button @click="toggleEmojiPicker">表情</button>
            <div v-if="showEmojiPicker" class="emoji-picker">
                <!-- 这里只展示几个表情作为示例 -->
                <div @click="insertEmoji('😊')" class="emoji">😊</div>
                <div @click="insertEmoji('😍')" class="emoji">😍</div>
                <div @click="insertEmoji('😉')" class="emoji">😉</div>
                <!-- 可以添加更多表情 -->
            </div>
        </div>
        <textarea v-model="content" @focus="showToolbar = true" @blur="hideToolbarAfterDelay"
            class="editor-textarea"></textarea>
        <input type="file" ref="fileInput" style="display: none;" @change="handleFileUpload" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';

export default defineComponent({
    name: 'RichTextEditor',
    setup() {
        const content = ref<string>('');
        const showToolbar = ref<boolean>(false);
        const showEmojiPicker = ref<boolean>(false);
        const fileInput = ref<HTMLInputElement | null>(null);

        const toggleEmojiPicker = () => {
            showEmojiPicker.value = !showEmojiPicker.value;
        };

        const insertEmoji = (emoji: string) => {
            content.value += emoji;
            showEmojiPicker.value = false; // 插入后关闭表情选择器  
        };

        const addFile = () => {
            if (fileInput.value) {
                fileInput.value.click();
            }
        };

        const handleFileUpload = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                // 这里处理文件上传逻辑，比如发送到服务器  
                console.log('Selected file:', target.files[0]);
                // 清除文件输入，以便下次可以选择同一个文件  
                target.value = '';
            }
        };

        const hideToolbarAfterDelay = () => {
            setTimeout(() => {
                if (!document.activeElement?.closest('.editor-textarea')) {
                    showToolbar.value = false;
                }
            }, 200); // 延迟一段时间以确保用户不是在进行快速点击或交互  
        };

        // 监听内容变化，以便在内容非空时显示工具栏（可选）  
        watch(content, (newVal) => {
            if (newVal.trim()) {
                showToolbar.value = true;
            } else {
                setTimeout(() => {
                    showToolbar.value = false;
                }, 200); // 延迟，以防用户正在输入  
            }
        });

        // 初始化时隐藏表情选择器  
        onMounted(() => {
            showEmojiPicker.value = false;
        });

        // 返回给模板的响应式数据和方法  
        return {
            content,
            showToolbar,
            showEmojiPicker,
            toggleEmojiPicker,
            insertEmoji,
            addFile,
            fileInput,
            handleFileUpload,
            hideToolbarAfterDelay,
        };
    },
});
</script>

<style scoped>
.rich-text-editor {
    position: relative;
}

.editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.editor-textarea {
    width: 100%;
    height: 200px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.emoji-picker {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
}

.emoji {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    margin: 5px;
    cursor: pointer;
}

.emoji:hover {
    background: #f0f0f0;
}
</style>