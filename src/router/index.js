import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      {
        path: '/product/:id',
        component: Goods
      }
    ]
  }
]
// vue2.0 new VueRouter({}) 创建路由实例
// vue3   createRouter({})
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 路由滚动行为：scrollBehavior(to,from,savedPosition){return 期望滚动的位置}
  // to,from: 路由对象，savedPosition: 当浏览器的前进/后退触发时可用
  // return 的是一个对象，{left:number, top:number}
  // 需求：路由切换时滚动到页面顶部
  scrollBehavior () {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
