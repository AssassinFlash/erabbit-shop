// 购物车模块
import { getNewCartGoods } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      // 购物车商品列表
      list: []
    }
  },
  // vuex 的计算属性：getters
  getters: {
    // 有效商品：库存 > 0 isEffective = true
    // 有效商品列表
    validList (state) {
      return state.list.filter(goods => goods.isEffective && goods.stock > 0)
    },
    // 有效商品总件数，getters里定义的函数可以传getters，这样即可直接调用getters
    validTotal (state, getters) {
      return getters.validList.reduce((prevVal, currVal) => {
        return prevVal + currVal.count
      }, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((prevVal, currVal) => {
        return prevVal + Number((currVal.nowPrice * currVal.count).toString().match(/^\d+(?:\.\d{0,2})?/))
      }, 0)
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
    },
    // 修改购物车商品，payload：商品信息，包含 nowPrice，stock，isEffective，skuId
    updateCart (state, payload) {
      // 需要修改的商品信息并不固定，由传过来的payload包含多少字段来决定
      const updateGoods = state.list.find(goods => goods.skuId === payload.skuId)
      for (const key in payload) {
        if (payload[key] !== undefined && payload[key] !== null && payload[key] !== '') {
          updateGoods[key] = payload[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex(goods => goods.skuId === skuId)
      state.list.splice(index, 1)
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
    },
    // 更新购物车中商品信息时就会调用修改购物车的方法
    findCartList ({ rootState, state, commit }) {
      // 已登录
      if (rootState.user.profile.token) {

      } else {
        // 未登录
        // 同时发送请求（有几个商品就发几个请求）等所有请求成功，一并修改本地数据
        // Promise.all(promise数组).then(dataList=>{})，得到的结果数组与promise数组一一对应
        const promiseArr = state.list.map(goods => {
          // 返回接口函数的调用，该函数生成一个promise
          return getNewCartGoods(goods.skuId)
        })
        Promise.all(promiseArr).then(dataList => {
          dataList.forEach((data, i) => {
            // console.log(data.result)
            // 返回的result本身没有skuId，而修改购物车商品需要skuId
            commit('updateCart', { skuId: state.list[i].skuId, ...data.result })
          })
        })
      }
    },
    // 从登录和未登录两种情况封装删除购物车商品
    deleteCart ({ rootState, commit }, skuId) {
      return new Promise((resolve, reject) => {
        if (rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          commit('deleteCart', skuId)
          resolve()
        }
      })
    }
  }
}
