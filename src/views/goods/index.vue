<template>
  <!-- 商品详情页 -->
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item
          v-if="goods"
          :to="`/category/${goods.categories[1].id}`"
        >
          {{ goods.categories[1].name }}
        </xtx-bread-item>
        <div v-else>
          <xtx-skeleton
            width="30px"
            height="20px"
            animated
            bg="#e4e4e4"
          ></xtx-skeleton>
        </div>
        <xtx-bread-item
          v-if="goods"
          :to="`/category/sub/${goods.categories[0].id}`"
        >
          {{ goods.categories[0].name }}
        </xtx-bread-item>
        <div v-else>
          <xtx-skeleton
            width="30px"
            height="20px"
            animated
            bg="#e4e4e4"
          ></xtx-skeleton>
        </div>
        <xtx-bread-item v-if="goods">{{ goods.name }}</xtx-bread-item>
        <div v-else>
          <xtx-skeleton
            width="30px"
            height="20px"
            animated
            bg="#e4e4e4"
          ></xtx-skeleton>
        </div>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 图片预览 -->
        <div class="media" v-if="goods">
          <goods-image :images="goods.mainPictures" />
          <goods-sales />
        </div>
        <!-- 商品描述 -->
        <div class="spec" v-if="goods">
          <!-- 商品名字 -->
          <goods-name :goods="goods" />
          <!-- 商品可选属性 -->
          <!-- skuId="1369155864430120962" 测试选中 -->
          <goods-sku :goods="goods" @change="changeSku" />
          <!-- 商品选择数量 -->
          <xtx-numbox
            label="数量"
            v-model="num"
            :max="goods.inventory"
            style="margin-top: 5px"
          />
          <!-- 加入购物车按钮 -->
          <xtx-button
            type="primary"
            style="margin-top: 20px; margin-left: 10px"
          >
            加入购物车
          </xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <goods-relevant v-if="goods" :goodsId="goods.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer" v-if="goods">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <goods-tabs />
          <!-- 注意事项 -->
          <goods-warn />
        </div>
        <!-- 24小时热榜+专题推荐 -->
        <div class="goods-aside" v-if="goods">
          <goods-hot :goodsId="goods.id" :type="1" style="margin-bottom:20px"/>
          <goods-hot :goodsId="goods.id" :type="2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsTabs from './components/goods-tabs'
import GoodsHot from './components/goods-hot'
import GoodsWarn from './components/goods-warn'
import { findGoods } from '@/api/product'
import { ref, watch, nextTick, provide } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsImage,
    GoodsRelevant,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
  setup () {
    // 获取商品详情，进行渲染
    const goods = useGoods()
    // 商品选择的数量
    const num = ref(1)

    // 侦听sku组件派发的change事件，拿到传来的sku，更新现有商品的信息
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }

    // 提供goods数据给后代组件使用
    provide('goods', goods)

    return {
      goods,
      changeSku,
      num
    }
  }
}
// 获取商品详情
// 出现路由ID发生变化，但由于路由规则没变，动态路由不会重新创建组件
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          // 目的是让v-if判断的组件销毁，重新创建组件
          // 先让组件销毁，然后再赋值，这要经过一段时间
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
    },
    { immediate: true }
  )
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
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>
