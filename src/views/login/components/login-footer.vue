<template>
  <footer class="login-footer">
    <div class="container">
      <p>
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">售后服务</a>
        <a href="javascript:;">配送与验收</a>
        <a href="javascript:;">商务合作</a>
        <a href="javascript:;">搜索推荐</a>
        <a href="javascript:;">友情链接</a>
      </p>
      <p>CopyRight &copy; jzh商城</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LoginFooter'
}
</script>

<style lang="less" scoped>
.login-footer {
  padding: 30px 0 50px;
  background: #FFF;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      &:first-child {
        padding-top: 20px;
        margin-bottom: 20px;

        a {
          padding: 0 15px;
          font-size: 16px;
          color: #999;
          position: relative;

          &:nth-child(n+2) {
            &:before {
              content: "";
              display: inline-block;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 1px;
              height: 16px;
              background: #ccc;
            }
          }
        }
      }

      &:last-child {
        font-size: 18px;
        color: #999;
      }
    }
  }
}
</style>
