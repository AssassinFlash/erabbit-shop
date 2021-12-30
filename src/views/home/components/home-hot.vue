<template>
  <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative;height: 426px">
      <transition name="fade">
        <ul v-if="goods.length" ref="panel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="">
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </router-link>
          </li>
        </ul>
        <home-skeleton v-else/>
      </transition>
    </div>
  </home-panel>
</template>

<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks'

export default {
  name: 'home-hot',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    const {
      target,
      result
    } = useLazyData(findHot)

    return {
      goods: result,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  height: 426px;
  display: flex;
  justify-content: space-between;

  li {
    width: 306px;
    height: 406px;
    overflow: hidden;
    border-radius: 5px;
    .hoverShadow();

    img {
      width: 100%;
      height: 306px;
    }

    p {
      padding-top: 12px;
      font-size: 22px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
