import request from '@/utils/requests'
import type { loginForm, registerForm } from './type'
enum API {
    GETVALIDATE_URL = '/getcode',
    GOREGISTER_URL = '/register',
    GETLOGIN_URL = '/login',
    GETUSERINFO_URL = '/getUserInfo'
}

export const reqGetValidate = (email:string) => request.get(API.GETVALIDATE_URL + `/${email}`)
export const reqRegister = (data:registerForm)=>request.post(API.GOREGISTER_URL,data)

export const reqLogin = (data:loginForm)=>request.post<any,any>(API.GETLOGIN_URL,data)
export const reqGetUserInfo = ()=>request.get(API.GETUSERINFO_URL)
