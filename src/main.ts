import { createApp } from 'vue'
import { globalRegister } from './global'
// 初始化css
import "normalize.css"
import "@/assets/css/index.less"

import App from './App.vue'

import router from './router/index'
import store from './store'
import { setupStore } from './store'
import * as ElIconModules from '@element-plus/icons-vue'
const app = createApp(App)
// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = (ElIconModules as any)[iconName]
    app.component(iconName, item)
  }
}
app.use(globalRegister)
app.use(store)
// 注意这两个的顺序
setupStore()
app.use(router)
app.mount('#app')

