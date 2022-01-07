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

/**
 * 获取相关推荐商品
 * @param {String} id - 商品ID，传入为相关推荐，不传为猜你喜欢
 * @param {Number} limit - 商品数量
 */
export const findRelevantGoods = ({
  id,
  limit = 16
}) => {
  return request('/goods/relevant', 'get', {
    id,
    limit
  })
}

/**
 * 获取热榜商品
 * @param {String} id - 商品ID
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
export const findHotGoods = ({
  id,
  type,
  limit
}) => {
  return request('/goods/hot', 'get', {
    id,
    type,
    limit
  })
}

/**
 * 获取商品评价信息
 * @param {String} id - 商品ID
 */
export const findGoodsCommentInfo = (id) => {
  // axios 遇见http开头的地址，就不会加上基准地址了
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 获取商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 筛选条件
 */
export const findGoodsCommentList = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
