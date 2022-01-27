<template>
  <div class="container">
    <app-member-aside />
    <article class="article">
      <!-- Member路由的子路由的出口 -->
      <router-view></router-view>
    </article>
  </div>
</template>

<script>
import AppMemberAside from '@/components/app-member-aside'
export default {
  name: 'MemberLayout',
  components: {
    AppMemberAside
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>
