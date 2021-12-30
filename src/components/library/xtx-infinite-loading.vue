<template>
  <!-- 加载数据 loading 组件 -->
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">没有更多商品了</span>
    </div>
  </div>
</template>

<script>
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export default {
  name: 'XtxInfiniteLoading',
  props: {
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 数据全部加载完毕
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 监听loading组件是否进入可视区
    // 触发加载事件的条件：1.加载完成，loading=false，2.数据仍未加载完，finished=false
    // 派发 infinite 事件，通知父组件更新数据
    const target = ref(null)
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        if (!props.loading && !props.finished) {
          emit('infinite')
        }
      }
    }, { threshold: 0 })

    return {
      target
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-infinite-loading {
  .loading {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

    .img {
      width: 50px;
      height: 50px;
      // cover: 把背景图像扩展到足够大，使得背景图像完全覆盖背景区域
      //        背景图像的某些部分可能无法显示在背景定位的区域中
      // contain: 把背景图像扩展至宽度和高度能够适应背景区域的大小
      background: url(../../assets/images/load.gif) no-repeat;
      background-position: center;
      background-size: contain;
    }

    .text {
      font-size: 16px;
      color: #999;
    }
  }

  .none {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat;
      background-size: contain;
      background-position: center;
    }

    .text {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
