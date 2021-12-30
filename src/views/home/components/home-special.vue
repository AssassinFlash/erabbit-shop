<template>
  <home-panel title="最新专题">
    <template v-slot:right>
      <xtx-more />
    </template>
    <div class="special-list" ref="homeSpecial">
      <template v-if="list.length">
        <div class="special-item" v-for="item in list" :key="item.id">
          <router-link to="/">
            <img :src="item.cover" alt="" />
            <div class="meta">
              <p class="title">
                <span class="top ellipsis">{{ item.title }}</span>
                <span class="sub ellipsis">{{ item.summary }}</span>
              </p>
              <span class="price">&yen;{{ item.lowestPrice }}</span>
            </div>
          </router-link>
          <div class="foot">
            <span class="like">
              <i class="iconfont icon-hart1" />{{ item.collectNum }}
              </span>
            <span class="view">
              <i class="iconfont icon-see" />{{ item.viewNum }}
              </span>
            <span class="reply">
              <i class="iconfont icon-message" />{{ item.replyNum }}
              </span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="skeleton">
          <xtx-skeleton
            v-for="i in 3"
            :key="i"
            class="item"
            height="360px"
            width="404px"
            bg="#e4e4e4"
            animated
          />
        </div>
      </template>
    </div>
  </home-panel>
</template>

<script>
import HomePanel from './home-panel'
import { findSpecial } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeSpecial',
  components: {
    HomePanel
  },
  setup () {
    const { target, result } = useLazyData(findSpecial)

    return {
      homeSpecial: target,
      list: result
    }
  }
}
</script>

<style lang="less" scoped>
.home-panel {
  background: #f5f5f5;
}

.special-list {
  height: 380px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;

  .special-item {
    width: 404px;
    background: #fff;
    .hoverShadow();

    a {
      display: block;
      width: 100%;
      height: 288px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .meta {
        // linear-gradient: 创建一个多种颜色的渐变图片，这里表示从下到上，指定颜色，在高度为50%时转为透明
        background-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8),
          transparent 50%
        );
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 288px;

        .title {
          position: absolute;
          left: 0;
          bottom: 0;
          padding-left: 16px;
          width: 70%;
          height: 70px;

          .top {
            display: block;
            font-size: 22px;
            color: #fff;
          }

          .sub {
            display: block;
            margin-top: 5px;
            font-size: 18px;
            color: #999;
          }
        }

        .price {
          position: absolute;
          right: 16px;
          bottom: 25px;
          line-height: 1;
          padding: 8px;
          border-radius: 2px;
          background: #fff;
          font-size: 17px;
          color: @priceColor;
        }
      }
    }

    .foot {
      height: 72px;
      line-height: 72px;
      padding: 0 20px;
      font-size: 16px;

      i {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        color: #999;
      }

      .like,
      .view {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }

      .reply {
        float: right;
        vertical-align: middle;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
