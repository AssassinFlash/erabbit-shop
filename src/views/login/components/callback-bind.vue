<template>
  <!-- 已有账号，绑定手机，组件 -->
  <Form
    class="xtx-form"
    :validation-schema="mySchema"
    ref="formCom"
    v-slot="{errors}"
  >
    <div class="user-info" v-if="userInfo.nickname">
      <img v-lazy="userInfo.avatar" alt="">
      <p>Hi {{ userInfo.nickname }}，欢迎来到jzh商城，完成绑定后可以QQ账号一键登录~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"/>
        <Field
          name="mobile"
          class="input"
          type="text"
          v-model="form.mobile"
          :class="{ err : errors.mobile }"
          placeholder="绑定的手机号"
        />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"/>
        <Field
          name="code"
          class="input"
          type="text"
          v-model="form.code"
          :class="{ err : errors.code }"
          placeholder="短信验证码"
        />
        <span ref="codeSpan" @click="send" class="code">发送验证码</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <a @click="submit" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
// 未绑定 有账号
// 1. 准备信息：unionId(openID) QQ头像 昵称
// 2. 完成表单校验
// 3. 发送验证码（校验 + 调用API + 倒计时）
// 4. 进行绑定（绑定成功就是登录成功）

// 表单校验流程：
// 1.Form替换表单组件，Field替换表单元素
// 2.Form绑定vee-validate属性，开启整体校验，Field指定name属性，对应校验函数
// 3.Form添加v-slot="{errors}"作用域插槽，解构出errors对象，使Field显示错误信息
// 4.点击绑定按钮触发Form的调用检验方法validate()，点击发送验证码触发Field的调用检验方法
import QC from 'qc'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, reactive, getCurrentInstance } from 'vue'

export default {
  name: 'CallBackBind',
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
    // 用户信息
    const userInfo = reactive({
      nickname: null,
      avatar: null
    })
    // 表单数据
    const form = reactive({
      mobile: null,
      code: null
    })
    // 表单校验
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code
    }
    // 确保已经登录
    if (QC.Login.check()) {
      QC.api('get_user_info').success(({ data }) => {
        userInfo.nickname = data.nickname
        userInfo.avatar = data.figureurl_1
      })
    }

    // 发送验证码
    const codeSpan = ref(null)
    const formCom = ref(null)
    const { proxy } = getCurrentInstance()
    const send = async () => {
      formCom.value.setFieldError('code', null)
      // 调用手机号表单的校验函数
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        try {
          // 调用API获取QQ绑定短信验证码
          await userQQBindCode(form.mobile)
          proxy.$message({
            type: 'success',
            text: '发送短信验证码成功'
          })
          // 开启定时器
          const codeSpanVal = codeSpan.value
          const initText = codeSpanVal.innerHTML
          codeSpanVal.classList.add('disabled')
          // 初始化定时器变量
          let i = 5
          codeSpanVal.innerHTML = i + 's'
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
        // 使表单元素输出错误信息
        formCom.value.setFieldError('mobile', valid)
      }
    }

    // 点击立即绑定按钮触发整体校验
    const store = useStore()
    const router = useRouter()
    const submit = async () => {
      const valid = await formCom.value.validate()
      if (valid) {
        try {
          const { result } = await userQQBindLogin({
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
          text: '绑定失败'
        })
      }
    }

    return {
      userInfo,
      form,
      mySchema,
      codeSpan,
      send,
      formCom,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  background: #f2f2f2;

  img {
    width: 50px;
    height: 50px;
    background: #f2f2f2;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 100px;
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
