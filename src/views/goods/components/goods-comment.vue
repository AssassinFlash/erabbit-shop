<template>
  <!-- 商品评论 -->
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p>
          <span>100</span>
          <span>人购买</span>
        </p>
        <p>
          <span>99.99%</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说:</div>
        <div class="dd">
          <a href="javascript:;" class="active">全部评价 (1000)</a>
          <a href="javascript:;">好吃 (1000)</a>
          <a href="javascript:;">便宜 (1000)</a>
          <a href="javascript:;">很好 (1000)</a>
          <a href="javascript:;">再来一次 (1000)</a>
          <a href="javascript:;">快递棒 (1000)</a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序</span>
      <a href="javascript:;" class="active">默认</a>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">最热</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsComment'
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
}
</style>
