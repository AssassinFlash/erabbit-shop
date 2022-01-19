// xtx-confirm 组件的函数话显示
// 返回的是一个函数方法，将这个函数挂在到vue实例上，即可通过调用函数创建组件

// 函数创建组件的方法：
// 1. 导入被创建的组件
// 2. 使用createVNode创建虚拟DOM
// 3. 创建一个容器用于装载虚拟DOM
// 4. 使用render函数将虚拟DOM挂载到容器中
// 5. 要返回一个promise对象，点确认或取消都将销毁组件
import XtxConfirm from './xtx-confirm'
import { createVNode, render } from 'vue'

const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    // 确认按钮触发的函数
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    // 取消按钮触发的函数
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 渲染confirm组件，把函数作为props属性传递到组件中
    const vNode = createVNode(XtxConfirm, { title, text, submitCallback, cancelCallback })
    render(vNode, div)
  })
}
