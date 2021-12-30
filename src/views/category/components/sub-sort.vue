<template>
  <!-- 封装排序组件，当点击了排序或者复选框改变后，派发sort-change 传出排序参数，通知父组件更新数据 -->
  <div class="sub-sort">
    <div class="sort">
      <a href="javascript:;" :class="{ active: sortParams.sortField === null }"
         @click="changeSort(null)">
        默认排序
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
      >
        最新商品
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
      >
        最高人气
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
      >
        评论最多
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'price' }"
        @click="changeSort('price')"
      >
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <xtx-checkbox @change="changeCheck" v-model="sortParams.invertory">
        仅显示有货商品
      </xtx-checkbox>
      <xtx-checkbox @change="changeCheck" v-model="sortParams.onlyDiscount">
        仅显示特惠商品
      </xtx-checkbox>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'SubSort',
  setup (props, { emit }) {
    // 实现筛选：筛选条件应与后台保持一致
    // inventory: 是否有库存 onlyDiscount: 只显示特惠
    // sortField: 排序字段，取值范围：[publishTime,orderNum,price,evaluateNum]
    // sortMethod: 排序方法，asc为正序，desc为倒序，默认desc
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: null
    })

    // 修改排序字段和排序方式，分开价格按钮和其他排序两种方式
    const changeSort = (sortField) => {
      // 价格排序，判断是否第一次点击，是则设置降序
      if (sortField === 'price') {
        sortParams.sortField = sortField
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc'
        } else {
          sortParams.sortMethod = sortParams.sortMethod === 'asc' ? 'desc' : 'asc'
        }
      } else {
        // 如果已经点击了该排序，就不要再重复点击执行刷新
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      // 派发sort-change事件，通知父组件排序属性发生改变
      emit('sort-change', sortParams)
    }
    // 复选框状态的变化也要通知父组件排序属性发生改变
    const changeCheck = () => {
      emit('sort-change', sortParams)
    }

    return {
      sortParams,
      changeSort,
      changeCheck
    }
  }
}
</script>

<style lang="less" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .sort {
    display: flex;

    a {
      height: 30px;
      line-height: 22px;
      padding: 3px 20px;
      margin-right: 20px;
      border: 1px solid #e4e4e4;
      border-radius: 3px;
      color: #999;
      position: relative;
      transition: all 0.3s ease;

      &:last-child {
        &.active {
          color: @xtxColor;
          background: unset;
        }
      }

      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }

      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 7px;

        &.up {
          top: 3px;
          border-bottom-color: #bbb;

          &.active {
            border-bottom-color: @xtxColor;
          }
        }

        &.down {
          top: 16px;
          border-top-color: #bbb;

          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }

  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
