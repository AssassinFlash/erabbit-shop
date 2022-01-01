<template>
  <!-- 城市组件 -->
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active: active }">
      <span class="placeholder" v-if="fullLocation === ''">请选择配送地址</span>
      <span class="value" v-else>{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down" />
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
          @click="changeItem(item)"
        >
          {{ item.name }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
// 使用 @vueuse/core 提供的 onClickOutside API，表示如果点击了元素外部就执行逻辑
// 需求：点击组件外部元素关闭选择框
import axios from 'axios'
import { onClickOutside } from '@vueuse/core'
import { ref, reactive, computed } from 'vue'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const target = ref(null)
    const loading = ref(false)

    const active = ref(false) // 控制select组件显示和隐藏
    const cityData = ref([]) // 城市数据
    const openDialog = () => {
      active.value = true
      for (const key in changeResult) {
        changeResult[key] = ''
      }
      getCityData().then((data) => {
        cityData.value = data
        loading.value = false
      })
    }
    const closeDialog = () => {
      active.value = false
    }
    const toggleDialog = () => {
      active.value ? closeDialog() : openDialog()
    }
    onClickOutside(target, () => {
      closeDialog()
    })

    // 获取省市区数据
    // 1.当本地没有缓存，发请求获取数据
    // 2.当本地有缓存，取出本地数据
    // 约定：数据存储在 window 对象的 cityData 属性
    // 由于可能是异步操作可能是同步操作，因此封装成Promise，在then中获取数据
    const getCityData = () => {
      return new Promise((resolve, reject) => {
        if (window.cityData) {
          resolve(window.cityData)
        } else {
          loading.value = true
          const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          axios.get(url).then(data => {
            window.cityData = data.data
            resolve(window.cityData)
          })
        }
      })
    }

    // 定义选择的省市区数据，当点击地区选项时记录
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    const changeItem = (item) => {
      // 省
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      // 区
      if (item.level === 2) {
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        // 最后一层，通知父组件地址已构建完成
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        emit('change', changeResult)
        closeDialog()
      }
    }

    // 计算属性：依赖于所有省市区数据，计算出当前显示的地区数组
    // 默认获取省一级数据，点击了某个省，列表就要变化，显示该省的市一级数据
    // 同样，当点击了某个市，列表又要变化，显示该市的地区一级数据
    const currList = computed(() => {
      // 省
      let list = cityData.value
      // 市
      if (changeResult.provinceCode) {
        list = list.find(province => province.code === changeResult.provinceCode).areaList
      }
      // 区
      if (changeResult.cityCode) {
        list = list.find(city => city.code === changeResult.cityCode).areaList
      }
      return list
    })

    return {
      target,
      active,
      toggleDialog,
      currList,
      changeItem
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    height: 30px;
    line-height: 28px;
    padding: 0 5px;
    border: 1px solid #e4e4e4;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      font-size: 12px;
      color: #666;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
      vertical-align: middle;
    }
  }

  .option {
    position: absolute;
    left: 0;
    top: 29px;
    width: 542px;
    min-height: 30px;
    border: 1px solid #e4e4e4;
    padding: 10px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;

    > span {
      display: inline-block;
      margin: 5px 0;
      width: 130px;
      padding: 3px 0;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
      }
    }

    .loading {
      width: 100%;
      height: 290px;
      background: url(../../assets/images/loading.gif);
    }
  }
}
</style>
