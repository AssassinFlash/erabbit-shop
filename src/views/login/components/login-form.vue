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
    <Form class="form" :validation-schema="schema" v-slot="{errors}">
      <!-- 账号登录表单 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"/>
            <Field
              type="text"
              placeholder="请输入用户名"
              name="account"
              v-model="form.account"
              autocomplete="off"
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
              placeholder="请输入密码"
              name="password"
              v-model="form.password"
            />
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
              placeholder="请输入手机号"
              name="mobile"
              v-model="form.mobile"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"/>
            <Field
              type="password"
              placeholder="请输入验证码"
              name="code"
              v-model="form.code"
            />
            <span class="code">发送验证码</span>
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <xtx-checkbox v-model="form.isAgree"/>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt="">
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
import { ref, reactive } from 'vue'

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
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // 校验规则对象
    const schema = {
      account (value) {
        if (!value) return '请输入用户名'
        return true
      }
    }

    return {
      isMsgLogin,
      form,
      schema
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
