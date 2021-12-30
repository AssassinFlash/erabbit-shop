<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread/>
      <!-- 筛选区 -->
      <sub-filter @filter-change="changeFilter"/>
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <sub-sort @sort-change="changeSort"/>
        <!-- 商品列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <goods-item :goods="goods"/>
          </li>
        </ul>
        <!-- 加载数组 loading -->
        <xtx-infinite-loading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const route = useRoute()
    const loading = ref(false) // 数据加载中
    const finished = ref(false) // 数据全部加载完
    const goodsList = ref([]) // 商品列表数据
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    // 侦听加载组件派发的infinite事件以执行更新数据逻辑
    // 有数据就追加数据，并更新页码，没有数据就代表加载完成
    const getData = () => {
      loading.value = true
      // 设置二级分类的ID
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }
    // 更改了二级分类的时候需要清空goodsList
    // 同样，需要判断是不是二级分类转到一级分类，
    // 原因是同样传ID，路由规则没有完全变化，动态路由不会重新创建组件
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    }, { immediate: true })

    // 被排序组件通知排序属性发生变化，重新请求商品
    const changeSort = (sortParams) => {
      finished.value = false
      // 请求参数把排序属性合并，保留其他的请求参数，比如筛选属性等
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }

    // 被筛选组件通知筛选属性发生变化，重新请求商品
    const changeFilter = (filterParams) => {
      finished.value = false
      // 请求参数把筛选属性合并，保留其他的请求参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }

    return {
      loading,
      finished,
      goodsList,
      getData,
      changeSort,
      changeFilter
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  margin-top: 25px;
  padding: 0 25px;
  background: #fff;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
