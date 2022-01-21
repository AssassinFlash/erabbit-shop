<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item :to="{ name: 'Cart' }">购物车</xtx-bread-item>
        <xtx-bread-item>填写订单</xtx-bread-item>
      </xtx-bread>
      <div class="wrapper" v-if="orderInfo">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <checkout-address :list="orderInfo.userAddresses" />
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orderInfo.goods" :key="item.skuId">
                <td>
                  <a href="javascript:;" class="info">
                    <img v-lazy="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.payPrice }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a href="javascript:;" class="mybtn active"
            >不限送货时间：周一至周日</a
          >
          <a href="javascript:;" class="mybtn">工作日送货：周一至周五</a>
          <a href="javascript:;" class="mybtn"
            >双休日、节假日送货：周六至周日</a
          >
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a href="javascript:;" class="mybtn active">在线支付</a>
          <a href="javascript:;" class="mybtn">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ orderInfo.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>&yen;{{ orderInfo.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>&yen;{{ orderInfo.summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">&yen;{{ orderInfo.summary.totalPayPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <xtx-button type="primary">提交订单</xtx-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutAddress from './components/checkout-address'
import { createOrder } from '@/api/order'
import { ref } from 'vue'
export default {
  components: { CheckoutAddress },
  name: 'XtxPayCheckoutPage',
  setup () {
    const orderInfo = ref(null)
    createOrder().then(({ result }) => {
      orderInfo.value = result
    })

    return {
      orderInfo
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-pay-checkout-page {
  .wrapper {
    padding: 0 20px;
    background: #fff;

    .box-title {
      line-height: 70px;
      padding-left: 10px;
      border-bottom: 1px solid #f5f5f5;
      font-size: 16px;
      font-weight: normal;
    }

    .box-body {
      padding: 20px 0;

      .goods {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;

        .info {
          display: flex;
          text-align: left;

          > img {
            width: 70px;
            height: 70px;
            margin-right: 20px;
          }

          .right {
            line-height: 24px;

            > p {
              &:last-child {
                color: #999;
              }
            }
          }
        }
      }

      .mybtn {
        display: inline-block;
        width: 228px;
        height: 50px;
        line-height: 48px;
        margin-right: 25px;
        border: 1px solid #e4e4e4;
        text-align: center;
        color: #666;
        transition: all 0.2s ease;

        &.active,
        &:hover {
          border-color: @xtxColor;
          color: @xtxColor;
        }
      }

      .total {
        > dl {
          display: flex;
          justify-content: flex-end;
          line-height: 50px;

          > dt {
            i {
              display: inline-block;
              width: 2em;
            }
          }

          > dd {
            width: 240px;
            text-align: right;
            padding-right: 70px;

            &.price {
              font-size: 20px;
              color: @priceColor;
            }
          }
        }
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

tr {
  th {
    background: #f5f5f5;
    font-weight: normal;
  }

  td,
  th {
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #f5f5f5;

    &:first-child {
      border-left: 1px solid #f5f5f5;
    }

    &:last-child {
      border-right: 1px solid #f5f5f5;
    }
  }
}
</style>
