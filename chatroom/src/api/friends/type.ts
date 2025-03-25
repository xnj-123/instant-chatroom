export interface response{
    code:string
}

export interface user {
    id:string,
    username:string,
    email:string,
    avatar:string
}

export type people = user[]

export interface searchUsersResponse extends response{
    data:people
}

export interface friendNew {
    avatar:string,
    friend_id:number,
    friend_request_id:number,
    state:number,
    username:String,
    email:string
}

export type FriendNews = friendNew[]
export interface addFriendResponse extends response {
    data:FriendNews
}
