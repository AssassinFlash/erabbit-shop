<script>
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'

export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props, { emit }) {
    // 转变成双向绑定的数据
    const activeName = useVModel(props, 'modelValue', emit)
    // 给每一个panel传当前激活的name值
    provide('activeName', activeName)
    // 点击选项卡时触发方法
    const tabClick = (name, i) => {
      activeName.value = name
      // 额外派发一个tab-click自定义事件
      emit('tab-click', { name, i })
    }
    return {
      activeName,
      tabClick
    }
  },
  render () {
    // 返回的内容会在页面进行渲染
    // 1.在babel的帮助下，可以在vue写jsx语法：javascript-xml，但不能写vue的指令
    // 2.数据的使用：插值表达式：{}
    // 3.事件的绑定：原生js语法
    // 4.定义一个jsx对象：使用也是插值表达式
    // const name = 'tom'
    // const say = () => {
    //   console.log('hello jsx')
    // }
    // const spanVal = <span>123</span>
    // return <h1 title={name} onClick={say}>{name}{spanVal}</h1>

    // 1. tabs组件大容器
    // 2. 选项卡的导航菜单结构
    // 3. 内容容器

    // 获取插槽内容，但是这样会报错
    // 原因是如果插槽内容是通过v-for创建的组件，这样是获取不到的
    // 但是可以从$slots.default().children中获取
    // 因此判断组件是静态还是动态的依据就是看$slots.default().children是否存在
    // 还可以通过看type是不是有name值，静态就有，动态的只是一个Symbol
    const panels = this.$slots.default()
    // 动态插入
    const dynamicPanels = []
    panels.forEach(panel => {
      if (panel.type.name === 'XtxTabsPanel') {
        dynamicPanels.push(panel)
      } else {
        panel.children.forEach(com => {
          dynamicPanels.push(com)
        })
      }
    })

    // jsx写函数传参的时候必须要使用函数调用的方式
    const nav = <nav>
      {dynamicPanels.map((item, i) => {
        return <a onClick={() => this.tabClick(item.props.name, i)}
          class={{ active: item.props.name === this.activeName }}
          href="javascript:;">{item.props.label}</a>
      })}
    </nav>

    return <div class="xtx-tabs">{[nav, dynamicPanels]}</div>
  }
}
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;

  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;

      &.active {
        height: 60px;
        line-height: 56px;
        background: #fff;
        border-top: 2px solid @xtxColor;
      }
    }
  }
}
</style>
