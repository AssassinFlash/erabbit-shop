<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">
        您需要先添加收货地址才可提交订单
      </div>
      <ul v-else>
        <li>
          <span>收<i></i>货<i></i>人：</span>{{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, "$1****$2") }}
        </li>
        <li>
          <span>收货地址：</span
          >{{ showAddress.fullLocation + showAddress.address }}
        </li>
      </ul>
      <a @click="openAddressEdit(showAddress)" href="javascript:;" v-if="showAddress">修改地址</a>
    </div>
    <div class="action">
      <xtx-button class="btn" @click="openDialog">切换地址</xtx-button>
      <xtx-button class="btn" @click="openAddressEdit({})">添加地址</xtx-button>
    </div>
  </div>
  <!-- 对话框组件 -->
  <xtx-dialog title="切换收货地址" v-model:visible="dialogVisible">
    <template #default>
      <div
        class="text item"
        v-for="address in list"
        :key="address.id"
        :class="{ active: selectedAddress && selectedAddress.id === address.id }"
        @click="selectedAddress = address"
      >
        <ul>
          <li>
            <span>收<i></i>货<i></i>人：</span>{{ address.receiver }}
          </li>
          <li>
            <span>联系方式：</span
            >{{ address.contact.replace(/^(\d{3})\d{4}(\d{4})/, "$1****$2") }}
          </li>
          <li>
            <span>收货地址：</span>{{ address.fullLocation + address.address }}
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <xtx-button
        type="gray"
        style="margin-right: 20px"
        @click="dialogVisible = false"
        >取消</xtx-button
      >
      <xtx-button type="primary" @click="confirmAddress">确认</xtx-button>
    </template>
  </xtx-dialog>
  <!-- 添加收货地址组件 -->
  <address-edit @on-success="successHandler" ref="addressEdit"></address-edit>
</template>

<script>
import { ref } from 'vue'
import AddressEdit from './address.edit.vue'

export default {
  components: { AddressEdit },
  name: 'CheckoutAddress',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
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
      // const reg = /^\d{3}(.*?)\d{4}$/gis
      // return phone.replace(reg.exec(phone)[1], '****')
    }

    // 是否显示修改地址对话框
    const dialogVisible = ref(false)

    // 默认通知父组件一个收货地址ID，让父组件能记录下这个收货地址
    emit('change', showAddress.value && showAddress.value.id)

    // 打开对话框
    const selectedAddress = ref(null)
    const openDialog = () => {
      dialogVisible.value = true
      selectedAddress.value = showAddress.value
    }

    // 点击确认地址
    const confirmAddress = () => {
      dialogVisible.value = false
      showAddress.value = selectedAddress.value
      emit('change', showAddress.value && showAddress.value.id)
    }

    // 添加收货地址组件和修改收货地址
    const addressEdit = ref(null)
    const openAddressEdit = (address) => {
      // 直接调用组件实例的方法，添加->{}，修改->{address}
      addressEdit.value.open(address)
    }

    // 监听添加收货地址组件派发的成功添加事件
    const successHandler = (formData) => {
      // 如果是添加：往list追加一条地址
      // 要注意的是，修改formData的时候，数组中的数据也会更新，因为是同一引用地址
      // 而当打开对话框的时候就需要清空之前的输入信息，这时候已经是修改了formData
      // 因此需要克隆formData数据
      // 根据formData中的id去当前地址列表中查找，有就是修改，无就是添加
      const address = props.list.find(item => item.id === formData.id)
      if (address) {
        for (const key in address) {
          address[key] = formData[key]
        }
      } else {
        const jsonStr = JSON.stringify(formData)
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(jsonStr))
      }
    }

    return {
      showAddress,
      handlePhone,
      dialogVisible,
      selectedAddress,
      openDialog,
      confirmAddress,
      addressEdit,
      openAddressEdit,
      successHandler
    }
  }
}
</script>

<style lang="less">
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
