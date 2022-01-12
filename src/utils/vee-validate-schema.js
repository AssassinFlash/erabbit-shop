// 给 vee-validate 提供校验规则函数
// 导出一个对象
import { userCheckAccount } from '@/api/user'

export default {
  // 用户名校验，规则：字母开头6~20字符之间
  account: (value) => {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6到20个字符'
    return true
  },
  // 密码校验，规则：6~24个字符
  password: (value) => {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6到24个字符'
    return true
  },
  // 手机校验
  mobile: (value) => {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
    return true
  },
  // 验证码校验
  code: (value) => {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
    return true
  },
  // 用户协议勾选
  isAgree: (value) => {
    if (!value) return '请先勾选同意用户协议'
    return true
  },
  // 检验用户是否存在
  accountApi: async (value) => {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6~20个字符'
    // 服务端校验
    const { result } = await userCheckAccount(value)
    if (result.valid) return '用户名已存在'
    return true
  },
  // 确认密码
  rePassword: (value, { form }) => {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6~24个字符'
    // 校验密码是否一致
    if (value !== form.password) return '两次输入的密码不一致'
    return true
  }
}
