<template>
  <!-- 商品详情组件 -->
  <div class="goods-detail">
    <!-- 商品属性 -->
    <ul class="attrs">
      <li v-for="property in goods.details.properties" :key="property.name">
        <span class="dt">{{ property.name }}</span>
        <span class="dd">{{ property.value }}</span>
      </li>
    </ul>
    <!-- 商品图片 -->
    <img
      v-for="picture in goods.details.pictures"
      :key="picture"
      v-lazy="picture"
      alt=""
    />
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'GoodsDetail',
  setup () {
    // 后代组件注入goods数据
    const goods = inject('goods')

    return {
      goods
    }
  }
}
</script>

<style lang="less" scoped>
.goods-detail {
  padding: 40px;

  .attrs {
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 50%;
      margin-bottom: 10px;
      display: flex;

      .dt {
        width: 120px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  > img {
    width: 100%;
  }
}
</style>
