import request from "@/utils/requests";
import type { addFriendResponse } from "./type";
enum API {
    SEARCHUSER_RUL = '/searchUser',
    ADDFRIEND_URL = '/addFriend',
    GETFRIENDSTATE_URL = '/getFriendState',
    AGREEFRIEND_URL = '/agreeFriend/',
    REJECTFRIEND_URL = '/rejectFriend/'
}

export const reqSearchUser = (username:string)=>request.get(API.SEARCHUSER_RUL+`/${username}`)
export const reqADDFriend = (friendId:string)=>request.get(API.ADDFRIEND_URL+`/${friendId}`)
export const reqGetFriendState = ()=>request.get<any,addFriendResponse>(API.GETFRIENDSTATE_URL)
export const reqAgreeFriend = (friendId:string)=>request.get(API.AGREEFRIEND_URL+friendId)
export const reqRejectFriend = (friendId:string)=>request.get(API.REJECTFRIEND_URL+friendId)



