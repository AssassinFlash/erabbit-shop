// 插件：扩展 vue 原有的功能：全局组件、自定义指令、挂载原型方法
// vue2 插件写法：导出一个对象，有 install 函数，默认传入 Vue 构造函数，Vue 基础之上扩展
// vue3 插件写法：导出一个对象，有 install 函数，默认传入 app 应用实例，app 基础之上扩展

// 骨架屏
import XtxSkeleton from './xtx-skeleton'
// 轮播图
import XtxCarousel from './xtx-carousel'
// 查看更多
import XtxMore from './xtx-more'

export default {
  install (app) {
    // 在 app 上进行扩展，app 提供 component directive 等函数
    // 如果要挂载原型，app.config.globalProperties.$xxx = xxx 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
