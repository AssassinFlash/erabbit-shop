<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <router-link to="/"></router-link>
      </h1>
      <app-header-nav />
      <div class="search">
        <i class="iconfont icon-search"/>
        <input type="text" placeholder="搜索商品">
      </div>
      <!-- 购物车 -->
      <app-header-cart />
    </div>
  </header>
</template>

<script>
import AppHeaderNav from '@/components/app-header-nav'
import AppHeaderCart from './app-header-cart.vue'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderNav,
    AppHeaderCart
  }
}
</script>

<style lang="less" scoped>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;

    .logo {
      width: 200px;

      a {
        display: block;
        height: 132px;
        background: url('../assets/images/logo.png') no-repeat center 18px;
        background-size: contain;
      }
    }

    .search {
      width: 170px;
      height: 32px;
      line-height: 32px;
      position: relative;
      border-bottom: 1px solid #e7e7e7;

      .icon-search {
        font-size: 18px;
        color: #666;
        margin-left: 5px;
      }

      input {
        width: 140px;
        padding-left: 10px;
        color: #666;
      }
    }
  }
}
</style>
