<template>
  <!-- 标签页 -->
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        :class="{ active: activeName === 'GoodsDetail' }"
        @click="activeName = 'GoodsDetail'"
      >
        商品详情
      </a>
      <a
        href="javascript:;"
        :class="{ active: activeName === 'GoodsComment' }"
        @click="activeName = 'GoodsComment'"
      >
        商品评价<span>({{ goods.commentCount }})</span>
      </a>
    </nav>
    <!-- 切换内容，动态组件 -->
    <!-- is属性用来决定component动态组件渲染为哪个组件，赋值为组件的名称即可 -->
    <component :is="activeName"></component>
  </div>
</template>

<script>
// GoodsDetail --> 商品详情组件，GoodsComment --> 商品评论组件
import GoodsDetail from './goods-detail'
import GoodsComment from './goods-comment'
import { ref, inject } from 'vue'
export default {
  name: 'GoodsTabs',
  components: {
    GoodsDetail,
    GoodsComment
  },
  setup () {
    const activeName = ref('GoodsDetail')
    const goods = inject('goods')

    return {
      activeName,
      goods
    }
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        margin-left: 10px;
        font-size: 16px;
        color: @priceColor;
      }

      &:first-child {
        border-right: 1px solid #f5f5f5;
      }

      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
