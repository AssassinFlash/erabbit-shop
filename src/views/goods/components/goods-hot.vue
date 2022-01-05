<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <goods-item v-for="goods in goodsList" :key="goods.id" :goods="goods" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { findHotGoods } from '@/api/product'
import goodsItem from './goods-item.vue'
export default {
  name: 'GoodsHot',
  components: {
    goodsItem
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // 处理标题
    const titleObj = {
      1: '24小时热销榜',
      2: '周热销榜',
      3: '总热销榜'
    }
    const title = computed(() => {
      return titleObj[props.type]
    })

    // 商品列表
    const goodsList = ref([])
    findHotGoods({ id: props.goodsId, type: props.type, limit: 3 }).then(
      ({ result }) => {
        goodsList.value = result
      }
    )

    return {
      title,
      goodsList
    }
  }
}
</script>

<style lang="less" scoped>
.goods-hot {
  h3 {
    height: 70px;
    line-height: 70px;
    padding-left: 25px;
    background: @helpColor;
    font-size: 18px;
    font-weight: normal;
    color: #fff;
  }
}
</style>
