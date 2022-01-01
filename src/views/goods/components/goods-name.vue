<template>
  <p class="g-name">{{ goods.name }}</p>
  <p class="g-desc">{{ goods.desc }}</p>
  <p class="g-price">
    <span>{{ goods.price }}</span>
    <span>{{ goods.oldPrice }}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>配送</dt>
      <dd>至 <xtx-city :fullLocation="fullLocation" @change="changeCity" /></dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsName',
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  // 1.提供给后台的四项数据，(未登录状态)显示的默认地址
  //   未登录状态，商品 goods 的userAddresses属性为null
  // 2.(已登录状态)取出用户收货地址中默认的地址给四个数据赋值
  //   已登录状态，商品 goods 的userAddresses属性不为空，且是用户的收货地址数组
  // 3.找到isDefault = 1 的地址，就是用户的默认收货地址
  // 4.默认的 fullLocation 地址要传给地址组件做默认显示
  setup (props) {
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countyCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')

    if (props.goods.userAddresses) {
      const defaultAddr = props.goods.userAddresses.find(addr => addr.isDefault === 1)
      provinceCode.value = defaultAddr.provinceCode
      cityCode.value = defaultAddr.cityCode
      countyCode.value = defaultAddr.countyCode
      fullLocation.value = defaultAddr.fullLocation
    }

    const changeCity = (changeResult) => {
      provinceCode.value = changeResult.provinceCode
      cityCode.value = changeResult.cityCode
      countyCode.value = changeResult.countyCode
      fullLocation.value = changeResult.fullLocation
    }

    return {
      fullLocation,
      changeCity
    }
  }
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px;
}

.g-desc {
  margin-top: 10px;
  color: #999;
}

.g-price {
  margin-top: 10px;

  span {
    &::before {
      content: '￥';
      font-size: 14px;
    }

    &:first-child {
      margin-right: 10px;
      font-size: 22px;
      color: @priceColor;
    }

    &:last-child {
      font-size: 16px;
      text-decoration: line-through;
      color: #999;
    }
  }
}

.g-service {
  width: 500px;
  margin-top: 10px;
  padding: 20px 10px 0 10px;
  background: #f5f5f5;

  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      color: #666;

      &:last-child {
        span {
          margin-right: 10px;

          &::before {
            content: '•';
            margin-right: 2px;
            color: @xtxColor;
          }
        }

        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
