// 商品分类模块
import { topCategory } from '@/api/constant'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合，依赖topCategory重新设置，保证页面一开始就有一级导航
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 加载数据成功后需要修改list所以需要mutations
  mutations: {
    // payload 所有的分类数组
    setList (state, payload) {
      state.list = payload
    },
    // 定义 show 和 hide 函数，控制当前分类下二级分类显示和隐藏
    show (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  // 需要向后台加载数据
  actions: {
    async getList ({ commit }) {
      // 获取分类数组
      const data = await findAllCategory()
      data.result.forEach(top => {
        top.open = false
      })
      // 修改分类数组
      commit('setList', data.result)
    }
  }
}
