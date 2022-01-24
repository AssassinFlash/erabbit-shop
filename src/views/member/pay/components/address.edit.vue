<template>
  <xtx-dialog
    :title="`${formData.id ? '修改' : '添加'}添加收货地址`"
    v-model:visible="dialogVisible"
  >
    <div class="address-edit">
      <Form
        ref="formCom"
        class="xtx-form"
        :validation-schema="mySchema"
        v-slot="{ errors }"
      >
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <Field
              v-model="formData.receiver"
              name="receiver"
              type="text"
              class="input"
              placeholder="请输入收货人"
            />
            <div class="error" style="margin-top: 5px" v-if="errors.receiver">
              {{ errors.receiver }}
            </div>
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <Field
              v-model="formData.contact"
              name="contact"
              type="text"
              class="input"
              placeholder="请输入手机号"
            />
            <div class="error" style="margin-top: 5px" v-if="errors.contact">
              {{ errors.contact }}
            </div>
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <xtx-city
              :fullLocation="formData.fullLocation"
              placeholder="请选择所在地区"
              @change="changeCity"
            ></xtx-city>
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <Field
              type="text"
              class="input"
              name="address"
              placeholder="请输入详细地址"
              v-model="formData.address"
            />
            <div class="error" style="margin-top: 5px" v-if="errors.address">
              {{ errors.address }}
            </div>
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <Field
              v-model="formData.postalCode"
              name="postalCode"
              type="text"
              class="input"
              placeholder="请输入邮政编码"
            />
            <div class="error" style="margin-top: 5px" v-if="errors.postalCode">
              {{ errors.postalCode }}
            </div>
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              type="text"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
              v-model="formData.addressTags"
            />
          </div>
        </div>
      </Form>
    </div>
    <template #footer>
      <xtx-button
        @click="dialogVisible = false"
        type="gray"
        style="margin-right: 20px"
        >取消</xtx-button
      >
      <xtx-button @click="submit" type="primary">确认</xtx-button>
    </template>
  </xtx-dialog>
</template>

<script>
import { Form, Field } from 'vee-validate'
import schema from './use-validation'
import Message from '@/components/library/Message'
import { ref, reactive } from 'vue'
import { addAddress, editAddress } from '@/api/order'
export default {
  name: 'AddressEdit',
  components: {
    Form,
    Field
  },
  setup (props, { emit }) {
    const dialogVisible = ref(false)
    const open = (address) => {
      dialogVisible.value = true
      // 如果是添加地址，就先清空表单
      if (address.id) {
        // 修改地址
        for (const key in address) {
          formData[key] = address[key]
        }
      } else {
        for (const key in formData) {
          if (key === 'isDefault') {
            formData[key] = 1
          } else {
            formData[key] = null
          }
        }
      }
    }

    // 定义表单数据对象
    const formData = reactive({
      receiver: null,
      contact: null,
      provinceCode: null,
      cityCode: null,
      countyCode: null,
      address: null,
      postalCode: null,
      addressTags: null,
      isDefault: 1,
      fullLocation: null
    })

    // 表单数据校验
    const mySchema = {
      receiver: schema.receiver,
      contact: schema.contact,
      address: schema.address,
      postalCode: schema.postalCode,
      addressTags: schema.addressTags
    }

    // 监听城市选中派发的change事件，获取返回的结果给formData的code赋值
    const changeCity = (result) => {
      formData.provinceCode = result.provinceCode
      formData.cityCode = result.cityCode
      formData.countyCode = result.countyCode
      formData.fullLocation = result.fullLocation
    }

    // 点击添加地址的确认按钮
    const formCom = ref(null) // 表单组件
    const submit = async () => {
      const valid = await formCom.value.validate()
      if (valid) {
        if (formData.id) {
          // 修改请求
          await editAddress(formData)
          Message({ type: 'success', text: '修改收货地址成功' })
        } else {
          // 添加请求
          // 设置ID
          const { result } = await addAddress(formData)
          formData.id = result.id
          Message({ type: 'success', text: '添加收货地址成功' })
        }
        // 派发事件
        emit('on-success', formData)
        dialogVisible.value = false
      } else {
        Message({ text: '表单验证未通过' })
      }
    }

    return {
      dialogVisible,
      open,
      formData,
      changeCity,
      submit,
      mySchema,
      formCom
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;

    .body {
      font-size: 14px;
    }
  }
}

.xtx-form {
  padding: 0;

  .xtx-form-item {
    margin: 10px 0;
  }

  input {
    outline: none;

    &::placeholder {
      color: #ccc;
    }
  }
}

.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;

    .placeholder {
      color: #ccc;
    }

    i {
      font-size: 18px;
      color: #ccc;
    }

    .value {
      font-size: 14px;
    }
  }

  :deep(.option) {
    top: 49px;
  }
}
</style>
