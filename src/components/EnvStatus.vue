<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" @click="openDetail(index + 1)">
      <img :src="item.icon" height="56" :alt="item.label" />
      <span>{{ item.value }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'EnvStatus',
  data() {
    return {
      list: [
        { icon: '/icons/icon_noise.png', label: '噪声', value: '噪声：52db' },
        { icon: '/icons/icon_pm10.png', label: 'PM10', value: 'PM10：21μg/m³' },
        { icon: '/icons/icon_pm25.png', label: 'PM2.5', value: 'MP2.5：35μg/m³' },
        { icon: '/icons/icon_tsp.png', label: 'TSP', value: 'TSP：0.12 mg/m³' },
        { icon: '/icons/icon_wind_speed.png', label: '风速', value: '风速：5m/ms' },
        { icon: '/icons/icon_wind_direction.png', label: '风向', value: '风向：东南 SE' },
        { icon: '/icons/icon_rainfall.png', label: '雨量', value: '雨量：2mm/ms' },
        { icon: '/icons/icon_pressure.png', label: '气压', value: '气压：101.325 kPa' },
        { icon: '/icons/icon_temperature.png', label: '温度', value: '温度：29 °' },
        { icon: '/icons/icon_humidity.png', label: '湿度', value: '湿度：75%RH' },
        { icon: '/icons/icon_smoked.png', label: '烟雾1', value: '烟雾1：正常' },
        { icon: '/icons/icon_smoked.png', label: '烟雾2', value: '烟雾2：正常' }
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
