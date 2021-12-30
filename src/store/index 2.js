import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
// vuex 持久化，存储到全局的同时也存储到本地 localStorage 上
import createPersistedState from 'vuex-persistedstate'

// vue2.0 new Vuex.store({}) 创建仓库
// vue3   createStore({})
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  // 配置 vuex 插件
  plugins: [createPersistedState({
    // 本地存储的名字 key
    key: 'erabbit-shop',
    // 指定需要存储的模块
    paths: ['user', 'cart']
  })]
})
