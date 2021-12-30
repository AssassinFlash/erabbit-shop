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
      <div class="cart">
        <a href="#" class="curr">
          <i class="iconfont icon-cart"/>
          <em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import AppHeaderNav from '@/components/app-header-nav'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderNav
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

    .cart {
      width: 50px;

      .curr {
        display: block;
        height: 32px;
        line-height: 32px;
        text-align: center;
        position: relative;

        .icon-cart {
          font-size: 22px;
        }

        em {
          font-style: normal;
          position: absolute;
          top: 0;
          right: 0;
          padding: 1px 6px;
          line-height: 1;
          background: @helpColor;
          color: #fff;
          font-size: 12px;
          border-radius: 8px;
          font-family: Arial;
        }
      }
    }
  }
}
</style>
