<template>
  <!-- 商品评论 -->
  <div class="goods-comment">
    <!-- 评价头部 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说:</div>
        <div class="dd">
          <a
            href="javascript:void(0);"
            v-for="(tag, i) in commentInfo.tags"
            :key="tag.title"
            :class="{ active : currTagIndex === i }"
            @click="changeTag(i)"
          >
            {{ tag.title }} ({{ tag.tagCount }})
          </a>
        </div>
      </div>
    </div>
    <!-- 排序按钮 -->
    <div class="sort">
      <span>排序</span>
      <a
        href="javascript:;"
        :class="{ active : reqParams.sortField === null }"
        @click="changeSort(null)"
      >
        默认
      </a>
      <a
        href="javascript:;"
        :class="{ active : reqParams.sortField === 'createTime' }"
        @click="changeSort('createTime')"
      >
        最新
      </a>
      <a
        href="javascript:;"
        :class="{ active : reqParams.sortField === 'praiseCount' }"
        @click="changeSort('praiseCount')"
      >
        最热
      </a>
    </div>
    <!-- 评价列表 -->
    <div class="list" v-if="commentList">
      <div
        class="item"
        v-for="comment in commentList"
        :key="comment.id"
      >
        <div class="user">
          <img v-lazy="comment.member.avatar" alt="">
          <span>{{ formatNickNames(comment.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-wjx01"
              v-for="i in comment.score"
              :key="i+'s'"
            />
            <i
              class="iconfont icon-wjx02"
              v-for="i in (5 - comment.score)"
              :key="i+'k'"
            />
            <span class="attr">{{ formatSpecs(comment.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ comment.content }}</div>
          <!-- 图片预览 -->
          <template v-if="comment.pictures.length">
            <goods-comment-image :pictures="comment.pictures"/>
          </template>
          <div class="time">
            <span>{{ comment.createTime }}</span>
            <span class="zan">
              <i class="iconfont icon-dianzan"/>
              {{ comment.praiseCount }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <xtx-pagination
      v-if="commentList"
      :total="total"
      :page-size="reqParams.pageSize"
      :current-page="reqParams.page"
      @current-change="changePager"
    />
  </div>
</template>

<script>
import GoodsCommentImage from './goods-comment-image'
// 设置数据之前，tags数组前追加 有图 和 全部评价
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/product'
import { ref, inject, reactive, watch } from 'vue'

const getCommentInfo = (id) => {
  const commentInfo = ref(null)
  findGoodsCommentInfo(id).then(({ result }) => {
    result.tags.unshift({
      type: 'img',
      tagCount: result.hasPictureCount,
      title: '有图'
    })
    result.tags.unshift({
      type: 'all',
      tagCount: result.evaluateCount,
      title: '全部评价'
    })
    commentInfo.value = result
  })
  return commentInfo
}
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup () {
    // 评价信息
    const goods = inject('goods')
    const commentInfo = getCommentInfo(goods.id)

    // 准备筛选条件数据，字段为 null 是不会传给后台的
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      // 排序方式：praiseCount 热度  createTime 最新
      sortField: null
    })

    // 当前tag的索引
    const currTagIndex = ref(0)
    // 点击 tag 的时候修改tag索引和筛选条件
    const changeTag = (i) => {
      currTagIndex.value = i
      const currTag = commentInfo.value.tags[i]
      if (currTag.type === 'all') {
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (currTag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = null
        reqParams.tag = currTag.title
      }
      reqParams.page = 1
    }

    // 改变排序方式
    const changeSort = (type) => {
      reqParams.sortField = type
      reqParams.page = 1
    }

    // 因为初始化需要发请求，筛选条件发生变化也要发请求
    // 所以使用侦听筛选条件的方式
    const commentList = ref([]) // 评论列表
    const total = ref(0) // 总条数
    watch(reqParams, async () => {
      const { result } = await findGoodsCommentList(goods.value.id, reqParams)
      total.value = result.counts
      console.log(result)
      commentList.value = result.items
    }, { immediate: true })

    // 转换数据的函数
    const formatSpecs = (specs) => {
      return specs.reduce((prev, curr) => {
        return `${prev} ${curr.name}：${curr.nameValue} `.trim()
      }, '')
    }
    const formatNickNames = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1) // 往后数
      // return nickname.substr(0, 1) + '****' + nickname.substr(nickname.length - 1, nickname.length)
    }

    // 实现分页切换
    const changePager = (newPage) => {
      reqParams.page = newPage
    }
    return {
      commentInfo,
      currTagIndex,
      changeTag,
      reqParams,
      changeSort,
      commentList,
      total,
      formatSpecs,
      formatNickNames,
      changePager
    }
  }
}
</script>

<style lang="less" scoped>
.goods-comment {
  .head {
    display: flex;
    padding: 20px 0;

    .data {
      width: 340px;
      display: flex;
      padding: 20px 20px 20px 0;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        width: 100px;
        line-height: 42px;
        text-align: right;
        font-weight: bold;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        a {
          display: inline-block;
          width: 132px;
          height: 42px;
          line-height: 40px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          text-align: center;
          color: #999;
          transition: all 0.2s ease;

          &.active, &:hover {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }

  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    padding: 0 20px;
    color: #666;

    span {
      margin-left: 20px;
    }

    a {
      margin-left: 30px;
      transition: all 0.2s ease;

      &.active, &:hover {
        color: @xtxColor;
      }
    }
  }

  .list {
    padding: 0 20px;

    .item {
      padding: 25px 10px;
      display: flex;
      border-bottom: 1px solid #f5f5f5;

      .user {
        width: 160px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          vertical-align: middle;
        }

        span {
          display: inline-block;
          padding-left: 10px;
          color: #666;
          vertical-align: middle;
        }
      }

      .body {
        flex: 1;

        .score {
          line-height: 40px;

          .iconfont {
            margin-right: 3px;
            color: #ff9240;

            &:last-of-type {
              margin-right: 0;
            }
          }

          .attr {
            padding-left: 15px;
            color: #666;
          }
        }

        .text {
          line-height: 24px;
          color: #666;
        }

        .time {
          margin-top: 5px;
          padding-right: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #999;
        }
      }
    }
  }
}
</style>
