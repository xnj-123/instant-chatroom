<template>
    <div class="FriendList_container">
        <div class="friends" ref="friends">
            <div class="frinedList">
                <Friends></Friends>
            </div>
            <div class="seperate"></div>
        </div>
        <div class="friendInfo">
            <RouterView></RouterView>
            <div v-if="$route.path == '/friendsList'" class="backImage">
                <svg t="1728287266320" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1489" width="300" height="300"
                    data-spm-anchor-id="a313x.search_index.0.i6.1a2c3a81xRdDnV">
                    <path
                        d="M992.896 624.448c0-133.824-131.008-242.368-292.608-242.368-161.6 0-292.608 108.48-292.608 242.368 0 133.952 131.008 242.432 292.608 242.432 37.376 0 73.024-6.016 105.792-16.576l92.224 50.496-24.32-81.344c0.32-0.192 0.704-0.32 1.024-0.512C946.56 774.656 992.896 704.064 992.896 624.448zM594.624 578.688c-21.696 0-39.168-17.6-39.168-39.168 0-21.632 17.472-39.168 39.168-39.168 21.568 0 39.104 17.536 39.104 39.168C633.728 561.088 616.192 578.688 594.624 578.688zM792.64 578.688c-21.632 0-39.104-17.6-39.104-39.168 0-21.632 17.472-39.168 39.104-39.168s39.168 17.536 39.168 39.168C831.808 561.088 814.272 578.688 792.64 578.688z"
                        fill="#bfbfbf" p-id="1490" data-spm-anchor-id="a313x.search_index.0.i3.1a2c3a81xRdDnV" class="">
                    </path>
                    <path
                        d="M689.984 371.904c4.608 0 9.216 0.064 13.696 0.256-18.304-139.968-161.408-248.96-335.232-248.96-186.24 0-337.28 125.12-337.28 279.36 0 91.776 53.376 173.184 135.872 224.128 0.384 0.192 0.768 0.384 1.152 0.64l-27.968 93.76 106.24-58.24c37.888 12.16 78.912 19.072 121.984 19.072 13.504 0 26.816-0.704 39.936-2.048-7.04-20.8-10.944-42.816-10.944-65.536C397.376 480.384 528.448 371.904 689.984 371.904zM490.24 259.456c24.896 0 45.12 20.224 45.12 45.184 0 24.896-20.224 45.12-45.12 45.12-24.96 0-45.184-20.224-45.184-45.12C445.12 279.68 465.344 259.456 490.24 259.456zM261.952 349.76c-24.896 0-45.12-20.224-45.12-45.12 0-24.96 20.16-45.184 45.12-45.184 24.96 0 45.184 20.224 45.184 45.184C307.136 329.536 286.912 349.76 261.952 349.76z"
                        fill="#dbdbdb" p-id="1491" data-spm-anchor-id="a313x.search_index.0.i5.1a2c3a81xRdDnV" class="">
                    </path>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useResize } from '@/hooks/useResize';
import Friends from './friends/index.vue';
import { useRoute } from 'vue-router'
let $route = useRoute()
let friends = ref();


useResize(friends)

</script>

<style scoped lang='scss'>
.FriendList_container {
    height: 100vh;
    background-color: $layout_background_color;
    display: flex;

    .friends {
        width: 300px;
        position: relative;
        min-width: 250px;
        max-width: 500px;

        .friendList {
            height: 100vh;
        }

        .seperate {
            width: 2px;
            height: 100vh;
            position: absolute;
            top: 0;
            right: 0;
            background-color: $layout_seperate;
            cursor: col-resize;
        }
    }

    .friendInfo {
        flex: 1;
        background-color: #f5f5f5;
        position: relative;

        .backImage {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>