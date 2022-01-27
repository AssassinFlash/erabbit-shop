<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <router-link to="/member">
              <i class="iconfont icon-user"/>
              {{ profile.nickname }}
            </router-link>
          </li>
          <li>
            <a @click="logout" href="javascript:;">
              退出登录
            </a>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li>
            <a href="javascript:;">
              免费注册
            </a>
          </li>
        </template>
        <li>
          <a href="javascript:;">
            我的订单
          </a>
        </li>
        <li>
          <router-link to="/member">个人中心</router-link>
        </li>
        <li>
          <a href="javascript:;">
            帮助中心
          </a>
        </li>
        <li>
          <a href="javascript:;">
            关于我们
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-phone"/>
            手机版
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'AppTopnav',
  setup () {
    // 登录注册链接根据用户信息来控制
    const store = useStore()
    // 使用 vuex 的 state 要设置计算属性，否则不是响应式
    const profile = computed(() => {
      return store.state.user.profile
    })
    const router = useRouter()
    const logout = () => {
      store.commit('user/setUser', {})
      store.commit('cart/setCart', [])
      router.push({ name: 'Login' })
    }
    return {
      profile,
      logout
    }
  }
}
</script>

<style lang="less" scoped>
.app-topnav {
  background: #333;

  ul {
    height: 53px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: block;
        transition: all 0.3s ease;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      // ~ 波浪选择器表示它之后所有的兄弟元素，不包括本身
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
