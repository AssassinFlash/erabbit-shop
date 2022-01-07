<template>
  <!-- 分页组件 -->
  <div class="xtx-pagination">
    <a
      href="javascript:;"
      v-if="myCurrentPage <= 1"
      class="disabled"
    >
      上一页
    </a>
    <a
      href="javascript:;"
      v-else
      @click="changePage(myCurrentPage-1)"
    >
      上一页
    </a>
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      v-for="i in pager.btnArr"
      :key="i"
      :class="{ active : myCurrentPage === i }"
      @click="changePage(i)"
    >
      {{ i }}
    </a>
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      href="javascript:;"
      v-if="myCurrentPage >= pager.pageCount"
      class="disabled"
    >
      下一页
    </a>
    <a
      href="javascript:;"
      v-else
      @click="changePage(myCurrentPage+1)"
    >
      下一页
    </a>
  </div>
</template>

<script>
// 逻辑分析：
// 上一页和下一页是否能按：需要知道当前页面是否为1和总页数
// ...是否显示：需要知道第一个按钮的页码是否为1 和最后一个按钮页码是否为总页数
// 中间按钮的显示：需要知道显示几个按钮，需要知道起始和结束的按钮页码，得到数组才可渲染
// 总结：需要传入 总条数、每页条数、当前页码 这三个数据
import { computed, ref, watch } from 'vue'

export default {
  name: 'XtxPagination',
  props: {
    // 总条数
    total: {
      type: Number,
      default: 100
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1
    }
  },
  // 由于父组件传来的数据子组件不可更改，子组件在此用其他数据，缓存父组件数据
  setup (props, { emit }) {
    // 总条数
    const myTotal = ref(100)
    // 每页条数
    const myPageSize = ref(10)
    // 当前第几页
    const myCurrentPage = ref(1)
    // 按钮个数
    const btnCount = 5

    watch(props, () => {
      myTotal.value = props.total
      myPageSize.value = props.pageSize
      myCurrentPage.value = props.currentPage
    }, { immediate: true })

    // 重点：根据上述数据得到（总页数，起始页码，结束页码，按钮数组）
    const pager = computed(() => {
      // 1.计算总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      // 2.计算偏移量：理想情况下当前页码是在按钮数组的中间显示的，所以 / 2
      const offset = Math.floor(btnCount / 2)
      // 3.根据偏移量得到起始页码和结束页码
      let start = myCurrentPage.value - offset
      let end = myCurrentPage.value + offset
      // 处理不合法的情况：当前页码加上偏移量之后得到的起始页码<1
      if (start < 1) {
        start = 1
        end = (start + btnCount - 1) > pageCount ? pageCount : (start + btnCount - 1)
      }
      // 当前页码加上偏移量之后得到的结束页码大于总页数
      if (end > pageCount) {
        end = pageCount
        start = (end - btnCount + 1) < 1 ? 1 : (end - btnCount + 1)
      }
      // 根据起始页码和结束页码得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }

      return {
        pageCount,
        start,
        end,
        btnArr
      }
    })

    // 改变当前页码，通知父组件请求参数更新
    const changePage = (newPage) => {
      myCurrentPage.value = newPage
      emit('current-change', newPage)
    }

    return {
      myCurrentPage,
      pager,
      changePage
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-pagination {
  padding: 30px;
  display: flex;
  justify-content: center;

  > a {
    display: inline-block;
    padding: 5px 10px;
    margin-right: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      color: @xtxColor;
    }

    &.active {
      background: @xtxColor;
      border-color: @xtxColor;
      color: #fff;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;

      &:hover {
        color: #333;
      }
    }
  }

  > span {
    margin-right: 10px;
  }
}
</style>
