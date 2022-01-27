<template>
  <div class="member-order">
    订单查询
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel label="选项卡1" name="name1">内容1</XtxTabsPanel>
      <XtxTabsPanel v-for="i in 4" :label="`选项卡${i+1}`" :key="i" :name="`name${i+1}`">内容{{ i + 1 }}</XtxTabsPanel>
    </XtxTabs>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'MemberOrder',
  setup () {
    const activeName = ref('name2')
    const changeTab = (tab) => {
      console.log(tab)
    }

    return {
      activeName,
      changeTab
    }
  }
}
</script>

<style lang="less" scoped>

</style>
