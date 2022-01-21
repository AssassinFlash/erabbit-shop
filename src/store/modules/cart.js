// 购物车模块
import {
  getNewCartGoods,
  mergeCart,
  findCartList,
  insertCart,
  deleteCart,
  updateCart,
  checkAllCart
} from '@/api/cart'

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
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 选中商品列表
    selectedList (state, getters) {
      return getters.validList.filter(goods => goods.selected)
    },
    // 选中商品件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((prevVal, currVal) => {
        return prevVal + currVal.count
      }, 0)
    },
    // 选中商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((prevVal, currVal) => {
        return prevVal + Number((currVal.nowPrice * currVal.count).toString().match(/^\d+(?:\.\d{0,2})?/))
      }, 0)
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.selectedList !== 0 && getters.validList.length === getters.selectedList.length
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
    },
    // 设置购物车
    setCart (state, list) {
      // 可以置空也可以设值
      state.list = list
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
          // 已登录，加入购物车之后要执行更新购物车的操作
          insertCart(payload).then(() => findCartList()).then(({ result }) => {
            context.commit('setCart', result)
            resolve()
          })
        } else {
          // 未登录，存储到本地
          context.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 更新购物车中商品信息时就会调用修改购物车的方法
    findCartList ({ rootState, state, commit }) {
      return new Promise((resolve, reject) => {
        if (rootState.user.profile.token) {
          findCartList().then(({ result }) => {
            commit('setCart', result)
          })
          resolve()
        } else {
          // 同时发送请求，一并去修改本地数据，结果与请求位置一一对应
          // Promise.all(promise数组).then(datalist=>{})
          const promiseArr = state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr).then(dataList => {
            // 更新购物车
            dataList.forEach((data, i) => {
              commit('updateCart', { skuId: state.list[i].skuId, ...data.result })
            })
          })
          resolve()
        }
      })
    },
    // 从登录和未登录两种情况封装删除购物车商品
    deleteCart ({ rootState, commit }, skuId) {
      return new Promise((resolve, reject) => {
        if (rootState.user.profile.token) {
          // 已登录，删除购物车商品后要执行更新购物车操作
          deleteCart([skuId]).then(() => findCartList()).then(({ result }) => {
            commit('setCart', result)
            resolve()
          })
        } else {
          // 未登录
          commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 修改购物车商品数量和选中状态
    updateCart ({ rootState, commit }, goods) {
      // goods中：必须有skuId，其他想修改的属性 selected count
      return new Promise((resolve, reject) => {
        if (rootState.user.profile.token) {
          // 已登录
          updateCart(goods).then(() => findCartList()).then(({ result }) => {
            commit('setCart', result)
            resolve()
          })
        } else {
          // 未登录
          commit('updateCart', goods)
          resolve()
        }
      })
    },
    // 全选与取消全选
    checkAllCart (context, selected) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
          const ids = context.getters.validList.map(goods => goods.skuId)
          checkAllCart({ selected, ids }).then(() => findCartList()).then(({ result }) => {
            context.commit('setCart', result)
          })
          resolve()
        } else {
          // 未登录
          // 获取有效商品列表，遍历调用修改mutations
          context.getters.validList.forEach(goods => {
            context.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除购物车
    batchDeleteCart (context) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
          // 得到需要删除的商品列表的skuID数组
          const ids = context.getters.selectedList.map(goods => goods.skuId)
          deleteCart(ids).then(() => findCartList()).then(({ result }) => {
            context.commit('setCart', result)
            resolve()
          })
        } else {
          // 未登录
          // 遍历选中的商品，执行单个删除的mutations
          context.getters.selectedList.forEach(goods => {
            context.commit('deleteCart', goods.skuId)
          })
          resolve()
        }
      })
    },
    // 修改商品规格
    updateCartSku (context, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
          const oldGoods = context.state.list.find(goods => goods.skuId === oldSkuId)
          deleteCart([oldSkuId]).then(() => {
            return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
          }).then(() => findCartList()).then(({ result }) => {
            context.commit('setCart', result)
            resolve()
          })
        } else {
          // 未登录
          // 1. 找到旧的商品规格
          // 2. 修改sku的时候由于skuId需要更改
          // 相当于在购物车商品中找到这个商品，然后删除这个商品，再添加一条新的商品信息
          const oldGoods = context.state.list.find(goods => goods.skuId === oldSkuId)
          context.commit('deleteCart', oldSkuId)
          // 解构的另外命名的方式 -》 原本的名称：更改后的名称
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          context.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 合并购物车
    async mergeCart ({ state, commit }) {
      const cartList = state.list.map(goods => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      // 调用接口
      await mergeCart(cartList)
      // 合并成功，清空本地存储的购物车数组
      commit('setCart', [])
    }
  }
}
