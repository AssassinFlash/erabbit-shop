<template>
  <div class="xtx-cart-page">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item>
          <router-link to="/">首页</router-link>
        </xtx-bread-item>
        <xtx-bread-item>购物车</xtx-bread-item>
      </xtx-bread>
      <div class="cart">
        <table>
          <!-- 表头 -->
          <thead>
          <!-- 行 -->
            <tr>
              <!-- 列 -->
              <th width="120"><xtx-checkbox>全选</xtx-checkbox></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XtxCartPage'
}
</script>

<style scoped>

</style>
