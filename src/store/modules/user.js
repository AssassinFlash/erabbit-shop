// 用户模块

// 注意，state 要写成函数，这样表示复用的时候每个模块数据都是独立的，不会相互影响
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用户信息 payload 就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
