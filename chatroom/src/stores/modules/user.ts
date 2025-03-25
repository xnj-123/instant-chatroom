import { reqGetUserInfo, reqLogin } from "@/api/users";
import type { loginForm } from "@/api/users/type";
import { defineStore } from "pinia";
import { SET_TOKEN,GET_TOKEN } from "@/utils/tokens";
import { ElNotification } from "element-plus";

const useUserStore = defineStore('user',{
    state:()=>{
        return {
            token:GET_TOKEN(),
            id:null,
            username:'',
            email:'',
            sex:'',
            birthday:null,
            phone:'',
            sign:null,
            avatar:''
        }
    },
    actions:{
        async Logining(data:loginForm){
            let result = await reqLogin(data);
            if(result.code==200){
                SET_TOKEN(result.token);
                return 'ok'
            }else{
                ElNotification({
                    type:'error',
                    message:result.message
                })
                return Promise.reject(new Error('faile'))
            }
        },
        async getUserInfo(){
            let result:any =await reqGetUserInfo();
            if(result.code==200){
                this.id = result.data.id;
                this.username = result.data.username;
                this.email = result.data.email;
                this.sex = result.data.sex;
                this.birthday = result.data.birthday;
                this.phone = result.data.phone;
                this.sign = result.data.sign;
                this.avatar = result.data.avatar;
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        }
    },
})

export default useUserStore