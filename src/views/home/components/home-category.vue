<template>
  <div class="home-category" @mouseleave="categoryId=null">
    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        :class="{active: categoryId === item.id}"
        @mouseenter="categoryId = item.id"
      >
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
        <template v-if="item.children">
          <router-link
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
          >
            {{ sub.name }}
          </router-link>
        </template>
        <!-- 没有数据的时候显示骨架屏 -->
        <template v-else>
          <xtx-skeleton
            height="18px"
            width="120px"
            bg="rgba(255,255,255,0.2)"
          />
        </template>
      </li>
    </ul>
    <!-- 分类的弹层 -->
    <div class="layer">
      <h4 v-if="currCategory">
        {{ currCategory.id === 'brand' ? '品牌' : '分类' }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 商品 -->
      <ul
        v-if="currCategory && currCategory.goods && currCategory.goods.length"
      >
        <li v-for="item in currCategory.goods" :key="item.id">
          <router-link :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>￥</i>{{ item.price }}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul
        v-if="currCategory && currCategory.brands && currCategory.brands.length"
      >
        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei">
                  {{ item.place }}
                </i>
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { findBrand } from '@/api/home'
import { useStore } from 'vuex'
import { ref, reactive, computed } from 'vue'

export default {
  name: 'HomeCategory',
  // 获取 vuex 分类模块的一级分类，然后再拿两个二级分类填充
  // 最后一行分类定义一个品牌数据分类
  setup () {
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{
        id: 'brand-children',
        name: '品牌推荐'
      }],
      brands: []
    })
    // 获取品牌数据
    findBrand().then(data => {
      brand.brands = data.result
    })

    const store = useStore()
    const menuList = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化时没有children调用slice函数报错
          children: item.children && item.children.slice(0, 2),
          goods: item.goods && item.goods
        }
      })
      list.push(brand)
      return list
    })
    // 获取当前分类商品
    const categoryId = ref(null)
    const currCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value)
    })

    return {
      menuList,
      categoryId,
      currCategory
    }
  }
}
</script>

<style lang="less" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  &:hover {
    .layer {
      display: block;
    }
  }

  .menu {
    li {
      height: 50px;
      line-height: 50px;
      padding-left: 40px;
      transition: all 0.2s;

      &:hover, &.active {
        background: @xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    display: none;
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    padding: 0 15px;

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;

      small {
        margin-left: 10px;
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;

          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            width: 190px;
            line-height: 24px;

            .name {
              font-size: 16px;
              color: #666;
            }

            .desc {
              color: #999;
            }

            .price {
              font-size: 22px;
              color: @priceColor;

              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }

    li.brand {
      height: 180px;

      a {
        align-items: flex-start;

        img {
          width: 120px;
          height: 160px;
        }

        .info {
          margin-left: 10px;

          p {
            margin-top: 8px;
          }

          .place {
            color: #999;
          }
        }
      }
    }
  }
}

// 骨架屏动画效果
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}

.xtx-skeleton {
  margin-left: 10px;
  //alternate: 先执行正向，再执行反向
  animation: fade 1s linear infinite alternate;
}
</style>
