import { defineStore } from "pinia";
import { reqGetChat, reqGetFriendList } from '@/api/messages';
const useFriendStore = defineStore('friend',{
    state:()=>{
        return {
            friends:[]
        }
    },
    actions:{
        async getFriendList() {
            try {
              let result: any = await reqGetFriendList();
              if (result.code == 200) {
                let promises = result.data.map(async (item: any) => {
                  try {
                    let res = await this.getChat(item);
                    if (res === 'ok') {
                      item.message = (await reqGetChat(item.id)).data;
                    }
                  } catch (error) {
                    console.error(`Error fetching chat for friend ${item.id}:`, error);
                    item.message = 'Failed to load chat';
                  }
                });
                await Promise.all(promises);
          
                this.friends = result.data;
                console.log(this.friends)
                return 'ok';
              } else {
                console.error('Failed to fetch friend list:', result);
                return Promise.reject(new Error('Failed to fetch friend list'));
              }
            } catch (error) {
              console.error('Error in getFriendList:', error);
              return Promise.reject(new Error('Error in getFriendList'));
            }
          },
          async getChat(item: any) {
            let result: any = await reqGetChat(item.id);
            if (result.code == 200) {
              item.message = result.data;
              return 'ok'
            } else {
              return Promise.reject(new Error('faile'))
            }
          }
    }
})

export default useFriendStore;