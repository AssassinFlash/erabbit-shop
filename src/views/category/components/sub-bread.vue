<template>
  <xtx-bread>
    <xtx-bread-item to="/">首页</xtx-bread-item>
    <xtx-bread-item v-if="category.top" :to="`/category/${category.top.id}`">
      {{ category.top.name }}
    </xtx-bread-item>
    <div v-else>
      <xtx-skeleton width="30px" height="20px" animated bg="#e4e4e4"/>
    </div>
    <transition name="fade-right" v-if="category.sub">
      <xtx-bread-item :key="category.sub.id">
        {{ category.sub.name }}
      </xtx-bread-item>
    </transition>
    <div v-else>
      <xtx-skeleton width="30px" height="20px" animated bg="#e4e4e4"/>
    </div>
  </xtx-bread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup () {
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      const obj = {}
      store.state.category.list.forEach((top) => {
        top.children &&
          top.children.forEach((sub) => {
            // 找到二级类目，设置一级和二级类目
            if (sub.id === route.params.id) {
              obj.top = { id: top.id, name: top.name }
              obj.sub = { id: sub.id, name: sub.name }
            }
          })
      })
      return obj
    })

    return {
      category
    }
  }
}
</script>

<style lang="less" scoped>
</style>
