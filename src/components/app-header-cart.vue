<template>
  <!-- 购物车组件 -->
  <div class="cart">
    <!-- 购物车图标 -->
    <router-link to="/cart" class="curr">
      <i class="iconfont icon-cart"></i>
      <em>{{ goodsTotal }}</em>
    </router-link>
    <!-- 购物车弹层 -->
    <div class="layer" v-if="goodsList.length && $route.path!=='/cart'">
      <div class="list">
        <div
          class="item" v-for="goods in goodsList"
          :key="goods.skuId"
        >
          <router-link :to="{ name: 'Product', params: { id: goods.id, skuId: goods.skuId } }">
            <img v-lazy="goods.picture" alt=""/>
            <div class="center">
              <p class="name ellipsis-2">
                {{ goods.name }}
              </p>
              <p class="attr ellipsis">{{ goods.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{ goods.nowPrice }}</p>
              <p class="count">{{ goods.count }}</p>
            </div>
          </router-link>
          <i class="iconfont icon-close-new" @click="deleteCart(goods)"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共{{ goodsTotal }}件商品</p>
          <p>&yen;{{ goodsAmount }}</p>
        </div>
        <xtx-button type="plain" @click="$router.push('/cart')">去购物车结算</xtx-button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'AppHeaderCart',
  // 购物车数据
  setup () {
    const store = useStore()
    // 商品列表
    const goodsList = computed(() => {
      return store.getters['cart/validList'].map(goods => {
        return {
          // 标志位，控制删除icon的显示
          showIcon: false,
          ...goods
        }
      })
    })
    // 商品总件数
    const goodsTotal = computed(() => {
      return store.getters['cart/validTotal']
    })
    // 商品总金额
    const goodsAmount = computed(() => {
      return store.getters['cart/validAmount']
    })

    // 初始化组件时更新购物车列表信息
    store.dispatch('cart/findCartList')

    // 删除购物车商品
    const deleteCart = (goods) => {
      store.dispatch('cart/deleteCart', goods.skuId)
    }

    return {
      goodsList,
      goodsTotal,
      goodsAmount,
      deleteCart
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 50px;
  position: relative;
  z-index: 600;

  .curr {
    display: block;
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;

    .icon-cart {
      font-size: 22px;
    }

    em {
      position: absolute;
      top: 0;
      right: 0;
      line-height: 1;
      padding: 1px 6px;
      background: @helpColor;
      border-radius: 10px;
      font-style: normal;
      font-family: Arial;
      font-size: 12px;
      color: #fff;
    }
  }

  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  .layer {
    position: absolute;
    top: 50px;
    right: 0;
    width: 400px;
    height: 400px;
    padding-top: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    opacity: 0;
    transform: translateY(-200px) scale(1, 0);
    transition: all 0.3s ease;

    &:before {
      content: "";
      position: absolute;
      right: 14px;
      top: -20px;
      border: 10px solid transparent;
      border-bottom-color: #fff;
    }

    .list {
      height: 310px;
      overflow: auto;
      padding: 0 10px;

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f8f8f8;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: #eee;
        border-radius: 10px;
        transition: all 0.2s ease;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #ccc;
      }

      .item {
        padding: 10px 0;
        border-bottom: 1px solid #f5f5f5;
        position: relative;

        a {
          display: flex;
          align-items: center;

          img {
            width: 80px;
            height: 80px;
          }

          .center {
            width: 200px;
            padding: 0 10px;

            .name {
              font-size: 16px;
            }

            .attr {
              padding-top: 5px;
              color: #999;
            }
          }

          .right {
            width: 100px;
            padding-right: 20px;
            text-align: center;

            .price {
              font-size: 16px;
              color: @priceColor;
            }

            .count {
              margin-top: 5px;
              font-size: 16px;
              color: #999;
            }
          }
        }
      }

      i {
        position: absolute;
        bottom: 38px;
        right: 0;
        color: #666;
        transition: all 0.2s ease;
        opacity: 0;
      }

      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }
    }

    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 70px;
      padding: 10px;
      background: #f8f8f8;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: @priceColor;
          }
        }
      }
    }
  }
}
</style>
