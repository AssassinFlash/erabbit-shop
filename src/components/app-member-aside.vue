<template>
  <div class="xtx-member-aside">
    <div class="user-manage">
      <h4>我的账户</h4>
      <div class="links">
        <!-- 路由激活：exact-active-class和active-class，前者是精准匹配路由精活，后者是模糊匹配激活 -->
        <router-link to="/member" exact-active-class="active">个人中心</router-link>
        <a href="javascript:;">消息通知</a>
        <a href="javascript:;">个人信息</a>
        <a href="javascript:;">安全设置</a>
        <a href="javascript:;">地址管理</a>
        <a href="javascript:;">我的积分</a>
        <a href="javascript:;">我的足迹</a>
        <a href="javascript:;">邀请有礼</a>
        <a href="javascript:;">幸运抽奖</a>
      </div>
      <h4>交易管理</h4>
      <div class="links">
        <router-link to="/member/order" active-class="active">我的订单</router-link>
        <a href="javascript:;">优惠券</a>
        <a href="javascript:;">礼品卡</a>
        <a href="javascript:;">评价晒单</a>
        <a href="javascript:;">售后服务</a>
      </div>
      <h4>我的收藏</h4>
      <div class="links">
        <a href="javascript:;">收藏的品牌</a>
        <a href="javascript:;">收藏的专题</a>
        <a href="javascript:;">关注的品牌</a>
      </div>
      <h4>帮助中心</h4>
      <div class="links">
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">在线客服</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XtxMemberAside'
}
</script>

<style lang="less" scoped>
.xtx-member-aside {
  width: 220px;
  border-radius: 2px;
  margin-right: 20px;

  .user-manage {
    background: #fff;

    h4 {
      padding: 20px 52px 5px;
      font-size: 18px;
      font-weight: 400;
      border-top: 1px solid #f6f6f6;
    }

    .links {
      padding: 0 52px 10px;

      a {
        display: block;
        line-height: 1;
        padding: 15px 0;
        font-size: 14px;
        color: #666;
        position: relative;
        transition: all 0.3s ease;

        &:before {
          content:"";
          display: none;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          top: 19px;
          left: -16px;
          background: @xtxColor;
        }

        &.active, &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
