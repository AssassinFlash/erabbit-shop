<template>
  <!--
    动画执行的条件: 组件的创建和移除
    由于 vue 对组件具有复用性，因此要给面包屑item指定key值，
    vue 在检测到 key 发生变化就会对该组件重新创建，才能执行动画
   -->
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item :to="{ path: '/' }">首页</xtx-bread-item>
        <transition name="fade-right" mode="out-in" appear
                    v-if="topCategory.name">
          <xtx-bread-item :key="topCategory.id">
            {{ topCategory.name }}
          </xtx-bread-item>
        </transition>
        <div v-else>
          <xtx-skeleton width="28px" height="18px" bg="#e4e4e4" animated/>
        </div>
      </xtx-bread>
      <!-- 轮播图 -->
      <xtx-carousel :sliders="sliders" autoPlay style="height: 400px"/>
      <!-- 全部二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <router-link :to="`/category/sub/${item.id}`">
              <img v-lazy="item.picture" alt=""/>
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 各个分类下推荐商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">品质之选，精心推荐</p>
          <xtx-more :path="`/category/sub/${sub.id}`"/>
        </div>
        <div class="body">
          <goods-item v-for="item in sub.goods" :key="item.id" :goods="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from './components/goods-item'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'

export default {
  name: 'TopCategory',
  components: {
    GoodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then((data) => {
      sliders.value = data.result
    })

    // 面包屑+一级分类
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      // 避免没有一级分类
      let cate = {}
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id
      })
      if (item) cate = item
      return cate
    })

    // 二级分类的推荐商品
    const subList = ref([])
    const getSubList = () => {
      console.log(route)
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children
      })
    }
    // 存在问题：如果只是变换了路由的ID，由于路由规则没有发生变化，动态路由组件是不会重新加载组件的
    // 这会导致在分类页面下切换了一级分类没有触发刷新商品
    // 所以需要侦听路由ID的变化进行重新加载
    watch(
      () => route.params.id,
      (newVal) => {
        // 处理：切换二级分类的路由的时候也有id，
        // 也会触发watch导致在请求一级分类的ID传了二级分类的ID，导致请求错误
        if (newVal && `/category/${route.params.id}` === route.path) {
          getSubList()
        }
      },
      { immediate: true }
    )

    return {
      sliders,
      topCategory,
      subList
    }
  }
}
</script>

<style lang="less" scoped>
.top-category {
  h3 {
    line-height: 100px;
    text-align: center;
    font-size: 28px;
    font-weight: normal;
    color: #666;
  }

  .sub-list {
    margin-top: 20px;
    background: #fff;

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 32px;

      li {
        width: 168px;
        height: 160px;

        a {
          display: block;
          text-align: center;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
            transition: all 0.3s ease;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 38px;
        right: 30px;
      }

      .tag {
        position: relative;
        top: -20px;
        text-align: center;
        font-size: 18px;
        color: #999;
      }
    }

    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding-left: 10px;
      padding-bottom: 30px;
    }
  }
}
</style>
