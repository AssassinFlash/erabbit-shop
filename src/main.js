import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自定义插件的使用
import ui from './components/library'

// 重置样式和公用样式
import 'normalize.css'
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).use(ui).mount('#app')
