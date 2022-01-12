// 插件：扩展 vue 原有的功能：全局组件、自定义指令、挂载原型方法
// vue2 插件写法：导出一个对象，有 install 函数，默认传入 Vue 构造函数，Vue 基础之上扩展
// vue3 插件写法：导出一个对象，有 install 函数，默认传入 app 应用实例，app 基础之上扩展

// // 骨架屏
// import XtxSkeleton from './xtx-skeleton'
// // 轮播图
// import XtxCarousel from './xtx-carousel'
// // 查看更多
// import XtxMore from './xtx-more'
// // 面包屑
// import XtxBread from './xtx-bread'
// // 面包屑item
// import XtxBreadItem from './xtx-bread-item'
import Message from './Message'
// 批量注册组件：
// 1.使用 require 提供的函数 context 加载目录下所有的 .vue 后缀的文件
//   require.context(目录，是否加载子目录，文件匹配)
// 2.context 函数返回一个导入函数 importFn，它有一个属性 keys() 获取所有的文件路径
// 3.获取的文件路径是个数组，遍历数组，使用 importFn 根据路径导入组件
// 4.导入组件的同时进行注册
const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 在 app 上进行扩展，app 提供 component directive 等函数
    // 如果要挂载原型，app.config.globalProperties.$xxx = xxx 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 批量注册全局组件
    importFn.keys().forEach(path => {
      const component = importFn(path).default
      app.component(component.name, component)
    })
    // 扩展指令
    defineDirective(app)
    // 挂载到vue实例原型
    app.config.globalProperties.$message = Message
  }
}

// 定义指令
const defaultImg = require('@/assets/images/200.png')
const defineDirective = (app) => {
  // 1.图片懒加载指令
  // 2.创建观察者对象，观察元素是否进入可视区域
  // 原理：先存储图片地址不在src上，当组件进入可视区域，再将图片地址设置给img
  // vue2.0 监听使用指令的 DOM 是否创建好，钩子函数：inserted
  // vue3 指令拥有的钩子与组件一样，监听使用指令的 DOM 是否创建好此时要用 mounted
  app.directive('lazy', {
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          // 处理图片加载失败 error 是加载失败，load 是加载成功
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, { threshold: 0 })
      observer.observe(el)
    }
  })
}
