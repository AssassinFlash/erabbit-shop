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
      },
      // 记录下未去QQ登录时login地址栏出现的redirectUrl，方便跳转
      // 原因是QQ登录返回的来源页地址栏已经丢失，变成callback=xxx
      redirectUrl: '/'
    }
  },
  mutations: {
    // 修改用户信息 payload 就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    },
    // 修改地址栏
    setRedirectUrl (state, redirectUrl) {
      state.redirectUrl = redirectUrl
    }
  }
}
