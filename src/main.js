import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'

import 'element-plus/dist/index.css'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Element Plus 图标全量注册：数据里用字符串引用图标名（'Grid'、'Iphone' 等），
// 全量注册省去按需维护映射表的麻烦，对演示项目体积影响可接受。
Object.entries(ElementPlusIconsVue).forEach(([name, component]) => {
  app.component(name, component)
})

app.use(ElementPlus, { locale: zhCn })
app.use(router)

// 刷新页面后恢复登录态与地址数据
const userStore = useUserStore(pinia)
userStore.restore()

app.mount('#app')
