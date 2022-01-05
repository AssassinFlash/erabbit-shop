<template>
  <!-- 单个商品组件 -->
  <router-link :to="`/product/${goods.id}`" class="goods-item">
    <img v-lazy="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  display: block;
  width: 100%;
  padding: 20px 30px;
  margin-bottom: 10px;
  background: #fff;
  text-align: center;

  img {
    width: 200px;
    height: 200px;
    vertical-align: middle;
  }

  p {
    margin: 0 10px;
    padding-top: 10px;

    &.name {
      font-size: 16px;
    }

    &.desc {
      line-height: 29px;
      color: #666;
    }

    &.price {
      font-size: 20px;
      color: @priceColor;
    }
  }
}
</style>
