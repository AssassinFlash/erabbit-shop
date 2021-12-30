<template>
  <!-- 查看更多组件 -->
  <router-link :to="path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"/>
  </router-link>
</template>

<script>
export default {
  name: 'XtxMore',
  props: {
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-more {

  span, i {
    transition: all .3s ease;
  }

  span {
    margin-right: 4px;
    font-size: 14px;
    vertical-align: middle;
    color: #999;
  }

  i {
    vertical-align: middle;
    font-size: 12px;
    color: #ccc;
  }

  &:hover {
    span, i {
      color: @xtxColor;
    }
  }
}
</style>
