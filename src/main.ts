import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import "@/service/axios_demo"
// 初始化css
import "normalize.css"
import "@/assets/css/index.less"

import { setupStore } from './store'
const app = createApp(App)

app.use(router)
app.use(store)
setupStore()
app.mount('#app')

