// 订单相关的API函数
import request from '@/utils/request'

// 结算页面 - 生成订单
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 添加收货地址
 * @param {object} formData 地址表单数据对象
 */
export const addAddress = (formData) => {
  return request('/member/address', 'post', formData)
}

/**
 * 修改收货地址
 * @param {Object} form 地址表单数据对象
 */
export const editAddress = (formData) => {
  return request(`/member/address/${formData.id}`, 'put', formData)
}

/**
 * 提交订单
 * @param {object} params 订单信息对象
 */
export const submitOrder = (params) => {
  return request('/member/order', 'post', params)
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = (id) => {
  return request(`/member/order/${id}`, 'get')
}
