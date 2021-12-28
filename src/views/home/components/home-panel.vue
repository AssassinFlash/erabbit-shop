<template>
  <!-- 面板组件 -->
  <div class="home-panel">
    <div class="container">
      <!-- 标题 -->
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
        <!-- 查看更多插槽 -->
        <slot name="right"/>
      </div>
      <!-- 内容 -->
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePanel',
  props: {
    // 面板标题
    title: {
      type: String,
      default: ''
    },
    // 面板副标题
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home-panel {
  background: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: center;

    h3 {
      flex: 1;
      height: 35px;
      line-height: 35px;
      margin-left: 5px;
      font-size: 32px;
      font-weight: normal;

      small {
        margin-left: 20px;
        font-size: 16px;
        color: #999;
        vertical-align: middle;
      }
    }
  }
}
</style>
