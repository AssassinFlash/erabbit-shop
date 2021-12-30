<template>
  <!-- 提取头部导航栏为一个组件，供头部使用 -->
  <ul class="app-header-nav">
    <li class="home">
      <router-link to="/">首页</router-link>
    </li>
    <li
      v-for="item in list"
      :key="item.id"
      @mousemove="show(item)"
      @mouseleave="hide(item)"
    >
      <router-link
        :to="`/category/${item.id}`"
        @click="hide(item)"
      >
        {{ item.name }}
      </router-link>
      <div class="layer" :class="{open:item.open}">
        <ul>
          <li
            v-for="sub in item.children"
            :key="sub.id"
          >
            <router-link
              :to="`/category/sub/${sub.id}`"
              @click="hide(item)"
            >
              <img :src="sub.picture" alt="">
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    // 获取所有分类
    const list = computed(() => {
      return store.state.category.list
    })
    // 存在问题：由于vue是单页面，点击一级分类和二级分类不会刷新页面
    // 导致在二级路由中已经显示了当前分类下的商品信息，css的hover还是会一直作用
    // 具体表现为跳转了页面，但是二级分类窗口不会关闭
    // 解决思路：不再使用css的hover控制二级分类窗口的显示和隐藏
    // 转而使用vuex来控制，给每个分类加上显示标志，并提供显示和隐藏函数，修改显示标志
    // 从而控制二级分类窗口的显示和隐藏
    const show = (item) => {
      store.commit('category/show', item.id)
    }
    const hide = (item) => {
      store.commit('category/hide', item.id)
    }
    return {
      list,
      show,
      hide
    }
  }
}
</script>

<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  padding-left: 40px;
  display: flex;
  position: relative;
  z-index: 998;
  // > 后代选择器：只选择 ul 下的所有 li 子元素，避免与其他 li 混乱样式
  > li {
    width: 38px;
    margin-right: 40px;
    text-align: center;

    > a {
      display: inline-block;
      height: 32px;
      font-size: 16px;
      line-height: 32px;
      transition: all 0.3s;
    }

    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }

      //> .layer {
      //  height: 132px;
      //  opacity: 1;
      //}
    }
  }

  .layer {
    &.open {
      height: 132px;
      opacity: 1;
    }

    width: 1240px;
    background: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 1px 1px 5px #ccc;
    transition: all 0.2s ease;

    ul {
      height: 132px;
      padding: 0 70px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      li {
        width: 110px;
        text-align: center;

        a {
          display: block;
          transition: all 0.3s ease;
        }

        img {
          width: 60px;
          height: 60px;
        }

        p {
          padding-top: 10px;
        }

        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
