<template>
  <!-- 吸附头部：当页面往下滚的时候出现吸附在顶部的头部 -->
  <div class="app-header-sticky" :class="{ show : y > 78 }">
    <div class="container" v-show="y>78">
      <router-link class="logo" to="/"/>
      <app-header-nav/>
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from '@/components/app-header-nav'
import { useWindowScroll } from '@vueuse/core'

export default {
  name: 'AppHeaderSticky',
  components: {
    AppHeaderNav
  },
  setup () {
    // 记录页面滚动值：传统方法
    // const y = ref(0)
    // onMounted(() => {
    //   window.onscroll = () => {
    //     y.value = document.documentElement.scrollTop
    //   }
    // })

    // 使用vueuse第三方库
    const { y } = useWindowScroll()
    return {
      y
    }
  }
}
</script>

<style lang="less" scoped>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;

  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;

    .logo {
      width: 200px;
      height: 80px;
      background: url(../assets/images/logo.png) no-repeat 35px center;
      background-size: 160px auto;
    }

    .right {
      width: 220px;
      display: flex;
      text-align: center;
      padding-left: 40px;
      border-left: 2px solid @xtxColor;

      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;
        transition: all 0.3s;

        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
