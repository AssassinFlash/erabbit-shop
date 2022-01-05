<template>
  <!-- 同类商品推荐|猜你喜欢组件 -->
  <div class="goods-relevant">
    <h2 class="header">同类商品推荐</h2>
    <!-- 轮播图 -->
    <goods-carousel :sliders="sliders" autoPlay/>
  </div>
</template>

<script>
// 最终需要的数据是 sliders 提供给轮播图使用
// slider = [[4个商品],[4个商品]...]，也就是每一页有4个商品展示
import GoodsCarousel from './goods-carousel'
import { ref } from 'vue'
import { findRelevantGoods } from '@/api/product'

const useRelGoods = (id) => {
  const sliders = ref([])
  findRelevantGoods(id).then(({ result }) => {
    let tempArr = []
    let i = 0
    for (const item of result) {
      tempArr.push(item)
      i++
      if (i % 4 === 0) {
        sliders.value.push(tempArr)
        tempArr = []
      }
    }
  })
  return sliders
}
export default {
  name: 'GoodsRelevant',
  components: {
    GoodsCarousel
  },
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const sliders = useRelGoods(props.goodsId)
    return {
      sliders
    }
  }
}
</script>

<style lang="less" scoped>
.goods-relevant {
  min-height: 460px;
  margin-top: 20px;
  background: #fff;

  .header {
    line-height: 80px;
    padding-left: 20px;
    font-size: 24px;
    font-weight: 400;
    color: #666;
  }
}
</style>
