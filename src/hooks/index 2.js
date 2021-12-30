// 提供复用逻辑函数（钩子）
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
/*
* 数据懒加载函数：当组件进入可视区域时再加载数据
* @param { Function } apiFn - 监听的 DOM 对象区域对应的数据获取函数
* 存在问题：在商品区块需要滚动比较多的距离才能够去加载数据
* 解决思路：threshold 进入的面积 / 容器完整的面积 取值，0-1，默认比0大，所以需要滚动比较多
* */
export const useLazyData = (apiFn) => {
  const target = ref(null)
  const result = ref([])
  // 返回的 stop 函数，调用以避免当组件多次进入可视区域时多次调用了数据加载函数
  const { stop } = useIntersectionObserver(
    // target 要监听的目标元素 DOM
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否已进入可视区域
      if (isIntersecting) {
        stop()
        // 调用api获取相关区域的数据
        apiFn().then(data => {
          result.value = data.result
          console.log(result.value)
        })
      }
    }, { threshold: 0 }
  )
  return {
    target,
    result
  }
}
