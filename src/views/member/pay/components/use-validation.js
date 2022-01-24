// 导出一个表单校验对象
export default {
  // 收货人校验
  receiver: (value) => {
    if (!value) return '收货人不能为空'
    if (/\d/.test(value)) return '收货人不能包含数字'
    return true
  },
  // 电话校验
  contact: (value) => {
    if (!value) return '电话号码不能为空'
    if (!/\d/.test(value)) return '电话号码应为纯数字'
    return true
  },
  // 地址校验
  address: (value) => {
    if (!value) return '地址不能为空'
    return true
  },
  postalCode: (value) => {
    if (!value) return '邮政编码不能为空'
    if (!/\d/.test(value)) return '邮政编码应为纯数字'
    if (!/^\d{6}$/.test(value)) return '邮政编码应为6位数字'
    return true
  },
  addressTags: (value) => {
    if (!value) return '地址标签不能为空'
  }
}
