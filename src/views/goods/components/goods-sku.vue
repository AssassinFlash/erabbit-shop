<template>
  <!-- 商品属性组件 -->
  <!-- spu: 一个商品，拥有很多相同的规格 -->
  <!-- sku: 该商品可选规格的任意组合，他是库存单位的唯一标识 -->
  <!-- 比如: 一个手机是一个spu，该手机的规格(蓝色、64G)是一个sku -->
  <!-- 规格的笛卡尔积就是所有的sku -->
  <div class="goods-sku">
    <dl v-for="spec in goods.specs" :key="spec.name">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="val in spec.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-if="val.picture"
            :src="val.picture"
            alt=""
            :title="val.name"
            @click="changeSku(spec, val)"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-else
            @click="changeSku(spec, val)"
          >
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
// 1.根据goods的sku属性得到有效sku组合（inventory库存不为0），每个sku组合有自己的ID
// 2.根据每个有效sku组合得到每个子集，例如：['蓝色，美国'] ==> [['蓝色'],['美国'],['蓝色','美国']]
// 3.根据子集和skuID组合得到一个路径集合，也就是路径字典（对象）
// 4.在组件初始化的时候判断每个规格是否可以点击
// 5.在点击规格的时候判断其他规格是否可以点击
// 6.判断依据：如果可走路径在路径字典中，即可点击
import getPowerSet from '@/vender/power-set'
const spliter = '★'
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach((sku) => {
    if (sku.inventory) {
      // 得到该sku对应的属性路径（数组）
      const specs = sku.specs.map((spec) => spec.valueName)
      // 得到该属性路径的所有子集（数组）
      const powerSet = getPowerSet(specs)
      // 这些子集与skuID组合得到路径字典
      powerSet.forEach((set) => {
        const key = set.join(spliter) // '蓝色★美国'
        // 路径字典中存在key，就追加skuID
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          // value 值设置成数组，这样方便追加skuID
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}

// 点击规格的时候，去更新其他按钮的禁用状态
// 1.获取当前选中的值对应的规格数组a，比如：a:['黑色',undefined,undefined]
// 2.遍历每一种规格的每一个按钮，如果已经选中，忽略判断禁用状态
//   如果为选中，将这个按钮按对应位置套入a，这个套入后的数组再过滤掉undefined，
//   得到新属性路径b，对数组b拼接成字符串key，将这个key去和路径字典比对，不存在skuID就禁用
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach((spec) => {
    // 选中的按钮对象
    const selectedVal = spec.values.find(val => val.selected === true)
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}

// 更新按钮禁用状态：
// 属性路径作为key去和路径字典做匹配，看该key下有没有skuID，有则可点击
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    // ['黑色',undefined,undefined]
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach((val) => {
      // 已经选中的按钮就不必判断，因为这个按钮一定是可以使用的
      if (val.selected) return
      // 这一规格下未选中的按钮去套入规格数组
      selectedArr[i] = val.name
      // 过滤无效值得到key
      const key = selectedArr.filter(value => {
        if (value) return true
      }).join(spliter)
      // key和路径字典匹配
      val.disabled = !pathMap[key]
    })
  })
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default () {
        return { specs: [], skus: [] }
      }
    }
  },
  setup (props) {
    // 得到路径字典
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)
    // 组件初始化时，更新按钮的禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // 点击按钮时，更新按钮的禁用状态

    // 1.选中与取消选中，约定每个按钮都有自己的选中状态：selected
    // 2.点击的是已选中，只需取消当前已选中，点击的是未选中，把同一规格的按钮改成未选中，当前点击的改成选中
    const changeSku = (spec, val) => {
      // 当按钮是被禁用时，不执行选中逻辑
      if (val.disabled) return
      if (val.selected) {
        val.selected = false
      } else {
        spec.values.forEach((val) => {
          val.selected = false
        })
        val.selected = true
        updateDisabledStatus(props.goods.specs, pathMap)
      }
    }

    return {
      changeSku
    }
  }
}
</script>

<style lang="less" scoped>
.sku-state-mixin() {
  margin-right: 10px;
  border: 1px solid #e4e4e4;
  cursor: pointer;
  transition: all 0.2s ease;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    border-style: dashed;
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      border-color: #e4e4e4;
    }
  }

  &:hover {
    border-color: @xtxColor;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin();
      }
    }
  }
}
</style>
