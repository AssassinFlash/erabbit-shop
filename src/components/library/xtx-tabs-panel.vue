<template>
  <div v-show="$props.name===activeName" class="xtx-tabs-panel">
    <slot></slot>
  </div>
</template>
<script>
import { inject } from 'vue'

export default {
  name: 'XtxTabsPanel',
  // label 选项卡文字，name 选项卡唯一标识
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  },
  setup () {
    const activeName = inject('activeName')

    return {
      activeName
    }
  }
}
</script>

<style scoped>

</style>
