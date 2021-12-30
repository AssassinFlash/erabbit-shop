// 定义分类相关的API接口函数

import request from '@/utils/request'

/*
  获取所有分类（一级、二级、对应的商品推荐数据）
  @return Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/*
 * 获取单个一级分类信息（children就是该一级分类下的所有二级分类）
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/*
 * 获取二级分类下的筛选条件
 * @param {String} id - 二级分类ID
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/*
 * 获取带筛选条件的商品
 * @param {Object} params
 * params 包括：categoryId(分类ID)、inventory(是否有库存)、onlyDiscount(只显示特惠)
 *        brandId(品牌ID)、sortField(排序字段)、sortMethod(排序规则)、page(分页)
 *        pageSize(每页显示的条数)
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
