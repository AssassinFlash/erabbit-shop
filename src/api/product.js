// 定义商品相关的api函数
import request from '@/utils/request'

/*
* 获取商品详情
* @param {String} id - 商品ID
* @returns Promise
* */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
