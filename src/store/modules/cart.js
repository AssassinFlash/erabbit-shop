// 购物车模块

export default {
  namespaced: true,
  state () {
    return {
      // 购物车商品列表
      list: []
    }
  },
  mutations: {
    // 约定加入购物车字段，和后端保持一致
    // 商品ID id、商品规格ID skuId、商品规则文字 attrsText、商品图片 picture
    // 商品价格 price、商品现价 nowPrice、商品是否选中 selected、商品库存 stock
    // 商品选中数 count、商品是否有效 isEffective
    insertCart (state, payload) {
      // 插入数据的规则：
      // 1.查找是否有相同的商品
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      // 2.如果有相同的商品，就查询该商品的数量，加到payload上，再替换掉该商品
      if (sameIndex > -1) {
        payload.count += state.list[sameIndex].count
        // splice 用户删除、替换元素
        // splice(开始删除|替换的下标，删除|替换的个数，替换的元素)
        state.list.splice(sameIndex, 1, payload)
      } else {
        // 3.如果没有相同商品，插入记录即可
        state.list.unshift(payload)
      }
    }
  },
  actions: {
    // 加入购物车
    insertCart (context, payload) {
      // context 对象包含有 state 属性和 rootState 属性
      // state 等同于store.state，在模块中是局部的，在这里特指cart的state
      // rootState 等同于store.state，在模块中是指所有的，在这里是指全局的state
      // 所以要拿到user的state，就通过rootState来拿到
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录，存储到本地
          context.commit('insertCart', payload)
          resolve()
        }
      })
    }
  }
}
