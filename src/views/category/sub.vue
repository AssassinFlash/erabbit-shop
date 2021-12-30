<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread />
      <!-- 筛选区 -->
      <sub-filter />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <sub-sort />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  margin-top: 25px;
  padding: 0 25px;
  background: #fff;
}
</style>
