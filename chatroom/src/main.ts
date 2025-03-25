import { createApp, } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import globalComponents from '@/components/index'

import '@/styles/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus, {
    locale: zhCn,
  })

app.use(globalComponents)
app.mount('#app')
