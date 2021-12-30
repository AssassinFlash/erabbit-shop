<template>
  <!-- 顶部导航栏 -->
  <app-topnav/>
  <!-- 吸附头部组件 -->
  <app-header-sticky />
  <!-- 头部 -->
  <app-header/>
  <!-- 内容，二级路由 -->
  <main class="app-body">
    <router-view/>
  </main>
  <!-- 尾部 -->
  <app-footer/>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppHeaderSticky from '@/components/app-header-sticky'
import AppFooter from '@/components/app-footer'
import { useStore } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader,
    AppHeaderSticky,
    AppFooter
  },
  setup () {
    const store = useStore()
    // 获取分类导航
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
