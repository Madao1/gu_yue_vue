<template>
  <ul>
    <li v-for="(item, index) in displayList" :key="item.key" @click="openDetail(item.key)">
      <img :src="item.icon" height="56" :alt="item.label" />
      <span>{{ item.value }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'EnvStatus',
  props: {
    environment: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      items: [
        { icon: '/icons/icon_noise.png', label: '噪声', key: 'noise', unit: 'dB', numeric: true },
        { icon: '/icons/icon_pm10.png', label: 'PM10', key: 'pm10', unit: 'μg/m³', numeric: true },
        { icon: '/icons/icon_pm25.png', label: 'PM2.5', key: 'pm25', unit: 'μg/m³', numeric: true },
        { icon: '/icons/icon_tsp.png', label: 'TSP', key: 'tsp', unit: 'mg/m³', numeric: true },
        { icon: '/icons/icon_tsp.png', label: '扬尘', key: 'dust', unit: 'mg/m³', numeric: true },
        { icon: '/icons/icon_wind_speed.png', label: '风速', key: 'windSpeed', unit: 'm/s', numeric: true },
        { icon: '/icons/icon_wind_direction.png', label: '风向', key: 'windDirection', unit: '' },
        { icon: '/icons/icon_rainfall.png', label: '雨量', key: 'precipitation', unit: 'mm', numeric: true },
        { icon: '/icons/icon_pressure.png', label: '气压', key: 'airPressure', unit: 'kPa', numeric: true },
        { icon: '/icons/icon_temperature.png', label: '温度', key: 'temperature', unit: '°C', numeric: true },
        { icon: '/icons/icon_humidity.png', label: '湿度', key: 'humidity', unit: '%RH', numeric: true },
        { icon: '/icons/icon_smoked.png', label: '烟雾1', key: 'smoke1', unit: '' },
        { icon: '/icons/icon_smoked.png', label: '烟雾2', key: 'smoke2', unit: '' }
      ]
    }
  },
  computed: {
    displayList() {
      return this.items.map(item => ({
        ...item,
        value: this.format(item)
      }))
    }
  },
  methods: {
    format(item) {
      const raw = this.environment ? this.environment[item.key] : null
      if (raw == null) {
        return `${item.label}：--`
      }
      if (item.key === 'windDirection') {
        return `${item.label}：${raw}`
      }
      const value = item.numeric ? this.formatNumber(raw) : raw
      return `${item.label}：${value}${item.unit}`
    },
    formatNumber(value) {
      const number = Number(value)
      return Number.isFinite(number) ? number.toFixed(2) : value
    },
    openDetail(key) {
      this.$emit('open-detail', key)
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
  width: 33.3%;
  padding-bottom: 1px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
}
li:nth-child(1) {
  border-right: 1px solid rgba(255, 255, 255, .1);
  border-bottom: 1px solid rgba(255, 255, 255, .1);
}
li:nth-child(2) {
  border-bottom: 1px solid rgba(255, 255, 255, .1);
}
li:nth-child(3) {
  border-right: 1px solid rgba(255, 255, 255, .1);
}
li:nth-child(3n + 3) {
  border-right: none;
}
li:nth-child(-n + 9) {
  border-bottom: 1px solid rgba(255, 255, 255, .1);
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
