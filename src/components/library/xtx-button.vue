<template>
  <!-- 通用按钮组件，有大中小超小4个尺寸，有默认、主要、次要、灰色4中类型 -->
  <button class="xtx-button ellipsis" :class="[size,type]">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'XtxButton',
  props: {
    size: {
      type: String,
      default: 'middle'
    },
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-button {
  // 这三个去除 button 的所有默认样式
  appearance: none;
  border: none;
  outline: none;
  border: 1px solid transparent;
  background: #fff;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}

.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}

.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}

.small {
  width: 100px;
  height: 32px;
  font-size: 14px;
}

.mini {
  width: 60px;
  height: 32px;
  font-size: 14px;
}

.default {
  border-color: #e4e4e4;
  color: #666;
}

.primary {
  border-color: @xtxColor;
  background: @xtxColor;
  color: #fff;
}

.plain {
  border-color: @xtxColor;
  color: @xtxColor;
  background: lighten(@xtxColor,50%);
}

.gray {
  border-color: #ccc;
  background: #ccc;
  color: #fff;
}
</style>
