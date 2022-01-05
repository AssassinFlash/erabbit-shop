<template>
  <!-- 商品数量选择组件 -->
  <div class="xtx-numbox">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="modelValue">
      <a href="javascript:;" @click="changeNum(1)">+</a>
    </div>
  </div>
</template>

<script>
// 功能需求：
// - 就是减一， + 就是加一
// 存在无 label 的情况
// 可限制最大值和最小值
// 使用 useVModel 实现组件数据双向绑定
// 1.props 接收 modelValue
// 2.useVModel 接收参数 props 和 emit，返回的就是供父组件操作的数据，是 proxy 响应式对象
// 3.给该返回值进行赋值就会触发emit("update:modelValue",modelValue)，相当于通知了父组件
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxNumbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    }
  },
  setup (props, { emit }) {
    const num = useVModel(props, 'modelValue', emit)
    // 改变数量
    const changeNum = (value) => {
      const newValue = num.value + value
      if (newValue < props.min || newValue > props.max) return
      num.value = newValue
      // 再派发一个change事件，让父组件能监听change事件
      emit('change', newValue)
    }

    return {
      changeNum
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-numbox {
  display: flex;
  align-items: center;

  .label {
    width: 60px;
    padding-left: 10px;
    color: #999;
  }

  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;

    > a {
      width: 29px;
      line-height: 28px;
      background: #f8f8f8;
      font-size: 16px;
      text-align: center;
      color: #666;

      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }

      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }

    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
