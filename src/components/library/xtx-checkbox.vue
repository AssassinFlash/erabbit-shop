<template>
  <!-- 自定义复选框组件 -->
  <div class="xtx-checkbox" @click="changeChecked()">
    <i class="iconfont icon-checked" v-if="checked" />
    <i class="iconfont icon-unchecked" v-else />
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<!-- // 组件双向绑定：
// v-model ==> :modelValue + @update:modelValue
// 侦听 modelValue ，把值传给 checked
// emit 派发事件，告知父组件数据更新 -->
<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 使用 useVModel 实现 v-model 双向数据绑定
    // 1.props 接收 modelValue
    // 2.useVModel 传参 props 和 emit ，返回的就是父组件数据，是 proxy 响应式对象
    // 3.使用该返回值进行赋值就会触发 emit('update:modelValue','数据')
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      // 通知父组件
      const newVal = !checked.value
      checked.value = newVal
      // 再派发一个 change 事件
      emit('change', newVal)
    }

    return {
      checked,
      changeChecked
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 3px;
  cursor: pointer;

  .icon-checked {
    color: @xtxColor;

    ~ span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 1px;
  }

  span {
    margin-left: 2px;
  }
}
</style>
