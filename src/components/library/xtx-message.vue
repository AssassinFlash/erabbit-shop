<template>
  <!-- 消息提示组件 -->
  <!-- 不同提示 样式不同，图标不同 -->
  <transition name="down">
    <div class="xtx-message" :style="style[type]" v-show="visible">
      <i class="iconfont" :class="[style[type].icon]"/>
      <span class="text">{{ text }}</span>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'XtxMessage',
  props: {
    // 消息内容
    text: {
      type: String,
      default: ''
    },
    // 消息类型：warn 警告 error 错误 success 成功
    type: {
      type: String,
      default: 'warn'
    }
  },
  setup () {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      warn: {
        icon: 'icon-warning',
        color: '#e6a23c',
        background: 'rgb(253,246,236)',
        borderColor: 'rgb(250,236,216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#f56c6c',
        background: 'rgb(254,240,240)',
        borderColor: 'rgb(253,226,226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67c23a',
        background: 'rgb(240,249,235)',
        borderColor: 'rgb(225,243,216)'
      }
    }
    // 定义一个数据控制消息组件显示隐藏，组件挂载完毕才显示
    const visible = ref(false)
    onMounted(() => {
      visible.value = true
    })

    return {
      style,
      visible
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-message {
  width: 300px;
  height: 50px;
  line-height: 48px;
  position: fixed;
  left: 50%;
  top: 25px;
  margin-left: -150px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  color: #999;
  z-index: 9999;

  i {
    margin-right: 10px;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }

  .text {
    font-size: 16px;
  }
}

.down-enter-from, .down-leave-to {
  opacity: 0;
  transform: translateY(-75px);
}

.down-enter-active, .down-leave-active {
  transition: all 0.3s ease;
}

.down-enter-to, .down-leave-from {
  opacity: 1;
  transform: none;
}
</style>
