<template>
  <div class="member-home">
    <!-- 个人概览 -->
    <member-home-overview />
    <!-- 收藏 -->
    <home-panel title="我的收藏">
      <goods-item v-for="i in 4" :key="i" :goods="goods" />
    </home-panel>
    <!-- 足迹 -->
    <home-panel title="我的足迹" />
  </div>
</template>

<script>
import MemberHomeOverview from './components/home-overview'
import HomePanel from './components/home-panel'
import GoodsItem from '@/views/goods/components/goods-item'
export default {
  name: 'MemberHome',
  components: { GoodsItem, HomePanel, MemberHomeOverview },
  setup () {
    const goods = {
      id: '1',
      name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
      picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
      desc: '清汤鲜香 红汤劲爽',
      price: '159.00'
    }
    return { goods }
  }
}
</script>

<style scoped>

</style>
