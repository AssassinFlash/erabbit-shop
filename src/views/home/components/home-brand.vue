<template>
  <home-panel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        :class="{disabled :index === 0}"
        @click="toggle(-1)"
      />
      <a
        href="javascript:;"
        class="iconfont icon-angle-right next"
        :class="{disabled : index === 1}"
        @click="toggle(1)"
      />
    </template>
    <div ref="target" class="box">
      <transition name="fade">
        <ul
          v-if="brands.length"
          class="list"
          :style="{transform : `translateX(${-index*1240}px)`}"
        >
          <li v-for="item in brands" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="">
            </router-link>
          </li>
        </ul>
        <div v-else class="skeleton">
          <xtx-skeleton
            class="item"
            v-for="i in 5"
            :key="i"
            bg="#e4e4e4"
            width="240px"
            height="305px"
            animated
          />
        </div>
      </transition>
    </div>
  </home-panel>
</template>

<script>
import HomePanel from './home-panel'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hooks'
import { ref } from 'vue'

export default {
  name: 'HomeBrand',
  components: {
    HomePanel
  },
  setup () {
    // useLazyData 需要的是api函数，如果该函数需要传参
    // 就需要写一个函数，然后在函数中调用api
    const {
      target,
      result
    } = useLazyData(() => findBrand(10))

    // 默认索引，用于切换
    const index = ref(0)
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) {
        return
      }
      index.value = newIndex
    }

    return {
      target,
      brands: result,
      index,
      toggle
    }
  }
}
</script>

<style lang="less" scoped>
.home-panel {
  background: #f5f5f5
}

.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;

  &:before {
    font-size: 12px;
    position: relative;
    top: -2px
  }

  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.box {
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;

  .list {
    width: 200%;
    display: flex;
    transition: all 0.5s ease;

    li {
      margin-right: 10px;
      width: 240px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}

.skeleton {
  width: 100%;
  display: flex;

  .item {
    margin-right: 10px;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
