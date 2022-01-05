<template>
  <div class="goods-carousel">
    <div class="carousel-container">
      <ul
        class="sliders"
        v-for="(slider, i) in sliders"
        :key="i"
        :class="{ fade: currIndex === i }"
        @mouseenter="stop"
        @mouseleave="start"
      >
        <li v-for="item in slider" :key="item.id">
          <router-link :to="`/product/${item.id}`">
            <img v-lazy="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </router-link>
        </li>
      </ul>
      <!-- 箭头 -->
      <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)">
        <i class="iconfont icon-angle-left" />
      </a>
      <a href="javascript:;" class="carousel-btn next" @click="toggle(1)">
        <i class="iconfont icon-angle-right" />
      </a>
      <!-- 指示器 -->
      <div class="indicator">
        <span
          v-for="(item,i) in sliders"
          :key="item.id"
          :class="{ active: currIndex === i }"
          @mouseenter="currIndex=i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsCarousel',
  props: {
    sliders: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 当前显示页索引
    const currIndex = ref(0)

    // 更改显示页
    const toggle = (step) => {
      let newVal = currIndex.value + step
      if (newVal < 0) {
        newVal = props.sliders.length - 1
      }
      if (newVal >= props.sliders.length) {
        newVal = 0
      }
      currIndex.value = newVal
    }

    // 自动轮播的逻辑：定时器
    // 自动轮播的条件：监听sliders数据的变化，判断有数据且autoPlay为true
    let timer = null
    const autoPlayFn = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        currIndex.value++
        if (currIndex.value >= props.sliders.length) {
          currIndex.value = 0
        }
      }, props.duration)
    }

    if (props.autoPlay) {
      autoPlayFn()
    }

    const start = () => {
      autoPlayFn()
    }
    const stop = () => {
      clearInterval(timer)
    }

    return {
      currIndex,
      toggle,
      start,
      stop
    }
  }
}
</script>

<style lang="less" scoped>
.goods-carousel {
  width: 1240px;
  height: 380px;

  .carousel-container {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    .sliders {
      width: 100%;
      height: 100%;
      padding: 0 40px;
      display: flex;
      justify-content: space-around;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: all 0.5s ease;

      &.fade {
        opacity: 1;
      }

      li {
        width: 240px;

        a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 240px;

          img {
            width: 230px;
            height: 230px;
            margin: 0 auto;
          }

          .name {
            margin-top: 15px;
            padding: 0 40px;
            font-size: 16px;
            color: #666;
          }

          .price {
            margin-top: 15px;
            text-align: center;
            font-size: 16px;
            color: @priceColor;
          }
        }
      }
    }

    .carousel-btn {
      position: absolute;
      top: 40%;
      transform: translateY(-50%);

      &.next {
        right: 15px;
      }

      &.prev {
        left: 15px;
      }

      .iconfont {
        font-size: 24px;
        color: #999;
      }
    }

    .indicator {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: center;

      span {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 12px;
        border-radius: 50%;
        background: #ccc;
      }
    }
  }
}

.active {
  background: @xtxColor !important;
}
</style>
