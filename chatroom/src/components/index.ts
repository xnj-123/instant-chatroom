import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type {App,Component} from 'vue'
import ListItem from './ListItem/index.vue'
import UserItem from './UserItem/index.vue'

const Components: { [name: string]: Component } = { ListItem,UserItem }

export default {
    install(app:App){
        Object.keys(Components).forEach((key:string)=>{
            app.component(key,Components[key])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}