<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        href="javascript:;"
        v-for="url in pictures"
        :key="url"
        :class="{ active: currImage === url }"
        @click="currImage = url"
      >
        <img v-lazy="url" alt="">
      </a>
    </div>
    <div class="preview" v-if="currImage">
      <img :src="currImage" alt="">
      <i class="iconfont icon-close-new" @click="currImage = null" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GoodsCommentImage',
  props: {
    pictures: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const currImage = ref(null)

    return {
      currImage
    }
  }
}
</script>

<style lang="less" scoped>
.goods-comment-image {
  .list {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;

    a {
      display: block;
      width: 120px;
      height: 120px;
      margin: 0 20px 10px 0;
      border: 1px solid #e4e4e4;
      transition: all 0.2s ease;

      &.active {
        border-color: @xtxColor;
      }
    }
  }

  .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    position: relative;

    i {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      font-weight: bold;
      vertical-align: middle;
      color: #fff;
    }
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
