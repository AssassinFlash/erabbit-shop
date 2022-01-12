// xtx-message 组件函数化显示
// 比如：类似于 vant 组件的 toast，它是可以通过 import { Toast } from 'vant' 来直接使用
// 因此这个函数就是实现这个功能，使得xtx-message组件通过导入直接使用，也可挂载在vue实例原型上

import XtxMessage from './xtx-message'
import { createVNode, render } from 'vue'

// DOM 容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
// 定时器
let timer = null

export default ({
  type,
  text,
  time = 3000
}) => {
  // 渲染组件
  // 1.导入消息提示组件，此时组件是未解析的，不可使用 DOM 获取组件元素
  // createVNode(组件, 组件需要的属性对象(props))
  // 2.将组件编译成虚拟 DOM
  const vnode = createVNode(XtxMessage, {
    type,
    text
  })
  // 3.准备一个装载消息提示组件的容器
  // 4.将虚拟 DOM 渲染到容器中
  // 注意：虚拟DOM是VUE的概念，和真实的HTML没有任何关系，想要渲染虚拟DOM要用到VUE相关方法来渲染
  // render(虚拟DOM, DOM容器)
  render(vnode, div)
  // 5.开启定时器，经过一段时间后移除消息组件DOM（render函数直接给容器置空）
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, time)
}
