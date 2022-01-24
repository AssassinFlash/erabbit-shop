<template>
  <div class="xtx-pay-page">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item to="/cart">购物车</xtx-bread-item>
        <xtx-bread-item>支付订单</xtx-bread-item>
      </xtx-bread>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="order">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功，请尽快完成支付</p>
          <p v-if="order.countdown > -1">支付还剩<span>{{ timeText }}</span>，超时后将取消订单</p>
          <p v-else>订单已经超时！</p>
          <xtx-button class="checkbtn" type="primary">查看订单</xtx-button>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>&yen;{{ order.payMoney }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a href="javascript:;" class="btn wx"></a>
          <a :href="payUrl" class="btn alipay" target="_blank" @click="dialogVisible=true"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
    <!-- 支付提示对话框 -->
    <xtx-dialog title="正在支付..." v-model:visible="dialogVisible">
      <div class="pay-wait">
        <img src="@/assets/images/load.gif" alt="">
        <div v-if="order">
          <p>如果支付成功：</p>
          <router-link :to="`/member/order/${order.id}`">查看订单详情</router-link>
          <p>如果支付失败：</p>
          <router-link to="/">查看相关疑问</router-link>
        </div>
      </div>
    </xtx-dialog>
  </div>
</template>

<script>
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import { usePayTime } from '@/hooks'
import { baseURL } from '@/utils/request'
import { ref } from 'vue'
export default {
  name: 'XtxPayPage',
  setup () {
    // 订单
    const order = ref(null)
    // 路由信息
    const route = useRoute()
    const { start, timeText } = usePayTime()
    findOrder(route.query.orderId).then(({ result }) => {
      order.value = result
      if (result.countdown > -1) {
        start(result.countdown)
      }
    })

    const dialogVisible = ref(false)

    // 支付地址：后台服务基准地址+支付页面地址+订单ID+回跳地址
    const redirect = encodeURIComponent('http://www.corho.com:8080/#/pay/callback')
    const payUrl = `${baseURL}/pay/aliPay?orderId=${route.query.orderId}&redirect=${redirect}`

    return {
      order,
      timeText,
      payUrl,
      dialogVisible
    }
  }
}
</script>

<style lang="less" scoped>
.pay-info {
  height: 240px;
  padding: 0 80px;
  background: #fff;
  display: flex;
  align-items: center;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    flex: 1;
    padding-left: 10px;

    p {
      &:first-child {
        margin-bottom: 5px;
        font-size: 20px;
      }

      &:last-child {
        font-size: 16px;
        color: #999;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  padding-bottom: 70px;
  background: #fff;

  p {
    height: 70px;
    line-height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    display: inline-block;
    width: 150px;
    height: 50px;
    line-height: 48px;
    margin-left: 30px;
    border: 1px solid #e4e4e4;
    text-align: center;
    color: #666;
    transition: all 0.3s ease;

    &.active,
    &:hover {
      border-color: @xtxColor;
    }

    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat;
      background-size: cover;
      background-position: center;
    }

    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
}

.pay-wait {
  display: flex;
  justify-content: space-around;

  p {
    margin-top: 30px;
    font-size: 14px;
  }

  a {
    color: @xtxColor;
  }
}
.checkbtn {
  margin: 30px 0 30px 0;
}
</style>
