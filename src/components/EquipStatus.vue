<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" @click="openDetail(index)">
      <img :src="item.icon" height="56" :alt="item.label" />
      <span>{{ item.value }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'EquipStatus',
  data() {
    return {
      list: [
        { icon: '/icons/env/icon_spray.png', label: '喷淋', value: '喷淋：开' },
        { icon: '/icons/env/icon_fog_cannon.png', label: '雾炮', value: '雾炮：开' },
        { icon: '/icons/env/icon_car_wash.png', label: '洗车槽', value: '洗车槽：开' },
        { icon: '/icons/env/icon_water_level.png', label: '沉淀池', value: '沉淀池：2' },
        { icon: '/icons/env/icon_greening_spray.png', label: '绿化灌溉', value: '绿化灌溉：闭' },
        { icon: '/icons/env/icon_rainwater_level.png', label: '雨水池', value: '雨水池：2' },
        { icon: '/icons/env/icon_lighting.png', label: '照明', value: '照明：闭' },
        { icon: '/icons/env/icon_fan.png', label: '风扇', value: '风扇：闭' }
      ]
    }
  },
  methods: {
    openDetail(id) {
      this.$emit('open-detail', id)
    }
  }
}
</script>

<style scoped>
ul {
  overflow: hidden;
}
li {
  float: left;
  width: 25%;
  padding-bottom: 1px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
}
li img {
  display: block;
  margin: 18px auto 5px auto;
}
li span {
  font-size: 14px;
  color: #fff;
  opacity: .8;
}
</style>
