<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div v-show="show"
         class="large"
         :style="[{backgroundImage:`url(${images[currIndex]})`},bgPosition]"></div>
    <div ref="target" class="middle">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩色块 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:currIndex===i}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import { useMouseInElement } from '@vueuse/core'
import { reactive, ref, watch } from 'vue'

export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  // 放大镜效果实现：
  // 1.控制显示遮罩和大图
  // 2.控制遮罩层的坐标(调整left top 样式)
  // 3.控制大图的背景定位(类似于精灵图调整图片位置，backgroundPosition)
  // 4.使用 @vueuse/core 提供的 useMouseInElement 得到基于被侦听的元素左上角的坐标和是否离开元素
  //   返回值：elementX 鼠标基于元素左上角X轴偏移 elementY 鼠标基于元素左上角Y轴偏移 isOutside 鼠标是否在元素外
  // 5.侦听得到的坐标和是否离开元素就可控制上述数据
  setup () {
    // 当前图片索引
    const currIndex = ref(0)

    const show = ref(false) // 遮罩和大图的显示
    // 遮罩层的坐标
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 大图的背景定位
    const bgPosition = reactive({
      backgroundPositionX: '0',
      backgroundPositionY: 0
    })
    const target = ref(null)
    const {
      elementX,
      elementY,
      isOutside
    } = useMouseInElement(target)
    // 实际移动范围：0~200
    const position = reactive({
      left: 0,
      top: 0
    })
    watch([elementX, elementY, isOutside], () => {
      // 若在元素之内才显示大图和遮罩层
      show.value = !isOutside.value

      if (elementX.value < 100) {
        position.left = 0
      } else if (elementX.value > 300) {
        position.left = 200
      } else {
        position.left = elementX.value - 100
      }
      if (elementY.value < 100) {
        position.top = 0
      } else if (elementY.value > 300) {
        position.top = 200
      } else {
        position.top = elementY.value - 100
      }

      // 控制遮罩层移动
      layerPosition.left = position.left + 'px'
      layerPosition.top = position.top + 'px'

      // 控制大图移动（图片移动和遮罩移动方向相反）
      bgPosition.backgroundPositionX = -position.left * 2 + 'px'
      bgPosition.backgroundPositionY = -position.top * 2 + 'px'
    })

    return {
      currIndex,
      show,
      layerPosition,
      bgPosition,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;

  .large {
    position: absolute;
    left: 412px;
    top: 0;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;

    .layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover, &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
