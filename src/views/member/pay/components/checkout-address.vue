<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单</div>
      <ul v-else>
        <li>
          <span>收<i></i>货<i></i>人：</span>{{ showAddress.receiver }}
        </li>
        <li><span>联系方式：</span>{{ handlePhone(showAddress.contact) }}</li>
        <li>
          <span>收货地址：</span
          >{{ showAddress.fullLocation + showAddress.address }}
        </li>
      </ul>
      <a href="javascript:;" v-if="showAddress">修改地址</a>
    </div>
    <div class="action">
      <xtx-button class="btn">切换地址</xtx-button>
      <xtx-button class="btn">添加地址</xtx-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CheckoutAddress',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props) {
    // 显示的地址
    const showAddress = ref(null)
    if (props.list.length) {
      const defaultAddress = props.list.find(
        (address) => address.isDefault === 0
      )
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }

    // 对电话做处理
    const handlePhone = (phone) => {
      // phone.replace(/^(\d{3})\d(\d{4})/,'$1****$2') 通过括号分成3段，$1第一段括号，$2第二段括号
      const reg = /^\d{3}(.*?)\d{4}$/gis
      return phone.replace(reg.exec(phone)[1], '****')
    }

    return {
      showAddress,
      handlePhone
    }
  }
}
</script>

<style lang="less" scoped>
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      width: 100%;
      text-align: center;
      color: #999;
    }

    > ul {
      flex: 1;
      padding: 20px;

      > li {
        line-height: 30px;

        > span {
          margin-right: 5px;
          color: #999;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      width: 160px;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      color: @xtxColor;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
