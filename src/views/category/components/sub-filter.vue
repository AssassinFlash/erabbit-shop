<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <!-- 品牌 -->
    <div class="item">
      <div class="head">品牌</div>
      <div class="body">
        <a
          class="ellipsis"
          href="javascript:;"
          v-for="brand in filterData.brands"
          :key="brand.id"
          :class="{ active: filterData.selectedBrand === brand.id }"
          @click="filterData.selectedBrand = brand.id"
        >
          {{ brand.name }}
        </a>
      </div>
    </div>
    <!-- 销售属性 -->
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a
          class="ellipsis"
          href="javascript:;"
          v-for="attr in item.properties"
          :key="attr.id"
          :class="{ active: item.selectedProp === attr.id }"
          @click="item.selectedProp = attr.id"
        >
          {{ attr.name }}
        </a>
      </div>
    </div>
  </div>
  <div class="sub-filter" v-else>
    <xtx-skeleton width="800px" height="55px" animated bg="#e4e4e4" />
    <xtx-skeleton
      v-for="i in 4"
      :key="i"
      width="600px"
      height="55px"
      bg="#e4e4e4"
    />
  </div>
</template>

<script>
import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup () {
    // 1.监听路由二级类目ID的变化获取筛选数据，与一级类目类似，切换一级类目时也会有ID变化
    // 2.给每个筛选条件前添加 全部 条件
    // 3.数据被点击后保持选中状态，默认选中 全部，给每一组数据加上一个选中的ID
    const route = useRoute()
    const filterData = ref(null)
    // 筛选条件通常会比较多，因此设置骨架屏效果
    const filterLoading = ref(false)
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          filterLoading.value = true
          findSubCategoryFilter(newVal).then(({ result }) => {
            // 品牌
            result.selectedBrand = null
            result.brands.unshift({ id: null, name: '全部' })
            // 销售属性
            result.saleProperties.forEach((p) => {
              p.selectedProp = null
              p.properties.unshift({ id: null, name: '全部' })
            })
            filterData.value = result
            filterLoading.value = false
          })
        }
      },
      { immediate: true }
    )

    return {
      filterData,
      filterLoading
    }
  }
}
</script>

<style lang="less" scoped>
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    line-height: 40px;
    display: flex;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 20px;
        display: inline-block;
        padding: 0 7px;
        max-width: 112px;
        border-radius: 10px;
        transition: all 0.3s ease;

        &.active,
        &:hover {
          background: @xtxColor;
          color: #fff;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>
