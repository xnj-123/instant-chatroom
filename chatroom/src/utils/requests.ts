import axios from 'axios'

import useUserStore from '@/stores/modules/user';

let request = axios.create({
    baseURL:'/api',
    timeout:5000
})
request.interceptors.request.use((config)=>{
    let userStore = useUserStore();
    if(userStore.token){
        config.headers.token = userStore.token;
    }
    return config;
})
request.interceptors.response.use(response=>{
    return response.data;
},err=>{
    return Promise.reject(err)
})

export default request;