<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <goods-sku @change="changeSku" :goods="goods" :skuId="skuId" v-else />
      <xtx-button
        v-if="goods"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        @click="submit"
        >确认</xtx-button
      >
    </div>
  </div>
</template>

<script>
import GoodsSku from '@/views/goods/components/goods-sku'
import { getGoodsSku } from '@/api/cart'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
export default {
  name: 'CartSku',
  components: {
    GoodsSku
  },
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const visible = ref(false)
    const loading = ref(false)
    const goods = ref(null)
    // 打开
    const open = () => {
      visible.value = true
      loading.value = true
      // 获取商品数据(specs，sku)
      getGoodsSku(props.skuId).then(({ result }) => {
        goods.value = result
        loading.value = false
      })
    }
    // 关闭
    const close = () => {
      visible.value = false
    }
    // 切换
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击其他地方关闭
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })

    // 监听sku改变派发的change事件，记录新的sku信息
    const currSku = ref(null)
    const changeSku = (sku) => {
      currSku.value = sku
    }

    // 点击确认，提交更改后的sku信息给父组件（购物车组件）
    const submit = () => {
      // 当currSku有值且skuId已经和之前的发生了改变
      if (currSku.value && currSku.value.skuId !== props.skuId) {
        emit('change', currSku.value)
        close()
      }
    }

    return {
      visible,
      toggle,
      target,
      loading,
      goods,
      changeSku,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.cart-sku {
  display: inline-block;
  height: 28px;
  padding: 0 6px;
  margin-top: 10px;
  border: 1px solid #f5f5f5;
  position: relative;

  .attrs {
    display: flex;
    line-height: 24px;

    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }

    i {
      font-size: 14px;
      margin-left: 5px;
      vertical-align: middle;
    }
  }

  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    width: 400px;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    font-size: 14px;
    z-index: 10;

    &::before {
      content: "";
      position: absolute;
      left: 12px;
      top: -8px;
      width: 12px;
      height: 12px;
      background: #fff;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      transform: rotate(45deg);
    }

    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
