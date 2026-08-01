<template>
  <ul>
    <li v-for="(item, index) in displayList" :key="item.key" @click="openDetail(index)">
      <img :src="item.icon" height="56" :alt="item.label" />
      <span>{{ item.value }}</span>
    </li>
  </ul>
</template>

<script>
const ON_VALUES = ['开启', '开', 'true', '1']
const OFF_VALUES = ['关闭', '关', '闭', 'false', '0']

export default {
  name: 'EquipStatus',
  props: {
    devices: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      items: [
        { icon: '/icons/env/icon_spray.png', label: '喷淋', key: 'spray' },
        { icon: '/icons/env/icon_fog_cannon.png', label: '雾炮', key: 'fog' },
        { icon: '/icons/env/icon_car_wash.png', label: '洗车槽', key: 'carWash' },
        { icon: '/icons/env/icon_water_level.png', label: '沉淀池', key: 'sedimentationTank' },
        { icon: '/icons/env/icon_greening_spray.png', label: '绿化灌溉', key: 'greenIrrigation' },
        { icon: '/icons/env/icon_rainwater_level.png', label: '雨水池', key: 'rainwaterPool' },
        { icon: '/icons/env/icon_lighting.png', label: '照明', key: 'lighting' },
        { icon: '/icons/env/icon_fan.png', label: '风扇', key: 'fan' }
      ]
    }
  },
  computed: {
    displayList() {
      return this.items.map(item => ({
        ...item,
        value: `${item.label}：${this.formatDevice(item.key)}`
      }))
    }
  },
  methods: {
    formatDevice(key) {
      const raw = this.devices ? this.devices[key] : null
      if (raw == null) {
        return '--'
      }
      const value = String(raw).toLowerCase()
      if (ON_VALUES.includes(value)) {
        return '开'
      }
      if (OFF_VALUES.includes(value)) {
        return '关'
      }
      return raw
    },
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
