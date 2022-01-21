<template>
  <!-- 新用户登录之后的回跳页面 -->
  <login-header>联合登录</login-header>
  <!-- Loading 效果 -->
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a
        href="javascript:;"
        @click="hasAccount=true"
        :class="{ active : hasAccount === true }"
      >
        <i class="iconfont icon-bind"/>
        <span>已有账号，请绑定手机</span>
      </a>
      <a
        href="javascript:;"
        @click="hasAccount=false"
        :class="{ active : hasAccount === false }"
      >
        <i class="iconfont icon-edit"/>
        <span>没有账号，请完善资料</span>
      </a>
    </nav>
    <!-- 切换组件 -->
    <transition name="fade">
      <div class="tab-content" v-if="hasAccount">
        <call-back-bind :unionId="unionId"/>
      </div>
      <div class="tab-content" v-else>
        <call-back-patch :unionId="unionId"/>
      </div>
    </transition>
  </section>
  <login-footer/>
</template>

<script>
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallBackBind from './components/callback-bind'
import CallBackPatch from './components/callback-patch'
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getCurrentInstance, ref } from 'vue'

// 首先，默认认为已经注册且已经绑定
// 通过QQ的API获取openID 就是后台需要的unionId
// 后台拿到QQ号在数据库中查找是否存在与该QQ号相关的账号记录
// 如果成功，登录成功，如果失败：该QQ未和小兔仙进行绑定（有号没绑QQ，没号没绑QQ）
export default {
  name: 'LoginCallback',
  components: {
    CallBackPatch,
    CallBackBind,
    LoginHeader,
    LoginFooter
  },
  setup () {
    const hasAccount = ref(true)
    // 默认QQ已经绑定账号，这时就会默认做一次登录
    const isBind = ref(true)

    const store = useStore()
    const router = useRouter()
    const unionId = ref(null)
    const { proxy } = getCurrentInstance()
    // 确保QQ已经登录
    if (QC.Login.check()) {
      // 拿到openID，做一次登录，让后台检测是否有与QQ号相关的账号
      QC.Login.getMe(async (openID) => {
        try {
          unionId.value = openID
          const { result } = await userQQLogin(openID)
          const { id, avatar, nickname, account, mobile, token } = result
          store.commit('user/setUser', {
            id, avatar, nickname, account, mobile, token
          })
          await store.dispatch('cart/mergeCart')
          await router.push(store.state.user.redirectUrl)
          proxy.$message({ type: 'success', text: '登录成功' })
        } catch (e) {
          isBind.value = false
        }
      })
    }

    return {
      hasAccount,
      isBind,
      unionId
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 25px 0;
  height: 730px;

  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;

    .loading {
      height: 100%;
      background: url(../../assets/images/loading.gif) no-repeat;
      background-size: 100px 100px;
      background-position: center;
    }
  }

  .tab {
    height: 80px;
    padding-top: 40px;
    background: #fff;
    text-align: center;
    font-size: 18px;

    a {
      display: inline-block;
      width: 350px;
      line-height: 40px;
      border-bottom: 2px solid #e4e4e4;
      color: #666;

      i {
        vertical-align: middle;
        font-size: 22px;
      }

      span {
        vertical-align: middle;
        margin-left: 5px;
      }

      &.active {
        color: @xtxColor;
        border-color: @xtxColor;
      }
    }
  }

  .tab-content {
    min-height: 600px;
    background: #fff;
  }
}
</style>
