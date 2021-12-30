<template>
  <div class="home-new">
    <!-- 标题 -->
    <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template v-slot:right>
        <xtx-more/>
      </template>
      <!-- 面板内容 -->
      <div ref="target" style="position: relative;height: 406px">
        <transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link :to="`/product/${item.id}`">
                <img :src="item.picture" alt="">
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </router-link>
            </li>
          </ul>
          <home-skeleton bg="#f0f9f4" v-else/>
        </transition>
      </div>
    </home-panel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findNew } from '@/api/home'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    const {
      target,
      result
    } = useLazyData(findNew)

    return {
      target,
      goods: result
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  height: 406px;
  display: flex;
  justify-content: space-between;

  li {
    width: 306px;
    height: 100%;
    background: #f0f9f4;
    border-radius: 5px;
    overflow: hidden;
    .hoverShadow();

    img {
      width: 100%;
      height: 306px;
    }

    p {
      padding: 12px 30px 0 30px;
      font-size: 22px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
