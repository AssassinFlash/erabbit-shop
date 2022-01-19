<template>
  <div class="xtx-confirm" :class="{fade}">
    <div class="wrapper" :class="{fade}">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="javascript:;" class="iconfont icon-close-new" @click="cancel"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
      </div>
      <div class="footer">
        <xtx-button size="mini" type="gray" @click="cancel">取消</xtx-button>
        <xtx-button size="mini" type="primary" @click="submit">确认</xtx-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import XtxButton from './xtx-button'

export default {
  name: 'XtxConfirm',
  components: {
    XtxButton
  },
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    text: {
      type: String,
      default: ''
    },
    submitCallback: {
      type: Function
    },
    cancelCallback: {
      type: Function
    }
  },
  setup (props) {
    // 对话框默认隐藏
    const fade = ref(false)
    // 组件渲染完毕后显示对话框
    onMounted(() => {
      // 过渡效果需要在组件渲染完毕后延时一会才能触发
      setTimeout(() => {
        fade.value = true
      }, 0)
    })
    // 点击取消按钮
    const cancel = () => {
      props.cancelCallback()
    }
    // 点击确认按钮
    const submit = () => {
      props.submitCallback()
    }

    return {
      fade,
      cancel,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);

  &.fade {
    transition: all 0.3s ease;
    background: rgba(0, 0, 0, 0.5);
  }

  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;

    &.fade {
      transition: all 0.3s ease;
      opacity: 1;
      transform: translate(-50%, -50%);
    }

    .header, .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }

    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        margin-right: 3px;
        font-size: 16px;
        color: @priceColor;
      }
    }

    .footer {
      text-align: right;

      .xtx-button {
        margin-left: 20px;
      }
    }

    .header {
      position: relative;

      h3 {
        font-size: 18px;
        font-weight: normal;
      }

      a {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        text-align: center;
        color: #999;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
