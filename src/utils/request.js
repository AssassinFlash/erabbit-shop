// 1.初始化 axios 实例
// 2.请求拦截器，如果有 token 进行头部携带
// 3.响应拦截器，1.剥离无效数据 2.处理 token 失效
// 4.导出一个函数，调用当前的axios实例发请求，返回值 promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：有些其他地方不是通过 axios 发请求，也要用上基准地址
// export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
// 解除手机绑定账号：http://pcapi-xiaotuxian-front.itheima.net/login/social/unbind?mobile=13911111111
export const baseURL = 'http://pcapi-xiaotuxian-front.itheima.net'
const instance = axios.create({
  // axios 的一些配置
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // 请求拦截器进行请求配置的修改
  // 读取用户信息，配置请求带上token
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器对获取的数据处理
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码
  if (err.response && err.response.statusCode === 401) {
    // 1.清空无效信息
    // 2.跳转到登录页
    // 3.跳转需要传参（当前路由地址）给登录页，方便跳回来
    // 如何拿当前路由地址：
    // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
    // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
    // 在 vue3 中，router.currentRoute是ref响应式对象
    // 同时，需要转码，这是因为路径有可能有多个参数：/user?a=10&b=20，特殊字符路径不会识别
    store.commit('user/setUser', {})
    const fullPath = encodeURIComponent(router.currentRoute.fullPath.value)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数，负责发请求：请求地址、请求方式、提交的数据
// 返回值是 Promise
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // get => params，post => data
    // [] 设置一个动态的key，比如：a={name:100,age:2} a[100>2?'name':'age']
    // 这样就可以动态写js表达式，js表达式的执行结果当做key
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
