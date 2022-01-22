<template>
  <div class="xtx-dialog" :class="{ fade }" v-show="visible">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          href="javascript:;"
          class="iconfont icon-close-new"
          @click="close"
        ></a>
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const fade = ref(false)
    // 动画执行时机
    watch(
      () => props.visible,
      () => {
        setTimeout(() => {
          fade.value = true
        }, 0)
      },
      { immediate: true }
    )

    // 关闭对话框
    const close = () => {
      emit('update:visible', false)
    }

    return {
      fade,
      close
    }
  }
}
</script>

<style lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
      margin-bottom: 10px;
      border: 1px solid #f5f5f5;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }

      > ul {
        padding: 10px;
        line-height: 30px;
        font-size: 14px;

        > li {
          > span {
            > i {
              display: inline-block;
              width: 0.5em;
            }
          }
        }
      }
    }
  }

  &.fade {
    transition: all 0.3s ease;
    background: rgba(0, 0, 0, 0.5);
  }

  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    width: 600px;
    max-height: 500px;
    background: #fff;
    border-radius: 4px;
    opacity: 0;

    &.fade {
      transition: all 0.3s ease;
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    .header {
      padding: 0 20px;
      line-height: 60px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > h3 {
        font-size: 18px;
        font-weight: normal;
      }

      .iconfont {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 18px;
        color: #999;

        &:hover {
          color: #666;
        }
      }
    }

    .body {
      padding: 30px 40px;
      font-size: 16px;
      max-height: 300px;
      overflow: auto;

      .icon-warning {
        font-size: 16px;
        margin-right: 3px;
        color: @priceColor;
      }
    }

    .footer {
      padding-bottom: 30px;
      text-align: center;
    }
  }
}
</style>
