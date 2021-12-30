<template>
  <div
    class="xtx-carousel"
    @mouseenter="stop"
    @mouseleave="start"
  >
    <!-- 图片 -->
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item,i) in sliders"
        :key="item.id"
        :class="{fade : index === i}"
      >
        <router-link to="/">
          <img :src="item.imgUrl" alt="">
        </router-link>
      </li>
    </ul>
    <!-- 箭头 -->
    <a
      href="javascript:;"
      class="carousel-btn prev"
      @click="toggle(-1)"
    >
      <i class="iconfont icon-angle-left"/>
    </a>
    <a
      href="javascript:;"
      class="carousel-btn next"
      @click="toggle(1)"
    >
      <i class="iconfont icon-angle-right"/>
    </a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <span
        v-for="(item,i) in sliders"
        :key="item.id"
        :class="{active : index === i}"
        @mouseenter="index=i"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default () {
        return []
      }
    },
    duration: {
      type: Number,
      default: 3000
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    // 默认显示的图片索引
    const index = ref(0)

    // 1.自动轮播的逻辑：定时器
    let timer = null
    const autoPlayFn = () => {
      // 防止定时器重复使用
      clearInterval(timer)
      // 每隔一段时间切换索引
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 自动轮播的条件：监听sliders数据的变化，判断有数据且autoPlay为true
    // sliders 不是自己 ref 的数据，所以要函数返回
    watch(() => props.sliders, (newVal) => {
      if (newVal.length && props.autoPlay) {
        autoPlayFn()
      }
    }, { immediate: true })

    // 2.鼠标进入，暂停定时器，鼠标离开，开启自动播放（有开启条件）
    const stop = () => {
      if (timer) {
        clearInterval(timer)
      }
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    // 3.点击指示器可切换上一张下一张
    const toggle = (step) => {
      let newIndex = index.value + step
      if (newIndex >= props.sliders.length) {
        newIndex = 0
      }
      if (newIndex < 0) {
        newIndex = props.sliders.length - 1
      }
      index.value = newIndex
    }

    return {
      index,
      stop,
      start,
      toggle
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }

    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-indicator {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      text-align: center;

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        cursor: pointer;

        ~ span {
          margin-left: 12px;
        }

        &.active {
          background: #fff;
        }
      }
    }

    &-btn {
      width: 44px;
      height: 44px;
      line-height: 44px;
      position: absolute;
      top: 228px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      text-align: center;
      color: #fff;
      opacity: 0;
      transition: all 0.5s;
      z-index: 2;

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }
  }

  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
