<template>
  <div class="home-panel">
    <div class="header">
      <h4>{{ title }}</h4>
      <xtx-more/>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberHomePanel',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home-panel {
  padding: 0 20px;
  margin-top: 20px;
  background: #fff;

  .header {
    height: 66px;
    padding: 18px 0;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      font-size: 22px;
      font-weight: normal;
    }
  }

  .goods-list {
    display: flex;
    align-items: center;
  }
}
</style>
