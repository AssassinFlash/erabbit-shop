<template>
  <header class="login-header">
    <div class="container">
      <div class="logo">
        <router-link to="/"></router-link>
      </div>
      <h3 class="sub">
        <slot/>
      </h3>
      <router-link to="/" class="entry">
        进入网站首页
        <i class="iconfont icon-angle-right"/>
        <i class="iconfont icon-angle-right"/>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'login-header'
}
</script>

<style lang="less" scoped>
.login-header {
  border-bottom: 1px solid #e4e4e4;
  background: #fff;

  .container {
    display: flex;
    align-items: center;

    .logo {
      a {
        display: inline-block;
        width: 200px;
        height: 132px;
        background: url(../../../assets/images/logo.png) no-repeat center;
        background-size: contain;
      }
    }

    .sub {
      flex: 1;
      line-height: 132px;
      margin-left: 20px;
      font-size: 28px;
      font-weight: normal;
      color: #666;
    }

    .entry {
      display: inline-block;
      font-size: 20px;

      i {
        vertical-align: middle;
        color: @xtxColor;
        font-weight: bold;
      }
    }
  }
}
</style>
