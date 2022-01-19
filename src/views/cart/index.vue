<template>
  <div class="xtx-cart-page">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item>
          <router-link to="/">首页</router-link>
        </xtx-bread-item>
        <xtx-bread-item>购物车</xtx-bread-item>
      </xtx-bread>
      <div class="cart">
        <table>
          <!-- 表头 -->
          <thead>
          <!-- 行 -->
          <tr>
            <!-- 列 -->
            <th width="120">
              <xtx-checkbox :modelValue="$store.getters['cart/isCheckAll']" @change="checkAll">全选</xtx-checkbox>
            </th>
            <th width="400">商品数量</th>
            <th width="220">单价</th>
            <th width="180">数量</th>
            <th width="180">小计</th>
            <th width="140">操作</th>
          </tr>
          </thead>
          <!-- 表格内容 -->
          <tbody>
          <tr v-if="$store.state.cart.list.length===0">
            <td colspan="6">
              <cart-none/>
            </td>
          </tr>
          <template v-else>
            <tr v-for="goods in $store.getters['cart/validList']" :key="goods.skuId">
              <td>
                <!-- 箭头函数返回的方式调用，将默认参数传进来，既能拿到默认参数，也能传参 -->
                <xtx-checkbox :modelValue="goods.selected" @change="$event=>checkOne(goods.skuId,$event)"/>
              </td>
              <td>
                <div class="goods">
                  <router-link :to="`/product/${goods.id}`">
                    <img v-lazy="goods.picture" alt="">
                  </router-link>
                  <!-- 商品信息 -->
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <div class="cart-sku">{{ goods.attrsText }}</div>
                  </div>
                </div>
              </td>
              <!-- 价格 -->
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
                <p v-if="goods.nowPrice - goods.price > 0">比加入时降价<span class="red">&yen;{{
                    goods.nowPrice - goods.price
                  }}</span></p>
              </td>
              <!-- 数量 -->
              <td class="tc">
                <xtx-numbox :modelValue="goods.count"/>
              </td>
              <!-- 小计 -->
              <td class="tc">
                <p class="f16 red">&yen;{{ (goods.nowPrice * goods.count).toFixed(2) }}</p>
              </td>
              <!-- 操作 -->
              <td class="tc">
                <p>
                  <a href="javascript:;">移入收藏夹</a>
                </p>
                <p>
                  <a href="javascript:;" class="green" @click="deleteCart(goods.skuId)">删除</a>
                </p>
                <p>
                  <a href="javascript:;">找相似</a>
                </p>
              </td>
            </tr>
          </template>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length>0">
          <tr>
            <td colspan="6">
              <h3 class="tit">失效商品</h3>
            </td>
          </tr>
          <tr v-for="goods in $store.getters['cart/invalidList']" :key="goods.skuId">
            <td>
              <xtx-checkbox style="color:#ccc"/>
            </td>
            <td>
              <div class="goods">
                <router-link :to="{ name: 'Product', params: { id: goods.id } }">
                  <img v-lazy="goods.picture" alt="">
                </router-link>
                <div>
                  <p class="name ellipsis">{{ goods.name }}</p>
                  <p class="attr">{{ goods.attrsText }}</p>
                </div>
              </div>
            </td>
            <td class="tc">
              <p>&yen;{{ goods.nowPrice }}</p>
            </td>
            <td class="tc">1</td>
            <td class="tc">
              <p>&yen;{{ (goods.nowPrice * goods.count).toFixed(2) }}</p>
            </td>
            <td class="tc">
              <p>
                <a href="javascript:;" class="green">删除</a>
              </p>
              <p>
                <a href="javascript:;">找相似</a>
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <xtx-checkbox :modelValue="$store.getters['cart/isCheckAll']" @change="checkAll">全选</xtx-checkbox>
          <a href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validTotal'] }} 件商品，已选择 {{ $store.getters['cart/selectedTotal'] }} 件，商品合计：
          <span class="red">&yen;{{ $store.getters['cart/selectedAmount'] }}</span>
          <xtx-button type="primary">下单结算</xtx-button>
        </div>
      </div>
      <!-- 猜你喜欢栏目 -->
      <goods-relevant/>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from '@/views/goods/components/goods-relevant'
import CartNone from './components/cart-none'
import { useStore } from 'vuex'
import { getCurrentInstance } from 'vue'

export default {
  name: 'XtxCartPage',
  components: {
    CartNone,
    GoodsRelevant
  },
  setup () {
    const store = useStore()
    // 单选
    const checkOne = (skuId, selected) => {
      store.dispatch('cart/updateCart', { skuId, selected })
    }
    // 全选
    const checkAll = (selected) => {
      store.dispatch('cart/checkAllCart', selected)
    }
    // 删除
    const { proxy } = getCurrentInstance()
    const deleteCart = (skuId) => {
      proxy.$confirm({ text: '确认删除该商品？' }).then(() => {
        console.log('确认')
      }).catch(e => {
        console.log(e)
      })
    }

    return {
      checkOne,
      checkAll,
      deleteCart
    }
  }

}
</script>

<style lang="less" scoped>
.checkbox {
  width: 15px;
  height: 15px;
  border: 1px solid #333333;
  -webkit-appearance: checkbox;
  vertical-align: middle;
}

.tc {
  text-align: center;

  .xtx-numbox {
    width: 120px;
    margin: 0 auto;
  }
}

.red {
  color: @priceColor;
}

.green {
  color: @xtxColor;
}

.f16 {
  font-size: 16px;
}

.goods {
  display: flex;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }

  > div {
    width: 280px;
    padding-left: 10px;
    font-size: 16px;

    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}

.tit {
  line-height: 50px;
  font-size: 16px;
  font-weight: normal;
  color: #666;
}

.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th, td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          padding-left: 30px;
          text-align: left;
          color: #999;
        }
      }

      th {
        line-height: 50px;
        font-size: 16px;
        font-weight: normal;
      }
    }
  }

  .action {
    background: #fff;
    height: 80px;
    padding: 0 30px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 30px;
      }
    }

    .red {
      margin-right: 30px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
