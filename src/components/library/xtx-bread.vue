<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  // render 用法：
  // 1. 单文件组件：去除 template 标签
  // 2. render 返回值就是组件内容
  // 3. vue2 的 h 函数是传参进来的，vue3 的 h 函数是导进来的
  // 4. h 的第一个参数：标签名字 第二个参数：标签属性，是个对象 第三个参数：子节点
  // 需求：
  // 1.创建 xtx-bread 父容器
  // 2.获取默认插槽内容：<router-link>首页</router-link><router-link>购物车</router-link>
  // 3.去除 xtx-bread-item 组件的 i 标签，应该由 render 函数来判断
  // 4.遍历插槽的 item，得到一个动态创建的节点，最后一个 item 不加 i 标签
  // 5.把动态创建的节点渲染到 xtx-bread 标签内
  render () {
    const items = this.$slots.default()
    const dynamicItems = []
    items.forEach((item, i) => {
      dynamicItems.push(item)
      if (i < items.length - 1) {
        const icon = h('i', { class: 'iconfont icon-angle-right' })
        dynamicItems.push(icon)
      }
    })
    return h('div', { class: 'xtx-bread' }, dynamicItems)
  }
}
</script>

<style lang="less">
// 去除 scoped 属性，目的：让样式作用到 xtx-bread-item
.xtx-bread {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      color: #666;
      transition: all 0.3s ease;

      &:hover {
        color: @xtxColor;
      }
    }
  }

  i {
    line-height: 22px;
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
