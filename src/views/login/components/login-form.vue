<template>
  <!-- 登录表单 -->
  <div class="account-box">
    <div class="toggle">
      <a
        href="javascript:;"
        v-if="isMsgLogin"
        @click="isMsgLogin=false"
      >
        <i class="iconfont icon-user"/>
        使用账号登录
      </a>
      <a
        href="javascript:;"
        v-else
        @click="isMsgLogin=true"
      >
        <i class="iconfont icon-msg"/>
        使用短信登录
      </a>
    </div>
    <Form ref="formCom" class="form" :validation-schema="mySchema"
          v-slot="{errors}">
      <!-- 账号登录表单 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"/>
            <Field
              type="text"
              placeholder="请输入用户名zhousg"
              autocomplete="off"
              name="account"
              v-model="form.account"
              :class="{error:errors.account}"
            />
          </div>
          <!-- 报错信息 -->
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning"/>
            {{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"/>
            <Field
              type="password"
              placeholder="请输入密码123456"
              name="password"
              v-model="form.password"
              :class="{error:errors.password}"
            />
          </div>
          <!-- 报错信息 -->
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning"/>
            {{ errors.password }}
          </div>
        </div>
      </template>
      <!-- 短信登录表单 -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"/>
            <Field
              type="text"
              placeholder="请输入手机号13241051259"
              name="mobile"
              v-model="form.mobile"
              :class="{error:errors.mobile}"
            />
          </div>
          <!-- 报错信息 -->
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning"/>
            {{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"/>
            <Field
              type="password"
              placeholder="请输入验证码123456"
              name="code"
              v-model="form.code"
              :class="{error:errors.code}"
            />
            <span ref="codeSpan" @click="send" class="code">发送验证码</span>
          </div>
          <!-- 报错信息 -->
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning"/>
            {{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- 对于复选框，不能在Field上绑定v-model -->
          <Field name="isAgree" v-slot="{field}">
            <input type="checkbox" v-model="form.isAgree" class="checkbox"
                   v-bind="field">
          </Field>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!-- 报错信息 -->
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning"/>
          {{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt="">
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
// vee-validate 校验基本步骤
// 1.导入 Form Field 组件，Form 替换 form 表单，Field 替换表单元素
//   每个 Field 都应该配有一个 name 属性，这个 name 是用来指定校验规则函数的
// 2.每个 Field 需要进行双向数据绑定，字段名称和接口需求一致
// 3.编写 name 属性指定的校验规则函数，Form 的 validation-schema 来接收这些校验规则，是个对象
//   这样，在往表单元素输入数据的时候，Form 就会触发 name 属性指定的校验规则，对数据进行检验
// 4.校验函数也有规则：返回 true 就是校验成功，返回字符串就是失败，字符串是错误提示信息
//   校验函数有参数，默认为 value ，即当前表单元素输入的数据
// 5.Form 添加 v-slot="{errors}" 作用域插槽，让 Form 组件的 slot 里的 errors 对象暴露出来，
//   给使用 Form 组件的 login-form 组件使用，比如，account 校验规则校验到数据出错，errors.account就会有错误信息
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'
// import QC from 'qc'
import {
  userAccountLogin,
  userMobileLogin,
  userMobileLoginMsg
} from '@/api/user'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, watch, getCurrentInstance } from 'vue'

export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    // 使用短信登录
    const isMsgLogin = ref(false)
    // 表单信息对象
    const form = reactive({
      isAgree: false,
      account: 'zhousg',
      password: '123456',
      mobile: '13241051259',
      code: null
    })
    // 校验规则对象
    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }

    // 切换 isMsgLogin 时要重置表单（数据、清除校验结果）
    watch(isMsgLogin, () => {
      form.isAgree = false
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 清空校验结果
      formCom.value.resetForm()
    })

    // 点击登录时，对整体表单进行校验
    // Form 组件提供了一个 validate 函数作为整体表单校验，返回的是 promise
    const formCom = ref(null)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // const route = useRoute()
    // 获取vue应用实例
    const app = getCurrentInstance()
    const login = async () => {
      // 整体校验
      const valid = await formCom.value.validate()
      if (valid) {
        // 发送请求
        let data = null
        try {
          // 账号登录
          if (!isMsgLogin.value) {
            data = await userAccountLogin(form)
          } else {
            data = await userMobileLogin(form)
          }
          // 成功，存储信息 + 消息提示 + 跳转回来源页或首页
          const {
            id,
            account,
            nickname,
            avatar,
            token,
            mobile
          } = data.result
          store.commit('user/setUser', {
            id,
            account,
            nickname,
            avatar,
            token,
            mobile
          })
          await store.dispatch('cart/mergeCart')
          await router.push(route.query.redirectUrl)
          app.proxy.$message({
            type: 'success',
            text: '登录成功'
          })
        } catch (e) {
          Message({
            type: 'error',
            text: e.response.data.message || '登录失败'
          })
        }
      }
    }

    // 发送验证码
    const codeSpan = ref(null)
    const send = async () => {
      // 调用手机号表单的校验方法，验证手机号
      const valid = mySchema.mobile(form.mobile)
      // 通过
      if (valid === true) {
        try {
          // 调用API发送短信
          await userMobileLoginMsg(form.mobile)
          app.proxy.$message({
            type: 'success',
            text: '发送短信验证码成功'
          })
          // 开启定时器：初始化变量
          const codeSpanVal = codeSpan.value
          const initText = codeSpanVal.innerHTML
          let timer = null
          let i = 60
          // 执行定时器逻辑
          clearInterval(timer)
          codeSpanVal.innerHTML = i + 's'
          codeSpanVal.classList.add('disabled')
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
        // 校验手机号未通过，调用表单组件的setFieldError函数
        // 通过字段名找到对应的表单元素，显示错误信息
        // setFieldError(字段名，错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }

    // 初始化QQ登录按钮
    // 1. 准备span，有 id = qqLoginBtn
    // 2. QC.Login({btnId:"qqLoginBtn"})
    // onMounted(() => {
    //   QC.Login({ btnId: 'qqLoginBtn' })
    // })

    return {
      isMsgLogin,
      form,
      mySchema,
      formCom,
      login,
      codeSpan,
      send
    }
  }
}
</script>

<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }

  .form {
    padding: 0 40px;

    .form-item {
      margin-bottom: 28px;

      .input {
        height: 36px;
        line-height: 34px;
        position: relative;

        i {
          position: absolute;
          left: 1px;
          top: 1px;
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          text-align: center;
          font-size: 18px;
          color: #fff;
        }

        input {
          width: 100%;
          height: 36px;
          padding-left: 44px;
          outline: none;
          border: 1px solid #ccc;

          &.active, &:focus {
            border-color: @xtxColor;
          }

          &.error {
            border-color: @priceColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          width: 90px;
          height: 34px;
          background: #f5f5f5;
          text-align: center;
          font-size: 14px;
          color: #666;
          cursor: pointer;
        }

        .disabled {
          cursor: not-allowed;
          pointer-events: none;
          color: #aaa;
        }
      }

      .checkbox {
        -webkit-appearance: checkbox;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
        border: 1px solid black;
        position: relative;
        top: -1px;
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
          vertical-align: middle;
        }
      }

      .agree {
        a {
          color: #069;
        }
      }
    }

    .btn {
      display: block;
      height: 40px;
      line-height: 40px;
      background: @xtxColor;
      text-align: center;
      font-size: 16px;
      color: #fff;
    }
  }

  .action {
    padding: 0 40px;
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .url {
      a {
        margin-left: 10px;
        color: #999;
      }
    }
  }
}
</style>
