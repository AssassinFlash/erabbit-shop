<template>
  <!-- 商品详情页 -->
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item>首页</xtx-bread-item>
        <xtx-bread-item>手机</xtx-bread-item>
        <xtx-bread-item>华为</xtx-bread-item>
        <xtx-bread-item>p30</xtx-bread-item>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品推荐 -->
      <goods-relevant/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24小时热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'

export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant
  }

}
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;

    .goods-tabs {
      min-height: 600px;
      background: #fff;
    }

    .goods-warn {
      min-height: 600px;
      background: #fff;
      margin-top: 20px;
    }
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>
