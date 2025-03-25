<template>
  <div class="register_container">
    <el-card class="registerForm">
      <h1>欢迎您注册</h1>

      <el-form ref="FormRegister" style="max-width: 400px" label-width="auto" class="RForm" :model="registerInfo"
        :rules="rules">
        <el-form-item label="邮箱" prop="email">
          <div class="email_content">
            <el-input class="email_input" v-model="registerInfo.email" placeholder="请输入邮箱"></el-input>
            <div class="divide"></div>
            <el-select class="email_choose" v-model="selectValue">
              <el-option v-for="email in emails" :value="email.value" :label="email.label"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerInfo.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerInfo.password" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="surePass">
          <el-input v-model="registerInfo.surePass" placeholder="请确认密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validate">
          <div class="validate">
            <el-input class="val_input" v-model="registerInfo.validate" placeholder="请输入验证码"></el-input>
            <div class="divide"></div>
            <el-button class="val_Btn" type="primary" :loading="loading" @click="getValidate">{{ loading ? time :
              '获取验证码' }}</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="item">
            <el-button class="goReg" type="primary" @click="Registering">注册</el-button>
          </div>
        </el-form-item>
      </el-form>

      <p @click="goLogining">已有账号，前去登录</p>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import emails from '@/assets/common/email';
import { useRouter } from 'vue-router'
import { ElNotification, type FormRules } from 'element-plus'
import { reqGetValidate, reqRegister } from '@/api/users';

let selectValue = ref('@qq.com')
let $router = useRouter()
let registerInfo = reactive({
  email: '',
  username: '',
  password: '',
  surePass: '',
  validate: ''
})
let loading = ref(false);
let time = ref(60)
let timer: any = null;
let FormRegister = ref();

const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('邮箱不能为空'))
  }
  else if (value.length > 16 || value.length < 8) {
    callback(new Error('邮箱应为8到16为字符'))
  }
  else {
    callback()
  }
}
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  }
  else if (value.length < 4 || value.length > 12) {
    callback(new Error('用户名应为4-12字符'))
  }
  else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  }
  else if (value.length < 8 || value.length > 16) {
    callback(new Error('用户名应为8-16字符'))
  }
  else {
    callback()
  }
}
const validatePassword2 = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('确认密码不能为空'))
  }
  else if (value != registerInfo.password) {
    callback(new Error('再次确认密码不一致！'))
  } else {
    callback()
  }
}
const validateV = (rule: any, value: any, callback: any) => {
  const a = /^\d{6}$/
  if (value === '') {
    callback(new Error('验证码不能为空'))
  }
  else if (!a.test(value)) {
    callback(new Error('验证码应为6位数字'))
  }
  else {
    callback()
  }
}
const rules = reactive<any>({
  email: [
    { validator: validateEmail, trigger: 'blur' }
  ],
  username: [
    { validator: validateUsername, trigger: 'blur' }
  ],
  password: [
    { validator: validatePassword, trigger: 'blur' }
  ],
  surePass: [
    { validator: validatePassword2, trigger: 'blur' }
  ],
  validate: [
    { validator: validateV, trigger: 'blur' },
  ]
})
async function getCode() {
  let a = new RegExp(/^\d{8,16}$/)
  if (a.test(registerInfo.email)) {
    let result: any = await reqGetValidate(registerInfo.email + selectValue.value)
    if (result.code == 200) {
      ElNotification({
        type: 'success',
        message: '验证码已发送，有效期1分钟'
      })
    } else {
      ElNotification({
        type: 'error',
        message: result.message
      })
    }
    loading.value = true;
  } else {
    ElNotification({
      type: 'error',
      message: '邮箱错误'
    })
    loading.value = false;
    clearInterval(timer)
  }
}
async function goRegister() {
  let { email, password, validate, username } = registerInfo;
  let registerF = {
    email: email + selectValue.value,
    password,
    validate,
    username
  }

  let result: any = await reqRegister(registerF);

  if (result.code == 200) {
    ElNotification({
      type: 'success',
      message: '注册成功'
    })
    $router.push('/login')
  } else {
    ElNotification({
      type: 'error',
      message: '注册失败'
    })
    console.log(result)
  }
}
const getValidate = async () => {
  try {
    await getCode();
    if (loading.value) {
      timer = setInterval(() => {
        time.value--;
        if (time.value == 0) {
          loading.value = false;
          time.value = 60;
          clearInterval(timer);
        }
      }, 1000)
    }
  } catch (error) {

  }
}
const Registering = () => {
  FormRegister.value.validate((valid: any) => {
    if (valid) {
      goRegister();
    } else {
      ElNotification({
        type: 'error',
        message: '注册信息不全或者未满足要求'
      })
    }
  })
}
const goLogining = () => {
  $router.push('/login');
}
</script>

<style scoped lang='scss'>
.register_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/background.jpg') no-repeat;
  background-size: cover;
  position: relative;

  .registerForm {
    width: 800px;
    height: 80vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #ffff, $alpha: 0.6);
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 40px 0;

    h1 {
      font-size: 30px;
      font-weight: 600;
      color: rgb(69, 130, 223);
      letter-spacing: 10px;
    }

    .RForm {
      margin: 40px;
      width: 800px;

      .email_content {
        width: 100%;
        display: flex;

        .email_input {
          width: 56%
        }

        .divide {
          flex: 1;
        }

        .email_choose {
          width: 40%;
        }
      }

      .validate {
        width: 100%;
        display: flex;

        .val_input {
          width: 56%;
        }

        .divide {
          flex: 1;
        }

        .val_Btn {
          width: 40%;
        }
      }

      .item {
        width: 100%;
        text-align: center;
      }

      .goReg {
        margin-top: 20px;
        width: 60%;
      }
    }

    p {
      color: rgba(68, 183, 212, 0.81);
      cursor: pointer;

      &:hover {
        color: blue;
      }
    }
  }
}
</style>