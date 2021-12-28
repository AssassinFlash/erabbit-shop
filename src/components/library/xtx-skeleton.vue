<template>
  <!-- 骨架屏组件，在数据加载过程中做占位使用 -->
  <div
    class="xtx-skeleton"
    :style="{width,height}"
    :class="{shan:animated}"
  >
    <!-- 1.骨架盒子 -->
    <div class="block" :style="{background:bg}"></div>
    <!-- 2.一闪一闪的效果：伪元素 -->
  </div>
</template>

<script>
export default {
  name: 'XtxSkeleton',
  // 使用的时候需要动态设置 高度、宽度、背景颜色、是否启用闪动画
  props: {
    bg: {
      type: String,
      default: '#efefef'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    animated: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;

  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}

.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%);
    transform: skewX(-45deg);
  }
}

@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}

// linear-gradient：创建一个表示多种颜色渐变的图片
// 通过指定方向、指定颜色以及指定高度位置来实现，默认从上到下渐变
</style>
