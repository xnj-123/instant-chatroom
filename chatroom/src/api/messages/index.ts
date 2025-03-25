import request from "@/utils/requests";

enum API {
    GETCHAT_URL = '/getChat/',
    GETFRIENDLIST_URL='/getFriendList',
    GETMESSAGE_URL = '/getChatMessage'
}

export const reqGetChat = (friendId:string) => request.get(API.GETCHAT_URL+friendId) 
export const reqGetFriendList = ()=>request.get(API.GETFRIENDLIST_URL)
export const reqGetMessages = (data:any)=>request.post(API.GETMESSAGE_URL,data)
