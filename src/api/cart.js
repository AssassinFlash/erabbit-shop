// 封装购物车相关的API函数
import request from '@/utils/request'

/**
 * 更新商品信息：价格、库存、是否有效
 * @param {String} skuId - SKU ID
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应的sku数据和specs
 * @param {String} skuId - SKU ID
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 登录后用户自身的购物车记录和本地的购物车记录合并
 * @param {Array<object>} cartList - 购物车信息对象列表
 * @param {String} object.skuId - SKUID
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count - 数量
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 获取登录后的购物车列表
 */
export const findCartList = () => {
  return request('/member/cart', 'get')
}

/**
 * 登录后的加入购物车操作
 * @param {String} skuId - SKUID
 * @param {Integer} count - 商品的数量
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 登录后的删除购物车商品
 * @param {Aray<string>} ids - skuId 数组
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

/**
 * 登录后修改购物车商品的选中状态和数量
 * @param {String} goods.skuId - 商品sku
 * @param {Boolean} goods.selected - 选中状态
 * @param {Integer} goods.count - 商品数量
 */
export const updateCart = (goods) => {
  return request(`/member/cart/${goods.skuId}`, 'put', goods)
}

/**
 * 登录后的全选和反选操作
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - 有效商品skuId数组
 */
export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
