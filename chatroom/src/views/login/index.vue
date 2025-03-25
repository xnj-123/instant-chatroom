<template>
    <div class="login_container">
    </div>
    <el-form class="login_form" text-color="white" :model="userAccount" :rules="rules" ref="LoginFrom">
        <h1>欢迎登录！</h1>
        <el-form-item label="账号" class="item" prop="email">
            <el-input v-model="userAccount.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="userAccount.password" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="LoginBtn" type="primary" @click="goLogin">登录</el-button>
        </el-form-item>
        <a class="goRegister" @click="GoRegister">还没有账号，点击去注册</a>
    </el-form>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user';
import type { loginForm } from '@/api/users/type';
let userStore = useUserStore()

let $router = useRouter();

let userAccount = ref<loginForm>({
    email: '',
    password: '',
})
let LoginFrom = ref()

let rules = reactive({
    email: [
        { validator: validateEmail, trigger: 'blur' }
    ],
    password: [
        { validator: validatePassword, trigger: 'blur' }
    ]
})
function validateEmail(rule: any, value: any, callback: any) {
    if (value === '') {
        callback(new Error('邮箱不能为空'))
    }
    else if (!/^[a-zA-Z0-9_.+-]{8,16}@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        callback(new Error('邮箱格式不对'))
    }
    else {
        callback()
    }
}
function validatePassword(rule: any, value: any, callback: any) {
    if (value === '') {
        callback(new Error('密码不能为空'))
    }
    else if (value.length > 16 || value.length < 8) {
        callback(new Error('密码应为8-16位有效字符'))
    }
    else {
        callback()
    }
}
const GoRegister = () => {
    $router.push('/register').then(data => {

    }).catch(error => {
        console.log(error)
    })
}
const goLogin = () => {
    LoginFrom.value.validate((valid: any) => {
        if (valid) {
            userStore.Logining(userAccount.value).then(data => {
                $router.push('/room')
            })
        }
    })
}
</script>

<style scoped lang='scss'>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/background.jpg') no-repeat;
    background-size: cover;
    z-index: -1;
    filter: blur(5px);
}

.login_form {
    width: 400px;
    background: url('@/assets/login_form.png');
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    color: white;
    text-align: center;

    :deep(.el-form-item__label) {
        color: white;
    }

    .LoginBtn {
        margin-top: 10px;
        width: 100%;
    }

    h1 {
        font-size: 28px;
        margin-bottom: 20px;
    }

    .goRegister {
        color: rgb(219, 130, 130);
        cursor: pointer;

        &:hover {
            color: red;
        }
    }
}
</style>