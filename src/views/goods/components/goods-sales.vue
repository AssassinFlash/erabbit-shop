<template>
  <ul class="goods-sales">
    <li>
      <p>销量人气</p>
      <p>200+</p>
      <p><i class="iconfont icon-task-filling" />销量人气</p>
    </li>
    <li>
      <p>商品评价</p>
      <p>400+</p>
      <p><i class="iconfont icon-task-filling" />查看评价</p>
    </li>
    <li>
      <p>收藏人气</p>
      <p>600+</p>
      <p><i class="iconfont icon-task-filling" />收藏商品</p>
    </li>
    <li>
      <p>品牌信息</p>
      <p>苏宁电器</p>
      <p><i class="iconfont icon-task-filling" />品牌主页</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'GoodsSales'
}
</script>

<style lang="less" scoped>
.goods-sales {
  width: 400px;
  height: 140px;
  display: flex;
  align-items: center;
  text-align: center;

  li {
    flex: 1;
    position: relative;

    ~ li::after {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      height: 60px;
      border-left: 1px solid #e4e4e4;
    }
  }

  p {
    &:first-child {
      color: #999;
    }

    &:nth-child(2) {
      margin-top: 10px;
      color: @priceColor;
    }

    &:last-child {
      margin-top: 10px;
      color: #666;
      transition: all 0.2s ease;

      i {
        margin-right: 2px;
        font-size: 14px;
        color: @xtxColor;
      }

      &:hover {
        cursor: pointer;
        color: @xtxColor;
      }
    }
  }
}
</style>
