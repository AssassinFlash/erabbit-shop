<template>
  <div class="page-home">
    <!-- 首页入口：分类+轮播图 -->
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <home-category/>
        <!-- 轮播图 -->
        <home-banner/>
      </div>
    </div>
    <!-- 新鲜好物面板 -->
    <home-new/>
    <!-- 人气推荐 -->
    <home-hot/>
    <!-- 热门品牌 -->
    <home-brand/>
    <!-- 商品区块 -->
    <home-product/>
    <!-- 最新专题 -->
    <home-special />
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special'

export default {
  name: 'PageHome',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>

<style lang="less" scoped>

</style>
