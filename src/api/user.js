// 用户相关的接口
import request from '@/utils/request'

/*
* 账号密码登录
* @param {String} account - 账号
* @param {String} password - 密码
* */
export const userAccountLogin = ({
  account,
  password
}) => {
  return request('/login', 'post', {
    account,
    password
  })
}

/*
* 获取短信登录验证码
* @param {String} mobile - 手机号
* @return Promise
* */
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

/*
* 手机号登录
* @param {String} mobile - 手机号
* @param {String} code - 验证码
* */
export const userMobileLogin = ({
  mobile,
  code
}) => {
  return request('/login/code', 'post', {
    mobile,
    code
  })
}

/*
* QQ登录
* @param {String} unionId - QQ唯一标识 openID
* @param {*} source - 客户端类型 1 PC端
* */
export const userQQLogin = (unionId, source = 1) => {
  return request('/login/social', 'post', {
    unionId,
    source
  })
}

/*
* 获取QQ绑定时候的短信验证码
* @param {String} mobile - 手机号
* */
export const userQQBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}

/*
* QQ登录 - 绑定账号
* @param {String} unionId - QQ唯一标识 openID
* @param {String} mobile - 手机号
* @param {String} code - 验证码
* */
export const userQQBindLogin = ({
  unionId,
  mobile,
  code
}) => {
  return request('/login/social/bind', 'post', {
    unionId,
    mobile,
    code
  })
}

/*
* 检验账号是否存在
* @param {String} account - 账号
* */
export const userCheckAccount = (account) => {
  return request('/register/check', 'get', { account })
}

/*
* QQ完善信息时获取的短信验证码
* @param {String} mobile - 手机号
* */
export const userQQPatchCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

/*
* QQ完善信息提交
* @param {String} unionId - QQ唯一标识 openID
* @param {String} mobile - 手机号
* @param {String} code - 验证码
* @param {String} account - 账号
* @param {String} password - 密码
* */
export const userQQPatchLogin = ({
  unionId,
  mobile,
  code,
  account,
  password
}) => {
  return request(`/login/social/${unionId}/complement`, 'post', {
    mobile,
    code,
    account,
    password
  })
}
