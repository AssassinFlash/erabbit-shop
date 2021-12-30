<template>
  <div class="home-product" ref="target">
    <home-panel
      v-for="cate in list"
      :key="cate.id"
      :title="cate.name"
    >
      <template v-slot:right>
        <div class="sub">
          <router-link
            v-for="sub in cate.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
          >
            {{ sub.name }}
          </router-link>
        </div>
        <xtx-more/>
      </template>
      <div class="box">
        <router-link :to="`/category/${cate.id}`" class="cover">
          <img v-lazy="cate.picture" alt="">
          <strong class="label">
            <span>{{ cate.name }}</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </router-link>
        <ul class="goods-list">
          <template v-if="cate.goods.length">
            <li v-for="item in cate.goods" :key="item.id">
              <home-goods :goods="item"/>
            </li>
          </template>
          <template v-else>
            <li v-for="i in 8" :key="i">
              <home-goods/>
            </li>
          </template>
        </ul>
      </div>
    </home-panel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { findGoods } from '@/api/home'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeProduct',
  components: {
    HomePanel,
    HomeGoods
  },
  setup () {
    const {
      target,
      result
    } = useLazyData(findGoods)
    console.log(result)

    return {
      target,
      list: result
    }
  }
}
</script>

<style lang="less" scoped>
.home-product {
  background: #fff;
  height: 2900px;

  .sub {
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: @xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .label {
        width: 188px;
        height: 66px;
        line-height: 66px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 18px;
        font-weight: normal;
        color: #fff;
        display: flex;

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-child(-n+4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
