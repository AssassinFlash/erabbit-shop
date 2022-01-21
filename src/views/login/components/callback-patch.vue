<template>
  <!-- 没有账号，完善信息，组件 -->
  <Form
    ref="formCom"
    class="xtx-form"
    :validation-schema="mySchema"
    v-slot="{errors}"
    autocomplete="off"
  >
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"/>
        <Field
          name="account"
          v-model="form.account"
          type="text"
          class="input"
          :class="{ err : errors.account }"
          placeholder="请输入用户名"
        />
      </div>
      <div v-if="errors.account" class="error">{{ errors.account }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"/>
        <Field
          name="mobile"
          v-model="form.mobile"
          type="text"
          class="input"
          :class="{ err : errors.mobile }"
          placeholder="请输入手机号"
        />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"/>
        <Field
          name="code"
          v-model="form.code"
          type="text"
          class="input"
          :class="{ err : errors.code }"
          placeholder="请输入验证码"
        />
        <span ref="codeSpan" @click="send" class="code">发送验证码</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"/>
        <Field name="password" v-slot="{field}">
          <input
            class="input"
            type="password"
            v-model="form.password"
            v-bind="field"
            :class="{ err : errors.password }"
            placeholder="请输入密码"
          >
        </Field>
      </div>
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"/>
        <Field name="rePassword" v-slot="{field}">
          <input
            class="input"
            type="password"
            v-model="form.rePassword"
            v-bind="field"
            :class="{ err : errors.rePassword }"
            placeholder="确认密码"
          >
        </Field>
      </div>
      <div v-if="errors.rePassword" class="error">{{ errors.rePassword }}</div>
    </div>
    <a @click="submit" href="javascript:;" class="submit">提交</a>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { userQQPatchCode, userQQPatchLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getCurrentInstance, reactive, ref } from 'vue'

export default {
  name: 'CallBackPatch',
  components: {
    Form,
    Field
  },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // 表单组件元素
    const formCom = ref(null)
    // 发送短信按钮
    const codeSpan = ref(null)
    // 初始化vuex和vue-router
    const store = useStore()
    const router = useRouter()
    // 表单数据
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null
    })
    // 表单校验规则
    const mySchema = {
      account: schema.account,
      mobile: schema.mobile,
      code: schema.code,
      password: schema.password,
      rePassword: schema.rePassword
    }

    // 点击发送短信按钮发送验证码
    const { proxy } = getCurrentInstance()
    const send = async () => {
      formCom.value.setFieldError('code', null)
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        try {
          // 校验通过，发送短信
          await userQQPatchCode(form.mobile)
          proxy.$message({
            type: 'success',
            text: '发送短信验证码成功'
          })
          // 开启定时器
          const codeSpanVal = codeSpan.value
          const initText = codeSpanVal.innerHTML
          let i = 5
          codeSpanVal.innerHTML = i + 's'
          codeSpanVal.classList.add('disabled')
          let timer = null
          clearInterval(timer)
          timer = setInterval(() => {
            if (i === 0) {
              codeSpanVal.innerHTML = initText
              codeSpanVal.classList.remove('disabled')
              clearInterval(timer)
            } else {
              codeSpanVal.innerHTML = --i + 's'
            }
          }, 1000)
        } catch (e) {
          formCom.value.setFieldError('mobile', e.response.data.message)
        }
      } else {
        formCom.value.setFieldError('mobile', valid)
      }
    }

    // 点击完善信息按钮调用整体校验
    const submit = async () => {
      const valid = await formCom.value.validate()
      if (valid) {
        try {
          const { result } = await userQQPatchLogin({
            unionId: props.unionId,
            ...form
          })
          // 存储用户信息 + 跳转回来源页
          const {
            id,
            avatar,
            nickname,
            account,
            mobile,
            token
          } = result
          store.commit('user/setUser', {
            id,
            avatar,
            nickname,
            account,
            mobile,
            token
          })
          await store.dispatch('cart/mergeCart')
          await router.push(store.state.user.redirectUrl)
        } catch (e) {
          proxy.$message({
            type: 'error',
            text: e.response.data.message
          })
        }
      } else {
        proxy.$message({
          type: 'error',
          text: '完善信息失败'
        })
      }
    }

    return {
      formCom,
      codeSpan,
      form,
      mySchema,
      send,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.code {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 80px;
  line-height: 48px;
  text-align: center;
  background: #dedede;
  color: #444;

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;
    background: #eee;
    color: #aaa;
  }
}
</style>
