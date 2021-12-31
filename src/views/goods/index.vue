<template>
  <!-- 商品详情页 -->
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item v-if="goods"
                        :to="`/category/${goods.categories[1].id}`">
          {{ goods.categories[1].name }}
        </xtx-bread-item>
        <div v-else>
          <xtx-skeleton width="30px" height="20px" animated
                        bg="#e4e4e4"></xtx-skeleton>
        </div>
        <xtx-bread-item v-if="goods"
                        :to="`/category/sub/${goods.categories[0].id}`">
          {{ goods.categories[0].name }}
        </xtx-bread-item>
        <div v-else>
          <xtx-skeleton width="30px" height="20px" animated
                        bg="#e4e4e4"></xtx-skeleton>
        </div>
        <xtx-bread-item v-if="goods">{{ goods.name }}</xtx-bread-item>
        <div v-else>
          <xtx-skeleton width="30px" height="20px" animated
                        bg="#e4e4e4"></xtx-skeleton>
        </div>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 图片预览 -->
        <div class="media" v-if="goods">
          <goods-image :images="goods.mainPictures"/>
        </div>
        <!-- 商品描述 -->
        <div class="spec"></div>
      </div>
      <!-- 商品推荐 -->
      <goods-relevant/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24小时热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from '@/views/goods/components/goods-image'
import { findGoods } from '@/api/product'
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsImage,
    GoodsRelevant
  },
  setup () {
    // 1.获取商品详情，进行渲染
    const goods = useGoods()
    return {
      goods
    }
  }

}
// 获取商品详情
// 出现路由ID发生变化，但由于路由规则没变，动态路由不会重新创建组件
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 目的是让v-if判断的组件销毁，重新创建组件
        // 先让组件销毁，然后再赋值，这要经过一段时间
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;

    .goods-tabs {
      min-height: 600px;
      background: #fff;
    }

    .goods-warn {
      min-height: 600px;
      background: #fff;
      margin-top: 20px;
    }
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>
