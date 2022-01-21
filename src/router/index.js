import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const Login = () => import('@/views/login')
const LoginCallback = () => import('@/views/login/callback')
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const SubCategory = () => import('@/views/category/sub')
const Goods = () => import('@/views/goods')
const Cart = () => import('@/views/cart')
const PayCheckout = () => import('@/views/member/pay/checkout')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/category/:id',
        name: 'Category',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        name: 'SubCategory',
        component: SubCategory
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: Goods
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/login/callback',
    name: 'LoginCallback',
    component: LoginCallback
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/member/checkout',
    name: 'Checkout',
    component: PayCheckout
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
// 前置路由导航守卫
router.beforeEach((to, from, next) => {
  const { token } = store.state.user.profile
  // 判断用户未登录且要去member开头的地址，即跳转到登录页，带上回跳地址，实现登录拦截
  if (to.path.match(/^\/member/) && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  } else {
    next()
  }
})

export default router
