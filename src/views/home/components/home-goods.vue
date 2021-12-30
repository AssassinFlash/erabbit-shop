<template>
  <!-- 展示单个商品的组件 -->
  <template v-if="goods.id">
    <div class="goods-item">
      <router-link :to="`/product/${goods.id}`" class="image">
        <img v-lazy="goods.picture" alt="">
      </router-link>
      <p class="name ellipsis-2">{{ goods.name }}</p>
      <p class="desc ellipsis">{{ goods.desc }}</p>
      <p class="price">&yen;{{ goods.price }}</p>
      <div class="extra">
        <router-link to="/">
          <span>找相似</span>
          <span>发现更多宝贝 &gt;</span>
        </router-link>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="goods-item">
      <router-link to="/" class="image">
        <img
          src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/fresh_goods_1.jpg"
          alt="">
      </router-link>
      <p class="name ellipsis-2">美威 智利原味三文鱼排 240g/袋 4片装</p>
      <p class="desc">海鲜年货</p>
      <p class="price">&yen;108.00</p>
      <div class="extra">
        <router-link to="/">
          <span>找相似</span>
          <span>发现更多宝贝 &gt;</span>
        </router-link>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  name: 'HomeGoods',
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
  width: 240px;
  height: 300px;
  padding: 10px 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  transition: all 0.5s ease;

  .image {
    display: block;
    width: 100%;
    height: 160px;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    margin-top: 6px;
    font-size: 16px;

    &.name {
      height: 44px;
    }

    &.desc {
      height: 22px;
      margin-top: 10px;
      color: #666;
    }

    &.price {
      margin-top: 10px;
      font-size: 20px;
      color: @priceColor;
    }
  }

  .extra {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 86px;
    width: 100%;
    background: @xtxColor;
    text-align: center;
    transform: translateY(100%);
    transition: all .5s ease;

    span {
      display: block;
      width: 120px;
      line-height: 30px;
      margin: 0 auto;
      color: #fff;

      &:first-child {
        margin-top: 5px;
        line-height: 40px;
        border-bottom: 1px solid #fff;
        font-size: 18px;
      }
    }
  }

  &:hover {
    border-color: @xtxColor;

    .extra {
      transform: none;
    }
  }
}
</style>
