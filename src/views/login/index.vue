<template>
  <div class="page-login">
    <login-header>欢迎登录</login-header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a
            href="javascript:;"
            @click="activeName='account'"
            :class="{ active: activeName === 'account' }"
          >
            账户登录
          </a>
          <a
            href="javascript:;"
            @click="activeName='qrcode'"
            :class="{ active: activeName === 'qrcode' }"
          >
            扫码登录
          </a>
        </nav>
        <!-- 表单 -->
        <login-form v-if="activeName==='account'"/>
        <!-- 二维码 -->
        <div v-if="activeName==='qrcode'" class="qrcode-box">
          <img src="../../assets/images/qrcode.jpg" alt="">
          <p>扫码登录</p>
        </div>
      </div>
    </section>
    <login-footer></login-footer>
  </div>
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import LoginForm from './components/login-form'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'PageLogin',
  components: {
    LoginForm,
    LoginHeader,
    LoginFooter
  },
  setup () {
    const activeName = ref('account')

    // 进入登录页面就存储从其他页面跳转过来的页面url，方便登录后回跳
    const store = useStore()
    const route = useRoute()
    if (route.query.redirectUrl) {
      store.commit('user/setRedirectUrl', route.query.redirectUrl)
    } else {
      store.commit('user/setRedirectUrl', '/')
    }

    return {
      activeName
    }
  }
}
</script>

<style lang="less" scoped>
.login-section {
  height: 488px;
  position: relative;
  background: url(../../assets/images/login-bg.png) no-repeat center;
  background-size: cover;

  .wrapper {
    position: absolute;
    right: 15%;
    top: 50%;
    transform: translateY(-50%);
    width: 380px;
    height: 400px;
    background: #fff;

    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;

      a {
        flex: 1;
        height: 100%;
        line-height: 55px;
        text-align: center;
        font-size: 18px;

        &:last-of-type {
          position: relative;

          &:before {
            content: '';
            display: inline-block;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 20px;
            background: #ccc;
          }
        }

        &.active {
          font-weight: bold;
          color: @xtxColor;
        }
      }
    }

    .qrcode-box {
      padding-top: 40px;
      text-align: center;

      p {
        margin-top: 20px;
        font-size: 16px;
      }
    }
  }
}
</style>
