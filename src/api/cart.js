// 封装购物车相关的API函数
import request from '@/utils/request'

/**
 * 更新商品信息：价格、库存、是否有效
 * @param {String} skuId - SKU ID
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}
